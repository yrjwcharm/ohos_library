### @ohos_lib/networkinfo(API12)
___
#### 简介
**networkinfo** 这是一款支持断点下载的开源插件，退出应用程序进程杀掉以后或无网络情况下恢复网络后，可以在上次位置继续恢复下载等

***版本更新 请查看更新日志***

#### 安装步骤

```ohpm
ohpm install @ohos_lib/filedownload
```
#### api使用详解

<table>
    <tbody>
        <tr style="background:red;color:#fff">
         <td>方法</td>
         <td>api描述</td>
        </tr>
         <tr>
         <td>hasDefaultNet()</td>
         <td>获取默认激活的数据网络</td>
        </tr>
        <tr>
         <td>isNetWiFi()</td>
         <td>判断是否是WIFI</td>
        </tr>
         <tr>
         <td>isCellNetwork()</td>
         <td>判断是否是蜂窝网络(数据网络</td>
        </tr>
        <tr>
         <td>getCurrentNetworkType()</td>
         <td>获取网络类型</td>
        </tr>
        <tr>
         <td>getIpAddress()</td>
         <td>获取当前设备的IP地址(设备连接Wi-Fi后)</td>
        </tr>
    </tbody>
</table>

```### 订阅网络各种状态，例如订阅

```

***1、添加权限在应用主模块entry/src/main/ets/module.json5下***
```typescript

```

#### 基本用法
```typescript


```
### 下载观看Demo演示效果
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_1.mp4)

#### 更多详情效果案例展示：https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/fileDownload