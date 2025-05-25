import { OutDTO } from '../base/OutDTO'
import { RegexConst } from '../constants/RegexConst'
import { RegUtil } from './RegUtil'
import { cityJSON } from '../constants/CityConst'
import { StringBuilder } from '../base/StringBuilder'

export class IdCardUtil {
  /**
   * 中国公民身份证号码最小长度。
   */
  private static CHINA_ID_MIN_LENGTH: number = 15;
  /**
   * 中国公民身份证号码最大长度。
   */
  private static CHINA_ID_MAX_LENGTH: number = 18;
  /**
   * 每位加权因子
   */
  private static POWER: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  /**
   * 省份代码表
   */
  private static PROVINCE_CODES: Map<String, String> = new Map<String, String>();
  /**
   * 城市代码表
   */
  private static CITY_CODES: Map<String, String> = new Map<String, String>();
  /**
   * 区域代码表
   */
  private static DISTRICT_CODES: Map<String, String> = new Map<String, String>();

  /**
   * 初始化数据
   */
  private static init(): void {
    for (let province of Object.entries(cityJSON)) {
      //设置省
      IdCardUtil.PROVINCE_CODES.set(province[0].split('&')[1], province[0].split('&')[0]);
      if (province.length > 1) {
        //设置城市
        let cityList = province[1];
        for (let city of Object.entries(cityList)) {
          IdCardUtil.CITY_CODES.set(city[0].split('&')[1], city[0].split('&')[0]);
          if (city.length > 1) {
            //设置区
            let districtList = city[1];
            for (let district of Object.entries(districtList)) {
              IdCardUtil.DISTRICT_CODES.set(district[0].split('&')[1], district[0].split('&')[0]);
            }
          }
        }
      }
    }
  }


  /**
   * 判断18位身份证的合法性
   * 排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
   * 顺序码: 表示在同一地址码所标识的区域范围内，对同年、同月、同 日出生的人编定的顺序号，顺序码的奇数分配给男性，偶数分配 给女性。
   * <li>第1、2位数字表示：所在省份的代码</li>
   * <li>第3、4位数字表示：所在城市的代码</li>
   * <li>第5、6位数字表示：所在区县的代码</li>
   * <li>第7~14位数字表示：出生年、月、日</li>
   * <li>第15、16位数字表示：所在地的派出所的代码</li>
   * <li>第17位数字表示性别：奇数表示男性，偶数表示女性</li>
   * <li>第18位数字是校检码，用来检验身份证的正确性。校检码可以是0~9的数字，有时也用x表示</li>
   * 第十八位数字(校验码)的计算方法为：
   * <li>将前面的身份证号码17位数分别乘以不同的系数。从第一位到第十七位的系数分别为：7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2</li>
   * <li>将这17位数字和系数相乘的结果相加</li>
   * <li>用加出来和除以11，看余数是多少</li>
   * <li>余数只可能有0 1 2 3 4 5 6 7 8 9 10这11个数字。其分别对应的最后一位身份证的号码为1 0 X 9 8 7 6 5 4 3 2</li>
   * <li>通过上面得知如果余数是2，就会在身份证的第18位数字上出现罗马数字的Ⅹ。如果余数是10，身份证的最后一位号码就是2</li>
   * @param idCard 待验证的身份证
   * @return 是否有效的18位身份证，忽略x的大小写
   */
  static isValidCard18(idCard: string): OutDTO<string> {

    if (IdCardUtil.PROVINCE_CODES.size == 0) {
      IdCardUtil.init();
    }

    if (IdCardUtil.CHINA_ID_MAX_LENGTH != idCard.length) {
      return OutDTO.Error("身份证长度不足18位");
    }

    // 省份
    let proCode: string = idCard.substring(0, 2) + "0000";
    if (null == IdCardUtil.PROVINCE_CODES.get(proCode)) {
      return OutDTO.Error("省份代码不正确:" + proCode);
    }

    //城市
    let cityCode: string = idCard.substring(0, 4) + "00";
    if (null == IdCardUtil.CITY_CODES.get(cityCode)) {
      return OutDTO.Error("城市代码不正确:" + cityCode);
    }

    //乡镇
    let districtCode: string = idCard.substring(0, 6);
    if (null == IdCardUtil.DISTRICT_CODES.get(districtCode)) {
      return OutDTO.Error("区域代码不正确:" + districtCode);
    }

    //校验生日
    if (false == IdCardUtil.isBirthday(idCard.substring(6, 14))) {
      return OutDTO.Error("生日格式不正确:" + idCard.substring(6, 14));
    }

    // 前17位
    let code17: string = idCard.substring(0, 17);
    if (RegUtil.isMatch(RegexConst.NUMBERS, code17)) {
      // 获取校验位
      let val = IdCardUtil.getCheckCode18(code17);
      // 第18位
      if (idCard.charAt(17).toLowerCase() === val.toLowerCase()) {
        return OutDTO.OK("身份证格式正确");
      }
      return OutDTO.Error("校验码不匹配");
    }
    return OutDTO.Error("身份证校验失败");
  }

  /**
   * 校验15位身份证号是否合法
   * @param idCard
   * @returns
   */
  static isValidCard15(idCard: string): OutDTO<string> {

    if (IdCardUtil.PROVINCE_CODES.size == 0) {
      IdCardUtil.init();
    }

    if (IdCardUtil.CHINA_ID_MIN_LENGTH != idCard.length) {
      return OutDTO.Error("身份证长度不足15位");
    }

    // 省份
    let proCode: string = idCard.substring(0, 2) + "0000";
    if (null == IdCardUtil.PROVINCE_CODES.get(proCode)) {
      return OutDTO.Error("省份代码不正确:" + proCode);
    }

    //城市
    let cityCode: string = idCard.substring(0, 4) + "00";
    if (null == IdCardUtil.CITY_CODES.get(cityCode)) {
      return OutDTO.Error("城市代码不正确:" + cityCode);
    }

    //乡镇
    let districtCode: string = idCard.substring(0, 6);
    if (null == IdCardUtil.DISTRICT_CODES.get(districtCode)) {
      return OutDTO.Error("区域代码不正确:" + districtCode);
    }

    //校验生日
    if (false == IdCardUtil.isBirthday("19" + idCard.substring(6, 12))) {
      return OutDTO.Error("生日格式不正确:" + idCard.substring(6, 12));
    }

    return OutDTO.OK("身份证格式正确");
  }


  /**
   * 将15位身份证号码转换为18位
   *
   * @param idCard 15位身份编码
   * @return 18位身份编码
   */
  static convert15To18(idCard: string): OutDTO<string> {
    let idCard18: StringBuilder = new StringBuilder();
    if (idCard.length != IdCardUtil.CHINA_ID_MIN_LENGTH) {
      return OutDTO.Error("身份证长度不足15位");
    }
    if (RegUtil.isMatch(RegexConst.NUMBERS, idCard).getSuccess()) {
      const prefix = idCard.slice(0, 6); // 前 6 位
      const suffix = idCard.slice(12); // 后 9 位
      // 年份补充为 19XX（计算方法参考身份证规则）
      const fullYear = `19${prefix.slice(0, 2)}`;
      // 月份补充为 0X（计算方法参考身份证规则）
      const month = prefix.slice(2, 4);
      const monthNum = Number(month);
      const monthPadded = (monthNum < 10 ? '0' : '') + monthNum;
      // 日期补充为 0X（计算方法参考身份证规则）
      const day = prefix.slice(4, 6);
      const dayNum = Number(day);
      const dayPadded = (dayNum < 10 ? '0' : '') + dayNum;
      // 拼接转换后的身份证号
      let tmp = idCard18.append(prefix)
        .append(fullYear)
        .append(monthPadded)
        .append(dayPadded)
        .append(suffix)
        .toString();
      // 获取校验位
      const sVal = IdCardUtil.getCheckCode18(tmp);
      idCard18.append(sVal);
    } else {
      return OutDTO.Error("身份证必须为纯数字");
    }
    return OutDTO.OKByDataRow("转换18为身份证号码成功", idCard18.toString());
  }

  /**
   * 根据身份编号获取户籍省份编码，只支持15或18位身份证号码
   *
   * @param idCard 身份编码
   * @return 省份编码
   */
  static getProvinceCodeByIdCard(idCard: string): OutDTO<string> {
    if (IdCardUtil.PROVINCE_CODES.size == 0) {
      IdCardUtil.init();
    }
    let len = idCard.length;
    if (len == IdCardUtil.CHINA_ID_MIN_LENGTH || len == IdCardUtil.CHINA_ID_MAX_LENGTH) {
      let province = IdCardUtil.PROVINCE_CODES.get(idCard.substring(0, 2) + "0000");
      if (!province) {
        return OutDTO.Error("根据身份证号获取省份信息错误");
      }
      return OutDTO.OKByDataRow(province.toString(), idCard.substring(0, 2) + "0000");
    } else {
      return OutDTO.Error("身份证长度不正确");
    }
  }

  /**
   * 根据身份编号获取地市级编码，只支持15或18位身份证号码
   *
   * @param idCard 身份编码
   * @return 省份编码
   */
  static getCityCodeByIdCard(idCard: string): OutDTO<string> {
    if (IdCardUtil.PROVINCE_CODES.size == 0) {
      IdCardUtil.init();
    }
    let len = idCard.length;
    if (len == IdCardUtil.CHINA_ID_MIN_LENGTH || len == IdCardUtil.CHINA_ID_MAX_LENGTH) {
      let city = IdCardUtil.CITY_CODES.get(idCard.substring(0, 4) + "00");
      if (!city) {
        return OutDTO.Error("根据身份证号获取城市信息错误");
      }
      return OutDTO.OKByDataRow(city.toString(), idCard.substring(0, 4) + "00");
    } else {
      return OutDTO.Error("身份证长度不正确");
    }
  }


  /**
   * 根据身份编号获取区县级编码，只支持15或18位身份证号码
   *
   * @param idCard 身份编码
   * @return 省份编码
   */
  static getDistrictCodeByIdCard(idCard: string): OutDTO<string> {
    if (IdCardUtil.PROVINCE_CODES.size == 0) {
      IdCardUtil.init();
    }
    let len = idCard.length;
    if (len == IdCardUtil.CHINA_ID_MIN_LENGTH || len == IdCardUtil.CHINA_ID_MAX_LENGTH) {
      let district = IdCardUtil.DISTRICT_CODES.get(idCard.substring(0, 6));
      if (!district) {
        return OutDTO.Error("根据身份证号获取区域信息错误");
      }
      return OutDTO.OKByDataRow(district.toString(), idCard.substring(0, 6));
    } else {
      return OutDTO.Error("身份证长度不正确");
    }
  }


  /**
   * 获取十八位的校验码
   * @param idCard
   * @returns
   */
  private static getCheckCode18(idCard: string): string {
    const checkDigits: string[] = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    if (!/^\d{17}$/.test(idCard)) {
      throw new Error("身份证号前17位格式不正确");
    }

    let sum: number = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(idCard.charAt(i), 10) * IdCardUtil.POWER[i];
    }

    const checkCodeIndex: number = sum % 11;
    return checkDigits[checkCodeIndex];
  }

  /**
   * 是否为日期格式
   * @param str
   * @returns
   */
  private static isBirthday(str: string): boolean {
    const reg = /^(\d{4})(\d{2})(\d{2})$/;
    const match = str.match(reg);
    if (!match) {
      return false; // 不符合日期格式
    }
    const year = parseInt(match[1]);
    const month = parseInt(match[2]) - 1; // 月份从0开始，需减1
    const day = parseInt(match[3]);
    const date = new Date(year, month, day); // 构造日期对象
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
      return false; // 日期不合法
    }
    return true; // 符合生日日期格式
  }
}