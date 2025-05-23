### calendar_event(API12)
___
#### 简介
**calendar_event** 这是一款基于Calendar Kit服务api封装的开源插件

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
