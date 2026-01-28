import { buffer } from '@kit.ArkTS'
import util from '@ohos.util';

export function isBlank(text: string | Resource): boolean {
  return !isNotBlank(text)
}

export function isNotBlank(text: string | Resource): boolean {
  if (typeof text === 'string') {
    return strIsNotBlank(text)
  } else {
    return strIsNotBlank(transformResourceToString(text))
  }
}

export function strIsNotBlank(text: string): boolean {
  return text.trim().length != 0
}

export function transformResourceToString(res: Resource, component?: Object) : string {
  try {
    let value: string = getContext(component).resourceManager.getStringSync(res)
    return value
  } catch (e) {
    console.warn(`transformResourceToString exception: ${e}`);
  }
  return ''
}

export function toStr(source: string | null | undefined, defaultValue = "") {
  if (source == null || source == undefined) {
    return defaultValue;
  }
  return String(source);
}

/**
 * 字符串转Uint8Array
 * @param src 字符串
 * @returns Uint8Array
 */
export function strToUint8Array(src: string, encoding: buffer.BufferEncoding = 'utf-8'): Uint8Array {
  let textEncoder = new util.TextEncoder(encoding);
  let result = textEncoder.encodeInto(src);
  return result;
}

/**
 * Uint8Array转字符串
 * @param src Uint8Array
 * @returns 字符串
 */
export function unit8ArrayToStr(src: Uint8Array, encoding: buffer.BufferEncoding = 'utf-8'): string {
  let textDecoder = util.TextDecoder.create(encoding, { ignoreBOM: true })
  let result = textDecoder.decodeWithStream(src, { stream: true });
  return result;
}

/**
 * 从rawFile文件夹中的文件获取string
 * @param filePath
 */
export function getRawFileJsonStringSync(rawFilePath: string): string{
  try {
    let resStr = util.TextDecoder.create('utf-8', {ignoreBOM: true});
    const rawFile = getContext().resourceManager.getRawFileContentSync(rawFilePath)
    return resStr.decodeToString(new Uint8Array(rawFile.buffer))
  } catch (e) {
    console.error(`getRawFileJsonObjectSync 获取失败`)
  }
  return ''
}