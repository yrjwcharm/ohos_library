# 更新

## has.getUpdateManager

has.getUpdateManager(): UpdateManager

获取全局唯一的版本更新管理器对象，用于管理元服务的更新。

**起始版本：** 1.0.16

**返回值：**

返回[UpdateManager](#updatemanager)对象。

**示例：**

```js
const updateManager = has.getUpdateManager();
```

## UpdateManager

版本更新管理器对象。

**起始版本：** 1.0.16

### UpdateManager.applyUpdate

UpdateManager.applyUpdate(): void

强制使用新版本并重启元服务。在收到 onUpdateReady 回调（即新版本已下载完成）后调用此方法。

**起始版本：** 1.0.16

**示例：**

```js
const updateManager = has.getUpdateManager();
updateManager.onCheckForUpdate(res => {
  console.info('是否有新版本：', res.hasUpdate);
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
    },
    fail: (err) => {
      console.error('showModal fail', err);
    },
    complete: (res) => {
      console.info('showModal complete', res);
    }
  });
});
```

### UpdateManager.onCheckForUpdate

UpdateManager.onCheckForUpdate(function callback)

向AGC后台请求检查更新结果的监听事件。AGC会在元服务每次冷启动时自动检查更新，开发者不需要主动触发。

> **说明：**
>
> 同一设备元服务的调用次数不超过6次/天、每30分钟调用次数不超过1次。注册监听允许的最大监听时间20s。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | **UpdateManager.onCheckForUpdate** 传入的监听函数。向AGC后台请求检查更新结果事件的监听函数。 |

**返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| hasUpdate | boolean | 是否发现有新版本。 |

**示例：**

```js
const updateManager = has.getUpdateManager();
updateManager.onCheckForUpdate((res) => {
    console.info('是否有新版本：', res.hasUpdate);
});
```

### UpdateManager.onUpdateFailed

UpdateManager.onUpdateFailed(function callback)

监听元服务更新失败事件。当新版本下载失败（如网络问题）后会回调此函数。

> **说明：**
>
> AGC更新和小程序更新机制不同，并不会返回失败，因此为了保证兼容性，ASCF仍然提供该失败接口，但该接口当前预留，实际不会失败执行回调。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | **UpdateManager.onUpdateFailed**传入的监听函数。更新失败后的回调函数，通常在此提示用户下载失败，建议检查网络或稍后重试。 |

**示例：**

```js
const updateManager = has.getUpdateManager();
updateManager.onUpdateFailed(() => {
  console.info('更新失败');
});
```

### UpdateManager.onUpdateReady

UpdateManager.onUpdateReady(function callback)

监听元服务新版本下载完成事件。当检测到新版本后，AGC会自动触发下载（无需开发者干预），下载成功后会回调此函数。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | UpdateManager.onUpdateReady传入的监听函数。新版本下载完成后的回调函数，通常在此回调中提示用户应用重启更新。 |

**示例：**

```js
const updateManager = has.getUpdateManager();
updateManager.onUpdateReady(() => {
  console.info('新版本已准备就绪');
});
```
