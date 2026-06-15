# 跳转


## 跳转到元服务

ASCF框架提供接口，允许ASCF框架下开发的元服务跳转到其他的元服务。详情请参考：[跳转](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/apis-navigate)。

示例：

```js
has.navigateToAtomicService({
  appId: 'xxxx', // 目标元服务的AppID
  path: '',
  extraData: { data: 'extraData' },
  wantParam: { wantParam: 'wantParam' },
  success: () => {
    console.info('navigateToAtomicService success');
  },
  fail: (err) => {
    console.error('navigateToAtomicService fail', err);
  },
  complete: (res) => {
    console.info('navigateToAtomicService complete', res);
  }
});
```


## 跳转到应用

元服务支持从元服务内跳转到应用。

可以使用[button](../references/references-components/components-button.md)组件实现，步骤如下：

1. 设置属性open-type值为launchApp。

2. 根据需要打开的应用信息，设置属性app-bundle-name、app-module-name、app-ability-name、app-parameters。

3. 点击button组件。

即可从元服务跳转到指定应用。

> **注意**
> 
> 当前元服务仅支持打开部分系统应用，否则会遭到系统生态管控拦截，提示应用无法打开。
