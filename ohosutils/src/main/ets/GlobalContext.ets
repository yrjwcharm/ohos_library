export class GlobalContext {
  private static instance: GlobalContext;
  private _objects = new Map<string, Object>();

  private constructor() {
  }

  public static getContext(): GlobalContext {
    if (!GlobalContext.instance) {
      GlobalContext.instance = new GlobalContext();
    }
    return GlobalContext.instance;
  }

  getObject(value: string): Object | undefined {
    return this._objects.get(value);
  }

  setObject(key: string, objectClass: Object): void {
    this._objects.set(key, objectClass);
  }

  /**
   * 清除缓存数据
   */
  clear(): void {
    this._objects.clear();
  }

  deleteObject(key: string) {
    this._objects.delete(key)
  }
}
