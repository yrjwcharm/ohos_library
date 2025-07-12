## ImageSaver
___
#### 简介
**ImageSaver** 这是一款使用HarmonyNext保存图片到相册的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/image-saver
```

| Api方法                        | 描述                                 |
|------------------------------|------------------------------------|
| saveNetImageToGallery        | 保存网络图片到系统相册                        |
| saveImgBufferToGallery       | 保存图片二进制ArrayBuffer到系统相册            |
| savePixelMapToGallery        | 保存PixelMap图片形式到系统相册                |
| saveImgBase64ToGallery       | 保存Base64图片形式到系统相册                  | 
| saveSandBoxImageToGallery    | 保存图片的沙箱路径到系统相册                     |
| saveLocalRawImageToGallery   | 保存本地resource/rawFile中的图片资源到系统相册    |
| saveLocalResImageToGallery   | 保存本地resource/Media中的图片资源到系统相册      |
| transferImage2PixelMap       | 拉起选择图片选择后/拍照的图片路径uri-转化为PixelMap   |
| base64ToPixelMap             | 图片base64字符串转PixelMap               |
| packingPixelMapToArrayBuffer | 图片PixelMap转化ArrayBuffer            |
| downloadFileToSandBox        | 下载网络资源(图片等文件)保存应用沙盒                |
| savePixelMapToSandBox        | 保存PixelMap到应用沙盒                    |
| saveArrayBufferToSandBox     | 保存ArrayBuffer到应用沙盒                 |
| saveRawFileToSandBox         | 将资源文件夹Resource/rawFile下的文件存放到沙箱目录下 |
| saveMediaFileToSandBox       | 将资源文件夹Resource/Media下的文件存放到沙箱目录下   |
| fileToArrayBuffer            | 沙箱文件转ArrayBuffer                   |
| readLocalFileWithStream      | 沙箱文件转ArrayBuffer(文件较大时使用更好)        |


#### 基本用法
```typescript
import { FileSaverHelper } from '@ohos_lib/file-saver'
import { componentSnapshot, promptAction } from '@kit.ArkUI'
import { image } from '@kit.ImageKit'
import { getBase64 } from '../utils/base64'
import { getArrayBuffer } from '../utils/arraybuffer'

@Entry
@ComponentV2
struct Index {
  @Local netUrl :string= 'https://i.gsxcdn.com/3053295419_6crg62os.png'
  build() {
    Column() {
        Button('保存网络图片到系统相册').onClick(()=>{
          FileSaverHelper.getInstance(getContext()).saveNetImageToGallery(this.netUrl,()=>{
              promptAction.showToast({
                message:'保存成功'
              })
            },(error)=>{
               console.log('异常信息',error.message,error.code);
            })
        }).id('SnapshotId')

      Button('保存图片PixelMap到系统相册').onClick(()=>{
        componentSnapshot.get("SnapshotId", async (error: Error, pixmap: image.PixelMap) => {
          if (error) {
            console.log("error: " + JSON.stringify(error))
            return;
          }
          FileSaverHelper.getInstance(getContext()).savePixelMapToGallery(pixmap,85,()=>{
            promptAction.showToast({
              message:'保存成功'
            })
          },(error)=>{

          })
        }, { scale: 2, waitUntilRenderFinished: true })
      }).margin({
        top:20
      })
      Button('保存ArrayBuffer到系统相册').onClick(()=>{

        getArrayBuffer(this.netUrl,(buffer)=>{
          FileSaverHelper.getInstance(getContext()).saveImgBufferToGallery(buffer,(isSuccess)=>{
            promptAction.showToast({
              message:'保存成功'
            })
          })
        })
      }).margin({
        top:20
      })
      Button('保存图片base64到系统相册').onClick(()=>{
        const base64Str = getBase64();
        FileSaverHelper.getInstance(getContext()).saveImgBase64ToGallery(base64Str,()=>{
          promptAction.showToast({
            message:'保存成功'
          })
        },()=>{

        })
      }).margin({
        top:20
      })
      Button('保存应用沙箱图片到系统相册').onClick(()=>{
        //确保沙箱有真实路径图片
        const filePath = getContext().filesDir+`/pic_assets.jpg`;
        FileSaverHelper.getInstance(getContext()).saveSandBoxImageToGallery(filePath,()=>{
          promptAction.showToast({
            message:'保存成功'
          })
        },(err)=>{
          console.log('异常信息----',err.message);
        })
      }).margin({
        top:20
      })
      Button('保存本地Resource/RawFile中的图片到系统相册').onClick(()=>{
        FileSaverHelper.getInstance(getContext()).saveLocalRawImageToGallery(this.netUrl,()=>{
          promptAction.showToast({
            message:'保存成功'
          })
        },(err)=>{
          console.log('异常信息----',err.message);
        })
      }).margin({
        top:20
      })
      Button('保存本地Resource/Media中的图片到系统相册').onClick(()=>{
        FileSaverHelper.getInstance(getContext()).saveLocalRawImageToGallery('startIcon.png',()=>{
          promptAction.showToast({
            message:'保存成功'
          })
        },(err)=>{
          console.log('异常信息----',err.message);
        })
      }).margin({
        top:20
      })
      Button('保存本地Resource/RawFile中的文件到应用沙盒').onClick(()=>{
        FileSaverHelper.getInstance(getContext()).saveRawFileToSandBox('foreground.png').then(result=>{
          if(result.success){
            //本地保存的沙盒文件路径
            const filePath = result.filePath;
          }
        })
      }).margin({
        top:20
      })

      Button('保存本地Resource/Media中的文件到应用沙盒').onClick(()=>{
        FileSaverHelper.getInstance(getContext()).saveRawFileToSandBox('startIcon.png').then(result=>{
          if(result.success){
            //本地保存的沙盒文件路径
            const filePath = result.filePath;
          }
        })
      }).margin({
        top:20
      })

      Button('下载图片等文件保存至应用沙盒').onClick(()=>{
        FileSaverHelper.getInstance(getContext()).downloadFileToSandBox('startIcon.png', (result) => {
          if(result.success){
            //本地保存的沙盒文件路径
            const filePath = result.filePath;
          }
        })
      }).margin({
        top:20
      })
      Button('保存PixelMap到应用沙盒').onClick(()=>{
        componentSnapshot.get("SnapshotId", async (error: Error, pixmap: image.PixelMap) => {
          if (error) {
            console.log("error: " + JSON.stringify(error))
            return;
          }
          FileSaverHelper.getInstance(getContext()).savePixelMapToSandBox(pixmap,85,(result)=>{
            if(result.success){
              //本地保存的沙盒文件路径
              const filePath = result.filePath;
            }
          },(error)=>{

          })
        }, { scale: 2, waitUntilRenderFinished: true })
      }).margin({
        top:20
      })
      Button('沙箱文件转ArrayBuffer').onClick(()=>{
        //确保沙箱路径真实有效
        const filePath = getContext().filesDir+`/pic_assets.jpg`;
        //文件较大时建议使用 FileSaverHelper.getInstance(getContext()).readLocalFileWithStream(filePath)
        FileSaverHelper.getInstance(getContext()).fileToArrayBuffer(filePath).then(buffer=>{

        })
      }).margin({
        top:20
      })
      Button('保存ArrayBuffer到应用沙盒').onClick(()=>{
        getArrayBuffer(this.netUrl,(buffer)=>{
          FileSaverHelper.getInstance(getContext()).saveArrayBufferToSandBox(buffer).then(result=>{
            if(result.success){
              //本地保存的沙盒文件路径
              const filePath = result.filePath;
            }
          })
        })
      }).margin({
        top:20
      })
    }
    .height('100%')
    .width('100%')
  }
}
```


#### 完整示例 https://github.com/yrjwcharm/feature/ohos/image-saver