import { image } from '@kit.ImageKit';
import { fileIo} from '@kit.CoreFileKit';

class CompressedImageInfo {
  imageUri: string = ""; // URI of compressed image storage location
  imageByteLength: number = 0; // Compressed image byte length
  imageBuffer:ArrayBuffer =new ArrayBuffer(4096)
}


export class CompressorUtil{

  /**
   * 图片压缩，保存
   * @param sourcePixelMap：原始待压缩图片的PixelMap对象
   * @param maxCompressedImageSize：指定图片的压缩目标大小，单位kb
   * @returns compressedImageInfo：返回最终压缩后的图片信息
   */
  static async   compressedImage(sourcePixelMap: image.PixelMap, maxCompressedImageSize: number): Promise<CompressedImageInfo> {
  // Create an ImagePacker object for image encoding
  const imagePackerApi = image.createImagePacker();
  const IMAGE_QUALITY = 80;
  const packOpts: image.PackingOption = { format: "image/jpeg", quality: IMAGE_QUALITY };
  // Encode through PixelMap. Compressed ImageData is the image file stream obtained by packaging.
  let compressedImageData: ArrayBuffer = await imagePackerApi.packToData(sourcePixelMap, packOpts);
  // 压缩目标图像字节长度
  const maxCompressedImageByte = maxCompressedImageSize * 1024;
  // Image compression. First, determine whether the minimum byte size of the image that can be compressed by packToData meets the specified image compression size when setting the image quality parameter quality to 80.
  // If satisfied, use the packToData method to binary search for the quality closest to the specified image compression target size to compress the image.
  // If it is not satisfied, use scale to scale the image first, use a while loop to scale the image by 0.4 times each time,
  // then use packToData (with the image quality parameter quality set to 80) to obtain the compressed image size,
  // and finally find the compressed image data with the closest scaling factor to the specified image compression target size.
  if (maxCompressedImageByte > compressedImageData.byteLength) {
    // Using packToData binary compression to obtain image file streams
    compressedImageData = await CompressorUtil.packingImage(compressedImageData, sourcePixelMap, IMAGE_QUALITY, maxCompressedImageByte);
  } else {
    // Use scale to scale the image first, use a while loop to decrease the scale by 0.4 times each time, then use packToData (with the image quality parameter quality set to 80) to obtain the compressed image size,
    // and finally find the compressed image data with the closest scaling factor to the specified image compression target size
    let imageScale = 1;
    const REDUCE_SCALE = 0.4;
    // Determine whether the compressed image size is greater than the specified compression target size. If it is, continue to reduce the scaling factor for compression.
    while (compressedImageData.byteLength > maxCompressedImageByte) {
      if (imageScale > 0) {
        // Performance knowledge point: As scale directly modifies the PixelMap data of the image, binary search for scale scaling factor is not applicable. Here, we use a cyclic decrease of 0.4 times to scale the image,
        // in order to find and determine the most suitable scaling factor. If you do not have high requirements for image compression quality,
        // it is recommended to increase the scaling factor reduceScale each time to reduce loops and improve scale compression performance.
        imageScale = imageScale - REDUCE_SCALE;
        await sourcePixelMap.scale(imageScale, imageScale);
        compressedImageData = await CompressorUtil.packToData(sourcePixelMap, IMAGE_QUALITY);
      } else {
        // When the imageScale scaling is less than or equal to 0, it is meaningless and the compression ends. We do not consider the case where the image scaling factor is less than reduceScale here.
        break;
      }
    }
  }
  // Save the image and return the compressed image information.
  const compressedImageInfo: CompressedImageInfo = await CompressorUtil.saveImage(compressedImageData);
  return compressedImageInfo;
}

  /**
 * Packing compression
 * @param sourcePixelMap：PixelMap of the original image to be compressed
 * @param imageQuality：Image quality parameters
 * @returns data：Return compressed image data
 */
private static async  packToData(sourcePixelMap: image.PixelMap, imageQuality: number): Promise<ArrayBuffer> {
  const imagePackerApi = image.createImagePacker();
  const packOpts: image.PackingOption = { format: "image/jpeg", quality: imageQuality };
  const data: ArrayBuffer = await imagePackerApi.packToData(sourcePixelMap, packOpts);
  return data;
}


/**
 * Packing binary method cyclic compression
 * @param compressedImageData：Arrays Buffer for image compression
 * @param sourcePixelMap：PixelMap of the original image to be compressed
 * @param imageQuality：Image quality parameters
 * @param maxCompressedImageByte：Compress the byte length of the target image
 * @returns compressedImageData：Return the compressed image data after binary packToData
 */
private static async   packingImage(compressedImageData: ArrayBuffer, sourcePixelMap: image.PixelMap, imageQuality: number, maxCompressedImageByte: number): Promise<ArrayBuffer> {
  // The range of image quality parameters is 80-100. Here, an array for packToData binary image quality parameters is created with 5 as the minimum binary unit.
  const packingArray: number[] = [];
  const DICHOTOMY_ACCURACY = 5;
  // Performance knowledge point: If the requirements for image compression quality are not high, it is recommended to increase the minimum binary unit dichotomyAccuracy,
  // reduce loops, and improve packToData compression performance.
  for (let i = 80; i <= 100; i += DICHOTOMY_ACCURACY) {
    packingArray.push(i);
  }
  let left = 0;
  let right = packingArray.length - 1;
  // Binary compressed image
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    imageQuality = packingArray[mid];
    // 根据传入的图片质量参数进行packing压缩，返回压缩后的图片文件流数据。
    compressedImageData = await CompressorUtil.packToData(sourcePixelMap, imageQuality);
    // Perform packToData compression based on the input image quality parameters and return the compressed image file stream data.
    if (compressedImageData.byteLength <= maxCompressedImageByte) {
      left = mid + 1;
      if (mid === packingArray.length - 1) {
        break;
      }
      // Obtain the compressed image file stream data with the next binary image quality parameter (mid+1)
      compressedImageData = await CompressorUtil.packToData(sourcePixelMap, packingArray[mid + 1]);
      // Determine whether the size of the image compressed with the next image quality parameter (mid+1) is greater than the specified compression target size of the image.
      // If it is greater than, it indicates that the current image quality parameter (mid) compresses the image size closest to the compression target size of the specified image.
      // Pass in the current image quality parameter mid to obtain the final compressed data of the target image.
      if (compressedImageData.byteLength > maxCompressedImageByte) {
        compressedImageData = await CompressorUtil.packToData(sourcePixelMap, packingArray[mid]);
        break;
      }
    } else {
      // The target value is not in the right half of the current range. Move the right boundary of the search range to the left to narrow down the search range
      // and continue searching for the left half in the next iteration.
      right = mid - 1;
    }
  }
  return compressedImageData;
}


/**
 * pictures saving
 * @param compressedImageData：Compressed image data
 * @returns compressedImageInfo：Return compressed image information
 */
private static async  saveImage(compressedImageData: ArrayBuffer): Promise<CompressedImageInfo> {
  const context: Context = getContext();
  // Define the compressed image URI to be saved. AfterCompression.jpeg represents the compressed image.
  const compressedImageUri: string = context.filesDir + '/' + 'afterCompression.jpeg';
  try {
    const res = fileIo.accessSync(compressedImageUri);
    if (res) {
      // If the image afterCommisiona.jpeg already exists, delete it
      fileIo.unlinkSync(compressedImageUri);
    }
  } catch (err) {
    console.error(`AccessSync failed with error message: ${err.message}, error code: ${err.code}`);
  }
  // Knowledge point: Save images. Obtain the final compressed image data compressed ImageData and save the image.
  // Compress image data and write it to a file
  const file: fileIo.File = fileIo.openSync(compressedImageUri, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
  fileIo.writeSync(file.fd, compressedImageData);
  fileIo.closeSync(file);
  // Obtain compressed image information
  let compressedImageInfo: CompressedImageInfo = new CompressedImageInfo();
  compressedImageInfo.imageUri = compressedImageUri;
  compressedImageInfo.imageByteLength = compressedImageData.byteLength;
  compressedImageInfo.imageBuffer = compressedImageData
  return compressedImageInfo;
}
}
