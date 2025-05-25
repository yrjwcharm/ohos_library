import { util } from '@kit.ArkTS';

/**
 * TODO LRUCache缓存工具类
 * author:yanruifeng
 * since: 2024/05/01
 */
export class LRUCacheUtil {
  private static instance: LRUCacheUtil;
  private lruCache: util.LRUCache<string, Object>;

  private constructor() {
    this.lruCache = new util.LRUCache(64);
  }


  /**
   * 获取LRUCacheUtil的单例
   * @returns
   */
  public static getInstance(): LRUCacheUtil {
    if (!LRUCacheUtil.instance) {
      LRUCacheUtil.instance = new LRUCacheUtil();
    }
    return LRUCacheUtil.instance;
  }


  /**
   * 判断是否包含key对应的缓存
   */
  public has(key: string): boolean {
    return this.lruCache.contains(key);
  }


  /**
   * 获取key对应的缓存
   */
  public get<T>(key: string): T {
    return this.lruCache.get(key) as T;
  }


  /**
   * 添加缓存到lruCache中
   */
  public put(key: string, value: Object) {
    this.lruCache.put(key, value);
  }


  /**
   * 删除key对应的缓存
   */
  public remove(key: string) {
    this.lruCache.remove(key);
  }


  /**
   * 判断lruCache缓存是否为空
   * @returns
   */
  public isEmpty(): boolean {
    return this.lruCache.isEmpty();
  }


  /**
   * 获取当前缓冲区的容量。
   * @returns
   */
  public getCapacity(): number {
    return this.lruCache.getCapacity();
  }


  /**
   * 重新设置lruCache的容量
   * @param newCapacity
   */
  public updateCapacity(newCapacity: number) {
    this.lruCache.updateCapacity(newCapacity);
  }


  /**
   * 清除缓存数据，并重置lruCache的大小
   */
  public clear() {
    this.lruCache.clear();
    this.lruCache.updateCapacity(64);
  }


}