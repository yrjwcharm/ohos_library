# 键盘

## has.onKeyboardHeightChange

has.onKeyboardHeightChange(function callback)

监听键盘高度变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 键盘高度变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| height | number | 键盘高度。 |

**示例：**

```js
has.onKeyboardHeightChange((res) => {
  console.info('keyboard height is: ', res.height);
});
```

## has.offKeyboardHeightChange

has.offKeyboardHeightChange(function callback)

移除键盘高度变化事件的监听函数。

**起始版本：** 1.0.21

**参数：**

| 参数 | 类型 | 必填 | 描述                                |
| -------- | -------- |----|-----------------------------------|
| callback | function | 否  | [has.onKeyboardHeightChange](#hasonkeyboardheightchange)传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const keyboardHeightChangeFn = function(res) {
  console.info('keyboard height is: ', res.height);
};
has.onKeyboardHeightChange(keyboardHeightChangeFn);
has.offKeyboardHeightChange(keyboardHeightChangeFn);
has.offKeyboardHeightChange();
```

## has.hideKeyboard

has.hideKeyboard(Object object)

在input、textarea等focus拉起键盘之后，手动调用此接口收起键盘。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.hideKeyboard({
  success: () => {
    console.info('hideKeyboard success');
  },
  fail: (err) => {
    console.error('hideKeyboard fail', err);
  },
  complete: (res) => {
    console.info('hideKeyboard complete', res);
  }
});
```

## has.getSelectedTextRange

has.getSelectedTextRange(Object object)

在input、textarea等focus之后，获取输入框的光标位置。

> **注意：**
>
> 只有在focus的时候调用此接口才有效。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| start | number | 输入框光标起始位置。 |
| end | number | 输入框光标结束位置。 |

**示例：**

```js
has.getSelectedTextRange({
  success: (res) => {
    console.info('getSelectedTextRange success', res);
  },
  fail: (err) => {
    console.error('getSelectedTextRange fail', err);
  },
  complete: (res) => {
    console.info('getSelectedTextRange complete', res);
  }
});
```
