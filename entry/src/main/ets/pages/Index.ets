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