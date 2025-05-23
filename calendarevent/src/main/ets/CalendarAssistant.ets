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
    return new Promise((resolve)=>{
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
  //删除指定的日历账户，删除账户后，该账户下的所有日程会全部删除。
  public deleteCalendarAccount(calendar: calendarManager.Calendar):Promise<boolean>{
    return new Promise((resolve)=>{
       CalendarAssistant.requestCalendarPermission((userGrant)=>{
         if(userGrant){
           let  abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
           let calendarMgr = calendarManager.getCalendarManager(abilityContext);
           calendarMgr?.deleteCalendar(calendar).then(() => {
             resolve(true);
           }).catch((err: BusinessError) => {
             resolve(false);
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
    return new Promise((resolve)=>{
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
  private static  requestCalendarPermission=async (callback:(userGrant:boolean)=>void)=>{
    const userGrant = [await PermissionUtil.checkPermissions('ohos.permission.WRITE_CALENDAR'),await PermissionUtil.checkPermissions('ohos.permission.READ_CALENDAR')];
    if(userGrant.every(Boolean)){
        callback?.(true);
    }else{
      const userGrant = await PermissionUtil.requestPermissionsEasy(['ohos.permission.WRITE_CALENDAR','ohos.permission.READ_CALENDAR']);
      callback?.(userGrant);
    }
  }
  //获取当前应用所有创建的日历账户及默认日历账户Calendar对象。由于涉及数据隐私安全，进行了权限管控的应用无法获取其他应用创建的账户信息。
  public static queryAllCalendarAccount=():Promise< calendarManager.Calendar[]>=>{
    return new Promise((resolve)=>{
      CalendarAssistant.requestCalendarPermission((userGrant)=>{
        if(userGrant){
          let  abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
          let calendarMgr = calendarManager.getCalendarManager(abilityContext);
          calendarMgr?.getAllCalendars().then((data: calendarManager.Calendar[]) => {
            resolve(data);
          }).catch((_: BusinessError) => {
            resolve([]);
          });
        }else{
          promptAction.showToast({
            message:'日历读写权限没有开启～'
          })
        }
      })
    })
  }
  //给账户创建自己的日程 安排
  public static addScheduleEventToAccount=(event:calendarManager.Event,calendar:calendarManager.Calendar,isJump?:boolean):Promise<number[]|undefined>=>{
    return new Promise((resolve)=>{
        CalendarAssistant.requestCalendarPermission((userGrant)=>{
          if(userGrant){
            let  abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
            let calendarMgr = calendarManager.getCalendarManager(abilityContext);
            // 根据日程id查询
            const filterTime = calendarManager.EventFilter.filterByTime(event.startTime, event.endTime);
            calendar.getEvents(filterTime).then((events: calendarManager.Event[]) => {
              if (events.length > 0) {
                   resolve(events.map(el=>el.id!));
              } else {
                if (isJump) {
                  calendarMgr?.editEvent(event).then((data: number): void => {
                    resolve([data]);
                  }).catch((_: BusinessError) => {
                    resolve(undefined);
                  });
                } else {
                  calendar.addEvent(event).then((data: number) => {
                    resolve([data]);
                  }).catch((err: BusinessError) => {
                    resolve(undefined);
                  });
                }
              }
            }).catch((_: BusinessError) => {
            });
          }
        })
    })
  }
}