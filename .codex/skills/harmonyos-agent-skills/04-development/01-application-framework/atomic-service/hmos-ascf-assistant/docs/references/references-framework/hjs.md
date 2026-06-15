# hjs

hjs是ASCF框架的一套脚本语言，结合hxml一起来构建页面。

hjs代码可以编写在hxml文件中的&lt;hjs&gt;标签内，也可以单独写在 .hjs 文件内。每一个&lt;hjs&gt;标签和.hjs文件都是一个单独的模块。

以下是一个使用 hjs 的简单示例：

```js
// test.hjs
var testData = 'Hello AtomicService';
var testFun = function(param) {
  return param;
};

module.exports = {
  testData: testData,
  testFun: testFun
};
```

```html
<!--index.hxml-->
<hjs src="./test.hjs" module="test"/>
<view> {{ test.testData }}</view>
<view> {{ test.testFun(msg) }}</view>
```

```js
// index.js
Page({
  data: {
    msg: "hello world"
  }
});
```
