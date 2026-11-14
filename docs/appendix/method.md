# 附录 C　方法与覆盖说明

## C.1　数据采集流程

1. **候选清单**：用各站点的搜索、热门榜与列表页，汇总成 1099 行的候选清单（`threads.csv`，含站点、日期、标题、URL、互动、读取深度、早期摘要）。
2. **筛选**：按标题与摘要判断，与“执行、风控、回测、期权”无关的帖子被跳过（原因逐条记录，见 C.4）。
3. **精读**：对留下的 **343** 篇，抓取楼主帖加最长/最高分的评论或回答，形成每篇一份“档案”（dossier）。
4. **成书**：每章先确定归属的帖子，再逐篇阅读档案，撰写概念、转述观点、列出分歧；每个观点附来源链接。书中的所有链接由脚本根据 `threads.csv` 生成，避免手工抄错。

## C.2　站点覆盖

| 站点 | 精读 | 跳过 | 精读帖的日期范围 | 读取方式 |
|---|---|---|---|---|
| Elite Trader | 78 | 222 | 2002-09-15 至 2026-07-14 | 抽样页（OP + 若干页的帖子） |
| Wilmott | 33 | 265 | 2002-11-13 至 2024-08-01 | 抽样（前约 30 条帖子） |
| Reddit r/algotrading | 44 | 59 | 2018-08-12 至 2026-11-04 | RSS 摘录（帖子 + 部分高赞评论的前几百字，无点赞数） |
| Reddit r/options | 24 | 28 | 2020-12-24 至 2026-11-09 | 同上 |
| Reddit r/quant | 12 | 43 | 2022-09-19 至 2026-11-08 | 同上 |
| Reddit r/thetagang | 7 | 22 | 2021-06-02 至 2026-10-09 | 同上 |
| Hacker News | 41 | 47 | 2010-07-15 至 2025-08-06 | 链接标题 + 评论树（最长的顶层评论） |
| QuantConnect 论坛 | 27 | 65 | 2015-03-07 至 2025-04-11 | OP + 回复 |
| QuantNet（浏览器读取） | 31 | 0 | 2007-12-31 至 2025-04-08 | 浏览器读取；约 19 篇只有列表页与简短摘要 |
| Quant StackExchange | 22 | 0 | 2011-02-01 至 2023-11-08 | 问题 + 高分回答 |
| Numerai 论坛 | 6 | 0 | 2020-04-12 至 2021-09-01 | 帖子 |
| X（推特） | 18 | 0 | 2020-05-05 至 2026-11-02 | 仅第一条推文（线程不完整） |
| Lobsters | 0 | 5 | — | 被 Anubis 拦截，0 篇精读 |
| **合计** | **343** | **756** | 2002-09 至 2026-11（候选清单 2001-11 至 2026-11） | |

日期为帖子发布日期（楼主帖日期）；“跳过”指候选清单里按标题判断未精读的帖子。

## C.3　无法访问、未尝试与不完整的部分

- **Nuclear Phynance**：站点似乎已下线（连接被关闭、重试超时），完全没有读到。
- **Lobsters**：搜索被 Anubis 拦截；5 个候选未能精读。
- **Quantocracy** 订阅源返回 500 错误。
- **Reddit JSON 接口**返回 403，改用 RSS：因此只有帖子正文与部分评论的“摘录”，没有点赞数、没有完整讨论；读取很慢且被限流。r/Daytrading、r/FuturesTrading、r/SPXOptions、r/systematictrading 因限流被跳过。
- **X**：点赞过滤参数无效；2026 年的搜索结果被推广与机器人帖子淹没，只保留了少数有实质内容的帖子，且只读到第一条推文。覆盖偏稀。
- **QuantNet**：通过浏览器访问（验证页自动通过），读了 31 篇，多为 2008–2013 年的问答与资源帖，2018 年后几乎没有从业者的交易内容。其中约 19 篇只有列表页与简短摘要，书中引用时均已标注“仅依据早先摘要”。
- **Elite Trader 与 Wilmott**：只读了抽样页，不是完整线程（有的线程有数十页）；Wilmott 的引用嵌套较乱，转述尽量保守。
- **Kaggle 论坛**：未尝试。
- **时间**：不同站点的“活跃期”不同，Elite Trader 偏 2003–2022，Wilmott 偏 2002–2014，Reddit/X 偏 2020–2026，这使得观点的年代分布并不均匀。

## C.4　跳过了什么

共跳过 756 篇。原因分布：

| 跳过原因 | 篇数 |
|---|---|
| pure math/numerics/C++/books/theory, not practitioner trading experience | 231 |
| platform how-to / API / bug / feature thread | 60 |
| meme/pump/showcase/low-information or beginner-resource post | 59 |
| news/legal/recruiting/product launch or puzzle, no practitioner discussion | 47 |
| career/compensation/firm-news post | 43 |
| macro/news/crisis commentary or short low-information thread | 34 |
| index-futures daily calls/journals/signal rooms | 29 |
| career/lifestyle/fund-raising chat | 28 |
| GME/WSB/meme or low-information post | 28 |
| general AI/tech chatter, not trading practice | 27 |
| trading-psychology philosophy / gambling debate, no method | 26 |
| discretionary TA / price-action / tape-reading, not systematic | 24 |
| data-vendor / broker data-feed troubleshooting | 24 |
| NYSE-specialist/broker-era grievances and platform issues | 22 |
| P&L showcase/meme | 22 |
| personal options trade journal or overlapping theme | 16 |
| broker/platform/product chatter or continuation of a bot-journal thread | 15 |
| stop-loss/risk debate overlapping threads already read | 11 |
| off-topic personal finance / theory, not trading practice | 5 |
| duplicate, already read under another URL | 5 |

## C.5　覆盖检查（脚本验证）

`coverage.py` 读取 `threads.csv` 中全部 343 篇已读帖子的 URL，在 `docs/` 的**章节正文与前后附文**（不含两个来源索引附录）里逐一查找：

- **正文覆盖：343 / 343**（缺失 0 篇）；
- **含附录 B/B2 来源索引：343 / 343**。

附录 B 与 B2 分别按章节与按站点列出全部 343 篇，供交叉查阅。

## C.6　可信度与引用规则

- 观点的转述只写读到的内容；被截断或读不到的部分，明确标注。
- 业绩数字一律视为自述；能用公式交叉检验的（盈亏比、胜率、总收益、保证金、期望），已在正文里做过，并标注“本书作者核算”。
- 标注“低信任来源”的 X 帖，仅作示例，不作证据。
- 通用金融知识与公式由本书作者讲解，不归属于任何帖子。
- 个别条目是 Canvas 汇总笔记（本书前期的研究笔记）给出的摘要，正文已标注。
- 各章的“作者解读”折叠块是本书作者的解读与推演，**不属于任何帖子的观点**；其中的示例数字若标注“虚构”或“示例”，则不是来自任何来源，也不是真实数据；用公式或模拟得出的数字（“本书作者计算/模拟”）可以复算，但依赖所述的假设。

## C.7　已知限制

1. 样本偏向“有讨论的话题”，幸存者偏差严重；
2. 无法核实任何账户或代码；
3. 英文社区为主，不代表中文社区与机构内部实践；
4. 早期帖子反映的是当时的市场结构；
5. 本书不构成投资建议。
