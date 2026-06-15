---
name: hmos-jsleak-analysis
description: DFX Skills，分析 rawheap / heapsnapshot 聚类后的内存对象数据，识别疑似内存泄漏。当用户提供 .rawheap 文件、.heapsnapshot 文件、堆内存聚类报告、heap_cluster.mjs 输出结果，或询问"哪些对象在泄漏""哪些对象没有释放""分析这份内存报告""帮看下内存泄漏""为什么内存涨这么多"时，必须使用此技能。即使用户只贴出一段包含"引用链 / Retainer Chain / Retained Size / 聚类 / GC Root"的报告或表格，也应立即触发此技能。技能内置 rawheap_translator 与 heap_cluster 聚类脚本，能先把 .rawheap 转成 .heapsnapshot，再处理 .heapsnapshot 原始文件，并按 Detached、全局引用、闭包、异常大小四类规则进行根因定位，输出结构化的泄漏嫌疑清单。
metadata:
   author: Huawei Reliability Technology Lab
   version: 1.0.0
---

# JSLeak Analysis

针对 rawheap / heapsnapshot 内存对象数据进行内存泄漏定位。技能既能处理 .rawheap 原始文件（先自动转换为 .heapsnapshot），也能处理 .heapsnapshot 原始文件（自动调用内置聚类脚本），还可以直接分析已经聚类好的报告文本。

---
 
 
### 排序与展示
- 嫌疑对象按 Retained Size **从大到小**
- 输出完整详情（引用链 + 根因 + 建议）
- 不得截断，所有嫌疑对象都要出现
 
---

## Step -1 — rawheap 前置转换（仅当输入是 .rawheap 文件时）

如果用户提供的是 `.rawheap` 文件，必须先调用对应系统目录中的 `rawheap_translator`，将 rawheap 转换为 `.heapsnapshot`，再继续执行后续 heapsnapshot 聚类与泄漏分析流程。

转换工具路径：
- Windows: `scripts/windows/rawheap_translator.exe`
- Linux: `scripts/linux/rawheap_translator`
- MacOS ARM64: `scripts/macos/rawheap_translator_arm64`
- MacOS X64: `scripts/macos/rawheap_translator_x64`

解析命令示例：

```bash
# Windows: 打开 cmd 并进入 rawheap 文件路径，指定在当前路径下生成 heapsnapshot 文件
${SKILL_DIR}/scripts/windows/rawheap_translator.exe memleak-js-com.example.myapplication-7979-7979-20241215191332.rawheap myapplication-7979-7979.heapsnapshot

# Linux: 进入 rawheap 文件路径，指定在当前路径下生成 heapsnapshot 文件
${SKILL_DIR}/scripts/linux/rawheap_translator memory_leak/memleak-js-com.example.myapplication-7979-7979-20241215191332.rawheap myapplication-7979-7979.heapsnapshot

# MacOS: 根据 CPU 架构选择 arm64 或 x64 工具，指定在当前路径下生成 heapsnapshot 文件
${SKILL_DIR}/scripts/macos/rawheap_translator_arm64 memory_leak/memleak-js-com.example.myapplication-7979-7979-20241215191332.rawheap myapplication-7979-7979.heapsnapshot
${SKILL_DIR}/scripts/macos/rawheap_translator_x64 memory_leak/memleak-js-com.example.myapplication-7979-7979-20241215191332.rawheap myapplication-7979-7979.heapsnapshot
```

转换完成后，将生成的 `.heapsnapshot` 作为 Step 0 的输入继续分析。最终报告的 `输入` 字段需要标明原始 `.rawheap` 文件以及转换后的 `.heapsnapshot` 文件。

## Step 0 — heapsnapshot 预处理（仅当输入是 .heapsnapshot 文件时）

技能内置聚类脚本：`scripts/windows/heap_cluster.exe`。直接调用它把原始快照转成结构化聚类报告。

```bash
# 单文件模式
${SKILL_DIR}/scripts/windows/heap_cluster.exe <input.heapsnapshot>

# 或指定输出目录
${SKILL_DIR}/scripts/windows/heap_cluster.exe <input.heapsnapshot> <output_dir>
```

## Step 1 — 数据校验

确认聚类数据包含以下关键字段（缺失任一项要先告知用户）：
- 对象名称 / 类型
- 引用链（对象的路径 -> GC Root）
- Retained Size
- 数量 / Distance（可选但重要）

## Step 2 — 规则

关注 Detached DOM: 如果对象名称或种类包含 "Detached"，且 Retained Size 较大，且被 JS 引用（非 WeakMap），极大概率是泄漏。
关注全局引用: 检查引用链的根节点（GC Root）。如果引用链起始于 window, Global, 或意外的长生命周期缓存（Cache, Map），且对象本应是短生命周期的，标记为泄漏。
关注闭包 (Closures): 如果引用链中包含 context 或 system / Context，且持有了大量不该存在的对象，可能是闭包泄漏。

## Step 3 — 故障模式分类（必做）
 
**每一个被识别为泄漏嫌疑的对象都必须从故障模式库中匹配一个编号**。这一步是强制的，不能跳过。
 
读取参考文件:
- `references/fault-modes.md`
- `references/ArkTS_OOM_故障模式库.md`
 
匹配方法（按 distance=1 节点名识别根节点类型）：
 
| distance=1 节点名特征 | 故障模式 | 责任侧 |
|----------------------|---------|--------|
| `SourceTextModule` / `Source_Text_Module_Record` / `global_env` / `GlobalEnv` | **** ROOT_VM | ArkTS |
| 含 `Frame` / `StackFrame` 字样 | **** ROOT_FRAME | ArkTS |
| 含 `LocalHandle` 字样 | **** ROOT_LOCAL_HANDLE | Native |
| 含 `GlobalHandle` / `Reference` / `napi_ref` 字样 | **** ROOT_GLOBAL_HANDLE | Native |
| 以上都不匹配 | **Unknown** | 待确认 |
 
匹配规则：
1. 优先看引用链最右侧 (GC Root 端) 的 distance=1 节点
2. 若 distance=1 节点信息不足，沿引用链向 root 方向查找特征节点
3. 仍无法匹配则标 FM-Unknown，并在根因分析中说明原因（通常是当前快照尚不支持 ROOT 标签）
4. 在最终报告中**每个嫌疑对象都必须输出 `故障模式`字段**

### Root 类型定义（生成根因/建议时必须正确引用）
**VM_Root**
指该root对象为虚拟机内部创建，无法删除，建议断开引用关系解决内存泄漏 
**LocalHandleRoot** 
指该对象在napi侧被napi_value持有，由napi_open_scope和napi_close_scope管理
**GlobalHandleRoot**
指该对象在napi侧被napi_create_reference创建的napi_ref持有

---
 
## Step 4 — 输出结构化报告
**注意** 
```
========================================
  内存泄漏分析报告
========================================

输入: <数据来源描述，如"xxx.heapsnapshot (经 heap_cluster.mjs 聚类)">
扫描对象数: <N>
嫌疑对象数: <M>
**注意** 
LocalHandleRoot，GlobalHandleRoot是虚拟节点，仅作标识符，不作为GC ROOT
----------------------------------------
🔴 泄漏嫌疑 - 业务对象
----------------------------------------

[#Top1] <对象名称><给出完整对象名称不要省略行号>
     对象分类: 业务对象
     大小:   <Retained Size>
     数量:   <count>
	 故障模式:    (名称)
     
     引用链<给出完整对象名称不要省略行号>:
       ⬤ <leaf 完整名>
         ├▶ <中间节点 1 完整名>
         ├▶ <中间节点 2 完整名>
         └▶ <root 完整名>

	
     根因分析:
       <解释为什么这是泄漏，引用链中的可疑节点是哪个>
	   1. 对象本质:
          <这个对象是什么？业务用途？属于哪个模块？属于哪个文件哪一行？>
       2. 持有路径分析:
          <逐跳分析引用链：每一层是谁、扮演什么角色、是否是关键持有者>
          <找出"决定性的那一跳" — 即如果断开这一跳，对象就可被回收>
     修复建议:
       <1-3 条具体建议>

[#Top2] <对象名称>
     对象分类: 业务对象
     大小:   <Retained Size>
     数量:   <count>
	 故障模式:    (名称)
	 
     引用链<给出完整对象名称不要省略行号>:
       ⬤ <leaf 完整名>
         ├▶ <中间节点 1 完整名>
         ├▶ <中间节点 2 完整名>
         └▶ <root 完整名>

	
     根因分析:
       <解释为什么这是泄漏，引用链中的可疑节点是哪个>
	   1. 对象本质:
          <这个对象是什么？业务用途？属于哪个模块？属于哪个文件哪一行？>
       2. 持有路径分析:
          <逐跳分析引用链：每一层是谁、扮演什么角色、是否是关键持有者>
          <找出"决定性的那一跳" — 即如果断开这一跳，对象就可被回收>
     修复建议:
       <1-3 条具体建议>

----------------------------------------
🔴 泄漏嫌疑 - 公共对象
----------------------------------------

[#Top1] <对象名称><给出完整对象名称不要省略行号>
     对象分类: 公共对象
     大小:   <Retained Size>
     数量:   <count>
	 故障模式:    (名称)
     
     引用链<给出完整对象名称不要省略行号>:
       ⬤ <leaf 完整名>
         ├▶ <中间节点 1 完整名>
         ├▶ <中间节点 2 完整名>
         └▶ <root 完整名>

	
     根因分析:
       <解释为什么这是泄漏，引用链中的可疑节点是哪个>
	   1. 对象本质:
          <这个对象是什么？公共容器/系统对象/框架对象的类型？它持有了哪些业务对象？>
       2. 持有路径分析:
          <逐跳分析引用链：每一层是谁、扮演什么角色、是否是关键持有者>
          <找出"决定性的那一跳" — 即如果断开这一跳，对象就可被回收>
     修复建议:
       <1-3 条具体建议>

[#Top2] <对象名称>
     对象分类: 公共对象
     大小:   <Retained Size>
     数量:   <count>
	 故障模式:    (名称)
	 
     引用链<给出完整对象名称不要省略行号>:
       ⬤ <leaf 完整名>
         ├▶ <中间节点 1 完整名>
         ├▶ <中间节点 2 完整名>
         └▶ <root 完整名>

	
     根因分析:
       <解释为什么这是泄漏，引用链中的可疑节点是哪个>
	   1. 对象本质:
          <这个对象是什么？公共容器/系统对象/框架对象的类型？它持有了哪些业务对象？>
       2. 持有路径分析:
          <逐跳分析引用链：每一层是谁、扮演什么角色、是否是关键持有者>
          <找出"决定性的那一跳" — 即如果断开这一跳，对象就可被回收>
     修复建议:
       <1-3 条具体建议>

========================================
  总结
========================================
故障模式分布:
  (ROOT_VM):           N 个,  X.X MB
  (ROOT_FRAME):        N 个,  X.X MB
  (LOCAL_HANDLE):      N 个,  X.X MB
  (GLOBAL_HANDLE):     N 个,  X.X MB
   Unknown:                N 个,  X.X MB

主要泄漏来源:
  1. <一句话描述最严重的泄漏模式>
  2. <第二严重>
  ...

最严重泄漏根因:
  依据: <按 Retained Size 最大的泄漏嫌疑对象确定>
  一级根因: <从 ArkTS_OOM_故障模式库.md 中匹配，如 ArkTS OOM>
  二级根因: <根据最严重对象的 distance=1 根节点/持有类型匹配，如 VMRoot 类型根节点持有 / HandleRoot - GlobalHandle 类型根节点持有 / 一次性分配超大对象导致 OOM>
  三级根因: <根据引用链、对象属性名、文件名、调用栈或 Error message 匹配到的具体三级根因；若无法匹配，写“未明确匹配”并说明缺失证据>

建议优先排查:
  • <按优先级列出的修复路径>

```
