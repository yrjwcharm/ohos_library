### @ohos_lib/net_connection(API12)

#### 简介

**net_connection** 这是一款基于HarmonyNext网络连接管理模块API封装的开源插件

***版本更新 请查看更新日志***

#### 安装步骤

```ohpm
ohpm install @ohos_lib/net_connection
```
#### api使用详解

<table>
    <tbody>
        <tr style="background:black;color:#fff">
         <td>方法</td>
         <td>api描述</td>
        </tr>
         <tr>
         <td>hasDefaultNet()</td>
         <td>获取默认激活的数据网络</td>
        </tr>
        <tr style="background:black;color:#fff">
         <td>isWiFi()</td>
         <td>判断是否是WIFI</td>
        </tr>
         <tr>
         <td>isCellNetwork()</td>
         <td>判断是否是蜂窝网络(数据网络</td>
        </tr>
        <tr style="background:black;color:#fff">
         <td>getCurrentNetworkType()</td>
         <td>获取网络类型</td>
        </tr>
        <tr>
         <td>getIpAddress()</td>
         <td>获取当前设备的IP地址(设备连接Wi-Fi后)</td>
        </tr>
         <tr style="background:black;color:#fff">
         <td>register(networkCallback: NetworkCallback）</td>
         <td>注册网络连接监听</td>
        </tr>
         <tr>
         <td>unregister（）</td>
         <td>移除网络连接监听</td>
        </tr>
        <tr style="background:black;color:#fff">
        <td>NetworkCallback类</td>
        <td>订阅网络回调监听类</td>
        </tr>
    </tbody>
</table>

#### 基本用法

<pre style="background:black;color:#fff;">
import { GTNetworkUtil, NetworkCallback } from '@ohos_lib/net_connection';
import { promptAction } from '@kit.ArkUI';

@ComponentV2
@Entry
export struct  Index{
  private networkCallback:NetworkCallback={
    netAvailableCallback:(netHandle)=>{
      promptAction.showToast({
        message:'网络可用～'
      })
    },
    netLostCallback:()=>{
      promptAction.showToast({
        message:'网络连接不可用～，请检查网络连接'
      })
    }
  }
  aboutToAppear(): void {
    GTNetworkUtil.register(this.networkCallback)
  }
  aboutToDisappear(): void {
    GTNetworkUtil.unregister();
  }
  build() {
    Column(){


    }.width('100%')
      .height('100%')
  }
}
</pre>
