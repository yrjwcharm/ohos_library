# hxml

传统网页开发采用的是HTML + CSS + JS的组合，其中 HTML 是用来描述当前这个页面的结构，CSS 用来描述页面的样式，JS 用于编写页面逻辑和交互。

ASCF框架中也是类似的，差异在于ASCF框架中用 hxml 替代了HTML。

通过以下一些简单的例子可以了解 hxml 具有的能力。

## 数据绑定

```html
<!--hxml文件-->
<view>{{ message }}</view>
```

```js
// page.js
Page({
  data: {
    message: 'Hello World!'
  }
});
```

## 列表渲染

```html
<!--hxml文件-->
<view has:for="{{ array }}" has:for-index="idx">{{ item }}</view>
```

```js
// page.js
Page({
  data: {
    array: [0, 1, 2, 3, 4]
  }
});
```

## 条件渲染

```html
<!--hxml文件-->
<view has:if="{{view==='Harmony'}}">Harmony</view>
<view has:elif="{{view==='ASCF'}}">ASCF</view>
<view has:else>UNKNOWN</view>
```

```js
// page.js
Page({
  data: {
    view: 'ASCF'
  }
});
```

## 模板

```html
<!--hxml文件-->
<template name="sportTemplate">
  <view>
    sport: {{sport}}, level: {{level}}
  </view>
</template>

<template is="sportTemplate" data="{{...sportA}}"></template>
<template is="sportTemplate" data="{{...sportB}}"></template>
<template is="sportTemplate" data="{{...sportC}}"></template>
```

```js
// page.js
Page({
  data: {
    sportA: {sport: 'basketball', level: 1},
    sportB: {sport: 'football', level: 2},
    sportC: {sport: 'tennis', level: 3}
  }
});
```
