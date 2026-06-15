# HXML

## has.createSelectorQuery

has.createSelectorQuery(): SelectorQuery

创建SelectorQuery对象实例。

在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替。

**起始版本：** 1.0.0

**返回值：**

返回[SelectorQuery](#selectorquery)对象。

**示例：**

```js
const query = has.createSelectorQuery();
query.select('#id').boundingClientRect();
query.exec(function(res) {
  console.info('res = ', res);
});
```

## has.createIntersectionObserver

has.createIntersectionObserver(Object component, Object options): IntersectionObserver

创建并返回一个 IntersectionObserver 对象实例。

> **说明：**
>
> ASCF的观察器使用Web原生模式，和三方存在差异，具体差异为：
>
> Web原生观察器调用relativeTo设置的参照区域不能超出节点区域的范围。Web原生观察器相关信息可参考 [IntersectionObserver 文档](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| component | Object | 是 | 自定义组件实例。 |
| options | Object | 否 | 选项。 |

**options说明：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| thresholds | Array&lt;number&gt; | [0] | 否 | 一个数值数组，包含所有阈值，有效值在[0, 1.0]区间。 |
| initialRatio | number | 0 | 否 | 初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数，有效值在[0, 1.0]区间。 |
| observeAll | boolean | false | 否 | 是否同时观测多个目标节点（而非一个），如果设为 true ，observe 的 targetSelector 将选中多个节点。<br/>注意，同时选中过多节点将影响渲染性能。 |

**返回值：**

返回[IntersectionObserver](#intersectionobserver)对象。

**示例：**

```js
const observer = has.createIntersectionObserver(this, {
  thresholds: [0],
  initialRatio: 0,
  observeAll: true
});
```

## IntersectionObserver

IntersectionObserver 对象，用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。

**起始版本：** 1.0.4

### IntersectionObserver.disconnect

IntersectionObserver.disconnect()

停止监听，回调函数将不再触发。

**起始版本：** 1.0.4

**示例：**

```js
const observer = has.createIntersectionObserver(this, {
  thresholds: [0],
  initialRatio: 0,
  observeAll: true
});
observer.disconnect();
```

### IntersectionObserver.observe

IntersectionObserver.observe(string targetSelector, function callback)

指定目标节点并开始监听相交状态变化情况。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| targetSelector | string | 是 | 选择器。 |
| callback | function | 否 | 监听相交状态变化的回调函数。 |

**callback返回值**：

返回Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| id | string | 节点ID。 |
| dataset | Record&lt;string,any&gt; | 节点的自定义数据属性。 |
| intersectionRatio | number | 相交比例。 |
| intersectionRect | Object | 相交区域的边界。 |
| boundingClientRect | Object | 目标边界。 |
| relativeRect | Object | 参照区域的边界。 |
| time | number | 相交检测时的时间戳。 |

**intersectionRect说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 左边界。 |
| right | number | 右边界。 |
| top | number | 上边界。 |
| bottom | number | 下边界。 |
| width | number | 宽度。 |
| height | number | 高度。 |

**boundingClientRect说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 左边界。 |
| right | number | 右边界。 |
| top | number | 上边界。 |
| bottom | number | 下边界。 |
| width | number | 宽度。 |
| height | number | 高度。 |

**relativeRect说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 左边界。 |
| right | number | 右边界。 |
| top | number | 上边界。 |
| bottom | number | 下边界。 |
| width | number | 宽度。 |
| height | number | 高度。 |

**示例：**

```js
const observer = has.createIntersectionObserver(this, {
  thresholds: [0],
  initialRatio: 0,
  observeAll: true
});

observer
  .relativeTo('.scroll-view_H', {
    left: -50,
    right: -50
  })
  .observe('.demo-text-2', (res) => {
    console.info('observe:', res);
  });
```

### IntersectionObserver.relativeTo

IntersectionObserver.relativeTo(string selector, Object margins): IntersectionObserver

使用选择器指定一个节点，作为参照区域之一。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| selector | string | 是 | 选择器。 |
| margins | object | 否 | 用于扩展（或收缩）参照节点布局区域的边界。 |

**margins说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 节点布局区域的左边界。 |
| right | number | 节点布局区域的右边界。 |
| top | number | 节点布局区域的上边界。 |
| bottom | number | 节点布局区域的下边界。 |

**返回值：**

返回[IntersectionObserver](#intersectionobserver)对象。

**示例：**

```js
const observer = has.createIntersectionObserver(this, {
  thresholds: [0],
  initialRatio: 0,
  observeAll: true
});

observer
  .relativeTo('.scroll-view_H', {
    left: -50,
    right: -50
  })
  .observe('.demo-text-2', (res) => {
    console.info('observe:', res);
  });
```

### IntersectionObserver.relativeToViewport

IntersectionObserver.relativeToViewport(Object margins): IntersectionObserver

指定页面显示区域作为参照区域之一。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| margins | object | 否 | 用来扩展（或收缩）参照节点布局区域的边界。 |

**margins说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 节点布局区域的左边界。 |
| right | number | 节点布局区域的右边界。 |
| top | number | 节点布局区域的上边界。 |
| bottom | number | 节点布局区域的下边界。 |

**返回值：**

返回[IntersectionObserver](#intersectionobserver)对象。

**示例：**

```js
const observer = has.createIntersectionObserver(this, {
  thresholds: [0],
  initialRatio: 0,
  observeAll: true
});

observer
  .relativeToViewport({
    left: -50,
    right: -50
  })
  .observe('.demo-text-2', (res) => {
    console.info('observe:', res);
  });
```

## SelectorQuery

### SelectorQuery.exec

SelectorQuery.exec(function callback): NodesRef

执行所有的请求。请求结果按请求顺序构成数组，在callback的第一个参数中返回。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 回调函数。 |

**返回值：**

返回[NodesRef](#nodesref)对象。

**示例：**

```js
const query = has.createSelectorQuery();
const selecttarget = query.select('#movabletarget1').boundingClientRect(function(rect) {
  console.info('rect = ', rect);
}).exec();
```

### SelectorQuery.in

SelectorQuery.in(Component component): SelectorQuery

将选择器的选取范围更改为自定义组件component内。

初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| component | Component | 是 | 自定义组件实例。 |

**返回值：**

返回[SelectorQuery](#selectorquery)对象。

**示例：**

```js
const query = has.createSelectorQuery().in(this);
```

### SelectorQuery.select

SelectorQuery.select(string selector): NodesRef

在当前页面下选择第一个匹配选择器selector的节点。返回一个NodesRef对象实例，可以用于获取节点信息。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| selector | string | 是 | 选择器。 |

**返回值：**

返回[NodesRef](#nodesref)对象。

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
const query = has.createSelectorQuery();
const nodesRef = query.select('#movabletarget1');
```

### SelectorQuery.selectAll

SelectorQuery.selectAll(string selector): NodesRef

在当前页面下选择匹配选择器selector的所有节点。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| selector | string | 是 | 选择器。 |

**返回值：**

返回[NodesRef](#nodesref)对象。

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
const query = has.createSelectorQuery();
const nodesRef = query.selectAll('#movabletarget1');
```

### SelectorQuery.selectViewport

SelectorQuery.selectViewport(): NodesRef

选择显示区域。可用于获取显示区域的尺寸、滚动位置等信息。

**起始版本：** 1.0.0

**返回值：**

返回[NodesRef](#nodesref)对象。

**示例：**

```js
const query = has.createSelectorQuery();
const nodesRef = query.selectViewport();
```

## NodesRef

### NodesRef.boundingClientRect

NodesRef.boundingClientRect(function callback): SelectorQuery

添加查询节点布局位置的请求。相对于显示区域，以像素为单位。其功能类似于DOM的getBoundingClientRect。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 回调函数，在执行SelectorQuery.exec方法后，节点信息将在callback中返回。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| id | string | 节点的 ID。 |
| dataset | object | 节点的 dataset。 |
| left | number | 节点的左边界坐标。 |
| right | number | 节点的右边界坐标。 |
| top | number | 节点的上边界坐标。 |
| bottom | number | 节点的下边界坐标。 |
| width | number | 节点的宽度。 |
| height | number | 节点的高度。 |

**返回值：**

返回[SelectorQuery](#selectorquery)对象。

**示例：**

```js
has.createSelectorQuery().select('#id').boundingClientRect(function(rect) {
  console.info('rect = ', rect);
}).exec();
```

### NodesRef.context

NodesRef.context(function callback): SelectorQuery

添加节点的Context对象查询请求。目前支持VideoContext、CanvasContext、EditorContext和MapContext的获取。

**起始版本：** 1.0.17

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 回调函数，在执行 SelectorQuery.exec 方法后，返回节点信息。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| context | object | 节点对应的Context对象。 |

**返回值：**

返回[SelectorQuery](#selectorquery)对象。

**示例：**

```js
has.createSelectorQuery().select('#id').context(function(res) {
  console.info('context = ', res.context);
}).exec();
```

### NodesRef.fields

NodesRef.fields(Object fields, function callback): SelectorQuery

获取节点的相关信息。需要获取的字段在fields中指定。返回值是NodesRef对应的SelectorQuery。

**起始版本：** 1.0.17

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fields | object | 是 | 选项。包含需要获取的字段。 |
| callback | function | 否 | 回调函数，在执行SelectorQuery.exec方法后，返回在fields中指定的节点信息。 |

**fields说明：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| id | boolean | false | 否 | 是否返回节点id。 |
| dataset | boolean | false | 否 | 是否返回节点dataset。 |
| rect | boolean | false | 否 | 是否返回节点布局位置（left、right、top、bottom）。 |
| size | boolean | false | 否 | 是否返回节点尺寸（width、height）。 |
| scrollOffset | boolean | false | 否 | 是否返回节点的scrollLeft、scrollTop，节点必须是scroll-view或者viewport。 |
| properties | Array&lt;string&gt; | [] | 否 | 指定属性名列表。返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值，id class style和事件绑定的属性值不可获取）。 |
| computedStyle | Array&lt;string&gt; | [] | 否 | 指定样式名列表。返回节点对应样式名的当前值。 |
| context | boolean | false | 否 | 是否返回节点对应的Context对象。 |
| node | boolean | false | 否 | 是否返回节点对应的Node实例。 |

**返回值：**

返回[SelectorQuery](#selectorquery)对象。

**示例：**

```js
has.createSelectorQuery().select('#id').fields({
  id: true,
  rect: true,
  size: true
}, function(res) {
  console.info('res = ', res);  
}).exec();
```

### NodesRef.node

NodesRef.node(function callback): SelectorQuery

获取Node节点实例。目前支持Canvas的获取。

**起始版本：** 1.0.17

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 回调函数，在执行 SelectorQuery.exec 方法后，返回节点信息。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| node | object | 节点对应的Node实例。 |

**返回值：**

返回[SelectorQuery](#selectorquery)对象。

**示例：**

```js
has.createSelectorQuery().select('#id').node(function(res) {
  console.info('node = ', res.node);
}).exec();
```

### NodesRef.scrollOffset

NodesRef.scrollOffset(function callback): SelectorQuery

添加节点的滚动位置查询请求。以像素为单位。节点必须是scroll-view或者viewport，返回NodesRef对应的SelectorQuery。

**起始版本：** 1.0.17

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 回调函数，在执行SelectorQuery.exec方法后，返回节点信息。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| id | string | 节点的ID。 |
| dataset | object | 节点的dataset。 |
| scrollLeft | number | 节点的水平滚动位置。 |
| scrollTop | number | 节点的竖直滚动位置。 |
| scrollWidth | number | 节点的滚动宽度。 |
| scrollHeight | number | 节点的滚动高度。 |

**返回值：**

返回[SelectorQuery](#selectorquery)对象。

**示例：**

```js
has.createSelectorQuery().selectViewport().scrollOffset(function(res) {
  console.info('res = ', res);
}).exec();
```
