# Column 组件使用规范

## 概述

Column 是纵向布局容器，子组件按从上到下的顺序排列。

## 接口

```typescript
Column(value?: { space?: string | number }): ColumnAttribute
```

**参数说明**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| space | string \| number | 否 | 子组件之间的垂直间距 |

## 子组件

Column 可以包含任意数量的子组件。

```typescript
Column() {
  Text('第一行')
  Text('第二行')
  Button('按钮')
}
```

## 属性

### 对齐属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| alignItems(value: HorizontalAlign) | HorizontalAlign | 子组件水平对齐方式 |
| justifyContent(value: FlexAlign) | FlexAlign | 子组件垂直分布方式 |

**HorizontalAlign 枚举**：

| 值 | 说明 |
|----|------|
| Start | 起始对齐（默认） |
| Center | 居中对齐 |
| End | 结束对齐 |

**FlexAlign 枚举**：

| 值 | 说明 |
|----|------|
| Start | 起始对齐 |
| Center | 居中对齐 |
| End | 结束对齐 |
| SpaceBetween | 两端分布（首尾贴边，中间均分） |
| SpaceAround | 环绕分布（每个子组件两侧间距相等） |
| SpaceEvenly | 均匀分布（所有间距相等） |

## 使用示例

### 基础用法

```typescript
@Entry
@Component
struct ColumnExample {
  build() {
    Column({ space: 10 }) {
      Text('第一行')
        .width('100%')
        .height(40)
        .backgroundColor('#FFCCCC')

      Text('第二行')
        .width('100%')
        .height(40)
        .backgroundColor('#CCFFCC')

      Text('第三行')
        .width('100%')
        .height(40)
        .backgroundColor('#CCCCFF')
    }
    .width('100%')
    .height(200)
    .padding(10)
  }
}
```

### 水平对齐

```typescript
Column() {
  Text('左对齐')
    .width(100)
    .backgroundColor('#F0F0F0')

  Text('居中')
    .width(100)
    .backgroundColor('#F0F0F0')

  Text('右对齐')
    .width(100)
    .backgroundColor('#F0F0F0')
}
.width('100%')
.height(200)
.alignItems(HorizontalAlign.Center)  // 子组件水平居中
```

### 垂直分布

```typescript
Column() {
  Text('上')
    .width(100)
    .height(40)
    .backgroundColor('#FF9999')

  Text('中')
    .width(100)
    .height(40)
    .backgroundColor('#99FF99')

  Text('下')
    .width(100)
    .height(40)
    .backgroundColor('#9999FF')
}
.width('100%')
.height(300)
.justifyContent(FlexAlign.SpaceBetween)  // 两端分布
```

### 表单布局

```typescript
@Entry
@Component
struct FormLayout {
  build() {
    Column({ space: 20 }) {
      // 标题
      Text('登录表单')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)

      // 用户名
      Column({ space: 8 }) {
        Text('用户名')
          .fontSize(14)
          .fontColor('#666666')
        TextInput({ placeholder: '请输入用户名' })
          .width('100%')
          .height(40)
      }
      .alignItems(HorizontalAlign.Start)

      // 密码
      Column({ space: 8 }) {
        Text('密码')
          .fontSize(14)
          .fontColor('#666666')
        TextInput({ placeholder: '请输入密码' })
          .type(InputType.Password)
          .width('100%')
          .height(40)
      }
      .alignItems(HorizontalAlign.Start)

      // 登录按钮
      Button('登录')
        .width('100%')
        .height(44)
        .type(ButtonType.Capsule)
    }
    .width('100%')
    .padding(20)
  }
}
```

### 卡片布局

```typescript
Column() {
  // 图片区域
  Image($r('app.media.banner'))
    .width('100%')
    .height(120)
    .objectFit(ImageFit.Cover)

  // 内容区域
  Column({ space: 8 }) {
    Text('卡片标题')
      .fontSize(18)
      .fontWeight(FontWeight.Bold)

    Text('这是卡片的描述内容，可以显示多行文本信息。')
      .fontSize(14)
      .fontColor('#666666')
      .maxLines(2)
      .textOverflow({ overflow: TextOverflow.Ellipsis })
  }
  .width('100%')
  .padding(12)
  .alignItems(HorizontalAlign.Start)
}
.width('100%')
.borderRadius(12)
.backgroundColor(Color.White)
.shadow({ radius: 10, color: '#22000000', offsetX: 0, offsetY: 2 })
```

## 对齐效果示意

### alignItems 水平对齐

```
HorizontalAlign.Start     HorizontalAlign.Center      HorizontalAlign.End
┌─────────────────┐       ┌─────────────────┐        ┌─────────────────┐
│■■■■■            │       │      ■■■■■      │        │            ■■■■■│
│■■■■■■■          │       │    ■■■■■■■      │        │          ■■■■■■■│
│■■■              │       │       ■■■       │        │              ■■■│
└─────────────────┘       └─────────────────┘        └─────────────────┘
```

### justifyContent 垂直分布

```
SpaceBetween           SpaceAround            SpaceEvenly
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│■■■■■■■■■■       │   │ ··■■■■■■■■··   │   │  ··■■■■■■■■··  │
│                 │   │                 │   │                 │
│■■■■■■■■■■       │   │ ··■■■■■■■■··   │   │  ··■■■■■■■■··  │
│                 │   │                 │   │                 │
│■■■■■■■■■■       │   │ ··■■■■■■■■··   │   │  ··■■■■■■■■··  │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

## 最佳实践

1. **设置间距**：
```typescript
// 推荐使用 space 参数
Column({ space: 10 }) {
  // 子组件
}

// 而不是在每个子组件上设置 margin
```

2. **卡片内容使用 Column**：
```typescript
Column({ space: 8 }) {
  Text('标题')
  Text('描述')
}
.alignItems(HorizontalAlign.Start)  // 文本左对齐
```

3. **页面整体布局**：
```typescript
Column() {
  // 顶部固定
  Header()

  // 中间可滚动
  Scroll() {
    Column() {
      // 内容
    }
  }
  .layoutWeight(1)  // 占据剩余空间

  // 底部固定
  Footer()
}
.height('100%')
```

4. **使用 layoutWeight**：
```typescript
Column() {
  Text('固定高度')
    .height(50)

  Text('占据剩余空间')
    .layoutWeight(1)  // 自动占据剩余高度

  Text('固定高度')
    .height(50)
}
.height(300)
```

## 注意事项

1. Column 默认宽度由子组件决定，需要设置 width 否则可能无法显示
2. alignItems 控制的是子组件在水平方向的对齐
3. justifyContent 控制的是子组件在垂直方向的分布
4. space 参数设置的间距不会影响首尾子组件与容器边缘的距离