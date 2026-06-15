## 16. 性能与稳定性约束

| 规则 | 说明 |
|------|------|
| **禁止在 build() 的UI描述中改变状态** | 会导致无限重渲染循环或性能下降 |
| 网络图片 syncLoad | 大量网络图片场景，注意 syncLoad 设置，避免同步加载导致卡顿 |
| 注销回调 | 组件销毁时必须**及时注销**事件回调，避免内存泄漏 |
| AnimatorResult 销毁 | 不及时销毁会导致内存泄漏 |
| 长列表优先用 Repeat/LazyForEach | ForEach 在大数据量场景性能差 |
| 组件复用 | 使用 @Reusable/@ReusableV2 配合 LazyForEach 实现节点复用 |
| @Track 精准更新 | 使用 @Track 装饰器可减少不必要的组件重渲染 |
| 组件冻结 | 使用 freezefreezeV2 实现非活跃组件冻结，减少不必要的更新 |

---
