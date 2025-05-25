/**
 * url 相关
 */
import { url as uri } from "@kit.ArkTS";

export class UrlHelper {

  /**
   * url 编码
   */
  static encode(url: string): string {
    let encodedURL = encodeURIComponent(url);
    return encodedURL
  }

  /**
   * url 解码
   */
  static decode(url: string): string {
    let decodedURL = decodeURIComponent(url);
    return decodedURL
  }

  /**
   * 获取 url 参数
   */
  static query(url: string, key: string): string {
    let urlObject = uri.URL.parseURL(url);
    let paramsObject = new uri.URLParams(urlObject.search.slice(1));
    let value = paramsObject.get(key);
    return value || ""
  }
}