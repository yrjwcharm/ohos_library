# 字体

## has.loadFontFace

has.loadFontFace(Object object)

动态加载网络字体，文件地址需为下载类型。

> **说明：**
>
> 1. 字体文件返回的content-type请参见“[font](https://www.iana.org/assignments/media-types/media-types.xhtml#font)”，需要检查文件格式是否符合标准，不正确的格式将导致解析失败。
> 2. canvas等同层渲染组件不支持使用接口添加的字体。
> 3. 暂不支持加载本地路径的字体。
> 4. 字体链接必须是https，加载网络字体受网络环境的影响，建议结合日志查看字体文件是否下载正常。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| global | boolean | false | 否 | 是否全局生效。 |
| family | string | - | 是 | 定义的字体名称。 |
| source | string | - | 是 | 字体资源的地址。建议格式为TTF和WOFF。 |
| desc | Object | - | 否 | 可选的字体描述符。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**desc说明：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| style | string | 'normal' | 否 | 字体样式，可选值为normal / italic / oblique。 |
| weight | string | 'normal' | 否 | 字体粗细，可选值为normal / bold / 100 / 200../ 900。 |
| variant | string | 'normal' | 否 | 设置小型大写字母的字体显示文本，可选值为normal / small-caps / inherit。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| status | string | 加载字体结果。 |

**示例：**

```js
const self = has.loadFontFace({
  family: 'myFamily',
  source: 'url("https://www.example.com/xxx.ttf")', // 此处仅为样例，请开发者更换为可用字体资源地址
  success: (res) => {
    console.info('loadFontFace success', res);
  },
  fail: (err) => {
    console.error('loadFontFace fail', err);
  },
  complete: (res) => {
    console.info('loadFontFace complete', res);
  }
});
```
