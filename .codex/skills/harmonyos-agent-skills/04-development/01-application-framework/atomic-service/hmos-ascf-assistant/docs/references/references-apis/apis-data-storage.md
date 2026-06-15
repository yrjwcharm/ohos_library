# 数据缓存

## has.setStorageSync

has.setStorageSync(string key, string | object | number | boolean | null | array data)

setStorage的同步接口，将数据存储在本地缓存中指定的key中。将覆盖原来该key中的内容。

数据一直可用，直到用户主动删除。

单个key允许存储的最大数据长度为1MB，所有数据存储上限为10MB。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| key | string | 是 | 保存的本地缓存数据的key。 |
| data | string \| object \| number \| boolean \| null \| array | 是 | 需要存储的内容。只支持基础类型及能够通过JSON.stringify序列化的对象。 |

**示例：**

```js
has.setStorageSync('key', 'value');
```

## has.setStorage

has.setStorage(Object object)

setStorageSync的异步接口，将数据存储在本地缓存中指定的key中。将覆盖原来该key中的内容。

数据一直可用，直到用户主动删除。

单个key允许存储的最大数据长度为1MB，所有数据存储上限为10MB。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| key | string | 是 | 保存的本地缓存数据的key。 |
| data | string \| object \| number \| boolean \| null \| array | 是 | 需要存储的内容。只支持基础类型及能够通过JSON.stringify序列化的对象。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.setStorage({
  key: 'key',
  data: 'test',
  success: (res) => {
    console.info('setStorage success');
  },
  fail: (err) => {
    console.error('setStorage fail', err);
  },
  complete: (res) => {
    console.info('setStorage complete', res);
  }
});
```

## has.removeStorageSync

has.removeStorageSync(string key)

删除指定key的缓存。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| key | string | 是 | 要删除缓存的key。 |

**示例：**

```js
has.removeStorageSync('key');
```

## has.removeStorage

has.removeStorage(Object object)

removeStorageSync的异步接口，删除指定key的缓存。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| key | string | 是 | 要删除缓存的key。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.removeStorage({
  key: 'key',
  success: () => {
    console.info('removeStorage success');
  },
  fail: (err) => {
    console.error('removeStorage fail', err);
  },
  complete: (res) => {
    console.info('removeStorage complete', res);
  }
});
```

## has.getStorageSync

has.getStorageSync(string key): Object

获取指定key的缓存。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| key | string | 是 | 要获取缓存的key。 |

**返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | any | 本地缓存中key对应的值。 |

**示例：**

```js
has.getStorageSync('key');
```

## has.getStorageInfoSync

has.getStorageInfoSync(): Object

获取缓存的信息。

**起始版本：** 1.0.0

**返回值**：

返回Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| keys | Array&lt;string&gt; | 本地缓存中所有的key值。 |
| currentSize | number | 当前已申请大小，单位为kb。 |
| limitSize | number | 最大允许申请的大小，单位为kb。 |

**示例：**

```js
const storageInfo = has.getStorageInfoSync();
console.info(storageInfo.keys);
console.info(storageInfo.currentSize);
console.info(storageInfo.limitSize);
```

## has.getStorageInfo

has.getStorageInfo(Object object)

getStorageInfoSync的异步版本，获取缓存的信息。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| keys | Array&lt;string&gt; | 本地缓存中所有的key值。 |
| currentSize | number | 当前已申请大小，单位为kb。 |
| limitSize | number | 最大允许申请的大小，单位为kb。 |

**示例：**

```js
has.getStorageInfo({
  success: (res) => {
    console.info('getStorageInfo success:', res);
  },
  fail: (err) => {
    console.error('getStorageInfo fail:', err);
  },
  complete: (res) => {
    console.info('getStorageInfo complete:', res);
  }
});
```

## has.getStorage

has.getStorage(Object object)

getStorageSync的异步版本，获取指定key的缓存。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| key | string | 是 | 要获取缓存的key。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | any | key对应的内容。 |

**示例：**

```js
has.getStorage({
  key: 'key',
  success: (res) => {
    console.info('getStorage success:', res);
  },
  fail: (err) => {
    console.error('getStorage fail:', err);
  },
  complete: (res) => {
    console.info('getStorage complete:', res);
  }
});
```

## has.clearStorage

has.clearStorage(Object object)

clearStorageSync的异步版本，清空本地缓存。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.clearStorage({
  success: () => {
    console.info('clearStorage success!');
  },
  fail: (err) => {
    console.error('clearStorage fail:', err);
  },
  complete: (res) => {
    console.info('clearStorage complete:', res);
  }
});
```

## has.clearStorageSync

has.clearStorageSync()

清空本地缓存。

**起始版本：** 1.0.0

**示例：**

```js
has.clearStorageSync();
```

## has.batchSetStorageSync

has.batchSetStorageSync(Array&lt;KVPair&gt; kvList): void

将数据批量存储在本地缓存中指定的key中。

会覆盖掉原来该key对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。

单个key允许存储的最大数据长度为1MB，所有数据存储上限为10MB。

**起始版本：** 1.0.12

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| kvList | Array&lt;KVPair&gt; | 是 | 需要批量存储到本地缓存的数据列表。 |

**KVPair接口字段：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| key | string | 是 | 本地缓存中指定的key。 |
| value | any | 是 | 需要存储的内容。只支持基础类型、Date、及能够通过JSON.stringify序列化的对象。 |

**示例：**

```js
try {
  const kvList = [{ key: 'key1', value: 'value1' },{ key: 'key2', value: 'value2' }];
  has.batchSetStorageSync(kvList);
} catch (err) {
  console.error('batchSetStorageSync error', err);
};
```

## has.batchSetStorage

has.batchSetStorage(Object object): void

异步形式将数据批量存储在本地缓存中指定的key中。

会覆盖掉原来该key对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。

单个key允许存储的最大数据长度为1MB，所有数据存储上限为10MB。

**起始版本：** 1.0.12

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| kvList | Array&lt;KVPair&gt; | 是 | KVPair接口包含两个参数：key和value。<br/>key：本地缓存中指定的key。<br/>value： 需要存储的内容，只支持基础类型、Date、及能够通过JSON.stringify序列化的对象。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const kvList = [{ key: 'key1', value: 'value1' }, { key: 'key2', value: 'value2' }];
has.batchSetStorage({
  kvList: kvList,
  success: (res) => {
    console.info('batchSetStorage success', res);
  },
  fail: (err) => {
    console.error('batchSetStorage fail', err);
  },
  complete: (res) => {
    console.info('batchSetStorage complete', res);
  }
});
```

## has.batchGetStorageSync

has.batchGetStorageSync(Array&lt;string&gt; keyList): Array&lt;any&gt;

从本地缓存中同步批量获取指定 key 的内容。

**起始版本：** 1.0.12

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| keyList | Array&lt;string&gt; | 是 | 本地缓存中的key数组。 |

**返回值：**

key对应的内容数组，类型为Array&lt;any&gt;。

**示例：**

```js
try {
  const valueList = has.batchGetStorageSync(['key1','key2']);
  if (valueList) {
    // key对应的内容数组：['value1', 'value2']
  }
} catch (err) {
  console.error('batchGetStorageSync error', err);
};
```

## has.batchGetStorage

has.batchGetStorage(Object object): void

异步形式从本地缓存中批量获取指定 key 的内容。

**起始版本：** 1.0.12

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| keyList | Array&lt;string&gt; | 是 | 本地缓存中的key数组。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errMsg | string | 错误信息。 |
| dataList | Array&lt;any&gt; | 本地缓存中的指定key对应的内容数组。 |

**示例：**

```js
has.batchGetStorage({
  keyList: ['key1', 'key2'],
  success: (res) => {
    // res.dataList: ['value1', 'value2']
    console.info('batchGetStorage success', res.dataList);
  },
  fail: (err) => {
    console.error('batchGetStorage fail', err);
  },
  complete: (res) => {
    console.info('batchGetStorage complete', res);
  }
});
```

## has.setBackgroundFetchToken

has.setBackgroundFetchToken(Object object): void

设置自定义登录状态。在数据预拉取请求发起时携带，便于第三方服务器验证请求合法性。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| token | string | 是 | 自定义的登录态。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
App({
  onLaunch(opts) {
    has.setBackgroundFetchToken({
      token: 'test_token',
      success: () => {
        console.info('setBackgroundFetchToken success!');
      },
      fail: (err) => {
        console.error('setBackgroundFetchToken fail:', err);
      },
      complete: (res) => {
        console.info('setBackgroundFetchToken complete:', res);
      }
    });
  }
});
```

## has.onBackgroundFetchData

has.onBackgroundFetchData(function listener): void

监听预拉取请求是否完成。如果监听时请求已经完成，则事件不触发。

**起始版本：** 1.0.18

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| listener | function | 是 | 预拉取请求事件完成的监听函数。 |

**callback返回值：**

返回的结果包含预拉取类型和缓存数据。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| fetchType | string | 预拉取类型，当前仅支持pre。 |
| fetchedData | Object | 预加载的数据。 |

**示例：**

```js
App({
  onLaunch(options) {
    has.onBackgroundFetchData((res)=>{
      console.info('onBackgroundFetchData listen success:', res.fetchType); // 预拉取类型
      console.info('onBackgroundFetchData listen success:', res.fetchedData); // 缓存数据
    })
  }
});
```

## has.getBackgroundFetchData

has.getBackgroundFetchData(Object object): void

拉取数据预拉取缓存的数据。当调用接口时，若当前预拉取请求未结束，则获取失败。

**起始版本：** 1.0.18

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fetchType | string | 是 | 预拉取类型，当前仅支持pre。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

Object类型，包括以下字段：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| fetchedData | Object | 预加载的数据。 |

**示例：**

```js
has.getBackgroundFetchData({
  fetchType: 'pre',
  success: (res) => {
    console.info('getBackgroundFetchData success', res);
  },
  fail: (err) => {
    console.error('getBackgroundFetchData fail', err);
  },
  complete: (res) => {
    console.info('getBackgroundFetchData complete', res);
  }
});
```
