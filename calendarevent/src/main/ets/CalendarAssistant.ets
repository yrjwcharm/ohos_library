import { common } from "@kit.AbilityKit";
import { calendarManager } from "@kit.CalendarKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { PermissionUtil } from "../../utils/PermissionUtil";
import { promptAction } from "@kit.ArkUI";
import { ENV } from "../../utils/ENV";

export  class CalendarAssistant{
  //创建自己的日历账户
  public static createCalendarAccount(calendarAccount:calendarManager.CalendarAccount,config:calendarManager.CalendarConfig={
    enableReminder:true,
    color:Color.Red,
  }):Promise<calendarManager.Calendar|undefined>{
    return new Promise((resolve,reject)=>{
      CalendarAssistant.requestCalendarPermission((userGrant)=>{
        if(userGrant){
         let  abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
          let calendarMgr = calendarManager.getCalendarManager(abilityContext);
          calendarMgr?.getCalendar(calendarAccount).then((data: calendarManager.Calendar) => {
            data.setConfig(config);
            resolve(data);
          }).catch((_: BusinessError) => {
            calendarMgr?.createCalendar(calendarAccount).then((data: calendarManager.Calendar) => {
              data.setConfig(config);
              resolve(data);
              // 请确保日历账户创建成功后，再进行后续相关操作
            }).catch((_: BusinessError) => {
              resolve(undefined);
            });
          });
        }else{
          promptAction.showToast({
            message:'日历读写权限没有开启～'
          })
        }
      })
    })
  }
  //查询日历账户 不传就是系统默认日历账户  系统默认日历账户是日历存储首次运行时创建的，若创建日程时不关注归属哪个账户，则无须单独创建日历账户，可以直接使用默认日历账户。
  static queryCalendarAccount(calendarAccount?: calendarManager.CalendarAccount):Promise<calendarManager.Calendar|undefined>{
    return new Promise((resolve,reject)=>{
      CalendarAssistant.requestCalendarPermission((userGrant)=>{
        if(userGrant){
          let  abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
          let calendarMgr = calendarManager.getCalendarManager(abilityContext);
            calendarMgr?.getCalendar(calendarAccount).then((data: calendarManager.Calendar) => {
              resolve(data);
            }).catch((err: BusinessError) => {
              ENV.__DEV__ && console.error('查询日历账户异常信息----',err.code,err.message);
              resolve(undefined)
            });
        } else{
            promptAction.showToast({
              message:'日历读写权限没有开启～'
            })
          }
      });
    })
  }
  static  requestCalendarPermission=async (callback:(userGrant:boolean)=>void)=>{
    const userGrant = [await PermissionUtil.checkPermissions('ohos.permission.WRITE_CALENDAR'),await PermissionUtil.checkPermissions('ohos.permission.READ_CALENDAR')];
    if(userGrant.every(Boolean)){
        callback?.(true);
    }else{
      const userGrant = await PermissionUtil.requestPermissionsEasy(['ohos.permission.WRITE_CALENDAR','ohos.permission.READ_CALENDAR']);
      callback?.(userGrant);
    }
  }
}