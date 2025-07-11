import { GalleryHelper } from '@ohos_lib/image-saver'
import { componentSnapshot, promptAction } from '@kit.ArkUI'
import { image } from '@kit.ImageKit'
import { getBase64 } from '../base64'

@Entry
@ComponentV2
struct Index {
  @Local netUrl :string= 'https://i.gsxcdn.com/3053295419_6crg62os.png'
  build() {
    Column() {
        Button('保存网络图片到系统相册').onClick(()=>{
            GalleryHelper.getInstance(getContext()).saveNetImageToGallery(this.netUrl,()=>{
              promptAction.showToast({
                message:'保存成功'
              })
            },(error)=>{
               console.log('异常信息',error.message,error.code);
            })
        }).id('SnapshotId')


      Button('保存PixelMap图片格式到系统相册').onClick(()=>{
        componentSnapshot.get("SnapshotId", async (error: Error, pixmap: image.PixelMap) => {
          if (error) {
            console.log("error: " + JSON.stringify(error))
            return;
          }
          GalleryHelper.getInstance(getContext()).savePixelMapToGallery(pixmap,85,()=>{
            promptAction.showToast({
              message:'保存成功'
            })
          },(error)=>{

          })
        }, { scale: 2, waitUntilRenderFinished: true })
      }).margin({
        top:20
      })

      Button('保存base64图片字符串到系统相册').onClick(()=>{
        const base64Str = getBase64();
        GalleryHelper.getInstance(getContext()).saveImgBase64ToGallery(base64Str,()=>{
          promptAction.showToast({
            message:'保存成功'
          })
        },()=>{

        })
      }).margin({
        top:20
      })
      Button('保存沙盒 图片到系统相册').onClick(()=>{
        //确保沙箱有真实路径图片
        const filePath = getContext().filesDir+`/pic_assets.jpg`;
        GalleryHelper.getInstance(getContext()).saveSandBoxImageToGallery(filePath,()=>{
          promptAction.showToast({
            message:'保存成功'
          })
        },(err)=>{
          console.log('异常信息-----',err.message);
        })
      }).margin({
        top:20
      })
      Button('保存本地资源Resource/RawFile中的图片到系统相册').onClick(()=>{
        GalleryHelper.getInstance(getContext()).saveLocalImageToGallery('startIcon.png',()=>{
          promptAction.showToast({
            message:'保存成功'
          })
        },(err)=>{
          console.log('解析-----',err.message);
        })
      }).margin({
        top:20
      })
    }
    .height('100%')
    .width('100%')
  }
}