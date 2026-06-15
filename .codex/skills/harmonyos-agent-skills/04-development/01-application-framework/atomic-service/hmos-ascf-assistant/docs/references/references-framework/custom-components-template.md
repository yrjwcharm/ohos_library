# 组件模板与数据绑定

## 组件模板

语法和页面模板相同。组件模板与组件数据结合后生成的节点树，在引用位置上渲染。

在组件模板中可以使用&lt;slot&gt;插槽，用于传递子节点内容。

**示例：**

```html
<!--组件 hxml-->
<view class="custom">
  <view>这里是组件的内部节点</view>
  <slot></slot>
</view>
```

```html
<!--页面 hxml-->
<view>
  <my-component>
    <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
    <view>这里是插入到组件slot中的内容</view>
  </my-component>
</view>
```

## 模板数据绑定

与普通的hxml模板类似，可以使用数据绑定向子组件属性传递动态数据。

**示例：**

```html
<view>
  <my-component propA={{pagePropA}}>
    <view>组件模板数据绑定示例</view>
  </my-component>
</view>
```

在以上示例中，组件的属性propA将收到页面传递的数据pagePropA。页面可以通过setData来改变绑定的数据字段。
