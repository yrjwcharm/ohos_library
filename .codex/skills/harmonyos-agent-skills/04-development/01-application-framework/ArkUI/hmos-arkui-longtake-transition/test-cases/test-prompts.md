# 测试提示词

## 基础功能测试

### 测试场景 1：卡片一镜到底转场
**提示词**：
```
我的鸿蒙应用用了Navigation路由，现在有一个卡片列表页，点击卡片想跳转到详情页，我想加一个一镜到底的转场效果，让卡片展开成详情页
``

**预期输出**：
- 识别为一镜到底（CardLongTake）场景
- 提供完整的6步集成指南
- 提醒前提条件（Navigation路由、沉浸式状态栏、hideTitleBar）
- 触发页卡片设置 .id()，使用 generateLongTakeParam
- 目标页5处修改完整覆盖（解析参数、init session、Delegate包裹、背景色迁移+expandSafeArea、onSizeChange）

### 测试场景 2：图片九宫格一镜到底转场
**提示词**：
```
我有个图片九宫格页面，点击图片要全屏查看大图，返回的时候希望能回到对应图片的位置，怎么实现流畅的过渡效果？
``

**预期输出**：
- 识别为图片一镜到底（ImageLongTake）场景，而非通用Web动画方案
- 使用 LongTakeTransitionType.ImageLongTake
- 介绍 updateSnapshotComponentId 实现返回对齐
- 提供完整的6步集成指南

### 测试场景 3：用户只提及部分步骤
**提示词**：
```
帮我在EntryAbility和Navigation里配置ezcustomtransition，我只需要从列表页点进详情页的时候有个卡片展开的转场动画
``

**预期输出**：
- 不只修改用户提到的EntryAbility和Navigation，而是提供完整6步指南
- 提醒用户遗漏的其他步骤同样关键

## 边界条件测试

### 测试场景 4：不满足前提条件
**提示词**：
```
我的鸿蒙应用用的是Router路由，现在想在页面跳转的时候加一个一镜到底的转场效果
``

**预期输出**：
- 识别出不满足前提条件（Router而非Navigation）
- 提示用户需要先迁移到Navigation路由体系
- 不直接提供无效的集成步骤

### 测试场景 5：目标页已有固定背景色
**提示词**：
```
我的详情页NavDestination上设了.backgroundColor(Color.White)，现在要加一镜到底效果，怎么处理背景色？
``

**预期输出**：
- 明确指出背景色需要从NavDestination迁移到子组件
- 提供条件背景色写法：longTakeTransitionParam存在时用session.navDestinationBgColor，否则用原背景色
- 提示设置expandSafeArea

## 错误处理测试

### 测试场景 6：组件未设置id
**提示词**：
```
我按照一镜到底的教程做了，但是点击卡片后转场动画没有生效，界面直接跳转了没有动画效果
``

**预期输出**：
- 识别最可能的错误原因：被点击组件未设置 .id()
- 提供排查清单，覆盖常见遗漏点（id、hideTitleBar、背景色迁移、expandSafeArea、init调用）
- 不盲目猜测其他原因