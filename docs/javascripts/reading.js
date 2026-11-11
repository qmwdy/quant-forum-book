(function () {
  var CITE = /（([^（）]{1,80}，\d{4}-\d{2}-\d{2})）/g;
  var CAVEAT = /作者自述|未经核实|本书没有独立核实|低信任来源|自洽不等于正确|自洽并不等于正确/g;
  var AUTHOR = /本书作者/g;
  var keysBound = false;

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      var ok = document.execCommand("copy");
      area.remove();
      if (ok) resolve();
      else reject(new Error("copy failed"));
    });
  }

  function accepted(node) {
    var parent = node.parentElement;
    if (!parent) return false;
    return !parent.closest(
      "script, style, pre, code, .arithmatex, mjx-container, .cite-badge, .caveat-mark, .author-mark, .book-reading-time, .book-stat, .book-kicker, .book-part__no, .book-sources"
    );
  }

  function replaceWithSpans(node, regex, className) {
    var text = node.nodeValue;
    regex.lastIndex = 0;
    if (!regex.test(text)) return;
    regex.lastIndex = 0;
    var fragment = document.createDocumentFragment();
    var last = 0;
    var match;
    while ((match = regex.exec(text))) {
      fragment.appendChild(document.createTextNode(text.slice(last, match.index)));
      var span = document.createElement("span");
      span.className = className;
      span.textContent = match[0];
      fragment.appendChild(span);
      last = match.index + match[0].length;
    }
    fragment.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(fragment, node);
  }

  function walkText(root, regex, className) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!accepted(node)) return;
      replaceWithSpans(node, regex, className);
    });
  }

  function markSections(root) {
    root.querySelectorAll("h2, h3").forEach(function (heading) {
      var title = heading.textContent.replace(/\s+/g, "");
      var kind = "";
      if (title.indexOf("分歧") !== -1 || title.indexOf("阵营") !== -1) kind = "camps";
      else if (title.indexOf("概念") !== -1) kind = "concept";
      else if (title.indexOf("本章小结") !== -1 || title.indexOf("自查清单") !== -1) kind = "summary";
      if (!kind) return;
      heading.classList.add("book-heading", "book-heading-" + kind);
      if (kind !== "camps") return;
      var sibling = heading.nextElementSibling;
      while (sibling && !/^H[12]$/.test(sibling.tagName)) {
        if (
          sibling.matches(".md-typeset__scrollwrap, .md-typeset__table, table") ||
          sibling.querySelector("table")
        ) {
          sibling.classList.add("book-camps");
        }
        sibling = sibling.nextElementSibling;
      }
    });
  }

  function readingTime(root) {
    if (root.querySelector(".book-landing") || root.querySelector(".book-reading-time")) return;
    var heading = root.querySelector("h1");
    if (!heading) return;
    var clone = root.cloneNode(true);
    clone.querySelectorAll("nav, script, style, .headerlink, .md-content__button").forEach(function (node) {
      node.remove();
    });
    var text = clone.textContent || "";
    var cjk = (text.match(/[\u3400-\u9fff]/g) || []).length;
    var words = (text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).length;
    var minutes = Math.max(1, Math.round(cjk / 420 + words / 200));
    var note = document.createElement("p");
    note.className = "book-reading-time";
    note.textContent = "约 " + minutes + " 分钟";
    heading.insertAdjacentElement("afterend", note);
  }

  function copyHeadingLinks(root) {
    root.querySelectorAll(".headerlink").forEach(function (link) {
      if (link.dataset.bookCopy) return;
      link.dataset.bookCopy = "1";
      link.title = "复制本节链接";
      link.addEventListener("click", function () {
        var href = link.getAttribute("href");
        if (!href) return;
        var url = new URL(href, window.location.href).toString();
        copyText(url).then(function () {
          link.classList.add("is-copied");
          link.title = "已复制链接";
          window.setTimeout(function () {
            link.classList.remove("is-copied");
            link.title = "复制本节链接";
          }, 1400);
        }).catch(function () {});
      });
    });
  }

  function ensureZoom() {
    var zoom = document.querySelector(".book-zoom");
    if (zoom) return zoom;
    zoom = document.createElement("div");
    zoom.className = "book-zoom";
    zoom.hidden = true;
    zoom.innerHTML =
      '<div class="book-zoom__panel" role="dialog" aria-modal="true" aria-label="表格放大">' +
      '<div class="book-zoom__bar"><span>表格放大</span><button type="button" class="book-zoom__close">关闭</button></div>' +
      '<div class="book-zoom__body"></div></div>';
    function close() {
      zoom.hidden = true;
      document.body.classList.remove("book-zoom-open");
      zoom.querySelector(".book-zoom__body").replaceChildren();
    }
    zoom.addEventListener("click", function (event) {
      if (event.target === zoom || event.target.closest(".book-zoom__close")) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !zoom.hidden) close();
    });
    document.body.appendChild(zoom);
    return zoom;
  }

  function tableZoom(root) {
    var zoom = ensureZoom();
    root.querySelectorAll(".md-typeset__scrollwrap").forEach(function (wrap) {
      if (wrap.querySelector(".book-table-zoom")) return;
      var table = wrap.querySelector("table");
      if (!table) return;
      var button = document.createElement("button");
      button.type = "button";
      button.className = "book-table-zoom";
      button.textContent = "放大";
      button.addEventListener("click", function () {
        var body = zoom.querySelector(".book-zoom__body");
        body.replaceChildren(table.cloneNode(true));
        zoom.hidden = false;
        document.body.classList.add("book-zoom-open");
        var closeButton = zoom.querySelector(".book-zoom__close");
        if (closeButton) closeButton.focus();
      });
      wrap.appendChild(button);
    });
  }

  function searchHint() {
    var label = document.querySelector('label.md-header__button[for="__search"]');
    if (label && !label.dataset.bookHint) {
      label.dataset.bookHint = "1";
      label.title = "搜索（/ 或 S）";
    }
    var inner = document.querySelector(".md-search__inner");
    if (inner && !inner.querySelector(".book-search-hint")) {
      var hint = document.createElement("p");
      hint.className = "book-search-hint";
      hint.textContent = "/ 或 S 打开 · ↑↓ 选择 · Enter 进入 · Esc 关闭";
      inner.appendChild(hint);
    }
  }

  function updateProgress() {
    var bar = document.querySelector(".book-progress");
    var span = bar && bar.querySelector("span");
    if (!span) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    var percent = Math.round(ratio * 100);
    span.style.width = percent + "%";
    bar.setAttribute("aria-valuenow", String(percent));
  }

  function boot() {
    var root = document.querySelector(".md-content__inner");
    if (!root) return;
    markSections(root);
    walkText(root, CITE, "cite-badge");
    walkText(root, AUTHOR, "author-mark");
    walkText(root, CAVEAT, "caveat-mark");
    root.querySelectorAll(".caveat-mark").forEach(function (el) {
      var host = el.closest("td, li, p");
      if (host) host.classList.add("book-has-caveat");
    });
    readingTime(root);
    copyHeadingLinks(root);
    tableZoom(root);
    searchHint();
    updateProgress();
  }

  if (!keysBound) {
    keysBound = true;
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
