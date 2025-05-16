import sim from '@ohos.telephony.sim';
import { LogUtil } from './LogUtil';

export class CarrierUtil {
  private static readonly CHINA_MOBILE = ['中国移动', 'China Mobile'];
  private static readonly CHINA_UNICOM = ['中国联通', 'China Unicom'];
  private static readonly CHINA_TELECOM = ['中国电信', 'China Telecom'];

  public static getCarrier(slotId: number): string {
    try {
      // 获取SIM卡的SPN（Service Provider Name）
      let spn = sim.getSimSpnSync(slotId);
      if (!spn) {
        return 'Unknown Carrier';
      }

      // 去除前后空白
      spn = spn.trim();

      // 映射运营商名称
      if (CarrierUtil.stringContainsAny(spn, CarrierUtil.CHINA_MOBILE)) {
        return 'China Mobile';
      } else if (CarrierUtil.stringContainsAny(spn, CarrierUtil.CHINA_UNICOM)) {
        return 'China Unicom';
      } else if (CarrierUtil.stringContainsAny(spn, CarrierUtil.CHINA_TELECOM)) {
        return 'China Telecom';
      }
      return 'Unknown Carrier';
    } catch (error) {
      LogUtil.error('Error getting SIM carrier:', error);
      return 'Error getting Carrier';
    }
  }

  private static stringContainsAny(str: string, substrings: string[]): boolean {
    for (let substring of substrings) {
      if (str.includes(substring)) {
        return true;
      }
    }
    return false;
  }
}