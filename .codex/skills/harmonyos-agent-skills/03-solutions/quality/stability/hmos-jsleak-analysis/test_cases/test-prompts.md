# 测试提示词
"内存泄漏"、"rawheap"、"heapsnapshot"、"Retainer Chain"、"Retained Size"、"GC Root"
## 基础功能测试
标准输入可以为：请使用hmos-jsleak-analysis skill，分析内存快照：xx.rawheap 或 xx.heapsnapshot

也可以直接提供 heap_cluster 已聚类完成的报告文本或文件。当用户输入包含 "内存泄漏"、"rawheap"、"heapsnapshot"、"Retainer Chain"、"Retained Size"、"GC Root" 等关键字，或上传 .rawheap / .heapsnapshot 文件时，Agent 将自动命中 hmos-jsleak-analysis 技能
### 测试场景 1：[内存泄漏测试案例分析]
**提示词** rawheap

**预期输出**：
Agent 将自动命中 hmos-jsleak-analysis 技能
