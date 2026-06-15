# 消息订阅

## has.requestSubscribeMessage

has.requestSubscribeMessage(Object object)

订阅消息。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| tmplIds | Array&lt;string&gt; | - | 是 | 需要订阅的消息模板的id的集合，一次调用最多可订阅3条消息。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errMsg | string | 接口调用成功时errMsg值为'requestSubscribeMessage:ok'。 |
| [TEMPLATE_ID:string] | string | [TEMPLATE_ID]是动态的键，即模板id，值包括'accept'、'reject'、'ban'、'filter'。'accept'表示用户同意订阅该条id对应的模板消息，'reject'表示用户拒绝订阅该条id对应的模板消息，'ban'表示已被后台封禁，'filter'表示该模板因为模板标题同名被后台过滤。 |

**示例：**

```js
has.requestSubscribeMessage({
  tmplIds: [''],
  success: (res) => {
    console.info('requestSubscribeMessage success', res);
  },
  fail: (err) => {
    console.error('requestSubscribeMessage fail', err);
  },
  complete: (res) => {
    console.info('requestSubscribeMessage complete', res);
  }
});
```
