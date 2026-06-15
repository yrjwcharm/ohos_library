---
name: hmos-apifault-analysis
description: DFX Skills，定位开发者问题。当用户输入错误码、错误信息、错误日志、执行失败或需要定位问题时使用。
metadata:
   author: Huawei Reliability Technology Lab
   version: 1.0.0
---
# 问题定位 Skill

帮助开发者诊断问题的 Agent Skill。接收问题描述和故障日志，通过环境发现 + 项目代码分析 + 两阶段分级诊断，输出结构化诊断报告。

本 Skill 适用于 DevEco Studio CodeGenie 环境。知识库内嵌于 `references/knowledge/`，通过 CodeGenie 内置工具执行诊断。

## 可用工具

本 Skill 使用 CodeGenie 内置工具，优先级如下：


| 优先级 | 工具                          | 用途                                                        |
| ------ | ----------------------------- | ----------------------------------------------------------- |
| 1      | `builtin_read_file`           | 读取文件内容，支持分页（offset/limit）处理大文件            |
| 1      | `builtin_write_file`          | 创建新文件或覆盖写入文件（诊断报告）                        |
| 1      | `builtin_edit_file`           | 精确替换文件中的文本内容                                    |
| 1      | `builtin_glob`                | 按 glob 模式查找文件（如`**/*.ets`）                        |
| 1      | `builtin_grep`                | 按正则表达式搜索文件内容，可配合 glob 过滤                  |
| 1      | `builtin_web_rag`             | 查询官方文档、ArkTS 语法、API 用法               |
| 2      | `builtin_execute_command`     | 执行命令行（hdc、python、mkdir、date、curl），**30 秒超时** |
| 2      | `builtin_check_editor_errors` | 检查指定文件的语法错误和代码问题                            |
| 3      | `builtin_write_todo`          | 创建和管理结构化任务列表                                    |

**工具选择原则：**

- 文件读写/搜索 → 优先用 `builtin_*` 工具
- 文档查询 → `builtin_web_rag`
- 系统命令（hdc、python） → `builtin_execute_command`（注意 30 秒超时）
- Gitee 代码仓原始文件 → `builtin_execute_command` + `curl`（`builtin_web_rag` 覆盖不到时）

## 参数


| 参数                  | 必填 | 说明                                             |
| --------------------- | ---- | ------------------------------------------------ |
| `problem_description` | 是   | 开发者对问题的文字描述                           |
| `log_content`         | 否   | 故障日志原文（hilog、HiviewDFX crash/freeze 等） |
| `log_content_file`    | 否   | 日志文件路径（当日志较长时优先于`log_content`）  |
| `code_snippet`        | 否   | 相关代码片段                                     |

## 参考文件

- 日志解析模式参考：`references/log_patterns.md`
- 模块映射表参考：`references/module_mapping.md`（含代码仓/文档仓 URL）
- 知识库：`references/knowledge/{module_name}/`（error_codes.json、api_chain.json、common_issues.md、overview.md、scenario_logs.json、file_corruption_patterns.md）
- 媒体文件分析脚本：`references/scripts/media_file_analyzer.py`
- hilog 日志采集脚本：`references/scripts/hilog_collector.py`

## 执行阶段

按顺序执行以下阶段。

### 阶段 0：环境发现

**目标：** 确定项目根目录、SDK 路径，发现 hilogtool，创建输出目录。

1. **确定项目根目录**：当前工作目录即为项目根目录。通过 `builtin_read_file` 读取 `local.properties`，提取 `sdk.dir=` 行获取 SDK 路径。若文件不存在或无 `sdk.dir`，尝试 `builtin_read_file` 读取 `build-profile.json5` 获取 API 版本信息。若均不可用，在对话中询问用户 SDK 路径。
2. **创建输出目录**：使用 `builtin_execute_command` 执行 `New-Item -ItemType Directory -Force -Path diagnosis | Out-Null`，在项目根目录下创建诊断报告输出目录。
3. **发现 hilogtool**：在 SDK 路径下查找 `hilogtool`，用于解析二进制 hilog 日志：

   - 路径：`{sdk_path}/hms/toolchains/hilogtool.exe`
   - 备选路径：`{sdk_path}/default/hms/toolchains/hilogtool.exe`
   - 使用 `builtin_execute_command` 执行 `Test-Path "{路径}"` 检查文件是否存在
   - 若找到：记录 `hilogtool_path`（完整路径）
   - 若未找到：记录 `hilogtool_path = null`，后续日志采集将使用 gzip 降级方案
4. **记录路径**：`project_root`（当前工作目录）、`sdk_path`（SDK 路径）、`hilogtool_path`（hilogtool 完整路径或 null）、`output_dir`（`diagnosis/`）。

### 阶段 1：线索提取与模块识别

**目标：** 从输入中提取所有可用线索，识别涉及的模块。

1. **解析输入**：根据输入类型采用不同解析策略：

   - 若有 `log_content_file`：先使用 `builtin_read_file` 读取该文件（大文件使用 offset/limit 分页），再按 `references/log_patterns.md` 中定义的格式解析
   - 若有 `log_content`（无 `log_content_file` 时）：按 `references/log_patterns.md` 解析，提取错误码、事件名、DOMAIN、调用栈（含 .so 库名）、hilog domain_id
   - 若仅有 `problem_description`：提取错误码数字、API 名称、功能关键词、错误现象描述
   - 若有 `code_snippet`：提取涉及的 API 调用和错误处理逻辑
2. **模块识别**：使用 `builtin_read_file` 读取 `references/module_mapping.md`，用提取的线索匹配模块：

   - 按错误码前缀匹配（如 6600xxx → multimedia_av_session）
   - 按 DOMAIN 标识匹配（如 AAFWK → ability 相关）
   - 按 .so 库名匹配（如 libavsession.so → multimedia_av_session）
   - 按 API 名称前缀匹配（如 avsession.create* → multimedia_av_session）
   - 按 hilog domain_id 匹配
3. **线索汇总**：将所有提取的线索以结构化格式记录：

   ```
   clues = {
     error_codes: [],
     event_names: [],
     domains: [],
     call_stack_highlights: [],
     so_libraries: [],
     modules: [],
     api_names: [],
     hilog_domain_ids: [],
   }
   ```
4. **状态机转换序列追踪**（日志分析时必须执行）：

   - 当日志中包含 `stateChange`、`reset`、`stop`、`prepare` 等状态相关事件时，按时间轴排列所有状态转换事件
   - 计数关键操作（如 reset、stop、prepare）的调用次数
   - 标记状态转换异常：如连续多次 reset、在已停止状态下再次 stop 等
   - 将状态转换时间线记录到 `clues` 中（新增字段 `state_transitions`）
5. **模块识别失败处理**：若所有线索均无法匹配到已知模块，标注 `module_identified = "未识别"`。
6. **日志采集与解析**（**强制执行，不可跳过**）：日志是诊断的核心依据，必须优先获取和解析。**除非用户明确要求跳过日志采集，否则必须执行本步骤，不得以任何理由省略**（包括但不限于：模块未识别、问题描述看似简单、用户未提供日志等）。按以下优先级获取：

   **优先级 1 — 使用用户提供的日志**：若已有 `log_content` 或 `log_content_file`，直接使用，跳过采集步骤。

   **优先级 2 — 通过 hdc 读取设备落盘日志**：若无用户提供的日志，按以下流程获取设备落盘日志。

   **步骤 A — 使用脚本采集并解析设备落盘日志**：

   执行 `references/scripts/hilog_collector.py` 脚本，自动完成设备日志拉取和解析：

   ```
   builtin_execute_command: python "{skill_dir}/references/scripts/hilog_collector.py" --output-dir diagnosis {若 hilogtool_path 不为 null 则添加: --hilogtool "{hilogtool_path}"} --time-window 10
   ```

   参数说明：

   - `--hilogtool`：阶段 0 发现的 hilogtool 路径。若 `hilogtool_path` 为 null，省略此参数，脚本将使用 gzip 降级方案
   - `--time-window`：筛选创建时间在指定分钟数以内的日志文件

   脚本输出 JSON 结果到 stdout：

   - `status`：`success`（成功）、`no_logs`（设备无日志）、`no_device`（设备未连接）、`error`（错误）
   - `parsed_files`：解析后的文本文件路径列表（按时间从旧到新排序）
   - `hilogtool_used`：是否使用了 hilogtool

   **脚本执行后，使用 `builtin_read_file` 按 `parsed_files` 列表顺序（从旧到新）逐个读取解析后的日志文件，执行问题相关性检查：**

   **时间顺序判断**：`parsed_files` 列表已按文件名时间戳从旧到新排序。文件名中包含时间戳（格式如 `hilog.305.20260524-152948.log` → `2026-05-24 15:29:48`，设备本地时间）。skill 按列表顺序从旧到新逐个读取和分析。

   * **精确匹配**：在日志中搜索 `clues.error_codes`、`clues.api_names`、`clues.so_libraries`、`clues.domains` 中的已知值
   * **模糊匹配**：在 hilog Error/Fatal 行中搜索 `problem_description` 提取的功能关键词
   * **崩溃标记**：检查是否包含 `Generated by HiviewDFX@OpenHarmony`

   **若 status 为 no_device 或 error**：在诊断报告中标注"hdc 日志采集失败（{message}）"，继续后续阶段。
   **若 status 为 no_logs**：进入步骤 B 开启落盘。
   **若 hilogtool_used 为 false**：在诊断报告中注明"hilogtool 不可用，日志可能包含乱码"。

   **步骤 B — 无落盘日志时，开启落盘并等待用户触发：**

   若步骤 b 中目录为空或不存在：

   a. 执行以下命令开启日志落盘（单文件 5M，最大 10 个文件，zlib 压缩）：

   ```
   builtin_execute_command: hdc shell "hilog -w start -f diag -l 5M -n 10 -m zlib -j 11"
   ```

   b. **立即中断当前执行**，向用户输出以下提示（不生成诊断报告）：

   > 日志落盘已开启。请在设备上操作触发错误，完成后回复 **"OK"** 继续诊断。
   >

   c. **当用户回复"OK"后**，停止落盘并拉取日志：

   i. 停止落盘：

   ```
   builtin_execute_command: hdc shell "hilog -w stop -j 11"
   ```

   ii. 重新执行步骤 A 的脚本命令拉取并解析新生成的日志文件，然后按步骤 A 相同规则执行问题相关性检查。

   **采集失败处理**：

   - 若 hdc 命令执行失败（设备未连接、hdc 不可用等），在诊断报告中标注"hdc 日志采集失败（{失败原因}）"，继续后续阶段

   **关键注意事项：**

   - **日志采集脚本**：`references/scripts/hilog_collector.py`，封装了设备检查、文件拉取、hilogtool/gzip 解析。脚本仅负责拉取和解析，不合并、不做相关性检查，由 skill 按时间顺序逐个读取和分析
   - **文件名时间戳**：日志文件名包含创建时间（如 `hilog.305.20260524-152948` → `2026-05-24 15:29:48`），脚本按此筛选最近 10 分钟的文件。`parsed_files` 列表按时间从旧到新排序，skill 按此顺序读取
   - **降级方案**：若 `hilogtool_path` 为 null（`--hilogtool` 参数未提供），脚本使用 gzip 解压。此时日志可能为乱码，在诊断报告中注明
   - **落盘命令参考**：`hilog -w start -f diag -l 5M -n 10 -m zlib -j 11`（单文件 5M，最大编号 10，zlib 压缩，任务 ID 11）
   - **停止落盘**：`hilog -w stop -j 11`（任务 ID 需与开启时一致）
   - **用应用名过滤而非 PID**：PID 每次启动会变，应用名更稳定。多媒体框架错误日志来自媒体服务进程（通常 PID 737），不在 app 进程中
   - **python 命令优先**：Windows 环境下 `python3` 可能不可用（返回非零退出码），应优先使用 `python`，失败时再尝试 `python3`
   - **问题相关性检查**：有用性判定基于步骤 1-5 提取的 `clues`（错误码、API 名称、模块、.so 库等），确保读取的日志与用户报告的具体问题相关，而非泛泛匹配任何错误

### 阶段 2：分诊查询

**目标：** 快速查询知识库和文档，评估是否可以直接给出诊断。

#### 2.1 知识库查询

若阶段 1 识别到了模块，使用 `builtin_read_file` 读取 `references/knowledge/{module_name}/` 下的文件：

1. **错误码精确匹配**：读取 `error_codes.json`，按提取到的错误码查找匹配项
2. **API 调用链匹配**：读取 `api_chain.json`，按提取到的 API 名称查找调用链
3. **常见问题匹配**：读取 `common_issues.md`，搜索与问题现象匹配的模式
4. **故障场景案例匹配**：若 `references/knowledge/{module_name}/` 下存在 `scenario_logs.json`，使用 `builtin_grep` 按错误码查找匹配的故障场景案例：
   - 按错误码（expectedCode 字段）精确匹配或模糊匹配
   - 提取匹配场景的日志特征（keyLogLines 中的日志模式），与用户提交的日志进行模式比对
   - 参考场景描述（scenario 字段）辅助理解故障上下文
5. **额外知识文件搜索**：使用 `builtin_glob` 列出 `references/knowledge/{module_name}/` 下所有文件，对非标准文件使用 `builtin_grep` 执行关键词搜索

#### 2.1.6 媒体文件分析（条件执行）

**触发条件：** 错误码包含 5400103、5400106 或 5400102（仅当日志涉及文件路径/URI 时）

**参考文件：** `references/knowledge/multimedia_player_framework/file_corruption_patterns.md`

1. **确认文件路径**：

   - 若 `problem_description` 或 `code_snippet` 中包含可识别的媒体文件路径 → 使用提取的路径
   - 从问题描述提取文件名 → `builtin_glob` 在项目目录搜索：`**/*{filename}*`
   - 无明确文件名 → `builtin_glob` 搜索项目中的媒体文件：`**/*.{mp4,mkv,ts,m4a,aac,mp3,flac,wav,ogg,amr}`
   - 搜索结果多于一个 → 在对话中询问用户确认具体文件
   - 无文件路径且搜索无结果 → 在对话中询问用户提供媒体文件路径
   - 用户无法提供 → 跳过本步骤，在诊断结果中标注"未执行文件分析"
2. **执行文件分析脚本**：

   - 使用 `builtin_execute_command` 运行：
     ```
     python "{skill_dir}/references/scripts/media_file_analyzer.py" --file "{media_file_path}" --json
     ```
   - 若 `python` 不可用则尝试 `python3`，均不可用则降级为基于 `file_corruption_patterns.md` 的手动日志模式匹配
3. **解析脚本结果并交叉验证 hilog**：

   - 解析 JSON 输出中的 `overall_assessment`、`issues`、`error_code_correlation`
   - 同时使用 `builtin_read_file` 读取 `file_corruption_patterns.md` 第 3 节速查表，用阶段 1 提取的 hilog 关键字匹配损坏模式
   - 交叉验证脚本结论与 hilog 模式匹配结果
4. **结果处理**：

   - `unsupported_format` → 直接以高置信度返回结论
   - `likely_corrupt` / `possibly_corrupt` → 将文件损坏作为 rank 1 根因候选
   - `healthy` → 文件无问题，需深入排查其它原因
   - `unknown_format` → 文件可能严重损坏，中置信度
   - `analysis_error` → 文件不可达，中置信度

#### 2.2 文档仓查询

1. **优先使用 builtin_web_rag**：查询官方文档中的错误码说明和相关 API 用法
2. **映射表定位**：若 `references/module_mapping.md` 中有该模块的 errorcode 文档路径，使用 `builtin_execute_command` + `curl` 获取：`curl -sL "https://gitee.com/openharmony/docs/raw/master/{errorcode_path}"`
3. **兜底搜索**：若 builtin_web_rag 和 curl 均未命中，在对话中说明并基于已有信息继续

#### 2.3 置信度评估

**高置信度（直接跳到阶段 4 输出结果）：**

- 找到了模块特定的错误码精确匹配，且知识库或文档提供了充分的排查信息
- 媒体文件分析确认文件为不支持的格式 + 错误码 5400106
- 媒体文件分析确认文件损坏 + 错误码匹配

**低置信度（进入阶段 3 深潜分析）：**

- 仅有通用错误码，无模块特定信息
- 知识库和文档均未提供足够的排查信息
- 模块未识别
- 媒体文件分析显示文件正常 + 错误码 5400103/5400106

**如果置信度为高，直接跳到阶段 4 输出结果。**

### 阶段 3：深潜分析（仅低置信度时执行）

**目标：** 深入分析代码实现和文档，构建完整的证据链。

#### 3.1 API 链路追踪（条件执行）

**仅当模块有知识库时执行。** 使用 `builtin_read_file` 读取 `references/knowledge/{module_name}/api_chain.json`，按调用栈中的 C++ 函数名反向追踪。无知识库的模块跳过此步骤。

#### 3.2 代码仓搜索

1. **范围限定**：使用 `builtin_read_file` 读取 `references/module_mapping.md` 表 6 获取代码仓 URL
2. **搜索策略**：
   - 使用 `builtin_execute_command` + `curl` 从 Gitee 代码仓获取源文件
   - 搜索错误头文件（`*_errors.h`、`*_error_code.h`）获取错误码定义
3. **SDK 声明查询**：使用 `builtin_glob` 在 SDK 路径中搜索相关 `.d.ts` 文件，使用 `builtin_grep` 搜索错误码定义

#### 3.3 项目源码分析

若项目目录下有源码文件，检查相关代码：

1. 使用 `builtin_grep` 搜索与调用栈中 C++ 函数名对应的 ArkTS/TS 代码
2. 对照 `api_chain.json` 检查 API 调用时序是否正确
3. 使用 `builtin_check_editor_errors` 检查相关文件是否有语法错误
4. 检查权限声明与 API 要求是否匹配

#### 3.4 文档深度查询

1. 使用 `builtin_web_rag` 查询开发指南和 FAQ
2. 使用 `builtin_execute_command` + `curl` 读取 Gitee 文档仓的开发指南目录

#### 3.5 证据交叉验证

1. 对比知识库匹配、文档参考、代码分析、项目源码的结果
2. **当不同来源的信息矛盾时，以代码仓实际实现为准**
3. 为每个根因候选构建证据链，标注证据来源
4. 按证据充分程度排序根因候选

#### 3.6 根因层级追溯（必须执行）

**核心原则：不停留在框架机制层，必须追溯到应用行为根因。**

当分析定位到某个框架层的拦截/阻断点时，**必须继续追问**：是什么应用侧操作触发了这个拦截？追溯链路示例：

```
现象：seekDone 回调未送达 JS 层
  <- 框架机制：isloaded_ == false 导致回调被拦截
    <- 为什么 isloaded_ 为 false？因为 ResetTask() 被调用
      <- 为什么 ResetTask 被调用？因为开发者调用了 reset()
        <- 真正的根因：开发者多次调用 reset()
```

**追溯规则：**

- 框架层的防御性代码本身不是 bug，不应作为最终根因
- 最终根因必须是**应用侧的具体操作**
- 在证据链中明确区分"拦截机制"和"触发行为"
- 结合阶段 1 的状态转换时间线确认异常操作

### 阶段 3.5：项目源码分析与修复建议（始终执行）

**目标：** 基于阶段 2/3 的诊断结论，分析项目源码，定位具体代码问题并给出修改建议。

1. **扫描项目源码文件**：使用 `builtin_glob` 按模式搜索源码文件：

   ```
   builtin_glob: **/*.ets
   builtin_glob: **/*.ts
   builtin_glob: **/*.c
   builtin_glob: **/*.cpp
   builtin_glob: **/*.h
   ```

   汇总项目源码文件分布。
2. **读取项目配置**：

   - `builtin_read_file` 读取 `entry/src/main/module.json5`（权限声明）
   - `builtin_read_file` 读取 `build-profile.json5`（SDK 版本）
   - 记录已声明的权限列表、target API 版本
3. **定位问题相关源码**：根据诊断结论中涉及的 API 名称和问题模式，使用 `builtin_grep` 搜索相关代码文件，使用 `builtin_read_file` 读取相关代码段。
4. **源码问题分析**：

   - 对照 `api_chain.json` 检查 API 调用时序是否正确
   - 检查权限声明是否完整（对照 `module.json5`）
   - 使用 `builtin_check_editor_errors` 检查相关源码文件语法问题
   - 结合诊断结论，在源码中定位具体的错误用法（如错误的 fdSrc 参数、缺失的状态检查等）
5. **生成具体修改建议**：针对定位到的代码问题，给出可直接应用的代码修改方案，写入诊断报告的"修复建议"章节。
6. **汇总源码分析结果**：记录到报告中"项目上下文"章节。

### 阶段 4：结果输出

**目标：** 构建诊断报告并写入文件。

1. 使用 `builtin_execute_command` 获取时间戳：`Get-Date -Format 'yyyyMMdd_HHmmss'`
2. 使用 `builtin_write_file` 将诊断报告写入 `diagnosis/diagnosis_{timestamp}.md`

报告必须严格遵循以下 Markdown 模板：

```markdown
# 问题诊断报告

> 诊断时间：{YYYY-MM-DD HH:mm:ss} | 诊断深度：{triage 或 deep_dive} | 模块：{module_identified}

## 问题摘要

{一句话问题摘要}

---

## 项目上下文

{仅在阶段 3.5 有分析结果时展示本节}

- **项目源码分布**：{各类型文件数量}
- **目标 API 版本**：{从 build-profile.json5 提取}
- **已声明权限**：{从 module.json5 提取的权限列表}
- **相关源码文件**：{定位到的与问题相关的文件路径列表}

---

## 线索提取

| 类别 | 内容 |
|------|------|
| 错误码 | {error_codes；无则写"无"} |
| 事件名 | {event_names；无则写"无"} |
| 模块 | {modules} |
| API | {api_names；无则写"无"} |
| DOMAIN | {domains；无则写"无"} |
| .so 库 | {so_libraries；无则写"无"} |
| hilog domain_id | {hilog_domain_ids；无则写"无"} |

### 调用栈关键行

{- 每条一个列表项；无则写"无"}

### 状态转换时间线

{- 每条一行；无则写"无状态转换事件"}

### 媒体文件分析

{仅在执行了文件分析时展示本小节，否则省略}

- **文件路径**：{file_path}
- **检测格式**：{format_detected}
- **Media Kit 支持**：{supported_by_media_kit}
- **评估结论**：{overall_assessment}
- **发现问题**：{issues 列表；无则写"无"}

---

## 知识库匹配

### {source 文件名}

{content 匹配到的内容摘要}

{多条匹配每条一个 ### 小节；无匹配则写"无知识库匹配"}

## 文档参考

- **{source}**：{relevant_content 摘要} — [链接]({url})
{多条参考分行列出；无参考则写"无文档参考"}

---

## 根因分析

### 候选根因 #{rank}（置信度：{high/medium/low}）

{根因描述，必须追溯到应用侧行为}

**证据：**

{- 每条 evidence 一个列表项}

**证据来源：**

{- 每条 evidence_source 一行，格式：`{type}`: {path}}

{多个根因候选按 rank 顺序排列}

---

## 修复建议

### 针对候选根因 #{for_candidate}

1. {步骤1}
2. {步骤2}
{编号列表}

**参考文档：**

{- 每条 reference 一个 URL 链接}

{多个候选根因的修复建议按 for_candidate 顺序排列}
```

**诊断置信度标准：**

- **high**：有明确的代码位置 + 错误处理逻辑 + 知识库/文档确认
- **medium**：有文档参考或知识库匹配，但缺少代码级确认
- **low**：仅基于推测或间接证据

**关键要求：**

- `diagnostic_depth` 必须准确反映实际执行路径（"triage" 或 "deep_dive"）
- `module_identified` 若阶段 1 未能识别模块，必须为 "未识别"
- 每个根因候选的证据来源必须标注来源类型（knowledge_base / documentation / code）
- 修复建议必须具体、可操作
- **根因必须追溯到应用侧行为**：rank 1 的根因描述中必须包含开发者的具体操作
- Markdown 必须格式完整、各节标题层级清晰
- 若 `media_file_analysis` 未执行，省略该小节
- 若 `project_analysis` 未获取到信息，省略"项目上下文"节
