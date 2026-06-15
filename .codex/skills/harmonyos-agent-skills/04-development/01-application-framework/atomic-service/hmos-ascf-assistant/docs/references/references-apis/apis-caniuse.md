# API可用判断

## has.canIUse

has.canIUse(string schema): Boolean

判断指定的API（包括调用方式、参数、返回值、返回值属性等）、组件（包括属性）在当前版本是否可用。

**起始版本：** 1.0.0

**参数**：

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| schema | string | 是 | 调用方式如下，详细参数说明参见下方“格式说明”。<br/>- 对于API：\${API}.\${method}.\${param}.\${option}<br/>- 对于组件：\${component}.\${attribute}.\${option} |

**格式说明**：

| 名称 | 描述 |
| -------- | -------- |
| \${API} | API 名称。 |
| \${method} | 调用方式，有效值为return, success, object, callback。 |
| \${param} | 参数或者返回值。 |
| \${option} | 参数的可选值或者返回值的属性。 |
| \${component} | 组件名称。 |
| \${attribute} | 组件属性。 |
| \${option} | 组件属性的可选值。 |

**返回值**：

返回Boolean类型，表示是否可用。

**示例：**

```js
// API 是否可用
has.canIUse('getFileInfo');
// API 属性是否可用
has.canIUse('closeSocket.object.code');
// API 属性是否可用
has.canIUse('getLocation.success.latitude');
// API 返回值属性是否可用
has.canIUse('getSystemInfo.success.screenWidth');
// 组件是否可用
has.canIUse('radio');
// 组件新增属性值是否可用
has.canIUse('button.size.default');
```
