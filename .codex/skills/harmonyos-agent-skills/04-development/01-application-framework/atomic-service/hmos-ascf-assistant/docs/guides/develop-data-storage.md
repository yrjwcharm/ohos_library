# 存储数据


每个元服务都可以有自己的本地缓存，可以通过以下接口对本地缓存进行读写和清理。


| API | 描述 |
| -------- | -------- |
| [has.setStorage](../references/references-apis/apis-data-storage.md#hassetstorage) | 将数据存储在本地缓存中指定的key中。 |
| [has.setStorageSync](../references/references-apis/apis-data-storage.md#hassetstoragesync) | has.setStorage的同步版本。 |
| [has.getStorage](../references/references-apis/apis-data-storage.md#hasgetstorage) | 获取指定key的缓存。 |
| [has.getStorageSync](../references/references-apis/apis-data-storage.md#hasgetstoragesync) | has.getStorage的同步版本。 |
| [has.clearStorage](../references/references-apis/apis-data-storage.md#hasclearstorage) | 清空本地缓存。 |
| [has.clearStorageSync](../references/references-apis/apis-data-storage.md#hasclearstoragesync) | has.clearStorage的同步版本。 |
| [has.removeStorage](../references/references-apis/apis-data-storage.md#hasremovestorage) | 删除指定key的缓存。 |
| [has.removeStorageSync](../references/references-apis/apis-data-storage.md#hasremovestoragesync) | has.removeStorage的同步版本。 |
| [has.getStorageInfo](../references/references-apis/apis-data-storage.md#hasgetstorageinfo) | 获取缓存的信息。 |
| [has.getStorageInfoSync](../references/references-apis/apis-data-storage.md#hasgetstorageinfosync) | has.getStorageInfo的同步版本。 |


**示例：**


```js
has.setStorageSync('key1', 'test-data');
let res = has.getStorageSync('key1');
console.info(`res = ${res}`);
```


## 隔离策略

同一个用户，同一个元服务 storage 上限为10MB。

storage以用户维度隔离，同一台设备上，A 用户无法读取到 B 用户的数据；不同元服务之间也无法互相读写数据。


## 清理策略

本地缓存的清理时机跟安装包一样，只有在安装包被清理的时候本地缓存才会被清理。
