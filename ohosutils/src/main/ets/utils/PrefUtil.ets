
import preferences from '@ohos.data.preferences';
import dataPreferences from '@ohos.data.preferences';
import { DEFAULT_PREFERENCE_NAME } from '../entity/constraint';
import { AppUtil } from './AppUtil';


/**
 * TODO Preferences工具类
 * author: yanruifeng
 * since: 2024/05/01
 */
export class PrefUtil {

  private static defaultPreferenceName: string = DEFAULT_PREFERENCE_NAME;
  private static preferences: preferences.Preferences;


  /**
   * 初始化，非必要不要初始化该方法
   * @param name Preferences实例的名称。
   */
  static init(preferenceName: string) {
    if (!PrefUtil.preferences || preferenceName !== PrefUtil.defaultPreferenceName) {
      PrefUtil.defaultPreferenceName = preferenceName;
      PrefUtil.preferences = dataPreferences.getPreferencesSync(AppUtil.getContext(), { name: preferenceName });
    }
  }


  /**
   * 获取Preferences实例
   * @param name
   * @returns
   */
  private static getPreferencesSync(preferenceName: string = PrefUtil.defaultPreferenceName): preferences.Preferences {
    if (preferenceName !== PrefUtil.defaultPreferenceName) {
      return dataPreferences.getPreferencesSync(AppUtil.getContext(), { name: preferenceName });
    } else if (!PrefUtil.preferences) {
      PrefUtil.preferences = dataPreferences.getPreferencesSync(AppUtil.getContext(), { name: preferenceName });
    }
    return PrefUtil.preferences;
  }

  /**
   * 获取Preferences实例
   * @param name
   * @returns
   */
  private static async getPreferences(preferenceName: string = PrefUtil.defaultPreferenceName): Promise<preferences.Preferences> {
    if (preferenceName !== PrefUtil.defaultPreferenceName) {
      return await dataPreferences.getPreferences(AppUtil.getContext(), preferenceName);
    } else if (!PrefUtil.preferences) {
      PrefUtil.preferences = await dataPreferences.getPreferences(AppUtil.getContext(), preferenceName);
    }
    return PrefUtil.preferences;
  }


  /**
   * 将数据缓存
   * @param key
   * @param value
   */
  static putSync(key: string, value: preferences.ValueType,
    preferenceName: string = PrefUtil.defaultPreferenceName) {
    const preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    preferences.putSync(key, value);
    preferences.flush(); //此处一定要flush，要不然不能永久序列化到本地
  }

  /**
   * 将数据缓存
   * @param key
   * @param value
   */
  static async put(key: string, value: preferences.ValueType,
    preferenceName: string = PrefUtil.defaultPreferenceName): Promise<void> {
    let preferences = await PrefUtil.getPreferences(preferenceName); //获取实例
    await preferences.put(key, value);
    await preferences.flush(); //此处一定要flush，要不然不能永久序列化到本地
  }


  /**
   * 获取缓存值
   * @param key
   * @param defValue
   * @returns
   */
  static getSync(key: string, defValue: preferences.ValueType,
    preferenceName: string = PrefUtil.defaultPreferenceName): preferences.ValueType {
    const preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    return preferences.getSync(key, defValue);
  }

  /**
   * 获取缓存值
   * @param key
   * @param defValue
   * @returns
   */
  static async get(key: string, defValue: preferences.ValueType,
    preferenceName: string = PrefUtil.defaultPreferenceName): Promise<preferences.ValueType> {
    let preferences = await PrefUtil.getPreferences(preferenceName); //获取实例
    return preferences.get(key, defValue);
  }


  /**
   * 获取string类型的缓存值
   * @param key
   * @returns
   */
  static getStringSync(key: string, defValue: string = "",
    preferenceName: string = PrefUtil.defaultPreferenceName): string {
    return PrefUtil.getSync(key, defValue, preferenceName) as string;
  }

  /**
   * 获取string类型的缓存值
   * @param key
   * @returns
   */
  static async getString(key: string, defValue: string = "",
    preferenceName: string = PrefUtil.defaultPreferenceName): Promise<string> {
    let value = await PrefUtil.get(key, defValue, preferenceName);
    return value as string;
  }


  /**
   * 获取number类型的缓存值
   * @param key
   * @returns
   */
  static getNumberSync(key: string, defValue: number = 0,
    preferenceName: string = PrefUtil.defaultPreferenceName): number {
    return PrefUtil.getSync(key, defValue, preferenceName) as number;
  }

  /**
   * 获取number类型的缓存值
   * @param key
   * @returns
   */
  static async getNumber(key: string, defValue: number = 0,
    preferenceName: string = PrefUtil.defaultPreferenceName): Promise<number> {
    let value = await PrefUtil.get(key, defValue, preferenceName);
    return value as number;
  }


  /**
   * 获取boolean类型的缓存值
   * @param key
   * @returns
   */
  static getBooleanSync(key: string, defValue: boolean = false,
    preferenceName: string = PrefUtil.defaultPreferenceName): boolean {
    return PrefUtil.getSync(key, defValue, preferenceName) as boolean;
  }

  /**
   * 获取boolean类型的缓存值
   * @param key
   * @returns
   */
  static async getBoolean(key: string, defValue: boolean = false,
    preferenceName: string = PrefUtil.defaultPreferenceName): Promise<boolean> {
    let value = await PrefUtil.get(key, defValue, preferenceName);
    return value as boolean;
  }


  /**
   * 检查缓存的Preferences实例中是否包含名为给定Key的存储键值对
   * @param key
   * @returns
   */
  static hasSync(key: string, preferenceName: string = PrefUtil.defaultPreferenceName) {
    return PrefUtil.getPreferencesSync(preferenceName).hasSync(key);
  }

  /**
   * 检查缓存的Preferences实例中是否包含名为给定Key的存储键值对
   * @param key
   * @returns
   */
  static async has(key: string, preferenceName: string = PrefUtil.defaultPreferenceName): Promise<boolean> {
    let preferences = await PrefUtil.getPreferences(preferenceName); //获取实例
    return preferences.has(key);
  }


  /**
   * 删除缓存值
   * @param key
   * @param preferenceName
   * @returns
   */
  static deleteSync(key: string, preferenceName: string = PrefUtil.defaultPreferenceName) {
    let preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    preferences.deleteSync(key);
    preferences.flush() //此处一定要flush，要不然不能永久序列化到本地
  }

  /**
   * 删除缓存值
   * @param key
   * @param preferenceName
   * @returns
   */
  static async delete(key: string, preferenceName: string = PrefUtil.defaultPreferenceName): Promise<void> {
    let preferences = await PrefUtil.getPreferences(preferenceName); //获取实例
    await preferences.delete(key);
    return preferences.flush() //此处一定要flush，要不然不能永久序列化到本地
  }


  /**
   * 清空缓存的Preferences实例中的所有数据
   * @param preferenceName
   * @returns
   */
  static clearSync(preferenceName: string = PrefUtil.defaultPreferenceName) {
    let preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    preferences.clearSync();
    preferences.flush() //此处一定要flush，要不然不能永久序列化到本地
  }

  /**
   * 清除缓存的Preferences实例中的所有数据
   * @param preferenceName
   * @returns
   */
  static async clear(preferenceName: string = PrefUtil.defaultPreferenceName): Promise<void> {
    let preferences = await PrefUtil.getPreferences(preferenceName); //获取实例
    await preferences.clear();
    return preferences.flush() //此处一定要flush，要不然不能永久序列化到本地
  }


  /**
   * 从缓存中移出指定的Preferences实例，若Preferences实例有对应的持久化文件，则同时删除其持久化文件。
   * @param context
   * @param name Preferences 实例的名称。
   */
  static async deletePreferences(context: Context, name: string): Promise<void> {
    return dataPreferences.deletePreferences(context, name);
  }


  /**
   * 订阅数据变更，订阅的Key的值发生变更后，在执行flush方法后，触发callback回调。
   * @param callback 回调函数
   * @param preferenceName 实例的名称。
   */
  static onChange(callback: Callback<string>, preferenceName: string = PrefUtil.defaultPreferenceName) {
    let preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    preferences.on('change', callback);
  }

  /**
   * 取消订阅数据变更。
   * @param callback 需要取消的回调函数，不填写则全部取消。
   * @param preferenceName 实例的名称。
   */
  static offChange(callback?: Callback<string>, preferenceName: string = PrefUtil.defaultPreferenceName) {
    let preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    if (callback) {
      preferences.off('change', callback);
    } else {
      preferences.off('change');
    }
  }


  /**
   * 精确订阅数据变更，只有被订阅的key值发生变更后，在执行flush方法后，触发callback回调。
   * @param keys 需要订阅的key集合。
   * @param callback 回调函数
   * @param preferenceName 实例的名称。
   */
  static onDataChange(keys: string | Array<string>, callback: Callback<Record<string, preferences.ValueType>>,
    preferenceName: string = PrefUtil.defaultPreferenceName) {
    if (typeof keys == 'string') {
      keys = [keys];
    }
    let preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    preferences.on('dataChange', keys, callback);
  }

  /**
   * 取消精确订阅数据变更。
   * @param keys 需要订阅的key集合。
   * @param callback 需要取消的回调函数，若callback不填写，表示所有的callback都需要处理；若callback填写，表示只处理该callback。
   * @param preferenceName 实例的名称。
   */
  static offDataChange(keys: string | Array<string>, callback: Callback<Record<string, preferences.ValueType>>,
    preferenceName: string = PrefUtil.defaultPreferenceName) {
    let preferences = PrefUtil.getPreferencesSync(preferenceName); //获取实例
    if (typeof keys == 'string') {
      keys = [keys];
    }
    if (callback) {
      preferences.off('dataChange', keys, callback);
    } else {
      preferences.off('dataChange', keys);
    }
  }


}