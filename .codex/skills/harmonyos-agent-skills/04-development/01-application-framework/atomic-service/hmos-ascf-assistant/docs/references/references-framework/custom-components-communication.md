# 组件之间通信

组件间的基本通信方式有三种:

- 定义子组件properties：用于父组件向子组件的指定属性设置数据。具体在[Component](custom-components-component.md#properties)章节中介绍。
- 定义事件：用于子组件向父组件传递数据。
- 如果以上方式不足以满足需要，父组件还可以通过this.selectComponent方法获取子组件实例对象，这样就可以直接访问组件的任意数据和方法。

## 监听事件

自定义组件可以触发任意的事件，父组件可以监听这些事件。监听自定义组件事件的方法与监听基础组件事件的方法是一致的。关于事件的基本概念和用法，参见[事件系统](logical-layer-events.md)。

示例代码如下：

```html
<!-- 自定义组件触发“myevent”事件时，调用“myEventListener”方法 -->
<my-component bindmyevent="myEventListener" />
<!-- 也可以写成 -->
<my-component bind:myevent="myEventListener" />
```

```js
Page({
  myEventListener: function(e){
    console.info(e.detail); // 自定义组件触发事件时提供的detail对象
  }
});
```

## 触发事件

自定义组件使用 triggerEvent 触发事件，触发时需要指定事件名和 detail 对象和事件选项。

示例代码如下：

```html
<!-- 在子组件中 -->
<button bindtap="onTap">点击这个按钮将触发“myevent”事件</button>
```

```js
// 自定义组件 my-component
Component({
  properties: {},
  methods: {
    onTap: function(){
      let myEventDetail = {}; // detail对象，提供给事件监听函数
      let myEventOption = {}; // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption);
    }
  }
});
```

| 选项名 | 类型 | 必填 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| bubbles | Boolean | 否 | false | 事件是否冒泡。 |
| composed | Boolean | 否 | false | 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部。 |
| capturePhase | Boolean | 否 | false | 事件是否拥有捕获阶段。 |

关于冒泡和捕获阶段的概念，请阅读[事件系统](logical-layer-events.md)章节中的相关说明。

## 获取组件实例

父组件里可以通过调用 this.selectComponent ，获取子组件的实例对象，调用时需要传入一个匹配选择器 selector，如：this.selectComponent(".my-cust-component")。

selector详细语法可查看[selector语法](../references-apis/apis-hxml.md#selectorqueryselect)参考文档。（this.selectComponent暂不支持跨自定义组件的后代选择器语法）

示例代码如下：

```js
// 父组件
Page({
  getChildComponent: function() {
    const child = this.selectComponent('.my-cust-component');
    console.info(child);
  }
});
```

在上例中，父组件将会获取class为my-cust-component的子组件实例对象，即子组件的this。

## 自定义的组件实例获取结果

若需要自定义 selectComponent 返回的数据，可使用内置 behavior: has://component-export

使用该 behavior 时，自定义组件中的 export 定义段将用于指定组件被 selectComponent 调用时的返回值。

示例代码如下：

```js
// 自定义组件 my-component
Component({
  behaviors: ['has://component-export'],
  export() {
    return { myField: 'myValue' };
  }
});
```

```html
<!-- 使用自定义组件 -->
<my-component id="my-id" />
```

```js
Page({
  getChildComponentById: function() {
    // 父组件调用
    const child = this.selectComponent('#my-id'); // 返回 { myField: 'myValue' }
    console.info(child);
  }
});
```

在上例中，父组件获取 id 为 my-id 的子组件实例的时候，得到的是对象 { myField: 'myValue' } 。
