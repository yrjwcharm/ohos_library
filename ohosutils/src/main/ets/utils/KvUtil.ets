import { distributedKVStore } from '@kit.ArkData';
import { bundleManager, common } from '@kit.AbilityKit';
import { AuthUtil } from '../auth/AuthUtil';

/**
 * @Author csx
 * @DateTime 2024/8/6 11:08:24
 * @TODO KvUtil 数据持久化工具类
 */
export class KvUtil {
  /**
   * 管理数据库对象
   */
  private kvManager: distributedKVStore.KVManager | null = null;
  /**
   * 数据库实例
   */
  private kvStore: distributedKVStore.SingleKVStore | null = null;

  /**
   * 构造函数
   * @param ctx
   */
  constructor(ctx: common.Context) {
    this.init(ctx);
  }

  /**
   * 初始化
   * @returns SingleKVStore
   */
  async init(ctx: common.Context) {
    //获取调用方包名
    let bundleInfo: bundleManager.BundleInfo =
      bundleManager.getBundleInfoForSelfSync(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
    //构建配置
    const kvManagerConfig: distributedKVStore.KVManagerConfig = {
      context: ctx,
      bundleName: bundleInfo.name
    };
    // 创建KVManager实例
    this.kvManager = distributedKVStore.createKVManager(kvManagerConfig);
    //创建store配置
    const options: distributedKVStore.Options = {
      //当数据库文件不存在时是否创建数据库
      createIfMissing: true,
      //设置数据库文件是否加密
      encrypt: true,
      //设置数据库文件是否备份
      backup: false,
      //设置数据库是否为跨设备自动同步
      autoSync: false,
      //设置要创建的数据库类型
      kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION,
      //设置数据库安全级别
      securityLevel: distributedKVStore.SecurityLevel.S1
    };
    //创建kvStore
    this.kvStore = await this.kvManager.getKVStore<distributedKVStore.SingleKVStore>('efStore', options);
  }

  /**
   * 获取是否授权
   * @returns
   */
  private async getAuth(): Promise<boolean> {
    //判断是否获取授权
    let isAuth = AuthUtil.checkPermissions('ohos.permission.DISTRIBUTED_DATASYNC');
    if (!isAuth) {
      //获取用户授权
      let code =
        await AuthUtil.reqPermissionsList(['ohos.permission.DISTRIBUTED_DATASYNC']);
      if (!code) {
        //授权失败
        return false;
      }
    }
    return true;
  }

  /**
   * 存储数据
   * @param key  存入的key
   * @param value  存入的数据
   * @returns 存储结果
   */
  async put(key: string, value: boolean | string | number | Uint8Array): Promise<string> {
    let isAuth = await this.getAuth();
    if (isAuth) {
      await this.kvStore?.put(key, value);
      return "存入数据:" + key + "成功~";
    }
    return "用户禁止授权,存储失败~";
  }

  /**
   * 获取数据
   * @param key  获取数据的key
   * @param defVal  默认值
   * @returns 获取到的数据
   */
  async get<T>(key: string, defVal: T): Promise<T> {
    let isAuth = await this.getAuth();
    if (isAuth) {
      try {
        const value = await this.kvStore?.get(key);
        if (value === undefined) {
          return defVal;
        }
        return value as T;
      } catch (e) {
        return defVal;
      }
    }
    return defVal;
  }

  /**
   * 删除数据
   * @param key  删除的key
   * @returns 结果
   */
  async delete(key: string): Promise<string> {
    let isAuth = await this.getAuth();
    if (isAuth) {
      await this.kvStore?.delete(key);
      return "删除数据:" + key + "成功~";
    }
    return "用户禁止授权,删除失败~";
  }
}

