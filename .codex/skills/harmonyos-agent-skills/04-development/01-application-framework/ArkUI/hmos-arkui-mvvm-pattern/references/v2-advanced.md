# V2 全局状态：AppStorageV2 / PersistenceV2

## API 签名

`connect` 的第一个参数是**类本身**，不是 `this`：

```typescript
// ✓ 正确
@Local appState: AppState = AppStorageV2.connect(AppState, 'appState', () => new AppState())!;
@Local prefs: UserPreferences = PersistenceV2.connect(UserPreferences, 'userPrefs', () => new UserPreferences())!;
```

所有使用相同 key 的 `connect` 调用共享同一实例。首次 `connect` 时如果不存在，调用第三个参数的工厂函数创建默认实例。

## 使用示例

```typescript
// viewmodel/AppState.ets — 定义全局状态类
@ObservedV2
export class AppState {
  @Trace theme: string = 'light';
  @Trace isLoggedIn: boolean = false;
}

// pages/SettingsPage.ets — 页面 A 修改
@ComponentV2
struct SettingsPage {
  @Local appState: AppState = AppStorageV2.connect(AppState, 'appState', () => new AppState())!;

  build() {
    Toggle({ isOn: this.appState.theme === 'dark' })
      .onChange((isOn: boolean) => {
        this.appState.theme = isOn ? 'dark' : 'light';
      })
  }
}

// pages/HomePage.ets — 页面 B 读取同一份状态
@ComponentV2
struct HomePage {
  @Local appState: AppState = AppStorageV2.connect(AppState, 'appState', () => new AppState())!;

  build() {
    Text(`当前主题: ${this.appState.theme}`)
  }
}
```

## AppStorageV2 vs PersistenceV2 选择

| 场景 | 选择 | 原因 |
|------|------|------|
| 登录状态 | AppStorageV2 | 应用关闭后应重新登录 |
| 主题偏好 | PersistenceV2 | 用户希望重启后保持选择 |
| 临时缓存 | AppStorageV2 | 不需要持久化 |
| 用户设置 | PersistenceV2 | 设置应跨会话保留 |
