# ArkUI 代码风格指南

## 命名规范

### 组件命名

```typescript
// ✅ 正确: PascalCase，使用有意义的名称
@Component
struct UserProfileCard {}

@Component
struct ProductListItem {}

// ❌ 错误: 无意义的名称
@Component
struct Card1 {}

@Component
struct Item {}
```

### 变量命名

```typescript
// ✅ 正确: camelCase，使用有意义的名称
@State isLoading: boolean = false
@State userName: string = ''
@State itemCount: number = 0

// ❌ 错误: 无意义的名称
@State flag: boolean = false
@State str: string = ''
@State num: number = 0
```

### 私有成员命名

```typescript
// ✅ 正确: 使用 private 修饰符
@Component
struct MyComponent {
  private dataService: DataService = new DataService()
  private handleItemClick(): void {}
}

// ❌ 错误: 使用下划线前缀
@Component
struct MyComponent {
  private _dataService: DataService = new DataService()
}
```

## 代码结构

### 组件结构顺序

```typescript
@Component
struct MyComponent {
  // 1. 状态定义
  @State data: string[] = []
  @State isLoading: boolean = false
  
  // 2. 属性定义
  @Prop title: string = ''
  @Prop onItemClick?: (item: string) => void
  
  // 3. 私有成员
  private dataService: DataService = new DataService()
  
  // 4. 生命周期方法
  aboutToAppear() {
    this.loadData()
  }
  
  aboutToDisappear() {
    this.cleanup()
  }
  
  // 5. 私有方法
  private async loadData(): Promise<void> {
    this.isLoading = true
    try {
      this.data = await this.dataService.fetchData()
    } finally {
      this.isLoading = false
    }
  }
  
  private cleanup(): void {
    // 清理资源
  }
  
  // 6. 计算属性（使用 getter）
  private get isEmpty(): boolean {
    return this.data.length === 0
  }
  
  // 7. 构建方法
  build() {
    Column() {
      // UI 构建
    }
  }
}
```

### 导入顺序

```typescript
// 1. 标准库
import { HashMap } from '@kit.ArkTS'

// 2. 第三方库
import { http } from '@kit.NetworkKit'

// 3. 本地模块
import { DataModel } from '../models/DataModel'
import { DataService } from '../services/DataService'

// 4. 类型定义
import type { ResponseData } from '../types/ResponseData'
```

## 注释规范

### 文件注释

```typescript
/**
 * 用户列表组件
 * 
 * 功能:
 * - 展示用户列表
 * - 支持搜索过滤
 * - 支持下拉刷新和上拉加载
 * 
 * @author Your Name
 * @date 2026-04-02
 */
@Component
struct UserListComponent {
  // ...
}
```

### 方法注释

```typescript
/**
 * 加载用户数据
 * 
 * @param page 页码，从1开始
 * @param pageSize 每页数量，默认20
 * @returns 用户数据列表
 * @throws NetworkError 网络请求失败时抛出
 */
private async loadUserData(page: number, pageSize: number = 20): Promise<UserData[]> {
  // 实现
}
```

### 复杂逻辑注释

```typescript
build() {
  Column() {
    // 搜索框
    TextInput({ placeholder: '搜索用户', text: $$this.searchText })
      .width('100%')
      .height(44)
      .margin({ bottom: 12 })
    
    // 用户列表，使用懒加载优化性能
    List() {
      LazyForEach(this.userDataSource, (user: UserData) => {
        ListItem() {
          this.UserItem(user)
        }
      }, (user: UserData) => user.id.toString())
    }
    .layoutWeight(1)
    
    // 加载状态提示
    if (this.isLoading) {
      LoadingProgress()
        .width(48)
        .height(48)
    }
  }
}
```

## 格式规范

### 缩进和空格

```typescript
// ✅ 正确: 2空格缩进
@Component
struct MyComponent {
  @State data: string = ''
  
  build() {
    Column() {
      Text(this.data)
        .fontSize(16)
        .fontColor('#333333')
    }
  }
}

// ❌ 错误: 4空格或Tab缩进
@Component
struct MyComponent {
    @State data: string = ''
    
    build() {
        Column() {
            Text(this.data)
                .fontSize(16)
        }
    }
}
```

### 链式调用格式

```typescript
// ✅ 正确: 每个方法一行，对齐
Text('Hello World')
  .fontSize(16)
  .fontColor('#333333')
  .fontWeight(FontWeight.Normal)
  .textAlign(TextAlign.Center)
  .width('100%')
  .height(44)

// ❌ 错误: 所有方法在一行
Text('Hello World').fontSize(16).fontColor('#333333').fontWeight(FontWeight.Normal).textAlign(TextAlign.Center).width('100%').height(44)
```

### 空行规则

```typescript
@Component
struct MyComponent {
  // 状态定义之间空一行
  @State data: string[] = []
  
  @State isLoading: boolean = false
  
  // 状态定义和属性定义之间空一行
  @Prop title: string = ''
  
  // 属性定义和私有成员之间空一行
  private dataService: DataService = new DataService()
  
  // 私有成员和生命周期方法之间空一行
  aboutToAppear() {
    this.loadData()
  }
  
  // 生命周期方法和私有方法之间空一行
  private async loadData(): Promise<void> {
    // 实现
  }
  
  // 私有方法和构建方法之间空一行
  build() {
    Column() {
      // UI 构建
    }
  }
}
```

## 类型注解

### 必须添加类型注解的场景

```typescript
// ✅ 正确: 添加类型注解
@State users: UserData[] = []
@State count: number = 0
@State message: string = ''
@State isLoading: boolean = false

private handleClick(): void {
  // 实现
}

private async fetchData(): Promise<ResponseData> {
  // 实现
}

// ❌ 错误: 缺少类型注解
@State users = []
@State count = 0
```

### 可选参数类型

```typescript
// ✅ 正确: 使用可选参数
interface ComponentProps {
  title: string
  subtitle?: string  // 可选参数
  onItemClick?: (item: DataItem) => void  // 可选回调
}

@Component
struct MyComponent {
  @Prop title: string = ''
  @Prop subtitle?: string  // 可选属性
  private onItemClick?: (item: DataItem) => void
}
```

## 代码组织

### 组件拆分

```typescript
// ✅ 正确: 拆分为小组件
@Component
struct UserListPage {
  @State users: UserData[] = []
  
  build() {
    Column() {
      this.Header()
      this.SearchBar()
      this.UserList()
      this.LoadingIndicator()
    }
  }
  
  @Builder
  private Header() {
    Text('用户列表')
      .fontSize(24)
      .fontWeight(FontWeight.Bold)
  }
  
  @Builder
  private SearchBar() {
    // 搜索栏实现
  }
  
  @Builder
  private UserList() {
    // 列表实现
  }
  
  @Builder
  private LoadingIndicator() {
    // 加载指示器
  }
}
```

### 错误处理风格

```typescript
// ✅ 正确: 使用 try-catch 处理错误
private async loadData(): Promise<void> {
  this.isLoading = true
  this.error = null
  
  try {
    const response = await this.dataService.fetchData()
    this.data = response.data
  } catch (error) {
    console.error('Failed to load data:', error)
    this.error = error
  } finally {
    this.isLoading = false
  }
}

// ❌ 错误: 忽略错误处理
private async loadData(): Promise<void> {
  const response = await this.dataService.fetchData()
  this.data = response.data
}
```

## 代码复杂度

### 单一职责原则

```typescript
// ✅ 正确: 每个组件只负责一件事
@Component
struct UserAvatar {
  @Prop avatarUrl: string
  @Prop size: number = 48
  
  build() {
    Image(this.avatarUrl)
      .width(this.size)
      .height(this.size)
      .borderRadius(this.size / 2)
  }
}

// ❌ 错误: 组件承担过多职责
@Component
struct UserCard {
  build() {
    Column() {
      // 头像
      Image(this.avatarUrl)
      // 姓名
      Text(this.userName)
      // 描述
      Text(this.description)
      // 操作按钮
      Button('关注')
      // 统计信息
      Row() {
        Text(`粉丝: ${this.followers}`)
        Text(`关注: ${this.following}`)
      }
    }
  }
}
```

### 方法长度限制

```typescript
// ✅ 正确: 方法简短，逻辑清晰
build() {
  Column() {
    this.Header()
    this.Content()
    this.Footer()
  }
}

@Builder
private Header() {
  Row() {
    Text('Title')
    Blank()
    Button('Action')
  }
}

// ❌ 错误: build 方法过长
build() {
  Column() {
    // 200+ 行的代码
  }
}
```

## 代码风格

### 分号规则

```typescript
// ✅ 正确: 逻辑语句加分号
import { http } from '@kit.NetworkKit';
@State count: number = 0;
const MAX_COUNT = 100;
this.loadData();

// ✅ 正确: UI 语句不加分号
Column() {
  Text('Hello')
    .fontSize(16)
}
Button('Click')
  .onClick(() => {
    this.handleClick()  // 回调内的逻辑语句加分号
  })

// ❌ 错误: UI 语句加分号
Column() {
  Text('Hello');
};

// ❌ 错误: 逻辑语句缺少分号
@State count = 0
```

**原则**：`import`、变量声明、赋值、函数调用等逻辑语句必须加分号；组件创建、属性链式调用等声明式 UI 语句不加分号。