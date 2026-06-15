# 架构反模式检查清单

- 反模式 1：View 直接访问 Model
- 反模式 2：ViewModel 依赖 View
- 反模式 3：V1/V2 混用
- 反模式 4：Page 层包含业务逻辑

## 反模式 1：View 直接访问 Model

**气味**：View 组件直接 import Model 文件，或 `new ModelClass()` 出现在 View 中。

```typescript
// ✗ 错误
import { TaskModel } from '../model/TaskModel';

@ComponentV2
struct TaskView {
  task: TaskModel = new TaskModel();  // 直接依赖 Model

  build() {
    Text(this.task.name)
  }
}
```

**修复**：通过 ViewModel 间接访问。

```typescript
// ✓ 正确
import { TaskViewModel } from '../viewmodel/TaskViewModel';

@ComponentV2
struct TaskView {
  @Param task: TaskViewModel = new TaskViewModel();  // 依赖 ViewModel

  build() {
    Text(this.task.name)
  }
}
```

## 反模式 2：ViewModel 依赖 View

**气味**：ViewModel import 了 UI 组件，或持有 View 的引用。

```typescript
// ✗ 错误
@ObservedV2
class TaskViewModel {
  view: TaskView;  // 下层依赖上层
  dialog: CustomDialogController;  // ViewModel 持有 UI 引用
}
```

**修复**：通过回调通知上层。

```typescript
// ✓ 正确
@ObservedV2
class TaskViewModel {
  @Trace name: string = '';
  onNameChanged: (name: string) => void = () => {};

  updateName(newName: string) {
    this.name = newName;
    this.onNameChanged(newName);  // 通知上层
  }
}
```

## 反模式 3：V1/V2 混用

**气味**：同一个组件内出现 V1 和 V2 装饰器。

```typescript
// ✗ V1 组件使用 V2 装饰器
@Component
struct MyComponent {
  @Local count: number = 0;  // V1 组件不能用 @Local
}

// ✗ V2 组件使用 V1 装饰器
@ComponentV2
struct MyComponent {
  @State count: number = 0;  // V2 组件不能用 @State
}
```

**修复**：整套配套使用。完整映射见 [v1-v2-mapping.md](v1-v2-mapping.md)。

```typescript
// ✓ V1 套件
@Component + @State/@Prop/@Link/@ObjectLink + @Observed

// ✓ V2 套件
@ComponentV2 + @Local/@Param/@Event + @ObservedV2
```

## 反模式 4：Page 层包含业务逻辑

**气味**：Page 组件中出现数据处理、状态计算、API 调用。

```typescript
// ✗ Page 包含业务逻辑
@Entry
@Component
struct TaskPage {
  @State tasks: TaskModel[] = [];

  aboutToAppear() {
    http.createHttp().request('https://api.example.com/tasks', (err, data) => {
      this.tasks = JSON.parse(data.result as string);
    });
  }

  build() {
    List() {
      ForEach(this.tasks.filter(t => !t.isDone), (task) => { /* ... */ })
    }
  }
}
```

**修复**：Page 只做组装。

```typescript
// ✓ 正确
@Entry
@Component
struct TaskPage {
  @State viewModel: TaskListViewModel = new TaskListViewModel();

  aboutToAppear() {
    this.viewModel.loadTasks();  // 委托给 ViewModel
  }

  build() {
    TaskListView({ viewModel: this.viewModel })
  }
}
```

## 快速扫描清单

| # | 检查项 | 排查方式 |
|---|--------|---------|
| 1 | View 文件是否 import 了 model/ 目录的文件 | `grep -r "from.*model/" views/` |
| 2 | ViewModel 文件是否 import 了 UI 组件 | `grep -r "@Component\|struct.*build()" viewmodel/` |
| 3 | V1/V2 装饰器是否混用 | 检查 `@Component` 内是否出现 `@Local/@Param`，`@ComponentV2` 内是否出现 `@State/@Prop/@Link` |
| 4 | Page 内是否有数据处理逻辑 | 检查 Page struct 的 build() 外方法 |
| 5 | V1 嵌套对象是否正确使用 @ObjectLink 链 | 见 [v1-nested-observation.md](v1-nested-observation.md) |
| 6 | V1 数组 push/splice 是否触发更新 | 见 [v1-v2-mapping.md](v1-v2-mapping.md) 数组行为差异 |
