# 获取页面节点信息


当开发需要指定目标节点的属性，位置等信息前，需要获取页面节点信息，当前开发指导提供获取页面节点信息的方法。


## HXML节点信息

节点信息查询接口可以用于获取节点属性、样式、在界面上的位置等信息。

最常见的用法是查询某个节点的当前位置，以及界面的滚动位置，示例代码：

```js
const query = has.createSelectorQuery();
query.select('#elem-id').boundingClientRect(function (res) {
  const top = res.top; // 上边距
  console.info(`boundingClientRect, top: ${top}`);
});
query.selectViewport().scrollOffset(function (res) {
  const scrollTop = res.scrollTop; // 显示区域的垂直滚动位置
  console.info(`scrollOffset, scrollTop: ${scrollTop}`);
});
query.exec();
```


上述示例中， \#elem-id是一个节点选择器，与CSS的选择器相近但略有区别，请参见[SelectorQuery.select](../references/references-apis/apis-hxml.md#selectorqueryselect)的相关说明。


在自定义组件或包含自定义组件的页面中，推荐使用this.createSelectorQuery来代替[has.createSelectorQuery](../references/references-apis/apis-hxml.md#hascreateselectorquery)，这样可以确保在正确的范围内选择节点。


## HXML节点布局相交状态

节点布局相交状态接口 [has.createIntersectionObserver](../references/references-apis/apis-hxml.md#hascreateintersectionobserver) 可用于监听两个或多个组件节点在布局位置上的相交状态。这一组接口常常可以用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。

这一组API涉及的主要概念如下:

- 参照节点：监听的参照节点，取它的布局区域作为参照区域。如果有多个参照节点，则会取它们布局区域的交集作为参照区域。页面显示区域也可作为参照区域之一。

- 目标节点：监听的目标，默认只能是一个节点（使用selectAll选项时，可以同时监听多个节点）。

- 相交区域：目标节点的布局区域与参照区域的相交区域。

- 相交比例：相交区域占参照区域的比例。

- 阈值：相交比例如果达到阈值，则会触发监听器的回调函数。阈值可以有多个。

以下示例代码可以在目标节点（用选择器 .target-elem 指定）每次进入或离开页面显示区域时，触发回调函数。

```js
Page({
  onLoad: function () {
    this.createIntersectionObserver().relativeToViewport().observe('.target-elem-class', (res) => {
      const id = res.id; // 目标节点 id
      const dataset = res.dataset; // 目标节点 dataset
      const intersectionRatio = res.intersectionRatio; // 相交区域占目标节点的布局区域的比例
      const intersectionRect = res.intersectionRect; // 相交区域
      const left = intersectionRect.left; // 相交区域的左边界坐标
      const top = res.intersectionRect.top; // 相交区域的上边界坐标
      const width = res.intersectionRect.width; // 相交区域的宽度
      const height = res.intersectionRect.height; // 相交区域的高度
      console.info(`relativeToViewport, observe, id: ${id}`);
      console.info(`relativeToViewport, observe, intersectionRect: [${left}, ${top}, ${width}, ${height}]`);
    });
  }
});
```

在自定义组件或包含自定义组件的页面中，推荐使用this.createIntersectionObserver来代替has.createIntersectionObserver，这样可以确保在正确的范围内选择节点。
