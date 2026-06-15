# Component

开发者可以调用Component指定自定义组件的属性、数据、方法、生命周期函数等。

## Component

Component(Object object)

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 定义段 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| properties | object map | 否 | 组件对外属性的定义。详细内容参见“[properties说明](#properties)”。 |
| data | object | 否 | 组件的内部数据，和 properties 一同用于组件的模板渲染。 |
| observers | object | 否 | 组件数据字段监听器，用于监听 properties 和 data 的变化。 |
| methods | object | 否 | 组件的自定义方法，可用于事件响应。 |
| behaviors | string array | 否 | 组件间代码复用机制。 |
| created | function | 否 | 组件生命周期函数（在组件实例被创建时执行）。 |
| attached | function | 否 | 组件生命周期函数（在组件实例进入页面节点树时执行）。 |
| ready | function | 否 | 组件生命周期函数（在组件布局完成后执行）。 |
| moved | function | 否 | 组件生命周期函数（在组件实例被移动到节点树另一个位置时执行）。 |
| detached | function | 否 | 组件生命周期函数（在组件实例从页面中移除时执行）。 |
| relations | object | 否 | 组件间关系定义。 |
| externalClasses | string array | 否 | 组件接受的外部样式类。 |
| options | object | 否 | 一些选项（如[组件样式隔离](custom-components-style-isolation.md#组件样式隔离)）。 |
| lifetimes | object | 否 | 组件生命周期声明对象。 |
| pageLifetimes | object | 否 | 组件所在页面的生命周期声明对象。 |
| definitionFilter | function | 否 | 定义段过滤器，用于自定义组件扩展。 |

## 组件实例属性

在组件自定义方法、生命周期函数、属性 observer 方法中都可以通过 this 访问当前组件实例。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| is | string | 组件的文件路径。 |
| id | string | 节点 id。 |
| dataset | string | 节点 dataset。 |
| data | object | 组件数据，包括内部数据和属性值。 |
| properties | object | 组件数据，包括内部数据和属性值（this.data === this.properties） |


## 组件实例方法

| 方法 | 参数 | 描述 |
| -------- | -------- | -------- |
| setData | object | 设置 data 并触发渲染层更新。 |
| hasBehavior | object | 检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有 behavior）。 |
| triggerEvent | string, object | 触发事件。 |
| createSelectorQuery | - | 创建一个SelectorQuery对象，选择器选取范围为这个组件实例内。 |
| createIntersectionObserver | - | 创建一个IntersectionObserver对象，选择器选取范围为这个组件实例内。 |
| selectComponent | string | 选择组件实例节点，返回匹配到的第一个组件实例对象（返回结果受 has://component-export 影响）。 |
| selectAllComponents | string | 选择组件实例节点，返回匹配到的全部组件实例对象组成的数组。 |
| selectOwnerComponent | - | 选取当前组件节点所在的组件实例（即组件的引用者），返回它的组件实例对象（会被 has://component-export 影响）。 |
| getRelationNodes | string | 获取这个关系所对应的所有关联节点。 |
| groupSetData | function | 立刻执行 callback。 |
| getTabBar | - | 返回当前页面的 custom-tab-bar 的组件实例。 |
| getPageId | - | 返回页面标识符（一个字符串），可以用于判断几个自定义组件实例是不是在同一个页面内。 |

示例代码如下：

```js
Component({
  behaviors: [],
  properties: {
    propName: {
      // 属性名
      type: String,
      value: ''
    },
    propName2: String // 简化的定义方式
  },
  data: {}, // 组件内数据，可用于模板渲染
  lifetimes: {
    // 生命周期函数
    attached: function() { },
    detached: function() { },
    ready: function() { }
  },
  pageLifetimes: {
    // 所在页面的生命周期函数
    show: function() { },
    hide: function() { }
  },
  methods: {
    handleTap: function() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法一致
      });
    }
  }
});
```


## properties

> **说明：**
> 
> - 在 'properties' 定义段中，属性名采用驼峰写法（'propertyName'）；在 hxml 文件中，标签属性名应使用连字符写法（如component-tag-name property-name="attr value"），应用于数据绑定时采用驼峰写法（attr=""）。
> 
> - 直接修改this.data的值无法触发页面更新，应使用setData修改。
> 
> - Component定义段properties和data里的字段名不能相同，否则在修改properties时，将会导致data的同名字段被覆盖。


| **定义段** | **类型** | **必填** | **描述** |
| -------- | -------- | -------- | -------- |
| type | - | 是 | 属性的类型。可以为String、Number、Boolean、Object、Array，不设置代表类型不限。 |
| optionalTypes | array | 否 | 属性的类型（可以指定多个）。 |
| value | - | 否 | 属性的初始值。 |
| observer | function | 否 | 属性值变化时的回调函数。可以监听属性值的改变，第一个参数是新的值，第二个参数是旧的值。 |


**示例：**


```js
Component({
  properties: {
    min: {
      type: Number,
      value: 0,
      observer: function(newValue, oldValue) {
        // 属性值变化时执行
      }
    },
  },
});
```


## 使用Component构造页面

ASCF框架的页面也可以视为自定义组件。因而，页面也可以使用 Component 构造器构造，拥有与普通组件一样的定义段与实例方法。

此时，组件的属性可以用于接收页面的参数，如访问页面 /pages/detail/detail?paramA=abc&amp;paramB=999 ，如果声明有属性 paramA 或 paramB ，则它们会被赋值为 abc 或 999 。

页面的生命周期方法（即 on 开头的方法），应写在 methods 定义段中。

示例代码如下：

```js
Component({
  properties: {
    paramA: String,
    paramB: Number,
  },
  methods: {
    onLoad: function() {
      this.data.paramA; // 页面参数 paramA 的值
      this.data.paramB; // 页面参数 paramB 的值
    }
  }
});
```
