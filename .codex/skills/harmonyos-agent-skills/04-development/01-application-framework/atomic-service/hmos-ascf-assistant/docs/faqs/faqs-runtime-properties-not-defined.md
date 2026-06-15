# 自定义组件未定义properties属性，传参为空

**问题现象**

当开发者未定义properties属性时，在attached中打印的数据将不会包含父组件传递的属性。

问题样例如下所示。

```js
Component({
  data: {
    id: 100,
  },
  lifetimes: {
    attached () {
      console.info('Component', this.properties)
    },
    detached () {
      console.info('[Component] detached');
    }
  },
});
```


**解决措施**

开发者在自定义组件时，需在properties中添加相应的属性名称。

```js
properties:{
  compName: {
    type: String,
    value: ''
  },
},
```
