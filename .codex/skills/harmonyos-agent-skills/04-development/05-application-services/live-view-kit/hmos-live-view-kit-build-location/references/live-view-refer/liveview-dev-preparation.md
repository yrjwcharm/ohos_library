# 开发准备

## 必要条件

1. 开通实况窗权益（必须申请通过）
2. 设备端打开实况窗开关
3. 调用 `liveViewManager.isLiveViewEnabled()` 检查权限

## ArkTS 代码生成规范

- 参照 `harmonyos-resource.md` 和 `assets/Arkts.md` 生成代码
- 所有 ArkTS 代码生成后需进行语法检查
- Struct 必须包含 `build()` 方法

## 注释规范

**【重要】注释必须放在对应字段正上方，禁止统一放在结构体外部**

### buildDefaultView 注释示例

```typescript
private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
  return {
    // todo id字段内容需要替换为业务实际内容，实况窗唯一标识，由开发者生成
    id: 0,
    // todo event字段内容需要替换为业务实际内容，应用场景标识
    event: 'DELIVERY',
    // todo sequence字段内容需要替换为业务实际内容，状态序列号
    sequence: LiveViewStatus.WAITING_PAYMENT,
    // todo isMute字段内容需要替换为业务实际内容，是否静音
    isMute: true,
    // todo liveViewData字段内容需要替换为业务实际内容，实况窗数据
    liveViewData: { ... }
  };
}
```

### buildWantAgent 注释示例

```typescript
private static async buildWantAgent(page: string): Promise<Want> {
  const wantAgentInfo: wantAgent.WantAgentInfo = {
    wants: [
      {
        // todo 此处应改为业务实际应用包名
        bundleName: "com.xxx.app",
        // todo 需要将此字段更改为业务窗口名
        abilityName: 'EntryAbility',
        ...
      }
    ],
    ...
  };
}
```

## 代码生成检查清单

### 一、实况窗请求体注释检查
- [ ] `id` - 字段上方有 `// todo id字段内容需要替换为业务实际内容...`
- [ ] `event` - 字段上方有 `// todo event字段内容需要替换为业务实际内容...`
- [ ] `sequence` - 字段上方有 `// todo sequence字段内容需要替换为业务实际内容...`
- [ ] `isMute` - 字段上方有 `// todo isMute字段内容需要替换为业务实际内容...`
- [ ] `liveViewData` - 字段上方有 `// todo liveViewData字段内容需要替换为业务实际内容...`

### 二、ArkTS 语法检查
1. 导入检查 - 所有类型已导入
2. 类型检查 - 无 `any`、`unknown`
3. 语法检查 - 无对象展开、解构、嵌套函数
4. build() 方法 - @Entry/@Component 装饰器Struct包含 `build(): void`

### 三、开发准备提示
代码生成后必须提示：
```
代码已生成完毕。使用前请确保：
1. 开通实况窗权益：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/liveview-rights
2. 设备端打开实况窗开关
```
