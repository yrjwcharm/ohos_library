### calendar_event(API12)
___
#### 简介
**calendar_event** 这是一款基于HarmonyNext CalendarKit（日历服务）api进行二次封装的开源插件、用于简化三方应用同步系统-日程管理【提醒】等操作

***1、已经内置日历权限授权，无需手动实现***
___
***2、Api已经内置创建账户、创建日程之前的条件查询判断【是否已经有该日历账户、是否已经有该日程安排】，无需手动实现***

___


***版本更新---请查看更新日志!!!***

#### 安装步骤

```ohpm
ohpm install @ohos_lib/calendar_event
```
***1、添加权限在应用主模块entry/src/main/ets/module.json5下***
```typescript
 "requestPermissions": [
{
  "name": 'ohos.permission.WRITE_CALENDAR',
"reason":"$string:request_write_calendar_permission",
"usedScene": {"when": "inuse"}
},{
  "name": 'ohos.permission.READ_CALENDAR',
  "reason":"$string:request_read_calendar_permission",
  "usedScene": {"when": "inuse"}

}
],
```

```
#### 基本用法

```typescript
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
           if(canIUse('SystemCapability.Applications.CalendarData')) {
             let abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
             let calendarMgr = calendarManager.getCalendarManager(abilityContext);
             calendarMgr?.deleteCalendar(calendar).then(() => {
               resolve(true);
             }).catch((err: BusinessError) => {
               resolve(false);
             });
           }
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
          if(canIUse('SystemCapability.Applications.CalendarData')) {
            let abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
            let calendarMgr = calendarManager.getCalendarManager(abilityContext);
            calendarMgr?.getCalendar(calendarAccount).then((data: calendarManager.Calendar) => {
              resolve(data);
            }).catch((err: BusinessError) => {
              ENV.__DEV__ && console.error('查询日历账户异常信息----', err.code, err.message);
              resolve(undefined)
            });
          }
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
          if(canIUse('SystemCapability.Applications.CalendarData')) {
            let abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
            let calendarMgr = calendarManager.getCalendarManager(abilityContext);
            calendarMgr?.getAllCalendars().then((data: calendarManager.Calendar[]) => {
              resolve(data);
            }).catch((_: BusinessError) => {
              resolve([]);
            });
          }
        }else{
          promptAction.showToast({
            message:'日历读写权限没有开启～'
          })
        }
      })
    })
  }
  //给账户创建自己的日程
  public static addScheduleToAccount=(event:calendarManager.Event,calendar:calendarManager.Calendar, isJump?:boolean):Promise<number>=>{
    return new Promise((resolve)=>{
        CalendarAssistant.requestCalendarPermission((userGrant)=>{
          if(userGrant) {
            if (canIUse('SystemCapability.Applications.CalendarData')) {
              let abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
              let calendarMgr = calendarManager.getCalendarManager(abilityContext);
              // 根据日程id查询
              let eventFilter:calendarManager.EventFilter;
              if(event.title){
                eventFilter= calendarManager.EventFilter.filterByTitle(event.title);
              }else if(event.startTime&&event.endTime){
                eventFilter= calendarManager.EventFilter.filterByTime(event.startTime,event.endTime);
              }else {
                // tips:⚠️ 这里是日程id 可不是日历账户id「calendarAccount的id」,不要把日历账户的id赋值给日程id
                eventFilter= calendarManager.EventFilter.filterById([event.id]);
              }
              calendar.getEvents(eventFilter!).then((events: calendarManager.Event[]) => {
                if (events.length > 0) {
                  resolve(events[0]?.id!);
                } else {
                  if (isJump) {
                    calendarMgr?.editEvent(event).then((data: number): void => {
                      resolve(data);
                    }).catch((_: BusinessError) => {
                      resolve(-1);
                    });
                  } else {
                    calendar.addEvent(event).then((data: number) => {
                      resolve(data);
                    }).catch((_: BusinessError) => {
                      resolve(-1);
                    });
                  }
                }
              }).catch((_: BusinessError) => {
              });
            }
          }
        })
    })
  }
  //从账户删除日程（事件）是个数组，单个元素
  public static  deleteScheduleFromAccount(eventIds:number[],calendar:calendarManager.Calendar):Promise<boolean>{
     return new Promise((resolve)=>{
       CalendarAssistant.requestCalendarPermission((userGrant)=>{
         if(userGrant){
           if (canIUse('SystemCapability.Applications.CalendarData')) {
             calendar.deleteEvents(eventIds).then(() => {
               resolve(true);
             }).catch((err: BusinessError) => {
                resolve(false);
             });
           }
         }else{
           promptAction.showToast({
             message:'日历读写权限没有开启～'
           })
         }
       })
     })
  }
  //查询当前日历账户下的所有日程。由于涉及数据隐私安全，进行了权限管控的应用无法获取其他创建的日程信息。
  public  static queryAllScheduleFromAccount(calendar:calendarManager.Calendar):Promise<calendarManager.Event[]>{
    return new Promise((resolve)=>{
      CalendarAssistant.requestCalendarPermission((userGrant)=>{
        if(userGrant) {
          if (canIUse('SystemCapability.Applications.CalendarData')) {
            //时间是毫秒数
            calendar.getEvents().then((data: calendarManager.Event[]) => {
              resolve(data);
            }).catch((_: BusinessError) => {
              resolve([]);
            });
          }
        }
      })
    })
  }
  //根据日程id--从当前账户查询日程
  public  static queryScheduleFromAccountById(eventIds:number[],calendar:calendarManager.Calendar):Promise<calendarManager.Event[]>{
     return new Promise((resolve)=>{
       CalendarAssistant.requestCalendarPermission((userGrant)=>{
         if(userGrant) {
           if (canIUse('SystemCapability.Applications.CalendarData')) {
             const filterId = calendarManager.EventFilter.filterById(eventIds);
             calendar.getEvents(filterId).then((data: calendarManager.Event[]) => {
               resolve(data);
             }).catch((err: BusinessError) => {
                resolve([]);
             });
           }
         }
       })
     })
  }
  //根据标题--从当前账户查询日程
  public  static queryScheduleFromAccountByTitle(title:string,calendar:calendarManager.Calendar):Promise<calendarManager.Event[]>{
    return new Promise((resolve)=>{
      CalendarAssistant.requestCalendarPermission((userGrant)=>{
        if(userGrant) {
          if (canIUse('SystemCapability.Applications.CalendarData')) {
            const filterId = calendarManager.EventFilter.filterByTitle(title);
            calendar.getEvents(filterId).then((data: calendarManager.Event[]) => {
              resolve(data);
            }).catch((err: BusinessError) => {
              resolve([]);
            });
          }
        }
      })
    })
  }
  //根据开始时间和结束时间--从当前账户查询日程
  public  static queryScheduleFromAccountByTime(startTime:number, endTime:number, calendar:calendarManager.Calendar):Promise<calendarManager.Event[]>{
    return new Promise((resolve)=>{
      CalendarAssistant.requestCalendarPermission((userGrant)=>{
        if(userGrant) {
          if (canIUse('SystemCapability.Applications.CalendarData')) {
            //时间是毫秒数
            const filterId = calendarManager.EventFilter.filterByTime(startTime,endTime);
            calendar.getEvents(filterId).then((data: calendarManager.Event[]) => {
              resolve(data);
            }).catch((_: BusinessError) => {
              resolve([]);
            });
          }
        }
      })
    })
  }
}
```
