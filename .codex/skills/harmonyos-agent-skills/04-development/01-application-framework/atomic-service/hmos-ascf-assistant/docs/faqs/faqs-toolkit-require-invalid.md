# require的用法，出现功能失效的情况。

**问题现象**

下面是一个简单的示例代码

```js
function test(require) { // require作为函数参数引入
  let a = require('./test.js');
  let b = a(1, 2);
  this.setData({
    value: b
  });
}
```

运行点击调用JS失效。

原因：Webpack静态分析依赖require作为全局标识符，一旦它被函数参数遮蔽（shadowed），就会彻底失效。

**解决措施**

可以参考：把`require`调用挪出参数列表，回到可被静态识别的位置即可。