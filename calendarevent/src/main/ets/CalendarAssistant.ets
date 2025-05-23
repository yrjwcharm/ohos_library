import { common } from "@kit.AbilityKit";
import { calendarManager } from "@kit.CalendarKit";
import { BusinessError } from "@kit.BasicServicesKit";

export  class CalendarAssistant{
  public static createCalendarAccount(calendarAccount:calendarManager.CalendarAccount,config:calendarManager.CalendarConfig={
    enableReminder:true,
    color:Color.Red,
  }):Promise<calendarManager.Calendar|undefined>{
    let abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
    let calendarMgr = calendarManager.getCalendarManager(abilityContext);
    return new Promise((resolve,reject)=>{
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
    })
  }
}