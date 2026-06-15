# 使用自定义组件

在页面的 json 文件中进行引用声明，即在 usingComponents 字段下设置标签名及对应的组件路径。

```js
{
  "usingComponents": {
    "my-component": "./components/my-component/my-component"
  }
}
```

在页面的 hxml 中就可以像使用基础组件一样使用自定义组件，节点名为自定义组件的标签名。

```html
<!--index.hxml -->
<view>
  <my-component />
</view>
```

> **说明：**
>
> - app.json 字段 usingComponents 里声明的自定义组件是全局组件，可以在所有页面和自定义组件中直接使用，无需再次声明。
> - 自定义组件也可以引用自定义组件，引用方法类似于页面引用自定义组件的方式（使用 usingComponents 字段）。
