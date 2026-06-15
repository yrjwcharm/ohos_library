# 菜单

## has.getMenuButtonBoundingClientRect

has.getMenuButtonBoundingClientRect(): Object

获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。

> **说明：**
>
> 布局信息包含了元服务menuBar的左右margin。

**起始版本：** 1.0.10

**返回值：**

返回菜单按钮布局位置信息的Object对象，包括以下字段。

| 属性 | 类型 | 说明 |
| -------- | -------- | -------- |
| width | number | 宽度，单位：px。 |
| height | number | 高度，单位：px。 |
| top | number | 上边界坐标，单位：px。 |
| right | number | 右边界坐标，单位：px。 |
| bottom | number | 下边界坐标，单位：px。 |
| left | number | 左边界坐标，单位：px。 |

**示例：**

```js
const res = has.getMenuButtonBoundingClientRect();
console.info(res.width);
console.info(res.height);
console.info(res.top);
console.info(res.right);
console.info(res.bottom);
console.info(res.left);
```
