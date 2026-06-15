# 富文本

## EditorContext

editor上下文对象。

### EditorContext.blur

EditorContext.blur(Object object)

编辑器失焦，同时收起键盘。

起始版本：1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.blur({
    success: () => {
      console.info('blur success');
    },
    fail: () => {
      console.error('blur fail');
    },
    complete: () => {
      console.info('blur complete');
    }
  });
}).exec();
```

### EditorContext.clear

EditorContext.clear(Object object)

清空编辑器内容。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.clear({
    success: () => {
      console.info('clear success');
    },
    fail: () => {
      console.error('clear fail');
    },
    complete: () => {
      console.info('clear complete');
    }
  });
}).exec();
```

### EditorContext.deleteText

EditorContext.deleteText(Object object)

删除指定选区的内容。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | number | 是 | 选区开始位置。 |
| length | number | 否 | 选区长度。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.deleteText({
    index: 1,
    length: 2,
    success: () => {
      console.info('deleteText success');
    },
    fail: () => {
      console.error('deleteText fail');
    },
    complete: () => {
      console.info('deleteText complete');
    }
  });
}).exec();
```

### EditorContext.format

EditorContext.format (string name, string value)

修改样式。通过name-value设置对应的样式。

**起始版本：** 1.0.17

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| name | string | 是 | 属性名称。name取值范围请见下表。 |
| value | string | - | 属性值。value是否必填以及可填入值，与name相关，请见下表。 |

**支持的name-value取值范围：**

| name | value | 说明 |
| -------- | -------- | -------- |
| bold | true/false/空值 | 加粗。不填默认为true。 |
| italic | true/false/空值 | 斜体。不填默认为true。 |
| underline | true/false/空值 | 下划线。不填默认为true。 |
| strike | true/false/空值 | 删除线。不填默认为true。 |
| ins | true/false/空值 | 下划线。不填默认为true。 |
| script | sub / sup | 文本排版，文本显示为上标或者下标。 |
| header | h1 / h2 / h3 / h4 / h5 / h6 | 标题。 |
| align | left / center / right / justify | 对齐方式。 |
| direction | rtl | 文字方向。 |
| indent | -1 / +1 | 段落缩进,内容向右移动距离，如+1是向右移动一个占位距离，-1代表向左移动一个占位距离。 |
| list | ordered / bullet / checked / unchecked | 列表。 |
| color | hex color | 颜色（十六进制格式）。例如：EditorContext.format('color','\#ff0000') |
| backgroundColor | hex color | 背景色（十六进制格式）。例如：EditorContext.format('backgroundColor','\#ff0000') |
| margin / marginTop / marginBottom / marginLeft / marginRight | css style | 外边距。例如：<br/>EditorContext.format('margin','4px 8px')<br/>EditorContext.format('marginTop','4px') |
| padding / paddingTop / paddingBottom / paddingLeft / paddingRight | css style | 内边距。例如：<br/>EditorContext.format('padding','4px 8px')<br/>EditorContext.format('paddingTop','4px') |
| font / fontSize / fontStyle / fontVariant / fontWeight / fontFamily | css style | 字体。例如：<br/>EditorContext.format('font','italic bold 16px')<br/>EditorContext.format('fontSize','16px')<br/>EditorContext.format('fontStyle','italic')<br/>EditorContext.format('fontVariant ','small-caps')<br/>EditorContext.format('fontWeight ','bold')<br/>EditorContext.format('fontFamily','sans-serif') |
| lineHeight | css style | 行高。例如：EditorContext.format('lineHeight','20px') |
| letterSpacing | css style | 文本间距。例如：EditorContext.format('letterSpacing','2px') |
| textDecoration | css style | 文本装饰。例如：EditorContext.format('textDecoration','underline') |
| textIndent | css style | 文本缩进。例如：EditorContext.format('textIndent','8px') |
| wordWrap | css style | 单词换行规则。例如：EditorContext.format('wordWrap','revert') |
| wordBreak | css style | 单词断行规则。例如：EditorContext.format('wordBreak','break-all') |
| whiteSpace | css style | 留白区域处理规则。例如：EditorContext.format('whiteSpace','wrap') |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.format('bold', true);
}).exec();
```

### EditorContext.getBounds

EditorContext.getBounds(Object object)

获取指定选区的位置和大小。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | number | 是 | 选区开始位置。 |
| length | number | 否 | 选区长度。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| bounds | Object | 选区相对于视口的大小和位置。 |

**bounds属性值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 距离视口左边的大小。 |
| top | number | 距离视口上边的大小。 |
| width | number | 选中长度的宽度。 |
| height | number | 输入框的行高。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.getBounds({
    index: 1,
    length: 2,
    success: (res) => {
      const left = res.bounds.left;
      const top = res.bounds.top;
      const width = res.bounds.width;
      const height = res.bounds.height;
    },
    fail: () => { 
      console.error('getBounds fail');
    },
    complete: () => { 
      console.info('getBounds complete');
    }
  });
}).exec();
```

### EditorContext.getContents

EditorContext.getContents(Object object)

获取编辑器内容。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success 返回值**：

| 参数 | 类型 | 说明 |
| -------- | -------- | -------- |
| html | string | 带标签的HTML内容。 |
| text | string | 纯文本内容。 |
| delta | Object | 表示内容的delta对象。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context(function (res) {
  let editorCtx = res.context;
  editorCtx.getContents({
    success: (res) => {
      const { html, text, delta } = res;
    },
    fail: () => {
      console.error('getContents fail');
    },
    complete: () => {
      console.info('getContents complete');
    }
  })
}).exec();
```

### EditorContext.getSelection

EditorContext.getSelection(Object object)

获取当前选区。

**起始版本：** 1.0.17

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
| range | Object | 选取位置，index为开始位置，length为选区长度。 |
| bounds | Object | 选区相对于视口的大小和位置。 |

**range属性值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| index | number | 开始位置。 |
| length | number | 选区长度。 |

**bounds属性值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 距离视口左边的大小。 |
| top | number | 距离视口上边的大小。 |
| width | number | 选中长度的宽度。 |
| height | number | 输入框的行高。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.getSelection({
    success: (res) => {
      const left = res.bounds.left;
      const top = res.bounds.top;
      const width = res.bounds.width;
      const height = res.bounds.height;
      const index = res.range.index;
      const length = res.range.length;
    },
    fail: () => {
      console.error('getSelection fail');
    },
    complete: () => {
      console.info('getSelection complete');
    }
  });
}).exec();
```

### EditorContext.getSelectionText

EditorContext.getSelectionText(Object object)

获取编辑器已选区域内的纯文本内容。当编辑器失焦或未选中一段区间时，返回内容为空。

**起始版本：** 1.0.17

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
| text | string | 纯文本内容。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.getSelectionText({
    success: (res) => {
      const text = res.text;
    },
    fail: () => {
      console.error('getSelectionText fail');
    },
    complete: () => {
      console.info('getSelectionText complete');
    }
  });
}).exec();
```

### EditorContext.insertDivider

EditorContext.insertDivider(Object object)

插入分割线。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.insertDivider({
    success: () => {
      console.info('insertDivider success');
    },
    fail: () => {
      console.error('insertDivider fail');
    },
    complete: () => {
      console.info('insertDivider complete');
    }
  });
}).exec();
```

### EditorContext.insertImage

EditorContext.insertImage(Object object)

插入图片。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 图片地址，仅支持http(s)。 |
| nowrap | function | false | 否 | 插入图片后是否自动换行，默认换行。 |
| alt | string | - | 否 | 图像无法显示时的替代文本。 |
| width | string | - | 否 | 图片宽度（pixels/百分比）。 |
| height | string | - | 否 | 图片高度 (pixels/百分比)。 |
| extClass | string | - | 否 | 添加到图片 img 标签上的类名。 |
| data | Object | - | 否 | data被序列化为name=value;name1=value2的格式挂在属性data-custom上。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.insertImage({
    src: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
    width: '100px',
    height: '50px',
    extClass: 'imgWrap',
    success: () => {
      console.info('insertImage success');
    },
    fail: () => {
      console.error('insertImage fail');
    },
    complete: () => {
      console.info('insertImage complete');
    }
  });
}).exec();
```

### EditorContext.insertText

EditorContext.insertText(Object object)

覆盖当前选区，设置一段文本。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| text | string | 否 | 文本内容。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.insertText({
    text: 'Hello World',
    success: () => { 
      console.info('insertText success');
    },
    fail: () => { 
      console.error('insertText fail');
    },
    complete: () => { 
      console.info('insertText complete');
    }
  });
}).exec();
```

### EditorContext.redo

EditorContext.redo(Object object)

恢复上一步操作。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.redo({
    success: () => {
      console.info('redo success');
    },
    fail: () => {
      console.error('redo fail');
    },
    complete: () => {
      console.info('redo complete');
    }
  });
}).exec();
```

### EditorContext.removeFormat

EditorContext.removeFormat (Object object)

清除当前选区的样式。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.removeFormat({
    success: () => {
      console.info('removeFormat success');
    },
    fail: () => {
      console.error('removeFormat fail');
    },
    complete: () => {
      console.info('removeFormat complete');
    }
  });
}).exec();
```

### EditorContext.scrollIntoView

EditorContext.scrollIntoView()

使得编辑器光标处滚动到窗口可视区域内。

**起始版本：** 1.0.17

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.scrollIntoView();
}).exec();
```

### EditorContext.setContents

EditorContext.setContents(Object object)

初始化编辑器内容，html和delta同时存在时仅delta生效。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| html | string | 否 | 带标签的html格式数据。 |
| delta | Object | 否 | 表示内容的delta对象。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.setContents({
    delta: {},
    success: () => { 
      console.info('setContents success');
    },
    fail: () => { 
      console.error('setContents fail');
    },
    complete: () => { 
      console.info('setContents complete');
    }
  });
}).exec();
```

### EditorContext.setSelection

EditorContext.setSelection(Object object)

设置当前选区。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | number | 是 | 选区开始位置。 |
| length | number | 否 | 选区长度。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.setSelection({
    index: 1,
    length: 2,
    success: () => { 
      console.info('setSelection success');
    },
    fail: () => { 
      console.error('setSelection fail');
    },
    complete: () => { 
      console.info('setSelection complete');
    }
  });
}).exec();
```

### EditorContext.undo

EditorContext.undo(Object object)

撤销上一步操作。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createSelectorQuery().select('#editor').context((res) => {
  let editorCtx = res.context;
  editorCtx.undo({
    success: () => { 
      console.info('undo success');
    },
    fail: () => { 
      console.error('undo fail');
    },
    complete: () => { 
      console.info('undo complete');
    }
  });
}).exec();
```
