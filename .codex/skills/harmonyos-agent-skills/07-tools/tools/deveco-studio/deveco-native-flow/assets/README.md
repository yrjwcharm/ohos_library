# deveco-native-flow

三端一致开发流水线（HarmonyOS/Android/iOS）：analyse → plan → coding → build → verify。
自包含：内嵌 HarmonyOS ArkTS 知识路由，无需外部 skill 依赖。
支持正向开发和翻译开发两种模式。

执行流程：
1. 自动检测项目类型和平台
2. 执行 analyse 阶段生成跨端技术方案（读取 references/native-analyse/SKILL.md）
3. 逐端执行 plan 阶段生成实施计划（读取 references/native-plan/SKILL.md）
4. 逐端执行 coding 阶段完成编码（读取 references/native-coding/SKILL.md）
5. 构建验证 + UI 验证

Triggers: 三端开发, native pipeline, deveco pipeline, cross-platform, 跨端开发, 技术方案, 实施计划, 编码实施
