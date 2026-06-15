# rich-text

富文本容器。文本内容直接写在标签内容区。

**起始版本：** 1.0.0

## 约束与限制

- 文本内容只支持静态内容。
- 由于实时编译，文本内容尽量不要频繁改变，否则可能导致性能问题。

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| nodes | array/string | [] | 否 | 节点列表/HTML String。 |
| space | string | - | 否 | 显示连续空格，取值为ensp、emsp、nbsp：<br/>ensp：中文字符空格一半大小。<br/>emsp：中文字符空格大小。<br/>nbsp：根据字体设置的空格大小。 |
| user-select | boolean | false | 否 | 文本是否可选。 |

### nodes

现支持两种节点，通过type来区分，分别是元素节点和文本节点，默认是元素节点，在富文本区域里显示的HTML节点。

- **元素节点：type = node**  

  | 属性 | 说明 | 类型 | 必填 | 描述 |
  | -------- | -------- | -------- | -------- | -------- |
  | name | 标签名 | string | 是 | 支持部分受信任的 HTML 节点。 |
  | attrs | 属性 | object | 否 | 支持部分受信任的属性，遵循 Pascal 命名法。 |
  | children | 子节点列表 | array | 否 | 结构和 nodes 一致。 |

- **文本节点：type = text**  

  | 属性 | 说明 | 类型 | 必填 | 描述 |
  | -------- | -------- | -------- | -------- | -------- |
  | text | 文本 | string | 是 | 支持entities。 |

### 受信任的HTML节点及属性

> **说明：**
>
> - 全局支持class和style属性，**不支持id属性**。
> - 如果使用了不受信任的HTML节点，该节点及其所有子节点将会被移除。
> - name属性大小写不敏感，建议使用小写。
> - rich-text里面写js不支持事件执行。
> - attrs属性不支持id支持 class。

| 节点 | 属性 |
| -------- | -------- |
| a | - |
| abbr | - |
| address | - |
| article | - |
| aside | - |
| b | - |
| bdi | - |
| bdo | dir |
| big | - |
| blockquote | - |
| br | - |
| caption | - |
| center | - |
| cite | - |
| code | - |
| col | span, width |
| colgroup | span, width |
| dd | - |
| del | - |
| div | - |
| dl | - |
| dt | - |
| em | - |
| fieldset | - |
| font | - |
| footer | - |
| h1 | - |
| h2 | - |
| h3 | - |
| h4 | - |
| h5 | - |
| h6 | - |
| header | - |
| hr | - |
| i | - |
| img | alt, src, height, width |
| ins | - |
| label | - |
| legend | - |
| li | - |
| mark | - |
| nav | - |
| ol | start, type |
| p | - |
| pre | - |
| q | - |
| rt | - |
| ruby | - |
| s | - |
| section | - |
| small | - |
| span | - |
| strong | - |
| sub | - |
| sup | - |
| table | width |
| tbody | - |
| td | colspan, rowspan, height, width |
| tfoot | - |
| th | colspan, rowspan, height, width |
| thead | - |
| tr | - |
| tt | - |
| u | - |
| ul | - |

## 示例

hxml文件

```html
<view>
  <view>通过HTML String渲染</view>
  <view>
    <scroll-view scroll-y>{{htmlSnip}}</scroll-view>
    <button type="primary" bindtap="renderHtml">渲染HTML</button>
    <block has:if="{{renderedByHtml}}">
      <rich-text nodes="{{htmlSnip}}" user-select="{{true}}"></rich-text>
    </block>
  </view>
</view>
<view>
  <view>通过节点渲染</view>
  <view>
    <scroll-view scroll-y>{{nodeSnip}}</scroll-view>
    <button type="primary" bindtap="renderNode">渲染Node</button>
    <block has:if="{{renderedByNode}}">
      <rich-text nodes="{{nodes}}"></rich-text>
    </block>
  </view>
</view>
```

js文件：

```js
Page({
  data: {
    htmlSnip: `<div class="div_class">
      <h1>Title</h1>
      <p class="p">
      Life is&nbsp;<i>like</i>&nbsp;a box of
      <b>&nbsp;chocolates我可以复制</b>.
      </p>
      </div>`,
    nodeSnip: `Page({
      data: {
        nodes: [{
          name: 'div',
          attrs: {
            class: 'div_class',
            style: 'line-height: 30px; color: orange;'
          },
          children: [{
            type: 'text',
            text: 'You never know what you're gonna get.'
          }]
        }]
      }
    })`,
    nodes: [{
      name: "div",
      attrs: {
        class: "div_class",
        style: "line-height: 60px; color:#FFA500;"
      },
      children: [
        {
          type: "text",
          text: "You never know what you're gonna get."
        }
      ]
    }],
    renderedByHtml: false,
    renderedByNode: false
  },
  renderHtml() {
    this.setData({
      renderedByHtml: true
    });
  },
  renderNode() {
    this.setData({
      renderedByNode: true
    });
  }
});
```
