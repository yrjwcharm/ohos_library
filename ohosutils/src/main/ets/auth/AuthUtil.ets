
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import { bundleManager, common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { ToastUtil } from '../action/ToastUtil';

/**
 * @Author csx
 * @DateTime 2024/2/2 21:33
 * @TODO AuthUtil  权限相关工具类
 */
export class AuthUtil {
  /**
   * 检查是否授权
   * @param permission 待检查权限
   * @returns 授权状态
   */
  private static checkAccessToken(permission: Permissions): abilityAccessCtrl.GrantStatus {
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    let grantStatus: abilityAccessCtrl.GrantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;
    // 获取应用程序的accessTokenID
    let tokenId: number = 0;
    try {
      let bundleInfo: bundleManager.BundleInfo =
        bundleManager.getBundleInfoForSelfSync(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
      let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
      tokenId = appInfo.accessTokenId;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      ToastUtil.showToast('获取应用绑定包信息失败:原因为:' + err.message);
    }
    // 校验应用是否被授予权限
    try {
      grantStatus = atManager.checkAccessTokenSync(tokenId, permission);
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      ToastUtil.showToast('校验授权信息失败:原因为:' + err.message);
    }

    return grantStatus;
  }

  /**
   * 判断是否授权
   * @param permissions  待判断的权限
   * @returns 已授权true,未授权false
   */
  static checkPermissions(permissions: Permissions): boolean {
    //判断是否授权
    let grantStatus: abilityAccessCtrl.GrantStatus = AuthUtil.checkAccessToken(permissions);
    if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      //已经授权
      return true;
    } else {
      //未授权
      return false;
    }
  }

  /**
   * 发起授权
   * @param permissions  需要授权的权限
   * @param callBack  授权成功后的回调
   * @returns
   */
  static async reqPermissionsFromUser(permissions: Permissions, callBack: (index: number) => void): Promise<void> {
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    // requestPermissionsFromUser会判断权限的授权状态来决定是否唤起弹窗
    let request = await atManager.requestPermissionsFromUser(getContext() as common.UIAbilityContext, [permissions]);
    let grantStatus: Array<number> = request.authResults;
    let length: number = grantStatus.length;
    for (let i = 0; i < length; i++) {
      if (grantStatus[i] === 0) {
        // 用户授权，可以继续访问目标操作
        callBack(1);
      } else {
        callBack(-1);
        // 用户拒绝授权，提示用户必须授权才能访问当前页面的功能，并引导用户到系统设置中打开相应的权限
        return;
      }
    }
  }

  /**
   * 发起授权 以Promise方式返回
   * @param permissions 需要授权的权限
   * @returns 1表示授权成功继续业务操作,-1表示用户拒绝授权
   */
  static async reqPermissions(permissions: Permissions): Promise<number> {
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    // requestPermissionsFromUser会判断权限的授权状态来决定是否唤起弹窗
    let request = await atManager.requestPermissionsFromUser(getContext() as common.UIAbilityContext, [permissions]);
    let grantStatus: Array<number> = request.authResults;
    let length: number = grantStatus.length;
    for (let i = 0; i < length; i++) {
      if (grantStatus[i] === 0) {
        // 用户授权，可以继续访问目标操作
        return 1;
      } else {
        // 用户拒绝授权，提示用户必须授权才能访问当前页面的功能，并引导用户到系统设置中打开相应的权限
        return -1;
      }
    }
    return -1;
  }

  /**
   * 发起组合授权 以Promise方式返回
   * @param permissions 需要授权的权限集合
   * @returns true表示授权成功继续业务操作,false表示用户拒绝授权
   */
  static async reqPermissionsList(permissions: Array<Permissions>): Promise<boolean> {
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    // requestPermissionsFromUser会判断权限的授权状态来决定是否唤起弹窗
    let request = await atManager.requestPermissionsFromUser(getContext() as common.UIAbilityContext, permissions);
    let grantStatus: Array<number> = request.authResults;
    //鉴权结果
    let result: boolean = true;
    for (let i = 0; i < grantStatus.length; i++) {
      if (grantStatus[i] !== 0) {
        // 用户未授权授权
        result = false;
      }
    }
    return result;
  }
}