# 组件样式及隔离策略

组件对应 css 文件的样式，只对组件 hxml 内的节点生效。编写组件样式时，需要注意以下几点：

- 继承样式，如 font 、 color ，会从组件外继承到组件内。
- 自定义组件的样式类相互隔离，无法跨组件使用。
- 组件内也可直接使用 app.css 和页面中定义的样式类。

## 组件样式隔离

通常情况下，自定义组件的样式只受到自定义组件 css 的影响，除此之外，开发者可以通过指定特殊的样式隔离选项 styleIsolation 达到不同的样式隔离效果。styleIsolation可以在JS文件的options中配置。

```js
Component({
  options: {
    styleIsolation: 'isolated'
  }
})
```

styleIsolation 选项支持以下取值：

- isolated：表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）。
- apply-shared：表示页面css样式将影响到自定义组件，但自定义组件css中指定的样式不会影响页面。
- shared：表示页面css样式将影响到自定义组件，自定义组件css中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。

此外，可以在Component的options中设置addGlobalClass: true。这个选项等价于设置styleIsolation: apply-shared，但设置了styleIsolation选项后这个选项会失效。

```js
Component({
  options: {
    addGlobalClass: true
  }
})
```

自定义组件JSON中的styleIsolation选项从ASCF运行时1.0.15，ASCF Toolkit 1.0.10开始支持，JSON配置中的styleIsolation优先级高于JS中的配置。

```js
{
  "styleIsolation": "isolated"
}
```


## 外部样式类

当组件需要接受外部传入的样式类时可以在Component中用externalClasses字段定义若干个外部样式类。

该特性可以用于实现类似于view组件的hover-class属性：页面可以提供一个样式类，赋予view的hover-class，该样式类本身在页面实现，而非view组件。

**示例：**

```js
// 组件 custom-component.js
Component({
  externalClasses: ['my-class']
});
```

```html
<!-- 组件 my-component.hxml -->
<view class="my-class">这段文本的样式由组件外的 class 决定</view>
```

按以上示例定义好组件后，可以指定这个样式类对应的class，与普通属性的使用方法一致。

**示例：**

```html
<!-- 页面hxml -->
<my-component my-class="red-text" />
<my-component my-class="large-text" />
<my-component my-class="red-text large-text" />
```

```js
.red-text {
    color: red;
}
.large-text {
    font-size: 1.5em;
}
```
