# 定时器

## setInterval

setInterval(function callback, number delay, any rest)

设定一个定时器，重复执行callback函数，时间间隔为delay。

> **说明：**
>
> 元服务具备切换到后台冻结的机制：在元服务调用API接口时，如未申请后台权限，会在元服务被切换到后台时停止执行。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 回调函数 。 |
| delay | number | 是 | 执行回调函数的时间间隔，单位ms。<br/>兼容数字的字符串，不传、传入非数字的字符串或其它类型，默认按0处理。 |
| rest | any | 否 | param1, param2, ...等附加参数，它们会作为参数传递给回调函数。 |

**返回值：**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| intervalID | string | 定时器ID |


```js
// 创建定时器
const intervalID = setInterval((params1, params2) => {
  console.info('setInterval success', params1, params2);
// 打印定时器ID
console.info('intervalID: ', intervalID);
```

## clearInterval

clearInterval(string intervalID)

取消由setInterval设置的定时器。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| intervalID | string | 是 | 取消定时器的ID 。|

**示例：**

```js
// 创建定时器
const intervalID = setInterval((params1, params2) => {
  console.info('setInterval success', params1, params2);
}, 3000, 'param1', 'param2');
// 取消创建的定时器
clearInterval(intervalID);
```

## setTimeout

setTimeout(function callback, number delay, any rest)

设定一个定时器，仅执行一次，等待delay时长后，执行callback函数。

> **说明：**
>
> 元服务具备切换到后台冻结的机制：在元服务调用API接口时，如未申请后台权限，会在元服务被切换到后台时停止执行。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 回调函数 。 |
| delay | number | 是 | 执行回调函数之间的时间间隔，单位ms。<br/>兼容数字的字符串，不传、传入非数字的字符串或其它类型，默认按0处理。 |
| rest | any | 否 | param1, param2, ...等附加参数，它们会作为参数传递给回调函数。 |

**返回值：**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| timeoutID | string | 定时器ID |

**示例：**

```js
// 创建定时器
const timeoutID = setTimeout((params1, params2) => {
  console.info('setTimeout success', params1, params2);
}, 3000, 'param1', 'param2');
// 打印定时器ID
console.info('timeoutID: ', timeoutID);
```

## clearTimeout

clearTimeout(string timeoutID)

取消由setTimeout设置的定时器。


**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| timeoutID | string | 是 | 取消定时器的ID 。 |

**示例：**

```js
// 创建定时器
const timeoutID = setTimeout((params1, params2) => {
  console.info('setTimeout success', params1, params2);
}, 3000, 'param1', 'param2');
// 取消创建的定时器
clearTimeout(timeoutID);
```
