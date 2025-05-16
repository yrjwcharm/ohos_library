import {NetworkCallback} from '@ohos_lib/filedownload'
export class NetworkDetector {
  networkCallback: NetworkCallback = {

    netAvailableCallback: (netHandle: ESObject) => {
      // if (!isNetWiFi()) {
      //   showToastCenter('正在使用2g/3g/4g网络，可能会产生流量')
      // } else if (!isNetworkAvailable()) {
      //   showToastCenter('网络已恢复~')
      // }
      // rnEmitDeviceEvent('netStatusInfo', { netIsAvailable: true })
      // setNetworkAvailable(true)
    },

    netLostCallback: (netHandle: ESObject) => {
      // showToastCenter('网络连接已断开，请检查~')
      // setNetworkAvailable(false)

      // })
    }
  }
}