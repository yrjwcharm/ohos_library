## 10. 对话框与半模态约束

| 规则 | 说明 |
|------|------|
| 多弹窗堆叠 | 多个弹窗按**后弹优先**原则堆叠，退出时从高到低 |
| 系统弹窗阻塞自定义弹窗 | 系统弹窗显示时，**非系统弹窗显示接口被阻塞**（如 promptAction.openCustomDialog、CustomDialogController.open） |
| 不建议后台弹窗 | 应用**不在前台时**不建议调用弹窗显示接口 |
| bindSheet onWillDismiss | 声明后**所有关闭操作**（滑动、关闭按钮、遮罩点击、下拉）必须通过 `dismiss()` 调用处理，否则**无法关闭** |
| bindSheet UIExtension 限制 | Sheet 内嵌入 UIExtension 时，**不支持**在 UIExtension 内再启动额外的 sheet/dialog |
| bindSheet 悬停避让限制 | 悬停/中轴避让**不支持**子窗口模式（showInSubWindow 为 true 时） |
| CustomDialogController | 从 API version 12 开始**不推荐使用**，建议使用 promptAction.openCustomDialog |

---
