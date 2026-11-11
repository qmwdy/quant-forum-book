# 附录 A　术语表（中英对照）

按英文字母顺序。解释为简短的本书作者释义，非任何帖子的原文。

| 英文 | 中文 | 简释 |
|---|---|---|
| 0DTE (zero days to expiration) | 当日到期期权 | 到期日就是今天的期权；gamma 与 theta 极大 |
| Adverse selection | 逆向选择 | 限价单被知情交易者“挑走”的风险 |
| Alpha / edge | 超额收益 / 优势 | 扣除风险暴露后的收益来源；“edge”更口语 |
| Alpha decay | Alpha 衰减 | 策略因拥挤、成本或制度变化而逐渐失效 |
| Arbitrage | 套利 | 无风险（或近似无风险）的价差获利 |
| ATR (average true range) | 平均真实波幅 | 常用的波动率指标 |
| Backtest | 回测 | 用历史数据检验策略 |
| Beta | 贝塔 | 对基准的敏感度；也指“收益里有多少来自市场” |
| Bid / Ask / Mid | 买价 / 卖价 / 中间价 | 回测里用 mid 成交是常见的乐观假设 |
| Black–Scholes–Merton (BSM) | 布莱克–斯科尔斯–默顿模型 | 经典期权定价模型 |
| Breakeven win rate | 盈亏平衡胜率 | 使期望为零所需的胜率 |
| Butterfly / Iron butterfly | 蝶式 / 铁蝶 | 由多个期权腿组成的有限风险结构 |
| Calendar spread | 日历价差 | 同一行权价、不同到期日的买卖组合 |
| Calibration | 校准 | 使模型价格匹配市场价格的参数拟合 |
| Capacity | 容量 | 策略能容纳的资金规模 |
| Circuit breaker | 断路器 | 亏损触及阈值时自动停机的机制 |
| Cointegration | 协整 | 多个非平稳序列的线性组合平稳；配对交易的基础 |
| Conversion / Reversal | 转换 / 逆转 | 利用 put-call parity 锁定定价偏差的套利 |
| Covered call | 备兑看涨 | 持股并卖出看涨期权 |
| Credit spread | 信用价差 | 卖出近价期权、买入远价保护腿，净收权利金 |
| Curve fitting / Overfitting | 曲线拟合 / 过拟合 | 参数对历史噪声过度适配 |
| Dealer gamma exposure (GEX) | 做市商 gamma 暴露 | 由持仓量与假设推算的做市商净 gamma |
| Delta | 德尔塔 | 期权价格对标的价格的一阶敏感度 |
| Delta hedging | Delta 对冲 | 用标的对冲期权的 delta 暴露 |
| Drawdown | 回撤 | 权益从峰值到谷底的下降 |
| DTE (days to expiration) | 剩余到期天数 |  |
| Effective spread | 有效价差 | 价差加上费用等实际交易成本 |
| Expectancy | 期望值 | 每笔交易的平均盈亏 |
| Fat tail / Leptokurtic | 厚尾 / 尖峰 | 极端事件概率高于正态分布 |
| Fill | 成交 |  |
| Fill-forward | 向前填充 | 无数据时重复上一个价格/K 线 |
| Frequent batch auction | 频繁批量拍卖 | 以离散时间的拍卖代替连续撮合 |
| Gamma | 伽马 | 期权 delta 对标的价格的敏感度 |
| Gamma squeeze | 伽马挤压 | 做市商为对冲 gamma 而被迫追涨/杀跌的循环 |
| Greeks | 希腊字母 | 期权价格的各种敏感度 |
| HFT (high-frequency trading) | 高频交易 | 对延迟极端敏感的自动化交易 |
| Hit the bid / Lift the offer | 打买价 / 吃卖价 | 以市价卖出（成交于买价）/ 买入（成交于卖价） |
| Implied volatility (IV) | 隐含波动率 | 由期权价格反推的波动率 |
| Information coefficient (IC) | 信息系数 | 预测值与实现值的相关系数 |
| Iron condor | 铁鹰 | 卖出一个宽跨并买入更远的保护腿 |
| Kalman filter | 卡尔曼滤波 | 估计时变参数的递推算法 |
| Kelly criterion | 凯利准则 | 使长期对数增长最大的下注比例 |
| Latency | 延迟 | 信号到成交之间的时间 |
| LEAPS | 长期期权 | 到期日在一年以上的期权 |
| Leverage | 杠杆 |  |
| Limit order / Market order | 限价单 / 市价单 |  |
| Liquidation | 强平 | 券商因保证金不足而平仓 |
| Look-ahead bias | 前视偏差 | 回测中使用了当时不可知的信息 |
| MAE / MFE | 最大不利/有利波动 | 单笔交易期间的最大浮亏/浮盈 |
| Margin call | 保证金追缴 |  |
| Market impact | 市场冲击 | 订单自身推动价格造成的成本 |
| Market maker | 做市商 | 持续报出买卖价、提供流动性的参与者 |
| Martingale | 马丁格尔 | 亏损后加码的下注方式 |
| MBO (market by order) | 逐笔委托数据 | 包含每个委托的订单簿数据 |
| Mean reversion | 均值回归 | 价格偏离均值后回归 |
| Meta-labeling | 元标签 | 在已有策略之上训练过滤器预测交易胜负 |
| Naked option | 裸期权 | 没有保护腿或标的覆盖的卖出期权 |
| NBBO | 全美最佳买卖报价 |  |
| OMS (order management system) | 订单管理系统 |  |
| Overnight gap | 隔夜跳空 | 收盘到次日开盘之间的价差 |
| Payment for order flow (PFOF) | 订单流付款 | 经纪商把订单卖给做市商所获的付款 |
| Pin risk | 钉住风险 | 到期时标的恰好在行权价附近的行权不确定性 |
| Portfolio margin | 组合保证金 | 按组合整体风险计算的保证金 |
| Profit factor (PF) | 盈亏因子 | 总盈利/总亏损 |
| Put–call parity | 看跌–看涨平价 | $C-P=B(F-K)$ 的无套利关系 |
| | Realized volatility (RV) | 已实现波动率 | 由历史价格计算的波动率 |
| Regime | 市场状态 / 制度 | 波动率、趋势等条件相近的市场阶段 |
| Rolling | 滚仓 | 平掉旧合约、同时开新合约 |
| RoMaD | 收益/最大回撤 |  |
| Scalping | 剥头皮 | 追求极小价差的极短线交易 |
| Sharpe ratio | 夏普比率 | 超额收益与波动率之比 |
| Short gamma / Short vega | 做空 gamma / vega | 卖出期权带来的凸性风险 |
| Slippage | 滑点 | 预期价格与成交价之差 |
| Smart order routing (SOR) | 智能订单路由 |  |
| Sortino ratio | 索提诺比率 | 只惩罚下行波动的夏普变体 |
| SPAN | 标准组合风险分析 | 期货/期权保证金方法 |
| Stat arb | 统计套利 | 基于统计关系的相对价值交易 |
| Stationarity | 平稳性 | 统计性质不随时间变化 |
| Stop loss | 止损 |  |
| Straddle / Strangle | 跨式 / 宽跨式 | 同行权价 / 不同行权价的 call 与 put 组合 |
| Survivorship bias | 幸存者偏差 | 只看到存活者所造成的偏差 |
| Tail risk | 尾部风险 | 极端事件带来的损失 |
| Theta | 西塔 | 时间价值衰减速度 |
| Variance risk premium (VRP) | 方差风险溢价 | 隐含方差平均高于已实现方差的部分 |
| Vega | 维加 | 期权价格对波动率的敏感度 |
| Vol surface / Skew | 波动率曲面 / 偏度 | 不同行权价与到期日的 IV 结构 |
| Walk-forward | 前向滚动测试 | 分段训练-测试的样本外检验 |
| Wheel strategy | 轮子策略 | 卖 put → 被行权 → 卖 covered call 的循环 |
