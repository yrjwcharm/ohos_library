# 测试提示词
"错误码"、"错误信息"、"执行失败"、"接口调用失败"、"定位问题"
## 基础功能测试
标准输入可以为：请使用hmos-apifault-analysis skill，分析故障日志：xx.log 和采样栈：xx
### 测试场景 1：[接口调用失败案例分析]
**提示词** 接口调用失败

**预期输出**：
Agent 将自动命中 hmos-apifault-analysis 技能
