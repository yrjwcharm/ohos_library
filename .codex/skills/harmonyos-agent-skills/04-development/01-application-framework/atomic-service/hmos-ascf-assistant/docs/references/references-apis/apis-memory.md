# 内存

## has.onMemoryWarning

has.onMemoryWarning(function callback)

监听内存不足告警事件。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 当HarmonyOS向元服务进程发出内存警告时，该事件将被触发。触发此事件并不意味着元服务进程会中断；大多数情况下，这只是警告。开发者在收到通知后，可以通过回收一些不必要的资源来避免进一步加剧内存紧张。 |

**callback监听事件：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| level | number | 内存告警等级。<br/>合法值：<br/>5：整机可用内存适中。<br/>10：整机可用内存低。<br/>15：整机可用内存极低。 |

**示例：**

```js
has.onMemoryWarning(function(res) {
  console.info('onMemoryWarning callback triggered', res.level);
})
```

## has.offMemoryWarning

has.offMemoryWarning(function callback)

移除内存不足告警事件的监听函数。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onMemoryWarning](#hasonmemorywarning)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const onMemoryWarningFn= function(res) { 
  console.info('onMemoryWarning callback triggered', res.level); 
}
has.onMemoryWarning(onMemoryWarningFn);
has.offMemoryWarning(onMemoryWarningFn); // 需传入与监听时同一个的函数对象。
```
