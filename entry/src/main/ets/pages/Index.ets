import { promptAction, router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { CalendarAssistant } from '@ohos_lib/calendar_event';
import calendarManager from '@ohos.calendarManager';

@Entry
@ComponentV2
struct Index {
  private  abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
  private calendarAccount:calendarManager.CalendarAccount = {
    name: this.abilityContext?.abilityInfo?.bundleName,//使用应用包名
    type: calendarManager.CalendarType.LOCAL,
    displayName:'课程提醒'
  };
  private config:calendarManager.CalendarConfig={enableReminder:true,color:Color.Red};
   async aboutToAppear() {

  }
  build() {
    Stack() {
      Column() {
          Button('创建日历账户').onClick(async()=>{
            const calendar = await CalendarAssistant.createCalendarAccount(this.calendarAccount,this.config)
            if(calendar){
              promptAction.showToast({
                message:'日历账户创建成功!!!!'
              })
            }
          })
        Button('查询系统默认日历账户').onClick(async()=>{
          const calendar = await CalendarAssistant.queryCalendarAccount(undefined);
          if(calendar){
            console.log('解析++++',JSON.stringify(calendar,null,2))
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
      }
    }
    .height('100%')
    .width('100%')
  }
}