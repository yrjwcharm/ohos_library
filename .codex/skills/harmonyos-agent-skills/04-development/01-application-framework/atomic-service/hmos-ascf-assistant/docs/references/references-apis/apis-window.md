# 窗口

## has.onWindowResize

has.onWindowResize(function callback)

监听窗口尺寸变化事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 窗口尺寸变化事件的监听函数。 |

**callback返回值：**

返回窗口尺寸信息的Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| size | Object | 窗口尺寸信息。 |

**size具体字段：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| windowWidth | number | 变化后的窗口宽度，单位px。 |
| windowHeight | number | 变化后的窗口高度，单位px。 |

**示例：**

```js
has.onWindowResize((res) => {
  console.info('onWindowResize', res);
});
```

## has.offWindowResize

has.offWindowResize(function listener)

移除监听窗口尺寸变化事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | onWindowResize传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = (res) => {
  console.info('onWindowResize', res);
};
has.onWindowResize(callback);
has.offWindowResize(callback);
```
