## 2. 全局接口未通过 UIContext 调用

AI 倾向直接使用全局接口，忽略 UIContext 要求。

| ❌ AI 常见错误 | ✅ 正确写法 | 规则章节 |
|--------------|-----------|---------|
| `AlertDialog.show({ ... })` | `this.getUIContext().showAlertDialog({ ... })` | 规则第19节 UIContext替换全局接口 |
| `router.pushUrl({ url: '...' })` | `this.getUIContext().getRouter().pushUrl({ url: '...' })` | 规则第19节 UIContext替换全局接口 |
| `promptAction.showToast({ ... })` | `this.getUIContext().getPromptAction().showToast({ ... })` | 规则第19节 UIContext替换全局接口 |
| `let px = vp2px(20)` | `let px = this.getUIContext().vp2px(20)` | 规则第19节 UIContext替换全局接口 |
| `animateTo({ ... }, () => { ... })` | `this.getUIContext().animateTo({ ... }, () => { ... })` | 规则第19节 UIContext替换全局接口 |

**根因**：AI 训练数据中直接调用全局接口的示例很多，且语法上不报错但在多实例场景会出问题。
