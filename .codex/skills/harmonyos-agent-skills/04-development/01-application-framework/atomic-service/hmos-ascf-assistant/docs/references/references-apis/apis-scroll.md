# 滚动

## has.pageScrollTo

has.pageScrollTo(Object object)

将页面滚动到目标位置。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| scrollTop | number | - | 否 | 滚动到页面的目标位置，单位px；跟selector参数必须要有其中一个，同时存在时优先使用scrollTop。 |
| duration | number | 300 | 否 | 滚动动画的时长，单位ms。 |
| selector | string | - | 否 | 选择器。 |
| offsetTop | number | - | 否 | 偏移距离，需要和selector参数搭配使用，可以滚动到selector加偏移距离的位置，单位px。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**selector语法：**

selector类似于CSS的选择器，但仅支持下列语法。

- ID选择器：\#the-id
- class选择器（可以连续指定多个）：.a-class.another-class
- 子元素选择器：.the-parent &gt; .the-child
- 后代选择器：.the-ancestor .the-descendant
- 跨自定义组件的后代选择器：.the-ancestor &gt;&gt;&gt; .the-descendant
- 多选择器的并集：\#a-node, .some-other-nodes

**示例：**

```js
has.pageScrollTo({
  scrollTop: 0,
  duration: 300
});
```

## ScrollViewContext

ScrollViewContext实例，可通过[has.createSelectorQuery](./apis-hxml.md#hascreateselectorquery)的[NodesRef.node](./apis-hxml.md#nodesrefnode)方法获取。仅在[scroll-view](../references-components/components-scroll-view.md)组件开启enhanced属性后生效。

**起始版本：** 1.0.23

### 属性

| 名称            | 类型      | 默认值   | 描述         |
|---------------|---------|-------|------------|
| scrollEnabled | boolean | true  | 设置是否可以滚动。  |
| showScrollbar | boolean | true  | 设置是否显示滚动条。 |
| pagingEnabled | boolean | false | 设置是否分页滚动。  |

**示例：**

```js
has.createSelectorQuery()
  .select('#scrollview')
  .node()
  .exec((res) => {
    const scrollView = res[0].node;
    scrollView.scrollEnabled = false;
  });
```

### ScrollViewContext.triggerRefresh()

ScrollViewContext.triggerRefresh(Object object)

启动下拉刷新。

**起始版本：** 1.0.23

**参数：**

| 参数             | 类型     | 默认值  | 必填 | 描述                                                                                                                                        |
|----------------|--------|------|----|-------------------------------------------------------------------------------------------------------------------------------------------|
| duration       | number | 300  | 否  | 动画持续时间，单位ms。                                                                                                                              |
| easingFunction | string | ease | 否  | 动画曲线。支持的动画曲线有：<br/> ease：动画开始和结束时的速度较慢。<br/>linear：动画线性变化。<br/>ease-in：动画播放速度先慢后快。<br/>ease-out：动画播放速度先快后慢。<br/>ease-in-out：动画播放速度先加速后减速。 |

**示例：**

```js
has.createSelectorQuery().select('#id').node(function (res) {
  const ctx = res.node;
  console.info('ctx = ', ctx);
  ctx.triggerRefresh({
    duration: 500,
    easingFunction: 'ease'
  });
}).exec();
```

### ScrollViewContext.closeRefresh()

ScrollViewContext.closeRefresh()

关闭下拉刷新。

**起始版本：** 1.0.23

**示例：**

```js
has.createSelectorQuery().select('#id').node(function (res) {
  const ctx = res.node;
  console.info('ctx = ', ctx);
  ctx.closeRefresh();
}).exec();
```

### ScrollViewContext.scrollTo()

ScrollViewContext.scrollTo(Object object)

滚动至指定位置。

**起始版本：** 1.0.23

**参数：**

| 参数       | 类型      | 必填 | 描述             |
|----------|---------|----|----------------|
| top      | number  | 否  | 顶部距离，单位px。     |
| left     | number  | 否  | 左边界距离，单位px。    |
| duration | number  | 否  | 滚动动画持续时间，单位ms。 |
| animated | boolean | 否  | 是否启用滚动动画。      |

**示例：**

```js
has.createSelectorQuery().select('#id').node(function (res) {
  const ctx = res.node;
  console.info('ctx = ', ctx);
  ctx.scrollTo({
    top: 50,
    duration: 1000,
    animated: true
  });
}).exec();
```

### ScrollViewContext.scrollIntoView()

ScrollViewContext.scrollIntoView(string selector, Object ScrollIntoViewOptions)

滚动至指定视图。

**起始版本：** 1.0.23

**参数：**

| 参数             | 类型     | 必填 | 描述                       |
|----------------|--------|----|--------------------------|
| selector       | string | 是  | 元素选择器id。                 |
| ScrollIntoViewOptions | Object | 否  | ScrollIntoViewOptions对象。 |

**ScrollIntoViewOptions**

参数为Object对象，包括以下字段。

| 参数       | 类型      | 默认值  | 必填 | 描述                  |
|----------|---------|------|----|---------------------|
| offset   | number  | 0    | 否  | 跳转到目标节点时的额外偏移，单位px。 |
| animated | boolean | true | 否  | 是否启用滚动动画。           |

**示例：**

```js
has.createSelectorQuery().select('#id').node(function (res) {
  const ctx = res.node;
  console.info('ctx = ', ctx);
  ctx.scrollIntoView('viewA', {
    offset: 0,
    animated: true
  });
}).exec();
```