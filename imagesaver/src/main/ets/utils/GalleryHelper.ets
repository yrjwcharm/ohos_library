import { http } from "@kit.NetworkKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { image } from "@kit.ImageKit";
import { fileIo, fileUri } from "@kit.CoreFileKit";
import { photoAccessHelper } from "@kit.MediaLibraryKit";
import { util } from "@kit.ArkTS";

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
  saveNetImageToGallery(url: string,successCallback:(isSuccess:boolean)=>void,failCallback?:(err:BusinessError)=>void) {
    let httpRequest = http.createHttp();
    httpRequest.request(url, {
      expectDataType: http.HttpDataType.ARRAY_BUFFER,
      method: http.RequestMethod.GET,
      connectTimeout: 60000,
      readTimeout: 60000
    },
      (err: BusinessError, data: http.HttpResponse) => {
        if (err) {
          failCallback?.(err);
          return
        }
        if (data.result instanceof ArrayBuffer) {
          let imageBuffer = data.result as ArrayBuffer;
           // GalleryHelper.instance?.saveImgBufferToAssets(imageBuffer,successCallback)
          GalleryHelper.instance?.saveImgBufferToGallery(imageBuffer,successCallback)
        }
      })
  }

  // 打包 PixelMap 为 jpg 格式
  private  async packingPixelMap2Jpg(pixelMap: PixelMap, quality = 100): Promise<ArrayBuffer> {
    // 创建ImagePacker实例
    const imagePackerApi = image.createImagePacker();
    const packOpts: image.PackingOption = { format: "image/jpeg", quality };
    let imageBuffer: ArrayBuffer = new ArrayBuffer(1);
    try {
      // 图片压缩或重新打包
      imageBuffer = await imagePackerApi.packToData(pixelMap, packOpts);
    } catch (err) {
      console.error(`Invoke packingPixelMap2Jpg failed, err: ${JSON.stringify(err)}`);
    }
    return imageBuffer;
  }
  //保存 图片ArrayBuffer二进制流 或者 应用沙盒图片到相册
  async  saveImgBufferToGallery(imageBuffer: ArrayBuffer,successCallback:(isSuccess:boolean)=>void,failCallback?:(err:BusinessError)=>void) {
      // 先将buffer存到沙盒
     const  filePath = `${this.context?.filesDir}/pic_assets.jpg`
      let tempFile = fileIo.openSync(filePath, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE)
      try {
        fileIo.writeSync(tempFile.fd, imageBuffer)
        fileIo.close(tempFile.fd)
      } catch (err) {
        failCallback?.({
          code: -1,
          message: 'buffer写入沙盒文件失败',
          name: ""
        })
        return
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
          subtype: photoAccessHelper.PhotoSubtype.DEFAULT, // 可选
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
      fileIo.writeSync(file.fd, imageBuffer);
      fileIo.closeSync(file);
      successCallback?.(true);
    } catch (err) {
      failCallback?.(err);
    }
  }
  /**
   * 保存到相册PixelMap到相册
   *
   */
  savePixelMapToGallery(pixmap: image.PixelMap,quality=100,successCallback:(isSuccess:boolean)=>void,failCallback?:(err:BusinessError)=>void) {
     GalleryHelper.instance?.packingPixelMap2Jpg(pixmap, quality).then(buffer => {
       GalleryHelper.instance?.saveImgBufferToGallery(buffer,successCallback,failCallback);
    }).catch((err: BusinessError) => {
      failCallback?.(err);
    })
  }
  //文件选择的图片路径
  async transitionImage2PixelMap(uri: string): Promise<image.PixelMap> {
    const file = fileIo.openSync(uri, fileIo.OpenMode.READ_ONLY);
    const imageSource = image.createImageSource(file.fd);
    return await imageSource.createPixelMap({});
  }
  //图片base64形式保存到系统相册
  async saveImgBase64ToGallery(base64:string,successCallback:(isSuccess:boolean)=>void,failCallback:(err:BusinessError)=>void){
    try {
      const pixelMap = await GalleryHelper.instance?.base64ToPixelMap(base64);
      GalleryHelper.instance.savePixelMapToGallery(pixelMap, 100, successCallback, failCallback);
    }catch (err) {
      failCallback?.(err);
    }
  }
  private base64ToPixelMap = async (base64:string)=>{
    const  str = base64.replace(/^data:image\/\w+;base64,/i, '');
    let helper = new util.Base64Helper();
    let buffer: ArrayBuffer = helper.decodeSync(str, util.Type.MIME).buffer as ArrayBuffer;
    let imageSource = image.createImageSource(buffer);
    let opts: image.DecodingOptions = { editable: true };
    let  pixelMap = await imageSource.createPixelMap(opts);
    console.log('base64ToPixelMap',pixelMap)
    return pixelMap
  }
}