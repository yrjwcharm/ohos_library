# 开发web-view组件


web-view用于在元服务中嵌入网页内容，它作为一个容器，能够将网页内容直接集成到元服务的界面中，使得用户可以在不离开元服务的情况下浏览网页，为用户提供无缝的浏览体验。


## 开发准备

1. 开始开发前，请确保已完成[业务域名配置](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-business-domain)。

2. 需要获取安装JS SDK，具体方法请参照[JS SDK](#js-sdk)。

3. 对应接口能力可参考[web-view](../references/references-components/components-web-view.md)。


## JS SDK

**获取安装**

可以通过NPM方式，将JS SDK集成到工程。

**安装方法**

在目标路径下打开cmd命令窗口，并执行以下npm命令，获得对应的js文件。

```shell
npm install @atomicservice/ascf-web-sdk
```

**使用方法**

**es6**

```js
import has from '@atomicservice/ascf-web-sdk';

has.ascfweb.getEnv((res) => {
   console.info('getEnv success', res);
});
```

**umd**

```html
<script src="../dist/ascf-web-sdk.umd.js"></script>
<script>
  has.ascfweb.getEnv((res) => {
    console.info('getEnv success', res);
  });
</script>
```


在命令行中看到打印成功的结果，则说明已成功安装sdk，可以开发使用web-view组件。


> **说明**
> 
> 复制npm安装包里面的ascf-web-sdk.umd.js文件，放到项目的静态资源目录后，需要将上述示例中script的src引用的目录改为对应的路径。


**UserAgent**


使用web-view访问服务器，会在系统的UserAgent追加ASCF/Appid，用于判断是否运行在元服务ASCF框架。


示例：


\*\*\*\*\*\*表示原始UserAgent内容。


```text
****** ASCF/1234567890123456
```


通过UserAgent，可以判断H5页面是否在ASCF中打开。


**示例**


```js
const isAscfWebview = window.navigator.userAgent.includes('ASCF');  // true
```


当isAscfWebview为true时，H5页面就已经在ASCF中成功打开了。
