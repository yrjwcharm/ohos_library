# 下拉刷新

## has.startPullDownRefresh

has.startPullDownRefresh(Object object)

下拉刷新接口。调用后触发下拉刷新动画，效果与用户手动触发一致。

> **说明：**
>
> - 用户界面触发的下拉刷新，会在4s内关闭。
> - 通过API触发的下拉刷新，可以调用 [has.stopPullDownRefresh](#hasstoppulldownrefresh) 进行关闭。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startPullDownRefresh({
  success: () => {
    console.info('startPullDownRefresh success');
  },
  fail: (err) => {
    console.error('startPullDownRefresh fail', err);
  },
  complete: (res) => {
    console.info('startPullDownRefresh complete', res);
  }
});
```

## has.stopPullDownRefresh

has.stopPullDownRefresh(Object object)

停止当前页面下拉刷新。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopPullDownRefresh({
  success: () => {
    console.info('stopPullDownRefresh success');
  },
  fail: (err) => {
    console.error('stopPullDownRefresh fail', err);
  },
  complete: (res) => {
    console.info('stopPullDownRefresh complete', res);
  }
});
```
