# 占位组件

在使用[分包异步化](../../guides/asynchronous-subcontracting.md)或[用时注入](../../guides/on-demand-render-time-injection.md#用时注入)特性时，自定义组件所引用的其他自定义组件在最初渲染时可能不可用。为了不阻塞渲染过程，不可用的自定义组件需使用**占位组件（Component placeholder）** 。基础库将用占位组件替换不可用组件进行渲染，当该组件可用时再将其替换回来。

自定义组件的占位组件可以是另一个自定义组件或一个内置组件。

## 约束与限制

- 如果一个组件需作为其他组件的占位组件，它必须从一开始就可用，否则编译时会提示错误。
- 如果指定的占位组件为自定义组件且该自定义组件不存在，则占位组件将默认渲染为 view 组件。
- 如果有占位组件的组件在其他组件或页面使用时已被注入，占位组件将不会渲染。

## 配置

页面或自定义组件对应的JSON配置中的**componentPlaceholder**字段用于指定占位组件，如：

```json
{
  "usingComponents": {
    "comp-a": "./comp/compA"
  },
  "componentPlaceholder": {
    "comp-a": "view"
  }
}
```

该配置表示：

组件 comp-a 的占位组件为内置组件 view。

如果配置对应模板如下：

```html
<comp-a>占位组件</comp-a>
```

comp目录下compA.hxml：

```html
<view>compA</view>
```

在元服务启动时，页面将被渲染为：

```html
<view>占位组件</view>
```

框架在comp-a注入完成后才会将占位组件替换。

```html
<view>compA</view>
```
