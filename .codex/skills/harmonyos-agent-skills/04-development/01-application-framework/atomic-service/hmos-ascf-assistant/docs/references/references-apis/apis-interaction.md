# 交互

## has.showToast

has.showToast(Object object)

显示消息提示框。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| title | string | - | 是 | 提示的内容。 |
| duration | number | 1500 | 否 | 提示的延迟时间。<br/>默认值1500ms，取值区间：1500ms-10000ms。若小于1500ms则取默认值，若大于10000ms则取上限值10000ms。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.showToast({
  title: 'loading',
  duration: 5000,
  success: () => {
    console.info('showToast success');
  },
  fail: (err) => {
    console.error('showToast fail', err);
  },
  complete: (res) => {
    console.info('showToast complete', res);
  }
});
```

## has.hideToast

has.hideToast(Object object)

隐藏消息提示框。

**起始版本：** 1.0.21

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述                                             |
| -------- |-------|----|------------------------------------------------|
| success | function | 否  | 接口调用成功的回调函数。                                   |
| fail | function | 否  | 接口调用失败的回调函数。                                   |
| complete | function | 否  | 接口调用结束的回调函数（调用成功、失败都会执行）。                      |

**示例：**

```js
has.hideToast({
  success: () => {
    console.info('hideToast success');
  },
  fail: (err) => {
    console.error('hideToast fail', err);
  },
  complete: (res) => {
    console.info('hideToast complete', res);
  }
});
```

## has.showModal

has.showModal(Object object)

显示模态对话框。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| title | string | - | 否 | 提示的标题。 |
| content | string | - | 否 | 提示的内容。<br>**说明：** title和content至少有一个必填。 |
| showCancel | boolean | true | 否 | 是否显示取消按钮。 |
| cancelText | string | 取消 | 否 | 取消按钮的文字，最多4个字符。 |
| cancelColor | string | \#000000 | 否 | 取消按钮的文字颜色，必须是不携带透明度信息的16进制格式的颜色字符串。 |
| confirmText | string | 确定 | 否 | 确认按钮的文字，最多4个字符。 |
| confirmColor | string | \#576B95 | 否 | 确认按钮的文字颜色，必须是不携带透明度信息的16进制格式的颜色字符串。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| confirm | boolean | 为true时，表示用户点击了确定按钮。 |
| cancel | boolean | 为true时，表示用户点击了取消。 |

**示例：**

```js
has.showModal({
  title: '弹窗标题',
  content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
  showCancel: false,
  confirmText: '确定',
  success: (res) => {
    console.info('showModal success', res);
  },
  fail: (err) => {
    console.error('showModal fail', err);
  },
  complete: (res) => {
    console.info('showModal complete', res);
  }
});
```

## has.showLoading

has.showLoading(Object object)

显示 loading 提示框。需主动调用 has.hideLoading 才能关闭提示框。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| title | string | - | 是 | 提示的内容。 |
| mask | boolean | false | 否 | 是否显示透明蒙层，防止触摸穿透。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.showLoading({
  title: '加载中',
  success: () => {
    console.info('showLoading success');
  },
  fail: (err) => {
    console.error('showLoading fail', err);
  },
  complete: (res) => {
    console.info('showLoading complete', res);
  }
});
```

## has.hideLoading

has.hideLoading(Object object)

隐藏 loading 提示框。

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
has.hideLoading({
  success: () => {
    console.info('hideLoading success');
  },
  fail: (err) => {
    console.error('hideLoading fail', err);
  },
  complete: (res) => {
    console.info('hideLoading complete', res);
  }
});
```

## has.showActionSheet

has.showActionSheet(Object object)

显示操作菜单，item数量建议大于等于3个，小于3个请使用[has.showModal](#hasshowmodal)。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| itemList | Array&lt;string&gt; | - | 是 | 按钮的文字数组，数组长度最大为6。 |
| itemColor | string | \#000000 | 否 | 按钮的文字颜色。 |
| alertText | string | - | 否 | 警示文案。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tapIndex | number | 用户点击的按钮序号，从上到下的顺序，从0开始。 |

**示例：**

```js
has.showActionSheet({
  itemList: ['item1', 'item2', 'item3', 'item4'],
  success: (res) => {
    console.info('showActionSheet success', res);
  },
  fail: (err) => {
    console.error('showActionSheet fail', err);
  },
  complete: (res) => {
    console.info('showActionSheet complete', res);
  }
});
```
