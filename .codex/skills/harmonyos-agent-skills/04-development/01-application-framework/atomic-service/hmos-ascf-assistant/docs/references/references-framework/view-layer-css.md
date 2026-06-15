# CSS

ASCF框架样式和网页CSS样式大体相同，用于描述hxml的组件样式，决定hxml的组件显示效果。

为了更适合开发元服务，ASCF对CSS进行了扩充，扩充的特性有样式导入、全局样式与局部样式等。

## rpx

ASCF框架样式支持rpx (responsive pixel)单位，rpx单位根据屏幕宽度进行自适应，规定屏幕宽度为750rpx。


## 样式导入

使用\@import语句可以导入外联样式表。\@import后需要加上外联样式表路径，用“;”表示结束。

**示例代码：**

```js
/** /page/common/index.css **/
.import-color {
    color: red;
}
```

```js
/** /page/index/index.css **/
@import "/page/common/index.css";
.classColor {
    color: blue;
}
```

## 内联样式

支持使用style、class属性来控制组件的样式。

**示例代码：**

- style：用于接收动态样式，样式在运行时会进行解析。  

  ```html
  <view style="color:{{styleColor}};" />
  ```

- class：用于指定样式规则。属性值是样式规则中类选择器名（样式类名）的集合，样式类名不需要带上“.”，样式类名之间用空格分隔。  

  ```html
  <view class="classColor" />
  ```

## 选择器

目前支持的选择器有：

| 选择器 | 样例 | 描述 |
| -------- | -------- | -------- |
| 类选择器 | .classColor | 选择拥有class="classColor"的组件 |
| ID选择器 | \#idColor | 选择拥有id="idColor"的组件 |
| 标签选择器 | view | 选择所有view组件 |
| after伪元素选择器 | view::after | 在view组件后插入内容 |
| before伪元素选择器 | view::before | 在view组件前插入内容 |

## 全局样式与局部样式

- 定义在app.css中的样式为全局样式，所有页面和自定义组件内均可使用。

- 页面文件夹内的.css文件中定义的样式为局部样式，只作用于对应的页面，会覆盖app.css中相同的选择器样式。
