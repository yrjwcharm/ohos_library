# 测试提示词
"CppCrash"、"Native 崩溃"、"SIGSEGV"、"SIGABRT"、"SIGILL"、"SIGBUS"、"空指针崩溃" 
## 基础功能测试
标准输入可以为：请使用hmos-cppcrash-analysis skill，分析 Native 崩溃日志：cppcrash.log，并结合符号文件目录：symbols/

### 测试场景 1：[crash测试案例分析]
**提示词** CppCrash

**预期输出**：
Agent 将自动命中 hmos-cppcrash-analysis skill 技能
