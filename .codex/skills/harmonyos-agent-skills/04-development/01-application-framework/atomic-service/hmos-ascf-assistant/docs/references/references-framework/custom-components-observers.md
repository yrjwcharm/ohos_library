# 数据监听器observers

数据监听器用于监听和响应任何属性和数据字段的变化。

## 使用方法

使用setData设置一些数据字段时，经常需要对其他数据进行同步操作。

例如，this.data.sum是this.data.numberOne与this.data.numberTwo的和，当numberOne或者numberTwo变动时，需要重新计算sum的值，这时就可以利用数据监听器实现。

```js
Component({
  attached: function() {
    this.setData({
      numberOne: 1,
      numberTwo: 2
    });
  },
  observers: {
    'numberOne, numberTwo': function(numberOne, numberTwo) {
      // 在 numberOne 或者 numberTwo 被设置时，执行这个方法
      this.setData({
        sum: numberOne + numberTwo
      });
    }
  }
});
```

## 监听字段

数据监听器支持监听属性或数据的变化，可以同时监听多个字段，但一次setData最多触发每个监听器一次。同时，监听器也可以监听子数据字段。

示例代码如下：

```js
Component({
  observers: {
    'obj.field': function(field) {
      // 使用 setData 设置 this.data.obj.field 时触发
      // 使用 setData 设置 this.data.obj 也会触发
      field === this.data.obj.field;
    },
    'arr[10]': function(arr10) {
      // 使用 setData 设置 this.data.arr[10] 时触发
      // 使用 setData 设置 this.data.arr 也会触发
      arr10 === this.data.arr[10];
    }
  }
});
```

如果需要监听某个对象所有子数据字段的变化，可以使用通配符\*\*。

```js
Component({
  observers: {
    'obj.field.**': function(field) {
      // 使用 setData 设置 this.data.obj.field 本身或其下任何子数据字段时触发
      // 使用 setData 设置 this.data.obj 也会触发
      field === this.data.obj.field;
    }
  },
  ready: function() {
    // 这样会触发上面的 observer
    this.setData({
      'obj.field': {}
    });
    // 这样也会触发上面的 observer
    this.setData({
      'obj.field.xxx': {}
    });
    // 这样还是会触发上面的 observer
    this.setData({
      obj: {}
    });
  }
});
```

另外， 使用通配符\*\*可以监听全部 setData。

```js
Component({
  observers: {
    '**': function() {
      // 每次 setData 都会触发
    }
  }
});
```
