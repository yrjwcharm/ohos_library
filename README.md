## FileSaver(Api12及以上)

#### 简介 `FileSaver` 此开源库为基于 HarmonyOS ArkTS 的应用提供便捷功能

* **1.支持将图片一键保存至系统相册和应用内部存储**
* **2.支持保存文件各种形式至应用沙盒**
* **3.支持压缩图片到指定大小以下-用于微信分享等**

#### 安装步骤

`ohpm install @ohos_lib/file-saver`

#### add 权限 entry->module.json5

```json
 "requestPermissions": [
      {
        "name":"ohos.permission.INTERNET"
      },
      {
        "name":"ohos.permission.GET_NETWORK_INFO"
      }
    ]
  }
```

##  FileSaverHelper类
| Api方法                        | 描述                                    |
|------------------------------|---------------------------------------|
| downloadFile                 | 下载图片等文件统一方法封装，有进度回调监听                 |
| saveNetImageToGallery        | 保存网络图片到系统相册                           |
| saveImgBufferToGallery       | 保存图片二进制ArrayBuffer到系统相册               |
| savePixelMapToGallery        | 保存PixelMap图片形式到系统相册                   |
| saveImgBase64ToGallery       | 保存Base64图片形式到系统相册                     | 
| saveSandBoxImageToGallery    | 保存图片的沙箱路径到系统相册                        |
| saveLocalRawImageToGallery   | 保存本地resource/rawFile中的图片资源到系统相册       |
| saveLocalResImageToGallery   | 保存本地resource/Media中的图片资源到系统相册         |
| transferImage2PixelMap       | 拉起图片选择器选择或拍照后的图片uri路径-转化为PixelMap     |
| base64ToPixelMap             | 图片base64字符串转PixelMap                  |
| packingPixelMapToArrayBuffer | 图片PixelMap转化ArrayBuffer（传入quality可压缩） |
| downloadFileToSandBox        | 下载网络资源(图片等文件)保存应用沙盒                   |
| savePixelMapToSandBox        | 保存PixelMap到应用沙盒                       |
| saveArrayBufferToSandBox     | 保存ArrayBuffer到应用沙盒                    |
| saveRawFileToSandBox         | 将资源文件夹Resource/rawFile下的文件存放到沙箱目录下    |
| saveMediaFileToSandBox       | 将资源文件夹Resource/Media下的文件存放到沙箱目录下      |
| fileToArrayBuffer            | 沙箱文件转ArrayBuffer                      |
| readLocalFileWithStream      | 沙箱文件转ArrayBuffer(文件较大时使用更好)           |

##  CompressorUtil类 采用华为官方二分法质量压缩

| Api方法                                                                                                                 | 描述                                                                                                          |
|-----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| async compressedImage(sourcePixelMap: image.PixelMap, maxCompressedImageSize: number): Promise<CompressedImageInfo>   | sourcePixelMap：原始待压缩图片的PixelMap对象 maxCompressedImageSize：指定图片的压缩目标大小，单位kb  compressedImageInfo：返回最终压缩后的图片信息 |


#### 基本用法
```javascript
import { CompressorUtil, FileSaverHelper } from '@ohos_lib/file-saver'
import { componentSnapshot, promptAction } from '@kit.ArkUI'
import { image } from '@kit.ImageKit'
import { getBase64 } from '../utils/base64'
import { getArrayBuffer } from '../utils/arraybuffer'
import { BusinessError } from '@kit.BasicServicesKit'

@Entry
@ComponentV2
struct Index {
    @Local netUrl :string= 'https://i.gsxcdn.com/3053295419_6crg62os.png'
    build() {
        Column() {
            Scroll() {
                Column() {
                    Button('保存网络图片到系统相册').onClick(() => {
                        FileSaverHelper.getInstance(getContext()).saveNetImageToGallery(this.netUrl, (progress:number) => {
                            console.log('下载进度....'+progress)
                        }, (error) => {
                            console.log('异常信息', error.message, error.code);
                        }).then((isSuccess)=>{
                            if(isSuccess) {
                                promptAction.showToast({
                                    message: '保存成功'
                                })
                            }
                        })
                    }).id('SnapshotId')

                    Button('下载图片等文件保存至应用沙盒').onClick(() => {
                        FileSaverHelper.getInstance(getContext()).downloadFileToSandBox(this.netUrl,(progress:number)=>{
                            console.log('下载进度....'+progress)
                        }).then(result=>{
                            if (result.success) {
                                //本地保存的沙盒文件路径
                                const filePath = result.filePath;
                                promptAction.showToast({
                                    message: '保存成功'+filePath
                                })
                            }
                        })
                    }).margin({
                        top: 20
                    })
                    Button('保存图片PixelMap到系统相册').onClick(() => {
                        componentSnapshot.get("SnapshotId", async (error: Error, pixmap: image.PixelMap) => {
                            if (error) {
                                console.log("error: " + JSON.stringify(error))
                                return;
                            }
                            FileSaverHelper.getInstance(getContext()).savePixelMapToGallery(pixmap, 85, () => {
                                promptAction.showToast({
                                    message: '保存成功'
                                })
                            }, (error) => {

                            })
                        }, { scale: 2, waitUntilRenderFinished: true })
                    }).margin({
                        top: 20
                    })
                    Button('保存ArrayBuffer到系统相册').onClick(() => {

                        getArrayBuffer(this.netUrl, (buffer) => {
                            FileSaverHelper.getInstance(getContext()).saveImgBufferToGallery(buffer, (isSuccess) => {
                                promptAction.showToast({
                                    message: '保存成功'
                                })
                            })
                        })
                    }).margin({
                        top: 20
                    })
                    Button('保存图片base64到系统相册').onClick(() => {
                        const base64Str = getBase64();
                        FileSaverHelper.getInstance(getContext()).saveImgBase64ToGallery(base64Str, () => {
                            promptAction.showToast({
                                message: '保存成功'
                            })
                        }, () => {

                        })
                    }).margin({
                        top: 20
                    })
                    Button('保存应用沙箱图片到系统相册').onClick(() => {
                        //确保沙箱有真实路径图片
                        const filePath = getContext().filesDir + `/1752459448284_IMG.jpg`;
                        FileSaverHelper.getInstance(getContext()).saveSandBoxImageToGallery(filePath, () => {
                            promptAction.showToast({
                                message: '保存成功'
                            })
                        }, (err) => {
                            console.log('异常信息----', err.message);
                        })
                    }).margin({
                        top: 20
                    })
                    Button('保存本地Resource/RawFile中的图片到系统相册').onClick(() => {
                        FileSaverHelper.getInstance(getContext()).saveLocalRawImageToGallery('raw.png', () => {
                            promptAction.showToast({
                                message: '保存成功'
                            })
                        }, (err) => {
                            console.log('异常信息----', err.message);
                        })
                    }).margin({
                        top: 20
                    })
                    Button('保存本地Resource/Media中的图片到系统相册').onClick(() => {
                        FileSaverHelper.getInstance(getContext()).saveLocalRawImageToGallery('startIcon.png', () => {
                            promptAction.showToast({
                                message: '保存成功'
                            })
                        }, (err) => {
                            console.log('异常信息----', err.message);
                        })
                    }).margin({
                        top: 20
                    })
                    Button('保存本地Resource/RawFile中的文件到应用沙盒').onClick(() => {
                        FileSaverHelper.getInstance(getContext()).saveRawFileToSandBox('raw.png').then(result => {
                            if (result.success) {
                                //本地保存的沙盒文件路径
                                const filePath = result.filePath;
                                promptAction.showToast({
                                    message: '保存成功'+filePath
                                })
                            }
                        }).catch((err:BusinessError)=>{
                            console.log('异常----',err.message)
                        })
                    }).margin({
                        top: 20
                    })

                    Button('保存本地Resource/Media中的文件到应用沙盒').onClick(() => {
                        FileSaverHelper.getInstance(getContext()).saveRawFileToSandBox('startIcon.png').then(result => {
                            if (result.success) {
                                //本地保存的沙盒文件路径
                                const filePath = result.filePath;
                                promptAction.showToast({
                                    message: '保存成功'+filePath
                                })
                            }
                        })
                    }).margin({
                        top: 20
                    })

                    Button('保存PixelMap到应用沙盒').onClick(() => {
                        componentSnapshot.get("SnapshotId", async (error: Error, pixmap: image.PixelMap) => {
                            if (error) {
                                console.log("error: " + JSON.stringify(error))
                                return;
                            }
                            FileSaverHelper.getInstance(getContext()).savePixelMapToSandBox(pixmap, 85, (result) => {
                                if (result.success) {
                                    //本地保存的沙盒文件路径
                                    const filePath = result.filePath;
                                    promptAction.showToast({
                                        message: '保存成功'+filePath
                                    })
                                }
                            }, (error) => {

                            })
                        }, { scale: 2, waitUntilRenderFinished: true })
                    }).margin({
                        top: 20
                    })
                    Button('沙箱文件转ArrayBuffer').onClick(() => {
                        //确保沙箱路径真实有效
                        const filePath = getContext().filesDir + `/1752460544695_IMG.jpg`;
                        //文件较大时建议使用 FileSaverHelper.getInstance(getContext()).readLocalFileWithStream(filePath)
                        FileSaverHelper.getInstance(getContext()).fileToArrayBuffer(filePath).then(buffer => {
                            promptAction.showToast({
                                message: '转换成功'+buffer.byteLength
                            })
                        }).catch((err:BusinessError)=>{
                            console.log('异常信息',err.code,err.message)
                        })
                    }).margin({
                        top: 20
                    })
                    Button('保存ArrayBuffer到应用沙盒').onClick(() => {
                        getArrayBuffer(this.netUrl, (buffer) => {
                            FileSaverHelper.getInstance(getContext()).saveArrayBufferToSandBox(buffer).then(result => {
                                if (result.success) {
                                    //本地保存的沙盒文件路径
                                    const filePath = result.filePath;
                                    promptAction.showToast({
                                        message: '保存成功'+filePath
                                    })
                                }
                            })
                        })
                    }).margin({
                        top: 20
                    })

                    Button('压缩图片到指定大小-返回ArrayBuffer').onClick(() => {
                        componentSnapshot.get("SnapshotId", async (error: Error, pixmap: image.PixelMap) => {
                            if (error) {
                                console.log("error: " + JSON.stringify(error))
                                return;
                            }
                            CompressorUtil.compressedImage(pixmap, 64).then(res => {
                                //压缩后的图片存储位置及字节
                                const imageUri = res.imageUri;
                                const imageBuffer = res.imageBuffer;
                                const byteLength = res.imageByteLength;
                                promptAction.showToast({
                                    message: '压缩成功'+imageUri
                                })
                            })
                        }, { scale: 2, waitUntilRenderFinished: true })
                    }).margin({
                        top: 20
                    })
                }
            }
        }
        .height('100%')
            .width('100%')
    }
}
```

> FileSaver是一个为HarmonyOS ArkTS应用设计的开源库，提供便捷的文件保存功能。主要特性包括：支持将图片保存至系统相册和应用沙盒存储，支持多种图片格式转换（网络图片、PixelMap、ArrayBuffer、Base64等），并提供文件压缩功能（采用华为官方二分法质量压缩）。使用前需安装ohpm包并配置网络权限。该库通过FileSaverHelper和CompressorUtil两个类提供丰富的API方法，涵盖图片保存、格式转换、文件下载和压缩等功能，适用于需要本地文件管理的应用场景。
