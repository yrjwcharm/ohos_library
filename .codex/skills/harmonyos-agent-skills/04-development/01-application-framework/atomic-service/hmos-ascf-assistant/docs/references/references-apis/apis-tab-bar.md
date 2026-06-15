# Tab Bar

## has.showTabBar

has.showTabBar(Object object)

显示tabBar。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.showTabBar({
  success: (res) => {
    console.info('showTabBar回调成功', res);
  },
  fail: (err) => {
    console.error('showTabBar回调失败', err);
  },
  complete: (res) => {
    console.info('showTabBar回调完成', res);
  }
});
```

## has.setTabBarBadge

has.setTabBarBadge(Object object)

添加文本到tabBar某一项的右上角。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述                                                                                                   |
| -------- | -------- | -------- |------------------------------------------------------------------------------------------------------|
| index | number | 是 | tabBar的哪一项，从左边算起，起始index为0。                                                                          |
| text | string | 是 | 显示的文本，超 4个字符长度则显示成···<br/>**注意：**<br/>1. 中文字符、英文字符占一个字符。<br/>2. 若text传入空字符串""，则tabBar指定项右上角不会显示红色角标。 |
| success | function | 否 | 接口调用成功的回调函数。                                                                                         |
| fail | function | 否 | 接口调用失败的回调函数。                                                                                         |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。                                                                            |

**示例：**

```js
has.setTabBarBadge({
  index: 1,
  text: '123',
  success: (res) => {
    console.info('setTabBarBadge 回调成功', res);
  },
  fail: (err) => {
    console.error('setTabBarBadge 回调失败', err);
  },
  complete: (res) => {
    console.info('setTabBarBadge 回调完成', res);
  }
});
```

## has.removeTabBarBadge

has.removeTabBarBadge(Object object)

移除 tabBar 某一项右上角的文本。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | number | 是 | tabBar的哪一项，从左边算起，起始index为0。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.removeTabBarBadge({
  index: 1,
  success: (res) => {
    console.info('removeTabBarBadge 回调成功', res);
  },
  fail: (err) => {
    console.error('removeTabBarBadge 回调失败', err);
  },
  complete: (res) => {
    console.info('removeTabBarBadge 回调完成', res);
  }
});
```

## has.hideTabBar

has.hideTabBar(Object object)

隐藏tabBar。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.hideTabBar({
  success: (res) => {
    console.info('hideTabBar 回调成功', res);
  },
  fail: (err) => {
    console.error('hideTabBar 回调失败', err);
  },
  complete: (res) => {
    console.info('hideTabBar 回调完成', res);
  }
});
```

## has.showTabBarRedDot

has.showTabBarRedDot (Object object)

显示tabBar某一项的右上角的红点。

**起始版本：** 1.0.15

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | number | 是 | tabBar的哪一项，从左边算起，起始index为0。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.showTabBarRedDot({
  index: 0,
  success: (res) => {
    console.info('showTabBarRedDot回调成功', res);
  },
  fail: (err) => {
    console.error('showTabBarRedDot回调失败', err);
  },
  complete: (res) => {
    console.info('showTabBarRedDot回调完成', res);
  }
});
```

## has.hideTabBarRedDot

has.hideTabBarRedDot (Object object)

隐藏tabBar某一项的右上角的红点。

**起始版本：** 1.0.15

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | number | 是 | tabBar的哪一项，从左边算起，起始index为0。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.hideTabBarRedDot({
  index: 0,
  success: (res) => {
    console.info('hideTabBarRedDot回调成功', res);
  },
  fail: (err) => {
    console.error('hideTabBarRedDot回调失败', err);
  },
  complete: (res) => {
    console.info('hideTabBarRedDot回调完成', res);
  }
});
```

## has.setTabBarStyle

has.setTabBarStyle (Object object)

动态设置tabBar的整体样式。

**起始版本：** 1.0.15

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| color | string | 否 | tab上的文字默认颜色，HexColor。 |
| selectedColor | string | 否 | tab上的文字选中时的颜色，HexColor。 |
| backgroundColor | string | 否 | tab的背景色，HexColor。 |
| borderStyle | string | 否 | tabBar上边框的颜色，仅支持 black/white。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.setTabBarStyle({ 
  color: '#FF0000',
  success: (res) => { 
    console.info('setTabBarStyle回调成功', res); 
  }, 
  fail: (err) => { 
    console.error('setTabBarStyle回调失败', err); 
  }, 
  complete: (res) => { 
    console.info('setTabBarStyle回调完成', res); 
  } 
});
```

## has.setTabBarItem

has.setTabBarItem (Object object)

动态设置tabBar某一项的内容。

**起始版本：** 1.0.15

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | number | 是 | tabBar的哪一项，从左边算起，起始index为0。 |
| text | string | 否 | tab上的按钮文字。 |
| iconPath | string | 否 | 图片路径，icon大小限制为40kb，建议尺寸为81px \* 81px，不支持网络图片。 |
| selectedIconPath | string | 否 | 选中时的图片路径，icon大小限制为40kb，建议尺寸为81px \* 81px，不支持网络图片。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.setTabBarItem({ 
  index: 1,
  text: 'text',
  success: (res) => { 
    console.info('setTabBarItem回调成功', res); 
  }, 
  fail: (err) => { 
    console.error('setTabBarItem回调失败', err); 
  }, 
  complete: (res) => { 
    console.info('setTabBarItem回调完成：', res); 
  } 
});
```
