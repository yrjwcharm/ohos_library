import { http } from "@kit.NetworkKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { image } from "@kit.ImageKit";
import { fileIo, fileUri } from "@kit.CoreFileKit";
import { photoAccessHelper } from "@kit.MediaLibraryKit";

export class GalleryHelper{
  private static  instance:GalleryHelper
  private context:Context;
  static getInstance(context:Context){
    if(!GalleryHelper.instance){
       GalleryHelper.instance = new GalleryHelper(context);
    }
    return GalleryHelper.instance;
  }
  constructor(context:Context) {
    this.context = context;
  }
  static SaveNetImageToAlbum(url: string,successCallback:()=>void,failCallback?:(err:BusinessError)=>void) {
    let httpRequest = http.createHttp();
    httpRequest.request(url, { expectDataType: http.HttpDataType.ARRAY_BUFFER },
      (err: BusinessError, data: http.HttpResponse) => {
        if (err) {
          failCallback?.(err);
          return
        }
        if (data.result instanceof ArrayBuffer) {
          let imageBuffer = data.result as ArrayBuffer;
           GalleryHelper.instance?.saveImgToAssets(imageBuffer,successCallback)
        }
      })
  }

  // 打包 PixelMap 为 jpg 格式
  private  async packingPixelMap2Jpg(pixelMap: PixelMap, quality = 100): Promise<ArrayBuffer> {
    // 创建ImagePacker实例
    const imagePackerApi = image.createImagePacker();
    // 设置打包参数
    // format：图片打包格式，只支持 jpg 和 webp
    // quality：JPEG 编码输出图片质量
    // bufferSize：图片大小，默认 10M
    const packOpts: image.PackingOption = { format: "image/jpeg", quality };
    let imageBuffer: ArrayBuffer = new ArrayBuffer(1);
    try {
      // 图片压缩或重新打包
      imageBuffer = await imagePackerApi.packing(pixelMap, packOpts);
    } catch (err) {
      console.error(`Invoke packingPixelMap2Jpg failed, err: ${JSON.stringify(err)}`);
    }
    return imageBuffer;
  }
  //保存 图片ArrayBuffer二进制流 或者 应用沙盒图片到相册
   async  saveImgToAssets(imageSource: ArrayBuffer | string,successCallback:()=>void,failCallback?:(err:BusinessError)=>void) {
    let filePath = ''
    if (typeof imageSource === 'string') {
      filePath = imageSource
    } else {
      // 先将buffer存到沙盒
      filePath = `${this.context?.filesDir}/pic_assets.jpg`
      let tempFile = fileIo.openSync(filePath, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE)
      try {
        fileIo.writeSync(tempFile.fd, imageSource)
        fileIo.close(tempFile.fd)
      } catch (err) {
        failCallback?.({
          code: -1,
          message: 'buffer写入沙盒文件失败',
          name: ""
        })
        return
      }
    }
    try {
      let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(this.context);
      let srcFileUris: Array<string> = [
        fileUri.getUriFromPath(filePath)
      ];
      let photoCreationConfigs: Array<photoAccessHelper.PhotoCreationConfig> = [
        {
          fileNameExtension: 'jpg',
          photoType: photoAccessHelper.PhotoType.IMAGE,
        }
      ];
      let desFileUris: Array<string> = await phAccessHelper.showAssetsCreationDialog(srcFileUris, photoCreationConfigs);
      if (desFileUris.length === 0) {
        failCallback?.({
          code: -2,
          message: '保存失败',
          name: ""
        })
        return
      }
      // Open the created media file and read the local file and convert it to ArrayBuffer for easy filling.
      let file = fileIo.openSync(desFileUris[0], fileIo.OpenMode.READ_WRITE);
      fileIo.writeSync(file.fd, imageSource);
      fileIo.closeSync(file);
      successCallback?.();
    } catch (err) {
      failCallback?.(err);
    }
  }
  /**
   * 保存到相册PixelMap到相册
   *
   */
   static  savePixelMapToAlbum(pixmap: image.PixelMap,quality=100,successCallback:()=>void,failCallback?:(err:BusinessError)=>void) {
     GalleryHelper.instance?.packingPixelMap2Jpg(pixmap, quality).then(buffer => {
       GalleryHelper.instance?.saveImgToAssets(buffer,successCallback,failCallback);
    }).catch((err: BusinessError) => {
      failCallback?.(err);
    })
  }
}