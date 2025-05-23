import { promptAction, router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { CalendarAssistant } from '@ohos_lib/calendar_event';
import calendarManager from '@ohos.calendarManager';

@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
   async aboutToAppear() {

  }
  build() {
    Stack() {
      Column() {
          Button('创建日历账户').onClick(async()=>{
            let abilityContext: common.UIAbilityContext = getContext() as common.UIAbilityContext
            const calendarAccountName = abilityContext.abilityInfo.bundleName;
            const calendar = await CalendarAssistant.createCalendarAccount({
              name: calendarAccountName,//使用应用包名
              type: calendarManager.CalendarType.LOCAL,
              displayName:'课程提醒'
            },{enableReminder:true,color:Color.Red})
            if(calendar){
              promptAction.showToast({
                message:'日历账户创建成功!!!!'
              })
            }
          })
      }
    }
    .height('100%')
    .width('100%')
  }
}