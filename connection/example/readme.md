### @ohos_lib/net_connection(API12)
___
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
         <td>isNetWiFi()</td>
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
        <td>订阅网络回调监听类<a hre="https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-net-connection#onnetavailable">详情用法查看</a></td>
        </tr>
    </tbody>
</table>

#### 更多详情效果案例展示：https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/networkinfo