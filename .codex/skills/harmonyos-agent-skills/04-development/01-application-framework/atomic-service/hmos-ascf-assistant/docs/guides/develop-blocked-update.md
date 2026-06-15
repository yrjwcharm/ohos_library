# 阻断式更新

如果希望在用户使用元服务过程中进行版本更新，可以使用阻断式更新的方式进行更新。使用[监听元服务更新检查接口](../references/references-apis/apis-updatemanager.md#updatemanageroncheckforupdate)，然后在[监听元服务新版本下载完成事件接口](../references/references-apis/apis-updatemanager.md#updatemanageronupdateready)的回调函数中调用[重启元服务接口](../references/references-apis/apis-updatemanager.md#updatemanagerapplyupdate)的方式触发更新。

> **注意**
> 
> 阻断式更新接口依赖手机rom版本，从HarmonyOS 6.0.0(20)开始支持。

![更新-w800](figures/更新.png)

1. 开发者通过[has.getUpdateManager](../references/references-apis/apis-updatemanager.md#hasgetupdatemanager)接口获取全局唯一的版本更新管理器对象。

2. 开发者通过[UpdateManager.onCheckForUpdate](../references/references-apis/apis-updatemanager.md#updatemanageroncheckforupdate)接口检查元服务是否有可用更新。

3. 如果元服务有可用更新，应用市场将会回调通知给开发者，并尝试下载最新的元服务包。

4. 开发者通过[UpdateManager.onUpdateReady](../references/references-apis/apis-updatemanager.md#updatemanageronupdateready)接口检查元服务包是否下载完成，下载完成后会触发回调函数。

5. 元服务包下载完成后，需要实现弹窗明确提醒用户是否要进行升级。

6. 如果用户在弹窗中选择升级，开发者可以调用[UpdateManager.applyUpdate](../references/references-apis/apis-updatemanager.md#updatemanagerapplyupdate)方法重启元服务。系统将对元服务进行免安装更新，并在更新成功后以新版本打开元服务。  

   如果用户在弹窗中选择不升级，则元服务仍然以旧版本元服务包运行。

> **注意**
> 
> - 在调用检查更新接口后，元服务包下载完成时，需要开发者自行进行弹窗，提示用户选择是否进行更新。
> 
> - 弹窗内容标题需要为“更新提示”。
> 
> - 只有用户在更新弹窗中选择确认更新，才可以进行更新操作。

![zh-cn_image_0000002529926057-w200](figures/zh-cn_image_0000002529926057.png)

```js
const updateManager = has.getUpdateManager();
updateManager.onCheckForUpdate(res => {
  console.info('是否有新版本', res.hasUpdate);
});
updateManager.onUpdateReady(() => {
  has.showModal({
    title: '更新提示',
    content: '新版本已准备就绪，是否立即重启？',
    confirmText: '立即重启',
    success: (res) => {
      if (res.confirm) {
        updateManager.applyUpdate();
      }
    }
  });
});
```

> **说明**
> 
> - 使用阻断式更新需要先实现明示用户是否选择更新的弹窗，依据用户选择进行强制更新。
> 
> - 监听元服务更新接口，同一设备元服务的调用次数不超过6次/天、每30分钟调用次数不超过1次。
