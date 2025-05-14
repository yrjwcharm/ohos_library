import { fileIo, storageStatistics } from "@kit.CoreFileKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { contextConstant } from "@kit.AbilityKit";

export  class  CacheHelper{
  //获取app缓存大小
  static async  getCacheSize(): Promise<string> {
    try {
      const bundleStats = await new Promise<storageStatistics.BundleStats>((resolve, reject) => {
        storageStatistics.getCurrentBundleStats((error: BusinessError, stats: storageStatistics.BundleStats) => {
          error ? reject(error) : resolve(stats);
        });
      });
      return CacheHelper. formatFileSize(bundleStats.cacheSize);
    } catch (error) {
      return CacheHelper.formatFileSize(0);
    }
  }
  //清除app应用缓存大小
  static async cleanAppCache(context: Context): Promise<boolean> {
    context.getApplicationContext().area = contextConstant.AreaMode.EL1;
    context.area = contextConstant.AreaMode.EL1;
    const el1AppCacheDir = context.getApplicationContext().cacheDir
    const el1HapCacheDir = context.cacheDir
    context.getApplicationContext().area = contextConstant.AreaMode.EL2;
    context.area = contextConstant.AreaMode.EL2;
    const el2AppCacheDir = context.getApplicationContext().cacheDir
    const el2HapCacheDir = context.cacheDir
    let taskList = await Promise.all([
      CacheHelper.clearCacheTask(el1AppCacheDir),
      CacheHelper.clearCacheTask(el1HapCacheDir),
      CacheHelper.clearCacheTask(el2AppCacheDir),
      CacheHelper.clearCacheTask(el2HapCacheDir)
    ])
    return taskList.every((task)=>Boolean(task));
  }
  private  static clearCacheTask(dir: string): Promise<boolean> {
    return new Promise((resolve) => {
      fileIo.access(dir).then((exist: boolean) => {
        if (exist) {
          fileIo.rmdir(dir)
        }
        resolve(true)
      })
    })
  }
  private static  formatFileSize(fileS: number): string {
    const wrongSize = "0MB";
    if (fileS === 0) {
      return wrongSize;
    } else if (fileS < 1024) {
      return wrongSize;
    } else if (fileS < 1048576) {
      return wrongSize;
    } else if (fileS < 1073741824) {
      const sizeInMB = fileS / 1048576;
      return `${sizeInMB.toFixed(1)}MB`;
    } else {
      const sizeInGB = fileS / 1073741824;
      return `${sizeInGB.toFixed(1)}GB`;
    }
  }

}