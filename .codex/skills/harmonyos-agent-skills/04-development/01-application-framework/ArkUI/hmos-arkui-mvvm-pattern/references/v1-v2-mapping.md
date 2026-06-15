# V1/V2 数组更新行为差异

这是 V1 和 V2 最关键的行为差异，也是 V1 项目整改时最容易踩的坑。

## 行为对比

| 操作 | V1 普通数组 `T[]` | V1 `@Observed extends Array` | V2 `@Trace` |
|------|---------------------|------------------------------|-------------|
| `arr.push(item)` | **不触发更新** | 触发更新 | 触发更新 |
| `arr.splice(i, 1)` | **不触发更新** | 触发更新 | 触发更新 |
| `arr = [...arr, item]` | 触发更新 | 触发更新 | 触发更新 |
| `arr[i].prop = newVal` | 第一层可感知 | 第一层可感知 | 深度感知 |

## V1 数组更新方案

```typescript
// ✓ 方案一：@Observed 子类化数组（推荐，官方示例采用）
@Observed
export class ThingViewModelArray extends Array<ThingViewModel> {}

@Observed
export default class TodoListViewModel {
  @Track public things: ThingViewModelArray = new ThingViewModelArray();
  // push/splice 可直接使用
}

// ✓ 方案二：整体替换
addTask(task: TaskViewModel) {
  this.tasks = [...this.tasks, task];
}
removeTask(task: TaskViewModel) {
  this.tasks = this.tasks.filter(t => t !== task);
}
```

V2 中 `@Trace` 装饰的数组直接支持 push/splice，无需额外处理。

## V1/V2 装饰器配套规则

同一组件内禁止混用 V1 和 V2 装饰器：

```typescript
// ✓ V1 套件
@Component + @State/@Prop/@Link/@ObjectLink + @Observed + @Track

// ✓ V2 套件
@ComponentV2 + @Local/@Param/@Event + @ObservedV2 + @Trace
```
