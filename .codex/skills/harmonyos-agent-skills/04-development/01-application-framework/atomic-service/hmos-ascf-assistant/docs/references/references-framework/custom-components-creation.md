# 创建自定义组件

和page类似，自定义组件也由json、hxml、css、js四类文件组成。

以index页面和my-component组件为例，目录结构如下：

```txt
// 页面 index 及自定义组件 my-component 项目结构
└── index
├── components
│ └── my-component
│ ├── my-component.css
│ ├── my-component.js
│ ├── my-component.json
│ └── my-component.hxml
├── index.css
├── index.js
├── index.json
└── index.hxml
```

定义一个自定义组件有以下几个步骤。

在 json 文件中声明 "component": true。

```json
{
  "component": true
}
```

在 js 文件中调用 Component 构造方法。

```js
// my-component.js
Component({
  // 定义组件内部数据
  data: {
    name: 'custom-component'
  },
  // 自定义组件内部方法
  methods: {
    customMethod() {}
  }
});
```

在 hxml 文件中编写组件模板，详细内容参见[组件的模板](custom-components-template.md)。

```html
<view class="custom">
  {{name}}
</view>
```

在 css 文件中编写组件样式。

```css
/* my-component.css */
/* 组件内部样式 */
.custom {
    color: red;
}
```
