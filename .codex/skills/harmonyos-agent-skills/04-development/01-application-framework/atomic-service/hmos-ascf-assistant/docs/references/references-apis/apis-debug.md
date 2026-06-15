# 调试

## has.getLogManager

has.getLogManager(): LogManager

获取日志管理器对象。

**起始版本：** 1.0.0

**返回值：**

返回[LogManager](#logmanager)对象，可以通过LogManager实例来操作日志。

**示例：**

```js
const logger = has.getLogManager();
```

## LogManager

### LogManager.log

LogManager.log(Object|Array|number|string ...args)

打印log日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | Object\|Array\|number\|string | 否 | 日志内容，可以打印多个。 |

**示例：**

```js
const logger = has.getLogManager();
logger.log({ str: 'hello world' }, 'basic log', 100, [1, 2, 3]);
```

### LogManager.info

LogManager.info(Object|Array|number|string ...args)

打印info日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | Object\|Array\|number\|string | 否 | 日志内容，可以打印多个。 |

**示例：**

```js
const logger = has.getLogManager();
logger.info({ str: 'hello world' }, 'basic log', 100, [1, 2, 3]);
```

### LogManager.debug

LogManager.debug(Object|Array|number|string ...args)

打印debug日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | Object\|Array\|number\|string | 否 | 日志内容，可以打印多个。 |

**示例：**

```js
const logger = has.getLogManager();
logger.debug({ str: 'hello world' }, 'basic log', 100, [1, 2, 3]);
```

### LogManager.warn

LogManager.warn(Object|Array|number|string ...args)

打印warn日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | Object\|Array\|number\|string | 否 | 日志内容，可以打印多个。 |

**示例：**

```js
const logger = has.getLogManager();
logger.warn({ str: 'hello world' }, 'basic log', 100, [1, 2, 3]);
```

### LogManager.error

LogManager.error(Object|Array|number|string ...args)

打印error日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | Object\|Array\|number\|string | 否 | 日志内容，可以打印多个。 |

**示例：**

```js
const logger = has.getLogManager();
logger.error({ str: 'hello world' }, 'basic log', 100, [1, 2, 3]);
```

## console.debug

console.debug(any ...args)

在调试面板中打印 debug 日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | any | 否 | 日志内容，可以有任意多个。 |

**示例：**

```js
console.debug('debug level message .');
```

## console.error

console.error(any ...args)

在调试面板中打印 error 日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | any | 否 | 日志内容，可以有任意多个。 |

**示例：**

```js
console.error('error level message .');
```

## console.info

console.info(any ...args)

在调试面板中打印 info 日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | any | 否 | 日志内容，可以有任意多个。 |

**示例：**

```js
console.info('info level message .');
```

## console.log

console.log(any ...args)

在调试面板中打印 log 日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | any | 否 | 日志内容，可以有任意多个。 |

**示例：**

```js
console.log('log level message .');
```

## console.warn

console.warn(any ...args)

在调试面板中打印 warn 日志。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ...args | any | 否 | 日志内容，可以有任意多个。 |

**示例：**

```js
console.warn('warn level message .');
```
