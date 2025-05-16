import { connection } from '@kit.NetworkKit';
import { BusinessError, Callback } from '@kit.BasicServicesKit';
import { wifiManager } from '@kit.ConnectivityKit';

/**
 * 网络相关工具类
 * 需要ohos.permission.GET_NETWORK_INFO权限。
 */
export class GTNetworkUtil {

  private constructor() {}

  private static netConnection: connection.NetConnection;


  /**
   * 检查默认数据网络是否被激活
   */
  static hasDefaultNet(): Promise<boolean> {
    return connection.hasDefaultNet();
  }
  // 判断是否是蜂窝网络--数据流量
  static async isCellNetwork(): Promise<boolean> {
    // 获取网络能力信息
    return new Promise((resolve, reject) => {
      connection.getDefaultNet().then((netHandle) => {
        connection.getNetCapabilities(netHandle, (error, data) => {
          if (error) {
            resolve(false);
            console.error(`Failed to get net capabilities. Code:${error.code}, message:${error.message}`);
            return;
          }
          //结果值为1 是其他网络 0为蜂窝网络
          if (data.bearerTypes[0] === 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
      })
    })
  }

  /**
   * 检查默认数据网络是否被激活
   */
  static hasDefaultNetSync(): boolean {
    return connection.hasDefaultNetSync();
  }


  /**
   * 获取网络类型
   */
  static async getNetBearType(): Promise<connection.NetBearType> {
    let net = await connection.getDefaultNet();
    let netCapabilities = await connection.getNetCapabilities(net);
    let netBearType = netCapabilities.bearerTypes[0];
    return netBearType;
  }


  /**
   * 获取当前设备的IP地址(设备连接Wi-Fi后)
   */
  static getIpAddress() {
    let ipAddress = wifiManager.getIpInfo().ipAddress;
    let ip = (ipAddress >>> 24) + "." + (ipAddress >> 16 & 0xFF) + "." + (ipAddress >> 8 & 0xFF) + "." + (ipAddress & 0xFF);
    return ip;
  }

  static register(networkCallback: NetworkCallback) {
    if (!GTNetworkUtil.netConnection) {
      GTNetworkUtil.netConnection = connection.createNetConnection(); //创建NetConnection对象
    }
    //先使用register接口注册订阅事件
    GTNetworkUtil.netConnection.register((error: BusinessError) => {
      if (error) {

      }
    });
    if (networkCallback.netAvailableCallback) {
      GTNetworkUtil.netConnection.on('netAvailable', networkCallback.netAvailableCallback); //订阅网络可用事件。
    }
    if (networkCallback.netUnavailableCallback) {
      GTNetworkUtil.netConnection.on('netUnavailable', networkCallback.netUnavailableCallback); //订阅网络不可用事件。
    }
    if (networkCallback.netCapabilitiesChangeCallback) {
      GTNetworkUtil.netConnection.on('netCapabilitiesChange', networkCallback.netCapabilitiesChangeCallback); //订阅网络能力变化事件。比如切换Wi-Fi、切换VPN、切换为手机流量。
    }
    if (networkCallback.netConnectionPropertiesChangeCallback) {
      GTNetworkUtil.netConnection.on('netConnectionPropertiesChange',networkCallback.netConnectionPropertiesChangeCallback); //订阅网络连接信息变化事件。比如更改Wi-Fi、切换Wi-Fi、切换蜂窝网络。
    }
    if (networkCallback.netBlockStatusChangeCallback) {
      GTNetworkUtil.netConnection.on('netBlockStatusChange',networkCallback.netBlockStatusChangeCallback); //订阅网络阻塞状态事件。
    }
    if (networkCallback.netLostCallback) {
      GTNetworkUtil.netConnection.on('netLost',networkCallback.netLostCallback); //订阅网络丢失事件。
    }
  }

  /**
   * 取消订阅默认网络状态变化的通知。
   */
  static unregister() {
    if (GTNetworkUtil.netConnection) {
      GTNetworkUtil.netConnection.unregister((error: BusinessError) => {
        if (error) {

        }
      });
    }
  }
}

/**
 * 订阅指定网络状态变化的通知，支持多事件监听回调。
 * @param netAvailableCallback  订阅网络可用事件回调。
 * @param netUnavailableCallback  订阅网络不可用事件回调。
 * @param netCapabilitiesChangeCallback  订阅网络能力变化事件回调。比如切换Wi-Fi、切换VPN、切换为手机流量。
 * @param netConnectionPropertiesChangeCallback  订阅网络连接信息变化事件回调。比如更改Wi-Fi、切换Wi-Fi、切换蜂窝网络。
 * @param netBlockStatusChangeCallback  订阅网络阻塞状态事件回调。
 * @param netLostCallback  订阅网络丢失事件回调。
 */
export class NetworkCallback{
  netAvailableCallback?: Callback<connection.NetHandle>
  netUnavailableCallback?: Callback<void>
  netCapabilitiesChangeCallback?: Callback<connection.NetCapabilityInfo>
  netConnectionPropertiesChangeCallback?: Callback<connection.NetConnectionPropertyInfo>
  netBlockStatusChangeCallback?: Callback<connection.NetBlockStatusInfo>
  netLostCallback?: Callback<connection.NetHandle>
}