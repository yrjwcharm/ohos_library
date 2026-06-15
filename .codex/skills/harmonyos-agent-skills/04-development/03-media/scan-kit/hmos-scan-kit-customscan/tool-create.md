# 阶段2.1 工具类文件复制/合并 - Subagent Task Prompt

## 任务概述

调用 4 个 subagent，从示例代码目录复制/合并工具类文件到目标项目，支持智能合并已存在的文件。

---

## 主 Agent 协调逻辑

1. 同时启动 SA1、SA2、SA3、SA4 四个 subagent
2. 等待所有 subagent 完成
3. 汇总结果:
   - 如果有 FAILED: 重新派发失败任务
   - 如果有 MERGED: 对比标记为 MERGED 的修改后文件和示例代码里的源文件，检查是否有功能遗漏，如果有遗漏进行修补
   - 全部成功: 继续 *阶段2.2 资源文件复制*

---

## Subagent 通用 Prompt 模板

```
你是文件复制/合并任务执行器，需要执行把指定文件从源目录复制到目标目录的任务。

源目录: references/samples/samplecode/ets/{文件子目录/文件名}
目标目录: {检测到的项目ets目录}/{文件子目录/文件名}

需要复制/合并的文件:
{files_list}

执行步骤:
1. 对每个文件，检查目标路径是否已存在
2. 不存在: 使用 cp 命令直接复制
3. 已存在: 读取源文件和目标文件，理解后智能合并（保留目标已有代码，补充缺失内容）
4. 输出结果

合并规则：
1. 在原始的目标文件的基础上进行增量修改
2. 源文件中引用的依赖、实现的代码功能 *必须* 全部添加到目标文件中
3. 检查是否存在遗漏未添加的功能代码

输出格式:
SUCCESS: filename1, filename2
FAILED: filename1 (失败原因)
MERGED: filename1
```

**变量替换**：
- `{files_list}`: 由主 agent 动态填充为具体文件列表

---

## 4个 Subagent 需要处理的文件列表

| Subagent | 文件列表 |
|----------|----------|
| SA1 | constants/BreakpointConstants.ets<br>constants/CommonConstants.ts |
| SA2 | model/BreakpointType.ets<br>model/CommonEventManager.ets<br>model/PromptTone.ets<br>model/VibrateHelper.ts<br>model/OpenPhoto.ets<br>model/UIContextSelf.ets<br>model/DeviceService.ets |
| SA3 | viewModel/XComponentService.ets<br>viewModel/WindowService.ets<br>viewModel/ScanLayout.ets<br>viewModel/ScanService.ets |
| SA4 | view/CommonCodeLayout.ets<br>view/ScanBottom.ets<br>pages/CustomScanPage.ets<br>entryability/EntryAbility.ets<br>utils/Logger.ts |
