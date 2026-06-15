# image

图片。

**起始版本：** 1.0.0

## 约束与限制

image组件默认宽度320px，高度240px。

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 图片资源地址。支持线上资源和本地资源，支持png，jpg，jpeg，gif，svg，bmp，webp。 |
| mode | string | scaleToFill | 否 | 图片裁剪、缩放的模式。详细内容参见“mode合法值说明”。 |
| binderror | eventhandle | - | 否 | 当错误发生时触发，event.detail = {errMsg}。 |
| bindload | eventhandle | - | 否 | 当图片载入完毕时触发，event.detail = {height, width}。 |
| lazy-load | boolean | false | 否 | 图片懒加载，在进入视区时才开始加载。<br/>**起始版本：** 1.0.9 |

**mode合法值说明**：

| 值 | 描述 |
| -------- | -------- |
| scaleToFill | 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满image元素。 |
| aspectFit | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
| aspectFill | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| widthFix | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变。 |
| heightFix | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变。 |
| top | 裁剪模式，不缩放图片，只显示图片的顶部区域。 |
| bottom | 裁剪模式，不缩放图片，只显示图片的底部区域。 |
| center | 裁剪模式，不缩放图片，只显示图片的中间区域。 |
| left | 裁剪模式，不缩放图片，只显示图片的左边区域。 |
| right | 裁剪模式，不缩放图片，只显示图片的右边区域。 |
| top left | 裁剪模式，不缩放图片，只显示图片的左上边区域。 |
| top right | 裁剪模式，不缩放图片，只显示图片的右上边区域。 |
| bottom left | 裁剪模式，不缩放图片，只显示图片的左下边区域。 |
| bottom right | 裁剪模式，不缩放图片，只显示图片的右下边区域。 |

## 示例

hxml文件：

```html
<view>
  <view has:for="{{ array }}" has:for-item="item">
    <view>{{item.text}}</view>
    <view>
      <image
          style="width: 200px; height: 200px; background-color: #eeeeee"
          mode="{{ item.mode }}"
          src="{{ src }}"
          binderror="binderror"
          bindload="bindload"
          ></image>
    </view>
  </view>
</view>
```

js文件：

```js
Page({
  data: {
    array: [
      {
        mode: 'scaleToFill',
        text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应',
      },
      {
        mode: 'aspectFit',
        text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来',
      },
      {
        mode: 'aspectFill',
        text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来',
      },
      {
        mode: 'widthFix',
        text: 'widthFix：宽度不变，高度自动变化，保持原图宽高比不变',
      },
      {
        mode: 'top',
        text: 'top：不缩放图片，只显示图片的顶部区域',
      },
      {
        mode: 'bottom',
        text: 'bottom：不缩放图片，只显示图片的底部区域',
      },
      {
        mode: 'center',
        text: 'center：不缩放图片，只显示图片的中间区域',
      },
      {
        mode: 'left',
        text: 'left：不缩放图片，只显示图片的左边区域',
      },
      {
        mode: 'right',
        text: 'right：不缩放图片，只显示图片的右边区域',
      },
      {
        mode: 'top left',
        text: 'top left：不缩放图片，只显示图片的左上边区域',
      },
      {
        mode: 'top right',
        text: 'top right：不缩放图片，只显示图片的右上边区域',
      },
      {
        mode: 'bottom left',
        text: 'bottom left：不缩放图片，只显示图片的左下边区域',
      },
      {
        mode: 'bottom right',
        text: 'bottom right：不缩放图片，只显示图片的右下边区域',
      },
    ],
    src: 'https://www.example.com/example.jpg', // 此处仅为样例，请开发者更换为可用图片资源地址
  },
  binderror: function(e) {
    console.info('加载失败', e.detail);
  },
  bindload: function(e) {
    console.info('加载完成', e.detail);
  },
});
```
