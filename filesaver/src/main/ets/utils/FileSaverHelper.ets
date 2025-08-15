import { http } from "@kit.NetworkKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { image } from "@kit.ImageKit";
import { fileIo, fileUri } from "@kit.CoreFileKit";
import { photoAccessHelper } from "@kit.MediaLibraryKit";
import { buffer, util } from "@kit.ArkTS";

interface IResponse {
  success: boolean,
  filePath?: string,
}

export class FileSaverHelper {
  private static instance: FileSaverHelper;
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

  // Save network image to gallery
  async saveNetImageToGallery(url: string, progressCallback?: (progress: number) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      const { buffer } = await this.downloadFile(url, progressCallback);
      await this.saveImgBufferToGallery(buffer);
      progressCallback?.(100);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // Download file to sandbox
  async downloadFileToSandBox(url: string, progressCallback?: (progress: number) => void,
    failCallback?: (err: BusinessError) => void): Promise<IResponse> {
    try {
      const { buffer } = await this.downloadFile(url, progressCallback);
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      const filePath = `${this.context.filesDir}/${fileName}`;

      await this.writeBufferToFile(filePath, buffer);

      progressCallback?.(100);
      return { success: true, filePath };
    } catch (err) {
      failCallback?.(err);
      throw err;
    }
  }

  // Save image buffer to gallery
  async saveImgBufferToGallery(imageBuffer: ArrayBuffer, successCallback?: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      const { filePath } = await this.saveArrayBufferToSandBox(imageBuffer);
      const phAccessHelper = photoAccessHelper.getPhotoAccessHelper(this.context);

      const srcFileUris = [fileUri.getUriFromPath(filePath)];
      const photoCreationConfigs = [{
        fileNameExtension: 'jpg',
        photoType: photoAccessHelper.PhotoType.IMAGE,
        subtype: photoAccessHelper.PhotoSubtype.DEFAULT,
      }];

      const desFileUris = await phAccessHelper.showAssetsCreationDialog(srcFileUris, photoCreationConfigs);
      if (desFileUris.length === 0) {
        throw { code: -2, message: '保存失败', name: "" };
      }

      const file = fileIo.openSync(desFileUris[0], fileIo.OpenMode.READ_WRITE);
      fileIo.writeSync(file.fd, imageBuffer);
      fileIo.closeSync(file);

      successCallback?.(true);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // Save PixelMap to gallery
  async savePixelMapToGallery(pixmap: image.PixelMap, quality = 100,
    successCallback?: (isSuccess: boolean) => void, failCallback?: (err: BusinessError) => void) {
    try {
      const buffer = await this.packingPixelMapToArrayBuffer(pixmap, quality);
      await this.saveImgBufferToGallery(buffer, successCallback, failCallback);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // Save PixelMap to sandbox
  async savePixelMapToSandBox(pixmap: image.PixelMap, quality = 100,
    successCallback?: (response: IResponse) => void, failCallback?: (err: BusinessError) => void) {
    try {
      const buffer = await this.packingPixelMapToArrayBuffer(pixmap, quality);
      const result = await this.saveArrayBufferToSandBox(buffer);
      successCallback?.(result);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // Save base64 image to gallery
  async saveImgBase64ToGallery(base64: string, successCallback?: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      const pixelMap = await this.base64ToPixelMap(base64);
      await this.savePixelMapToGallery(pixelMap, 100, successCallback, failCallback);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // Save sandbox image to gallery
  async saveSandBoxImageToGallery(filePath: string, successCallback?: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      const buffer = await this.readLocalFileWithStream(filePath);
      await this.saveImgBufferToGallery(buffer, successCallback, failCallback);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // Save local raw image to gallery
  async saveLocalRawImageToGallery(fileName: string, successCallback?: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      await this.saveRawFileToSandBox(fileName);
      const filePath = `${this.context.filesDir}/${fileName}`;
      await this.saveSandBoxImageToGallery(filePath, successCallback, failCallback);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // Save local resource image to gallery
  async saveLocalResImageToGallery(fileName: string, successCallback?: (isSuccess: boolean) => void,
    failCallback?: (err: BusinessError) => void) {
    try {
      await this.saveRawFileToSandBox(fileName);
      const filePath = `${this.context.filesDir}/${fileName}`;
      await this.saveSandBoxImageToGallery(filePath, successCallback, failCallback);
    } catch (err) {
      failCallback?.(err);
    }
  }

  // ------------------ Helper Methods ------------------

  private async downloadFile(url: string, progressCallback?: (progress: number) => void): Promise<{ buffer: ArrayBuffer }> {
    return new Promise((resolve, reject) => {
      const httpRequest = http.createHttp();
      const chunks: ArrayBuffer[] = [];

      httpRequest.requestInStream(url, {
        expectDataType: http.HttpDataType.ARRAY_BUFFER,
        method: http.RequestMethod.GET,
        connectTimeout: 60000,
        readTimeout: 60000
      }, (err: BusinessError) => {
        if (err) reject(err);
      });

      httpRequest.on('dataReceiveProgress', (data) => {
        const progress = data.receiveSize * 100 / data.totalSize;
        if (progress < 100) {
          progressCallback?.(progress);
        }
      });

      httpRequest.on('dataReceive', (chunk) => chunks.push(chunk));

      httpRequest.on('dataEnd', () => {
        const totalLength = chunks.reduce((len, chunk) => len + chunk.byteLength, 0);
        const mergedBuffer = new Uint8Array(totalLength);
        let offset = 0;

        chunks.forEach(chunk => {
          mergedBuffer.set(new Uint8Array(chunk), offset);
          offset += chunk.byteLength;
        });

        resolve({ buffer: mergedBuffer.buffer });
      });
    });
  }

  private async packingPixelMapToArrayBuffer(pixelMap: PixelMap, quality = 100): Promise<ArrayBuffer> {
    const imagePackerApi = image.createImagePacker();
    const packOpts: image.PackingOption = { format: "image/jpeg", quality };
    return await imagePackerApi.packToData(pixelMap, packOpts);
  }

  private async saveArrayBufferToSandBox(buffer: ArrayBuffer): Promise<IResponse> {
    const filePath = `${this.context.filesDir}/${Date.now()}_IMG.jpg`;
    await this.writeBufferToFile(filePath, buffer);
    return { success: true, filePath };
  }

  private async writeBufferToFile(filePath: string, buffer: ArrayBuffer): Promise<void> {
    const file = fileIo.openSync(filePath, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE);
    try {
      fileIo.writeSync(file.fd, buffer);
    } finally {
      fileIo.closeSync(file.fd);
    }
  }

  private async readLocalFileWithStream(filePath: string): Promise<ArrayBuffer> {
    const inputStream = fileIo.createStreamSync(filePath, 'r+');
    try {
      const buffers: buffer.Buffer[] = [];
      const bufSize = 4096;
      let readSize = 0;
      const buf = new ArrayBuffer(bufSize);

      class Option {
        public offset: number = 0;
        public length: number = bufSize;
      }

      const option = new Option();

      let readLen = await inputStream.read(buf, option);
      while (readLen > 0) {
        buffers.push(buffer.from(buf.slice(0, readLen)));
        readSize += readLen;
        option.offset = readSize;
        readLen = await inputStream.read(buf, option);
      }

      return buffer.concat(buffers).buffer;
    } finally {
      inputStream.closeSync();
    }
  }

  private async saveMediaFileToSandBox(resName: string): Promise<IResponse> {
    const filePath = `${this.context.filesDir}/${resName}`;
    const file = await fileIo.open(filePath, fileIo.OpenMode.READ_WRITE);
    try {
      const mediaBuffer = this.context.resourceManager.getMediaByNameSync(resName);
      await fileIo.write(file.fd, mediaBuffer.buffer);
      return { success: true, filePath };
    } finally {
      await fileIo.close(file);
    }
  }

  private async saveRawFileToSandBox(fileName: string): Promise<IResponse> {
    const filePath = `${this.context.filesDir}/${fileName}`;
    const val = this.context.resourceManager.getRawFileContentSync(fileName);
    const file = fileIo.openSync(filePath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
    try {
      fileIo.writeSync(file.fd, val.buffer as ArrayBuffer);
      return { success: true, filePath };
    } finally {
      fileIo.closeSync(file);
    }
  }

  private async base64ToPixelMap(base64: string): Promise<image.PixelMap> {
    const str = base64.replace(/^data:image\/\w+;base64,/i, '');
    const helper = new util.Base64Helper();
    const buffer: ArrayBuffer = helper.decodeSync(str, util.Type.MIME).buffer as ArrayBuffer;
    const imageSource = image.createImageSource(buffer);
    const opts: image.DecodingOptions = { editable: true };
    return await imageSource.createPixelMap(opts);
  }

  private async transferImage2PixelMap(uri: string): Promise<image.PixelMap> {
    const file = fileIo.openSync(uri, fileIo.OpenMode.READ_ONLY);
    try {
      const imageSource = image.createImageSource(file.fd);
      return await imageSource.createPixelMap({});
    } finally {
      fileIo.closeSync(file.fd);
    }
  }
}