import relationalStore from '@ohos.data.relationalStore';
import { ValuesBucket } from '@ohos.data.ValuesBucket';
import { BusinessError } from '@kit.BasicServicesKit';
import { IFileDownloader } from '../interface/IFileDownloader';

export class SqliteHelper {
  private static instance: SqliteHelper
  private static dbName:string;
  private static rdbStore: relationalStore.RdbStore | undefined = undefined
  private context: Context
  public  static  tableName:string;

  private constructor(context: Context) {
    this.context = context
  }

  static getInstance(context: Context): SqliteHelper {
    if (!SqliteHelper.instance) {
      SqliteHelper.instance = new SqliteHelper(context);
    }
    return SqliteHelper.instance;
  }
  public static getStoreConfig() {
    //debug便于查看  Release数据库进行加密处理
    // let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
    // const bundleInfo = await bundleManager.getBundleInfoForSelf(bundleFlags);
    // appProvisionType：表示签名证书类型
    const STORE_CONFIG: relationalStore.StoreConfig = {
      name:SqliteHelper.dbName, // 数据库文件名
      securityLevel: relationalStore.SecurityLevel.S1, // 数据库安全级别
      encrypt: false,
      // encrypt: bundleInfo.appInfo.appProvisionType === 'release', // 可选参数，指定数据库是否加密，默认不加密
      // customDir: 'customDir/subCustomDir',
      // 可选参数，数据库自定义路径。数据库将在如下的目录结构中被创建：context.databaseDir + '/rdb/' + customDir，其中context.databaseDir是应用沙箱对应的路径，'/rdb/'表示创建的是关系型数据库，customDir表示自定义的路径。当此参数不填时，默认在本应用沙箱目录下创建RdbStore实例。
      isReadOnly: false // 可选参数，指定数据库是否以只读方式打开。该参数默认为false，表示数据库可读可写。该参数为true时，只允许从数据库读取数据，不允许对数据库进行写操作，否则会返回错误码801。
    };
    return STORE_CONFIG;
  }

  /**
   * 数据库初始化
   * */
  public initRDB(dbName:string='filedownloader.db',tableName='filedownloaderinfo') {
    (async ()=>{
      SqliteHelper.dbName = dbName;
      SqliteHelper.tableName = tableName;
      //创建缓存课程信息数据表
      let SQL_CREATE_CACHE_COURSE_TABLE = "CREATE TABLE IF NOT EXISTS " + SqliteHelper.tableName + " ("
        + "id INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL , "
        + "userId TEXT NOT NULL ," //用户id
        + "taskId TEXT, " //当前下载任务id
        + "url TEXT, " //文件下载URL
        + "filePath TEXT, " //文件沙盒路径
        + "fileName TEXT, " //下载的文件名
        + "fileSize INTEGER, " // 文件总大小
        + "downloadSize INTEGER , " //文件已下载大小
        + "status INTEGER DEFAULT 3, " //下载状态  待下载、下载中、已下载、已暂停、下载失败 默认待下载
        + "downloadId TEXT, " //下载列表标识id 一般都是下载项的唯一id标识 不同于userId
        + "begins INTEGER DEFAULT 0," //默认文件从begins 0节点开始下载
        + "isBackgroundPause DEFAULT 1," //默认从后台进来的标识
        + "exitFrequency DEFAULT 1" //后台退出连续次数标识
        + ")";
      try {
        SqliteHelper.rdbStore = await relationalStore.getRdbStore(this.context, SqliteHelper.getStoreConfig())
        await SqliteHelper.rdbStore?.executeSql(SQL_CREATE_CACHE_COURSE_TABLE)
      } catch (e) {
        console.log('数据库表创建失败!!!')
      }
    })
  }

  /**
   * 插入数据
   * */
  public insert(tabName: string, data: ValuesBucket): Promise<number> {
    return new Promise(async (resolve, reject) => {
      SqliteHelper.rdbStore ?.insert(tabName, data).then(number => {
        resolve(number);
        console.log('插入成功！！！！');
      }).catch((err: BusinessError) => {
        reject(err)
      })
    })
  }

  /*
  * 删除数据
  * */
  public delete(predicates: relationalStore.RdbPredicates): Promise<number> {
    return new Promise((resolve, reject) => {
      SqliteHelper.rdbStore?.delete(predicates).then(number => {
        resolve(1);
      }).catch((e: BusinessError) => {
        reject(e);
      })
    })
  }

  /**
   * 更新数据
   * */

  public update(data: ValuesBucket, predicates: relationalStore.RdbPredicates): Promise<number> {
    return new Promise((resolve, reject) => {
      SqliteHelper.rdbStore?.update(data, predicates).then(number => {
        console.log('更新成功了！！！');
        resolve(number);
      }).catch((err: BusinessError) => {
        reject(err);
      })
    })
  }
  public  queryCountBySql(sql: string) {
    let resultSet = SqliteHelper.rdbStore?.querySqlSync(sql);
    if (resultSet?.goToNextRow()) {
      return resultSet?.getValue(0) as number;
    }
    return 0;
  }
  //更新数据库下载状态
  private  updateDBDownloadStatus(downloadInfo:IFileDownloader){
    let predicates = new relationalStore.RdbPredicates('filedownloaderinfo');
    predicates.equalTo('userId', downloadInfo.userId)
    predicates.equalTo('downloadId', downloadInfo.downloadId)
    SqliteHelper.getInstance(this.context).update({
      'status':downloadInfo.status!
    },predicates);
  }

  // 查询缓课程
  public queryData(predicates: relationalStore.RdbPredicates): Promise<IFileDownloader[]> {
    let list: IFileDownloader[] = [];
    return new Promise(async (resolve, reject) => {
      SqliteHelper.rdbStore?.query(predicates,
        ['userId','taskId', 'url', 'filePath', 'fileName', 'downloadSize',
          'fileSize', 'status', 'downloadId', 'begins', 'isBackgroundPause', 'exitFrequency'
        ]).then(resultSet => {
        while (resultSet?.goToNextRow()) {
          const userId = resultSet.getString(resultSet.getColumnIndex('userId'));
          const taskId = resultSet.getString(resultSet.getColumnIndex('taskId'));
          const url = resultSet.getString(resultSet.getColumnIndex('url'));
          const filePath = resultSet.getString(resultSet.getColumnIndex('filePath'));
          const fileName = resultSet.getString(resultSet.getColumnIndex('fileName'));
          const fileSize = resultSet.getLong(resultSet.getColumnIndex('fileSize'));
          const downloadSize = resultSet.getLong(resultSet.getColumnIndex('downLoadSize'));
          const status = resultSet.getLong(resultSet.getColumnIndex('status'))
          const downloadId = resultSet.getString(resultSet.getColumnIndex('downloadId'))
          const begins = resultSet.getLong(resultSet.getColumnIndex('begins'))
          const isBackgroundPause = resultSet.getLong(resultSet.getColumnIndex('isBackgroundPause'))
          const exitFrequency = resultSet.getLong(resultSet.getColumnIndex('exitFrequency'))
          let fileDownloaderInfo: IFileDownloader = {
            userId,
            taskId,
            url,
            filePath,
            fileName,
            fileSize,
            downloadSize,
            status,
            downloadId,
            begins,
            isBackgroundPause,
            exitFrequency
          };
          list.push(fileDownloaderInfo);
        }
        resolve(list);
        resultSet?.close()
        // 释放数据集的内存
      }).catch((e: BusinessError) => {
        reject(e);
      })
    })
  }
}