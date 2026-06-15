# camera

系统相机，支持拍摄、录像功能。

**起始版本：** 1.0.4

**需要权限：** 

1. 在module.json5中声明ohos.permission.CAMERA、ohos.permission.MICROPHONE。 

2. 需要用户授权 **[scope.camera](../../guides/develop-authorization.md#scope-列表)** 权限，录像场景还需授权 **[scope.record](../../guides/develop-authorization.md#scope-列表)** 权限。

**关联文档：** [has.createCameraContext](../references-apis/apis-camera.md#hascreatecameracontext)

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| resolution | string | medium | 否 | 分辨率，不支持动态修改。<br/>low：低。<br/>medium：中。<br/>high：高。 |
| device-position | string | back | 否 | 摄像头朝向。<br/>back：后置。<br/>front：前置。 |
| flash | string | auto | 否 | 闪光灯。<br/>auto：自动。<br/>on：打开。<br/>off：关闭。<br/>torch：常亮。 |
| bindstop | event | - | 否 | 摄像头在非正常终止时触发，如退出后台等情况。 |
| binderror | event | - | 否 | 用户不允许使用摄像头时触发。 |
| bindinitdone | event | - | 否 | 相机初始化完成时触发，e.detail = {maxZoom}。 |

## 示例

hxml文件：

```html
<view>
  <camera
    resolution="medium"
    flash="{{ enableflash }}"
    device-position="{{ position }}"
    bindstop="stop"
    binderror="error"
    bindinitdone="initdone"
    />
  <button bind:tap="takePhoto">takePhoto</button>
</view>
```

js文件：

```js
Page({
  onReady: function() {
    this.ctx = has.createCameraContext();
  },
  data: {
    position: 'front',
    enableflash: 'auto'
  },
  error(e) {
    console.error('用户不允许使用摄像头:', e.detail);
  },
  stop(e) {
    console.info('摄像头在非正常终止:', e.detail);
  },
  initdone(e) {
    console.info('相机初始化完成:', e.detail);
  },
  takePhoto() {
    this.ctx.takePhoto({
      success: (res) => {
        console.info('takePhoto success', res);
      },
      fail: (err) => {
        console.error('takePhoto fail', err);
      },
      complete: (res) => {
        console.info('takePhoto complete', res);
      }
    });
  }
});
```
