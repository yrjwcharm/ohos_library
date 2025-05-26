### calendar_event(API12)
___
#### 简介
**calendar_event** 这是一款基于HarmonyNext CalendarKit（日历服务）api进行二次封装的开源插件、用于简化三方应用同步系统-日程管理【提醒】等操作

***版本更新---请重点查看更新日志!!!***

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
#### 基本用法

```typescript
import { promptAction, router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { CalendarAssistant } from '@ohos_lib/calendar_event';
import calendarManager from '@ohos.calendarManager';
import { ILesson } from '../interfaces/ILesson';

@Entry
@ComponentV2
struct Index {
  private  abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
  private calendar:calendarManager.Calendar|undefined = undefined;
  private eventId:number=0;
  private schedulePlan :ILesson[] =[{
    "remindMinuteOffset": 2,
    "className": "初一大班公开课新-2",
    "title": "「2」开课啦|点击进入",
    "startTimeStamp": "1781784000",
    "endTimeStamp": "1781784600",
    "url": "https://m.gaotu.cn/account/download?action_type=live_v2&clazzNumber=490105605063792640&clazzLessonNumber=492415568530382848&isCalendar=1",
    "remark": "浏览器输入此链接即可进入APP听课:https://m.gaotu.cn/account/download?action_type=live_v2&clazzNumber=490105605063792640&clazzLessonNumber=492415568530382848&isCalendar=1"
  }];
  private calendarAccount:calendarManager.CalendarAccount = {
    name: this.abilityContext?.abilityInfo?.bundleName,//使用应用包名
    type: calendarManager.CalendarType.LOCAL,
    displayName:'课程提醒'
  };
  private config:calendarManager.CalendarConfig={enableReminder:true,color:Color.Red};

  build() {
    Stack() {
      Column() {
        Button('创建日历账户').onClick(async()=>{
          const calendar = await CalendarAssistant.createCalendarAccount(this.calendarAccount,this.config)
          if(calendar){
            this.calendar = calendar;
            promptAction.showToast({
              message:'日历账户创建成功!!!!'
            })
          }
        })
        Button('查询系统默认日历账户').onClick(async()=>{
          const calendar = await CalendarAssistant.queryCalendarAccount();
          if(calendar){
            promptAction.showToast({
              message:'查询系统默认日历账户成功!!!!'
            })
          }
        })
        Button('查询指定日历账户').onClick(async()=>{
          const calendar = await CalendarAssistant.queryCalendarAccount(this.calendarAccount);
          if(calendar){
            promptAction.showToast({
              message:'查询指定日历账户成功!!!!'
            })
          }
        })
        Button('日程管理----->给账户创建日程安排').onClick(async()=>{
          const item = this.schedulePlan[0];
          const event: calendarManager.Event = {
            // 日程标题
            title: item.title,
            description: item.remark,
            // 日程类型，不推荐三方开发者使用calendarManager.EventType.IMPORTANT，重要日程类型不支持一键服务跳转功能及无法自定义提醒时间
            type: calendarManager.EventType.NORMAL,
            // 日程开始时间
            startTime: Number(item.startTimeStamp) * 1000,
            // 日程结束时间
            endTime: Number(item.endTimeStamp) * 1000,
            // 距开始时间提前10分钟提醒
            reminderTime: [item.remindMinuteOffset],
            // 日程服务，可选字段，需要一键服务功能的日程，填写该属性。
            service: {
              // 服务类型，比如一键查看、一键入会、一键追剧等。
              type: calendarManager.ServiceType.TRIP,
              // 服务的uri。可以跳转到三方应用相应界面，格式为deeplink。使用deeplink方式需要在华为HAG云侧进行注册，注册提供的信息为应用包名、应用的服务类型。
              // deeplink包括scheme、host、path以及参数（不包含参数值）
              uri: 'xxx://xxx.xxx.com/xxx',
              // 服务辅助描述信息，可选字段
              description: '一键服务'
            }
          };
          if(this.calendar) {
            const eventId = await CalendarAssistant.addScheduleToAccount(event, this.calendar);
            if (eventId > 0) {
              this.eventId = eventId;
              promptAction.showToast({
                message: '日程创建成功！！！'
              })
            }
          }
        })
        Button('从账户删除日程').onClick(async ()=>{
          if(this.calendar) {
            const bool = await CalendarAssistant.deleteScheduleFromAccount([this.eventId], this.calendar);
            if (bool) {
              promptAction.showToast({
                message: '日程删除成功！！！'
              })
            }
          }
        })
        Button('查询指定账户下所有日程').onClick(async ()=>{
          if(this.calendar) {
            const events = await CalendarAssistant.queryAllScheduleFromAccount(this.calendar);
            promptAction.showToast({
              message: '查询成功！！！'+JSON.stringify(events)
            })
          }
        })
      }
    }
    .height('100%')
      .width('100%')
  }
}
```

#### 更多详情案例及演示效果请查看 https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/CalendarEvent
