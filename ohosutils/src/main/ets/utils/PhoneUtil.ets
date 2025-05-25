
import { OutDTO } from '../base/OutDTO';
import { RegexConst as Const } from '../constants/RegexConst'

export class PhoneUtil {
  /**
   * 验证是否为手机号码（中国）
   *
   * @param content 手机号码
   */
  static isMobile(content: string): OutDTO<string> {
    if (content == null || content == '') {
      // 提供null的字符串为不匹配
      return OutDTO.Error("验证手机号不能为空");
    }
    if (new RegExp(Const.MOBILE).test(content)) {
      return OutDTO.OK("手机号为中国号码")
    } else {
      return OutDTO.Error("手机号非中国号码,请检查")
    }
  }

  /**
   * 验证是否为手机号码（香港）
   *
   * @param content 香港手机号码
   */
  static isMobileHk(content: string): OutDTO<string> {
    if (content == null || content == '') {
      // 提供null的字符串为不匹配
      return OutDTO.Error("验证手机号不能为空");
    }
    if (new RegExp(Const.MOBILE_HK).test(content)) {
      return OutDTO.OK("手机号为中国香港号码")
    } else {
      return OutDTO.Error("手机号非中国香港号码,请检查")
    }
  }

  /**
   * 验证是否为手机号码（台湾）
   *
   * @param content 台湾手机号码
   */
  static isMobileTw(content: string): OutDTO<string> {
    if (content == null || content == '') {
      // 提供null的字符串为不匹配
      return OutDTO.Error("验证手机号不能为空");
    }
    if (new RegExp(Const.MOBILE_TW).test(content)) {
      return OutDTO.OK("手机号为中国台湾号码")
    } else {
      return OutDTO.Error("手机号非中国台湾号码,请检查")
    }
  }

  /**
   * 验证是否为手机号码（澳门）
   *
   * @param content 澳门手机号码
   */
  static isMobileMo(content: string): OutDTO<string> {
    if (content == null || content == '') {
      // 提供null的字符串为不匹配
      return OutDTO.Error("验证手机号不能为空");
    }
    if (new RegExp(Const.MOBILE_MO).test(content)) {
      return OutDTO.OK("手机号为中国澳门号码")
    } else {
      return OutDTO.Error("手机号非中国澳门号码,请检查")
    }
  }

  /**
   * 验证是否为座机号码（中国）
   *
   * @param content 座机号码
   */
  static isTel(content: string): OutDTO<string> {
    if (content == null || content == '') {
      // 提供null的字符串为不匹配
      return OutDTO.Error("验证座机号码不能为空");
    }
    if (new RegExp(Const.TEL).test(content)) {
      return OutDTO.OK("号码为中国座机")
    } else {
      return OutDTO.Error("号码非中国座机,请检查")
    }
  }

  /**
   * 验证是否为座机号码（中国）+ 400 + 800
   *
   * @param content 手机号码
   */
  static isTel400800(content: string): OutDTO<string> {
    if (content == null || content == '') {
      // 提供null的字符串为不匹配
      return OutDTO.Error("验证号码不能为空");
    }
    if (new RegExp(Const.TEL_400_800).test(content)) {
      return OutDTO.OK("号码为400800格式的座机")
    } else {
      return OutDTO.Error("号码非400800格式的座机,请检查")
    }
  }

  /**
   * 验证是否为座机号码+手机号码+ 400 + 800电话 + 手机号号码（香港）
   *
   * @param content 手机号码
   */
  static isPhone(value: string): OutDTO<string> {
    if (value == null || value == '') {
      // 提供null的字符串为不匹配
      return OutDTO.Error("验证号码不能为空");
    }
    return PhoneUtil.isMobile(value) || PhoneUtil.isTel(value) || PhoneUtil.isTel400800(value) || PhoneUtil.isMobileHk(value) || PhoneUtil.isMobileTw(value) || PhoneUtil.isMobileMo(value);
  }
}