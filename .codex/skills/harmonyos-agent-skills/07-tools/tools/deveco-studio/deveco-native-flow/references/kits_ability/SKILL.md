---
name: kits_ability
description: "HarmonyOS AbilityKit 应用能力集使用规范。包含 UIAbility、Want、Router、权限管理、应用生命周期等应用核心能力。Use when: (1) 页面路由跳转，(2) 应用生命周期管理，(3) 权限申请，(4) Ability 启动与通信。Triggers: Ability、UIAbility、Want、Router、页面跳转、生命周期、权限、AbilityStage、@ohos.app.ability。"
user-invocable: false
---

# AbilityKit 应用能力集 (kits_ability)

本 skill 覆盖 HarmonyOS **AbilityKit** 应用能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| UIAbility | @ohos.app.ability.UIAbility | 应用主Ability |
| Want | @ohos.app.ability.Want | 意图/数据传递 |
| router | @ohos.router | 页面路由 |
@ohos.app.ability.common | @ohos.app.ability.common | 公共上下文 |
| abilityAccessCtrl | @ohos.abilityAccessCtrl | 权限控制 |

## 快速索引

### 页面路由

```typescript
import router from '@ohos.router';

// 跳转到指定页面
router.pushUrl({
  url: 'pages/SecondPage',
  params: {
    id: 123,
    name: 'test'
  }
});

// 替换当前页面
router.replaceUrl({
  url: 'pages/LoginPage'
});

// 返回上一页
router.back();

// 返回指定页面
router.back({
  url: 'pages/Index'
});

// 获取路由参数
let params = router.getParams() as Record<string, Object>;
let id = params['id'] as number;
```

### UIAbility 生命周期

```typescript
import UIAbility from '@ohos.app.ability.UIAbility';
import Want from '@ohos.app.ability.Want';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import window from '@ohos.window';

export default class EntryAbility extends UIAbility {
  // Ability 创建时调用
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    console.log('Ability onCreate');
    // 获取启动参数
    let data = want.parameters;
  }

  // 销毁时调用
  onDestroy(): void {
    console.log('Ability onDestroy');
  }

  // 创建窗口时调用
  onWindowStageCreate(windowStage: window.WindowStage): void {
    console.log('Ability onWindowStageCreate');

    // 设置主窗口
    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        console.error('Failed to load content: ' + JSON.stringify(err));
        return;
      }
      console.info('Succeeded in loading content');
    });
  }

  // 销毁窗口时调用
  onWindowStageDestroy(): void {
    console.log('Ability onWindowStageDestroy');
  }

  // 进入前台时调用
  onForeground(): void {
    console.log('Ability onForeground');
  }

  // 进入后台时调用
  onBackground(): void {
    console.log('Ability onBackground');
  }
}
```

### 页面生命周期

```typescript
@Entry
@Component
struct LifecyclePage {
  // 页面显示时调用
  aboutToAppear(): void {
    console.log('aboutToAppear');
  }

  // 页面即将消失时调用
  aboutToDisappear(): void {
    console.log('aboutToDisappear');
  }

  // 页面构建
  build() {
    Column() {
      Text('Lifecycle Page')
    }
  }
}
```

### 权限申请

```typescript
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';

const permissions: Array<Permissions> = [
  'ohos.permission.CAMERA',
  'ohos.permission.READ_MEDIA'
];

async function requestPermissions(context: common.UIAbilityContext): Promise<void> {
  let atManager = abilityAccessCtrl.createAtManager();

  // 检查是否已授权
  for (const permission of permissions) {
    let grantStatus = await atManager.checkAccessToken(
      context.applicationInfo.accessTokenId,
      permission
    );

    if (grantStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      // 请求权限
      let result = await atManager.requestPermissionsFromUser(context, permissions);
      if (result.authResults[0] !== 0) {
        console.error('Permission denied');
      }
      break;
    }
  }
}
```

### 启动其他 Ability

```typescript
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';

// 启动其他应用的 Ability
let context = getContext(this) as common.UIAbilityContext;

let want: Want = {
  deviceId: '',  // 空表示本设备
  bundleName: 'com.example.targetapp',
  abilityName: 'TargetAbility',
  parameters: {
    message: 'Hello from caller'
  }
};

context.startAbility(want).then(() => {
  console.log('Started target ability');
}).catch((err: Error) => {
  console.error('Failed to start ability: ' + err.message);
});
```

## Want 数据结构

```typescript
interface Want {
  deviceId?: string;       // 目标设备ID
  bundleName?: string;     // 应用包名
  abilityName?: string;    // Ability名称
  moduleName?: string;     // 模块名
  action?: string;         // 动作
  entities?: string[];     // 实体
  uri?: string;            // URI
  type?: string;           // MIME类型
  flags?: number;          // 标志
  parameters?: {           // 自定义参数
    [key: string]: Object
  };
}
```

**常用 action**：

| 值 | 说明 |
|----|------|
| ohos.want.action.home | 主页 |
| ohos.want.action.viewData | 查看数据 |
| ohos.want.action.sendData | 发送数据 |
| ohos.want.action.edit | 编辑 |
| ohos.want.action.pick | 选择 |
| ohos.want.action.send | 发送 |

## Router 路由模式

```typescript
import router from '@ohos.router';

// Standard 模式（默认）：保留当前页面，跳转到新页面
router.pushUrl({
  url: 'pages/SecondPage'
}, router.RouterMode.Standard);

// Single 模式：如果目标页面已存在，直接返回
router.pushUrl({
  url: 'pages/SecondPage'
}, router.RouterMode.Single);
```

## 应用上下文

```typescript
import common from '@ohos.app.ability.common';

@Entry
@Component
struct ContextPage {
  build() {
    Column() {
      Button('获取上下文')
        .onClick(() => {
          // 获取 UIAbilityContext
          let context = getContext(this) as common.UIAbilityContext;

          // 应用包名
          let bundleName = context.applicationInfo.name;

          // 缓存目录
          let cacheDir = context.cacheDir;

          // 文件目录
          let filesDir = context.filesDir;

          // 临时目录
          let tempDir = context.tempDir;

          console.log('BundleName: ' + bundleName);
          console.log('CacheDir: ' + cacheDir);
        })
    }
  }
}
```

## 使用示例

### 登录跳转

```typescript
@Entry
@Component
struct LoginPage {
  @State username: string = '';
  @State password: string = '';

  build() {
    Column({ space: 20 }) {
      TextInput({ placeholder: '用户名' })
        .onChange((value) => {
          this.username = value;
        })

      TextInput({ placeholder: '密码' })
        .type(InputType.Password)
        .onChange((value) => {
          this.password = value;
        })

      Button('登录')
        .width('100%')
        .onClick(() => {
          // 登录成功后跳转到主页
          router.replaceUrl({
            url: 'pages/HomePage',
            params: {
              username: this.username
            }
          });
        })
    }
    .padding(20)
  }
}
```

### 页面参数传递

```typescript
// 发送页面
router.pushUrl({
  url: 'pages/DetailPage',
  params: {
    userId: 123,
    userName: '张三',
    avatar: 'https://example.com/avatar.png'
  }
});

// 接收页面
@Entry
@Component
struct DetailPage {
  @State userId: number = 0;
  @State userName: string = '';

  aboutToAppear(): void {
    let params = router.getParams() as Record<string, Object>;
    if (params) {
      this.userId = params['userId'] as number;
      this.userName = params['userName'] as string;
    }
  }

  build() {
    Column() {
      Text(`用户ID: ${this.userId}`)
      Text(`用户名: ${this.userName}`)
    }
  }
}
```

## 最佳实践

1. **路由封装**：
```typescript
class RouterUtil {
  static toDetail(id: number): void {
    router.pushUrl({
      url: 'pages/DetailPage',
      params: { id }
    });
  }

  static back(): void {
    router.back();
  }

  static toHome(): void {
    router.replaceUrl({ url: 'pages/HomePage' });
  }
}
```

2. **生命周期日志**：
```typescript
// 在 onCreate/onForeground 等生命周期中记录日志
// 方便调试和性能监控
```

## 注意事项

1. replaceUrl 会销毁当前页面，用户无法返回
2. 页面栈最多支持 32 个页面
3. 权限请求需要用户手动授权
4. UIAbility 上下文与页面上下文区分使用