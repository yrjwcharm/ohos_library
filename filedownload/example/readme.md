### filedownlaod(API12)
### 📚简介
**filedownload** 这是一款支持大文件断点下载的开源插件，退出应用程序进程杀掉以后或无网络情况下恢复网络后，可以在上次位置继续恢复下载等

***版本更新---请查看更新日志!!!*** 修复已知bug,demo已经更新

### 📚下载安装

`ohpm install @ohos_lib/filedownload`

***1、添加权限在应用主模块entry/src/main/ets/module.json5下***
```typescript
"requestPermissions": [
      {
        "name" : "ohos.permission.INTERNET"
      },
      {
        "name" : "ohos.permission.GET_NETWORK_INFO"
      },
    ]
```
***2、在应用主模块entry入口EntryAbility onCreate生命周期里下面添加初始化数据库操作***

```typescript
 onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
  this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
  hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
  SqliteHelper.getInstance(this.context).initRDB();
}

```
***3、在应用主模块entry入口Index.ts AboutToAppear()生命周期里添加如下代码***

```typescript
 try {
  await DownloaderUtil.persistActiveDownloads();
}catch (e) {
}
```

***4.首先确定服务器是否支持断点下载，否则通过request.agent.create无法实现断点下载***

```shell
 curl -I -H "Range: bytes=0-100" 下载路径
```
#### 出现206 Partial Content 就代表着服务器支持断点续传与下载 ---如下

```typescript
yanruifeng@bogon video % curl -I -H "Range: bytes=0-100" https://dal-video.wenzaizhibo.com/a6dac8c6371a54477a5692f46ea9698e/6825c7da/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4

HTTP/1.1 206 Partial Content
```
## filedownload相关 API
| 方法                                                                                         | 介绍                                     |
|:-------------------------------------------------------------------------------------------|:---------------------------------------|
| persistActiveDownloads()                                                                   | 断点下载的主要方法「内置更改数据库状态，把断点前后字节数统一合并成一个文件」 |
| static async pause(taskId: string):Promise<void>                                           | 下载暂停方法「内置更改数据库状态」                      |
| static async resume(downloadInfo: FileDownloader):Promise<void>                            | 下载恢复方法 「内置更改数据库状态」                     |
| static async delete(userId: string, downloadId: string):Promise<number>                    | 删除「取消下载」方法「删除数据库表记录，删除文件系统下载文件、」       |
| static async downloadFile<T extends FileDownloader>(data: T, isBatchInsertQueue?: boolean) | 通用下载方法                                 |
| GTNetworkUtil                                                                              | 网络相关工具类 「监听有网、无网状态」                    |
| FileUtil                                                                                   | 文件操作相关工具类 「沙盒文件存储、删除等操作」               |
| SqliteHelper                                                                               | 数据库操作类、「增删改查」                          |
| static  addListener(eventName:string,callback:(download:FileDownloader)=>void)             | 下载统一监听回调类「进度监听、失败、恢复、成功、暂停」            |

#### 基本用法
- **从1.1.7版本开始，interface声明改为了实体类，主要是应对列表需要局部刷新的支持。依旧采用V2状态管理@ObservedV2 和@Trace实现。
  文档地址**：<https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/highfileDownload>
---
- **1.1.6版本及以下，采用interface声明。不区分v1与v2 ,皆可使用，建议使用旧版本1.1.6时锁定版本。**
  文档地址：<https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/highfileDownload>


#### 运行Demo演示效果
* demo 运行 git clone https://github.com/yrjwcharm/ohos_library.git
* 切换分支 git checkout feature/ohos/fileDownload

#### 下载观看Demo演示效果--退出应用程序杀掉进程后恢复下载
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_1.mp4)

#### 下载观看Demo演示效果--无网络情况下恢复网络后继续保持下载
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_2.mp4)

#### 鸿蒙技术交流QQ群：783867484

#### 开源不易，希望您可以动一动小手点点小⭐⭐

#### 👴希望大家如有好的需求踊跃提交,如有问题请前往github提交issue，空闲时间会扩充与修复优化

### 🌏开源协议

本项目基于 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) ，在拷贝和借鉴代码时，请大家务必注明出处。


####  `后续会支持大文件批量排队[队列]下载`
###  tips:`后续会支持大文件批量排队[队列]下载`

>在移动端应用开发中，多文件并行下载的场景较为少见（即便采用线程池技术实现并行下载，通常也会将并发数限制在2-3个文件）。这是因为当多个大文件同时下载时，可能引发以下问题：

* **1.系统资源竞争**：大量线程同时运行会抢占CPU、内存和网络连接资源

* **2.线程调度延迟**：资源过载可能导致线程调度出现延迟

* **3.主线程阻塞**：上述问题会间接影响UI主线程，造成界面卡顿现象

  因此，主流方案更倾向于采用队列机制实现批量下载，而非无限制的并行下载。
