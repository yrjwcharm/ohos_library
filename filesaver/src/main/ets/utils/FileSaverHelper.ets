import { http } from "@kit.NetworkKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { image } from "@kit.ImageKit";
import { fileIo, fileUri } from "@kit.CoreFileKit";
import { photoAccessHelper } from "@kit.MediaLibraryKit";
import { buffer, util } from "@kit.ArkTS";
interface IResponse{
  success:boolean,
  filePath?:string,
}
//保存到系统相册 普遍三种方式 1、SaveButton控件、 2、ACL权限申请、3、媒体文件管理服务模块/https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-photoaccesshelper-V5#showassetscreationdialog12
export class FileSaverHelper {
  private static instance: FileSaverHelper
  private context: Context;
  static getInstance(context: Context) {
    if (!FileSaverHelper.instance) {
      FileSaverHelper.instance = new FileSaverHelper(context);
    }
    return FileSaverHelper.instance;
  }

  constructor(context: Context) {
    this.context = context;
  }
  //保存网络图片到相册
  saveNetImageToGallery(url: string, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
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
          FileSaverHelper.instance?.saveImgBufferToGallery(imageBuffer, successCallback)
        }
      })
  }
  //下载网络资源(图片等文件)到应用沙盒
  downloadFileToSandBox(url:string,successCallback:(response:IResponse)=>void,failCallback?:(err:BusinessError)=>void){
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
        const fileName = url.substring(url.lastIndexOf('/')+1);
        if (data.result instanceof ArrayBuffer) {
          let imageBuffer = data.result as ArrayBuffer;
          const filePath = `${this.context?.filesDir}/`+fileName
          let tempFile = fileIo.openSync(filePath, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE)
          try {
            fileIo.writeSync(tempFile.fd, imageBuffer)
            fileIo.close(tempFile.fd)
            successCallback?.({
              success:true,
              filePath
            })
          } catch (err) {
            failCallback?.({
              code: -1,
              message: 'buffer写入沙盒文件失败',
              name: ""
            })
            return
          }
        }
      })
  }
  // 打包 PixelMap 为 jpg 格式
  async packingPixelMapToArrayBuffer(pixelMap: PixelMap, quality = 100): Promise<ArrayBuffer> {
    // 创建ImagePacker实例
    const imagePackerApi = image.createImagePacker();
    const packOpts: image.PackingOption = { format: "image/jpeg", quality };
    let imageBuffer: ArrayBuffer = new ArrayBuffer(0);
    try {
      // 图片压缩或重新打包
      imageBuffer = await imagePackerApi.packToData(pixelMap, packOpts);
    } catch (err) {
      console.error(`Invoke packingPixelMap2Jpg failed, err: ${JSON.stringify(err)}`);
    }
    return imageBuffer;
  }

  //保存 图片ArrayBuffer二进制流 到系统相册
  async saveImgBufferToGallery(imageBuffer: ArrayBuffer, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      // 先将buffer存到沙盒
      const result = await this.saveArrayBufferToSandBox(imageBuffer);
      const filePath = result.filePath;
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
   * 保存PixelMap到相册
   *
   */
  savePixelMapToGallery(pixmap: image.PixelMap, quality = 100, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    FileSaverHelper.instance?.packingPixelMapToArrayBuffer(pixmap, quality).then(buffer => {
      FileSaverHelper.instance?.saveImgBufferToGallery(buffer, successCallback, failCallback);
    }).catch((err: BusinessError) => {
      failCallback?.(err);
    })
  }
  /**
   * 保存PixelMap到应用沙盒
   *
   */
  savePixelMapToSandBox(pixmap: image.PixelMap, quality = 100, successCallback: (response: IResponse) => void,
    failCallback?: (err: BusinessError) => void) {
    this.packingPixelMapToArrayBuffer(pixmap).then(buffer=>{
      this.saveArrayBufferToSandBox(buffer).then(result=>{
        successCallback?.(result);
      }).catch((err:BusinessError)=>{
        failCallback?.(err);
      })
    }).catch((err:BusinessError)=>{
      failCallback?.(err)
    })
  }
  //保存ArrayBuffer到应用沙盒
  saveArrayBufferToSandBox(buffer: ArrayBuffer): Promise<IResponse> { // 传入buffer，获取图片沙箱路径  this.pixmapUri
    return new Promise((resolve,reject)=>{
      //保存到沙箱中并存储拍摄的文件路径集--用来打开指定的图片
      const filePath = this.context?.filesDir + '/' + `${Date.now()}_${Math.random()}_IMG.jpg`
      let tempFile = fileIo.openSync(filePath, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE)
      try {
        fileIo.writeSync(tempFile.fd, buffer)
        fileIo.close(tempFile.fd)
        resolve({
          success:true,
          filePath
        })
      } catch (err) {
        reject(err)
      }
    })
  }
  //拉起选择图片选择后的图片路径-转化为PixelMap
  async transferImage2PixelMap(uri: string): Promise<image.PixelMap> {
    const file = fileIo.openSync(uri, fileIo.OpenMode.READ_ONLY);
    const imageSource = image.createImageSource(file.fd);
    return await imageSource.createPixelMap({});
  }

  //图片base64形式保存到系统相册
  async saveImgBase64ToGallery(base64: string, successCallback: (isSuccess: boolean) => void,
    failCallback: (err: BusinessError) => void) {
    try {
      const pixelMap = await FileSaverHelper.instance?.base64ToPixelMap(base64);
      FileSaverHelper.instance.savePixelMapToGallery(pixelMap, 100, successCallback, failCallback);
    } catch (err) {
      failCallback?.(err);
    }
  }

  public base64ToPixelMap = async (base64: string) => {
    const str = base64.replace(/^data:image\/\w+;base64,/i, '');
    let helper = new util.Base64Helper();
    let buffer: ArrayBuffer = helper.decodeSync(str, util.Type.MIME).buffer as ArrayBuffer;
    let imageSource = image.createImageSource(buffer);
    let opts: image.DecodingOptions = { editable: true };
    let pixelMap = await imageSource.createPixelMap(opts);
    console.log('base64ToPixelMap', pixelMap)
    return pixelMap
  }

  //图片的沙箱路径-保存到系统相册
  //受限开放的权限通常是不允许三方应用申请的。如果有特殊场景需要使用，请提供相关申请材料到应用市场（AppGallery Connect，简称为AGC）申请相应权限证书。
  // 此方法三方应用不允许使用-<https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl>
  private async saveSandBoxImageToGalleryACL(fileUri: string, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      // 需要确保fileUri对应的资源存在
      let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(this.context);
      let assetChangeRequest: photoAccessHelper.MediaAssetChangeRequest =
        photoAccessHelper.MediaAssetChangeRequest.createImageAssetRequest(this.context, fileUri);
      await phAccessHelper.applyChanges(assetChangeRequest);
      successCallback?.(true);
    } catch (err) {
      failCallback?.(err);
    }
  }

  //图片的沙箱路径-保存到系统相册
  async saveSandBoxImageToGallery(filePath: string, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      const buffer = await this.readLocalFileWithStream(filePath);
      this.saveImgBufferToGallery(buffer, successCallback, failCallback);
    } catch (err) {
      failCallback?.(err);
    }
  }

  //沙盒文件转ArrayBuffer
  fileToArrayBuffer(filePath: string): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      let file = fileIo.openSync(filePath, fileIo.OpenMode.READ_WRITE);
      let arrayBuffer = new ArrayBuffer(4096);
      //指定长度的与arrayBuffer
      // 从文件读取数据buf
      fileIo.read(file.fd, arrayBuffer, (err: BusinessError, readLen: number) => {
        if (err) {
          console.error("read failed with error message: " + err.message + ", error code: " + err.code);
          reject(err);
        } else {
          console.info("read file data succeed");
          let buf = buffer.from(arrayBuffer, 0, readLen);
          console.info(`The content of file: ${buf.toString()}`);
          resolve(buf.buffer)
        }
        fileIo.closeSync(file);
      });

    })
  }
  //沙盒文件转ArrayBuffer -文件比较大使用
   readLocalFileWithStream(filePath: string):Promise<ArrayBuffer> {
    return new Promise(async(resolve,reject)=>{
      try {
        // 存储每次读取的结果
        let buffers: buffer.Buffer[] = [];
        // 打开文件流
        let inputStream = fileIo.createStreamSync(filePath, 'r+');
        // 以流的形式读取源文件内容
        let bufSize = 4096;
        let readSize = 0;
        let buf = new ArrayBuffer(bufSize);

        class Option {
          public offset: number = 0;
          public length: number = bufSize;
        }

        let option = new Option();
        option.offset = readSize;
        let readLen = await inputStream.read(buf, option);
        // 存储当前读取结果
        buffers.push(buffer.from(buf.slice(0, readLen)))
        readSize += readLen;
        while (readLen > 0) {
          option.offset = readSize;
          readLen = await inputStream.read(buf, option);
          // 存储当前读取结果
          buffers.push(buffer.from(buf.slice(0, readLen)))
          readSize += readLen;
        }
        // 关闭文件流
        inputStream.closeSync();
        // 合并内容
        let finalBuf: ArrayBuffer = buffer.concat(buffers).buffer
        console.info(`final ArrayBuffer byteLength is ${finalBuf.byteLength}`)
        resolve(finalBuf);
      } catch (error) {
        let err = error as BusinessError;
        console.error(`readLocalFileWithStream failed, code is ${err.code},message is ${err.message}`);
        reject(err);
      }

    })
  }

  //保存本地resource/rawFile中的图片资源到系统相册
   async saveLocalRawImageToGallery(fileName: string, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      await this.saveRawFileToSandBox(fileName);
      const filePath =this.context?.filesDir +'/'+fileName;
      this.saveSandBoxImageToGallery(filePath,successCallback,failCallback);
    }catch (err) {
      failCallback?.(err);
    }
  }
  //保存本地resource/Media中的图片资源到系统相册
  async saveLocalResImageToGallery(fileName: string, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      await this.saveRawFileToSandBox(fileName);
      const filePath =this.context?.filesDir +'/'+fileName;
      this.saveLocalResImageToGallery(filePath,successCallback,failCallback);
    }catch (err) {
      failCallback?.(err);
    }
  }
  //将资源文件夹Resource/Media下的文件存放到沙箱目录下
  saveMediaFileToSandBox(resName: string):Promise<IResponse>{
    return new Promise(async (resolve,reject)=>{
      try{
        let pathDir: string =  this.context?.filesDir; // /data/storage/el2/base/haps/entry/files
        let filePath: string = pathDir + '/'+resName;
        let file = await fileIo.open(filePath, fileIo.OpenMode.READ_WRITE);
        let buffer = this.context?.resourceManager.getMediaByNameSync(resName);
        // Write the read ArrayBuffer to the new media file.
        let writeLen = await fileIo.write(file.fd, buffer.buffer);
        await fileIo.close(file);
        resolve({
          success:true,
          filePath
        })
      }catch (err) {
        reject(err);
      }
    })
  }
  //将资源文件夹Resource/rawFile下的文件存放到沙箱目录下
  saveRawFileToSandBox(fileName:string):Promise<IResponse>{
    return new Promise((resolve,reject)=>{
      try {
        let val: Uint8Array = this.context?.resourceManager.getRawFileContentSync(fileName);
        let pathDir: string =  this.context?.filesDir;
        // 待拷贝文件沙箱路径
        let filePath: string = pathDir + '/'+fileName;
        // 若文件不存在，则创建文件。
        let file = fileIo.openSync(filePath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
        let writeLen = fileIo.writeSync(file.fd, val.buffer as ArrayBuffer);
        fileIo.closeSync(file);
        resolve({
          success:true,
          filePath
        });
      } catch (error) {
        let code = (error as BusinessError).code;
        let message = (error as BusinessError).message;
        reject(error);
      }
    })
  }
  //保存本地 resource/media中的资源到系统相册 createAsset  需要申请使用受限权限
  private async saveLocalImageToGalleryACL(resoure: Resource, successCallback: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(this.context);
      // Creating a Media File
      let uri = await phAccessHelper.createAsset(photoAccessHelper.PhotoType.IMAGE, 'jpg');
      // Open the created media file and read the local file and convert it to ArrayBuffer for easy filling.
      let file = await fileIo.open(uri, fileIo.OpenMode.READ_WRITE);
      let buffer = this.context?.resourceManager.getMediaContentSync(resoure.id);
      // Write the read ArrayBuffer to the new media file.
      let writeLen = await fileIo.write(file.fd, buffer.buffer);
      await fileIo.close(file);
      successCallback?.(true);
    } catch (err) {
      // 'createAsset failed, message = ', err
      failCallback?.(err);
    }
  }
}