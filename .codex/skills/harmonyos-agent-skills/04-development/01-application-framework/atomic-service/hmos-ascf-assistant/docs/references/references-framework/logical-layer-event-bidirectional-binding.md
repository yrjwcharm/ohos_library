# 双向绑定

在部分场景中，需要在用户输入的同时改变service层对应的字段值，此时可以使用引擎提供的双向绑定能力，例如：

在对应项目之前加入model: 前缀，这样，如果输入框的值被改变了，this.data.value也会同时改变。同时，hxml中所有绑定了value的位置也会被一起更新，数据监听器也会被正常触发。

```html
<input model:value="{{value}}" />
```

当前支持双向绑定的组件属性：

| 组件名 | 属性名 |
| -------- | -------- |
| check-box | checked |
| input | value |
| map | latitude |
| map | longitude |
| map | scale |
| map | rotate |
| map | skew |
| radio | checked |
| slider | value |
| text-area | value |

此外，自定义组件中也可以使用双向绑定，使用方法类似于内置组件。

如下的自定义组件：

```js
// custom-component.js
Component({
  properties: {
    myValue: String
  }
});
```

```html
<!-- custom-component.hxml -->
<input model:value="{{myValue}}" />
```

自定义组件将自身的myValue属性双向绑定到了组件内输入框的value属性上。这样，如果页面这样使用这个组件：

```html
<custom-component model:my-value="{{pageValue}}" />
```

当输入框的值变更时，自定义组件的myValue属性会同时变更，这样，页面的this.data.pageValue也会同时变更，页面中所有绑定了pageValue的位置也会被一同更新。

也可以通过setData设置自身的属性的方式触发自定义组件的双向绑定更新，如下：

```js
// custom-component.js
Component({
  properties: {
    myValue: String
  },
  methods: {
    update: function() {
      // 更新 myValue
      this.setData({
        myValue: 'leaf'
      });
    }
  }
});
```

如果页面这样使用这个组件：

```html
<custom-component model:my-value="{{pageValue}}" />
```

当组件使用setData更新myValue时，页面的this.data.pageValue也会同时变更，页面hxml中所有绑定了pageValue的位置也会被一同更新。
