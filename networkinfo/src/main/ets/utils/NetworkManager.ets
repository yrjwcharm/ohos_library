import connection from '@ohos.net.connection';
import net from '@ohos.net.connection';
import data from '@ohos.telephony.data';
import { radio } from '@kit.TelephonyKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { CarrierUtil } from './CarrierUtil';
import { LogUtil } from './LogUtil';


type NetworkTypeString =  'WIFI' | '2G' | '3G' | '4G' | '5G' | 'Other' ;

export class NetworkManager {
  private netConnection: connection.NetConnection | null = null;
  private currentNetworkType: NetworkTypeString = 'Other';
  private simSpnName: string = ''
  private static instance: NetworkManager

  private constructor() {
  }

  public init(): void {
    this.registerNetworkEvents()
    this.updateNetworkStatus()
    const slotId: number = this.getDefaultCellularDataSlotId();
    this.simSpnName = CarrierUtil.getCarrier(slotId)
  }

  public static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager()
    }
    return NetworkManager.instance
  }

  /**
   *获取网络类型
   */
  getNetWorkType(): string {
    return this.currentNetworkType
  }

  /**
   * 获取运营商名称
   * @returns
   */
  getSimSpn(): string {
    return this.simSpnName;
  }

  /**
   * 检查默认数据网络是否被激活
   */
  hasDefaultNetSync(): boolean {
    return connection.hasDefaultNetSync();
  }

  /**
   * 判断当前网络是否是Wi-Fi，否则是移动流量热点网络。
   */
  hasNetWiFi(): boolean {
    // 获取当前默认网络的 NetHandle 对象
    let net = connection.getDefaultNetSync();

    // 如果没有默认网络，直接返回 false
    if (!net) {
      return false;
    }

    // 获取网络连接属性信息
    let netProperties = connection.getConnectionPropertiesSync(net);

    // 如果无法获取网络连接属性，直接返回 false
    if (!netProperties) {
      return false;
    }

    // 获取网络接口名称，例如 "wlan0", "eth0" 等
    let interfaceName = netProperties.interfaceName;

    // 检查接口名称是否包含 "wlan" 或 "wifi"，这是 Wi-Fi 接口的通用标识
    if (interfaceName && (interfaceName.includes('wlan') || interfaceName.includes('wifi'))) {
      return true;
    }

    // 如果不符合 Wi-Fi 接口名称的条件，返回 false
    return false;
  }

  /**
   * 获取当前网络状态并更新本地成员变量
   */
  private updateNetworkStatus(): void {
    try {
      // 判断是否有活跃的网络连接
      const isConnected: boolean = this.hasDefaultNetSync();
      if (!isConnected) {
        this.currentNetworkType = 'Other';
      } else {
        // 获取当前默认的网络类型

        if (this.hasNetWiFi()) {
          this.currentNetworkType = 'WIFI';
        } else {
          this.currentNetworkType = this.getMobileNetworkType()
        }
      }
    } catch (err) {
      LogUtil.error('Error while updating network status:', err);
      this.currentNetworkType = 'Other';
    }
    LogUtil.debug(`Updated Network Type: ${this.currentNetworkType}`);
  }

  /**
   * 获取具体的移动网络类型
   * @returns {NetworkTypeString} 返回移动网络类型的字符串。
   */
  private getMobileNetworkType(): NetworkTypeString {
    let mobileNetworkType: NetworkTypeString = 'Other';

    try {
      // 获取当前移动网络类型
      const slotId: number = this.getDefaultCellularDataSlotId();
      const signalInfo: Array<radio.SignalInformation> = radio.getSignalInformationSync(slotId);

      if (signalInfo.length > 0) {
        const primarySignalInfo = signalInfo[0];
        switch (primarySignalInfo.signalType) {
          case radio.NetworkType.NETWORK_TYPE_NR:
            mobileNetworkType = '5G';
            break;
          case radio.NetworkType.NETWORK_TYPE_LTE:
            mobileNetworkType = '4G';
            break;
          case radio.NetworkType.NETWORK_TYPE_WCDMA:
          case radio.NetworkType.NETWORK_TYPE_TDSCDMA:
            mobileNetworkType = '3G';
            break;
          case radio.NetworkType.NETWORK_TYPE_GSM:
          case radio.NetworkType.NETWORK_TYPE_CDMA:
            mobileNetworkType = '2G';
            break;
          default:
            mobileNetworkType = 'Other';
            break;
        }
      }
    } catch (err) {
      console.error('Error while getting mobile network type:', err);
      mobileNetworkType = 'Other';
    }

    return mobileNetworkType;
  }

  /**
   * 获取默认移动数据的SIM卡
   * @returns {number}
   */
  private getDefaultCellularDataSlotId(): number {
    return data.getDefaultCellularDataSlotIdSync();
  }

  /**
   * 获取当前的网络类型
   * @returns {NetworkTypeString}
   */
  public getCurrentNetworkType(): NetworkTypeString {
    return this.currentNetworkType;
  }

  /**
   * 监听网络事件变化
   */
  private registerNetworkEvents(): void {
    if (!this.netConnection) {
      this.netConnection = connection.createNetConnection(); //创建NetConnection对象
    }
    this.netConnection?.register((error: BusinessError) => {
      if (error) {
        console.error(`NetworkManager-register-异常 ~ code: ${error.code} -·- message: ${error.message}`);
      }
    });

    this.netConnection?.on('netAvailable', this.onNetAvailable.bind(this)); // 订阅网络可用事件
    this.netConnection?.on('netUnavailable', this.onNetUnavailable.bind(this)); // 订阅网络不可用事件
    this.netConnection?.on('netCapabilitiesChange', this.onNetCapabilitiesChange.bind(this)); // 订阅网络能力变化事件
    this.netConnection?.on('netConnectionPropertiesChange',
      this.onNetConnectionPropertiesChange.bind(this)); // 订阅网络连接信息变化事件
    this.netConnection?.on('netBlockStatusChange', this.onNetBlockStatusChange.bind(this)); // 订阅网络阻塞状态事件
    this.netConnection?.on('netLost', this.onNetLost.bind(this)); // 订阅网络丢失事件
  }

  private onNetAvailable(netHandle: net.NetHandle): void {

    LogUtil.debug('NetAvailable event triggered:', JSON.stringify(netHandle));
    this.updateNetworkStatus();
  }

  private onNetUnavailable(): void {
    LogUtil.debug('NetUnavailable event triggered');
    this.updateNetworkStatus();
  }

  private onNetCapabilitiesChange(netCapabilityInfo: net.NetCapabilityInfo): void {
    LogUtil.debug('NetCapabilitiesChange event triggered:', JSON.stringify(netCapabilityInfo));
  }

  private onNetConnectionPropertiesChange(netConnectionPropertyInfo: net.NetConnectionPropertyInfo): void {
    LogUtil.debug('NetConnectionPropertiesChange event triggered:', JSON.stringify(netConnectionPropertyInfo));
  }

  private onNetBlockStatusChange(netBlockStatusInfo: net.NetBlockStatusInfo): void {
    LogUtil.debug('NetBlockStatusChange event triggered:', JSON.stringify(netBlockStatusInfo));
  }

  private onNetLost(netHandle: net.NetHandle): void {
    LogUtil.debug('NetLost event triggered:', JSON.stringify(netHandle));
    this.updateNetworkStatus();
  }
}


