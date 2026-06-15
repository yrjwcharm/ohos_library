# 元服务发布上架指南

## 完整发布流程

```
1. 发布前自检（阅读审核指南）
2. 申请 release 发布证书
3. 修改图标（睫毛图）、应用名称和描述
4. 优化包大小（≤2MB/包，≤10MB 总包）
5. （可选）发布邀请测试版，收集反馈
6. 完成元服务 ICP 备案
7. 构建发布包（assembleApp）并上传 AGC
8. （可选）申请分发到 HarmonyOS 4及以下设备
```

## 签名配置

调试证书用于开发调测，**不可用于上架**，必须单独申请发布证书。

参考：[发布元服务获取签名](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-atomic-guide-0000002293651514)

在 `build-profile.json5` 中新增 release 签名配置：

```json5
{
  "app": {
    "signingConfigs": [
      {
        "name": "debug",
        "type": "HarmonyOS",
        "material": { ... }
      },
      {
        "name": "release",      // 新增 release 配置
        "type": "HarmonyOS",
        "material": { ... }     // 填入 release 证书路径和密码
      }
    ]
  }
}
```

> **注意：** 调试和发布证书不能混用。

## 图标配置

上架图标必须使用官方睫毛图工具生成，否则审核不通过。

**方式1：本地 CLI 工具**（推荐）

```bash
# 首次使用：在 scripts/cli 目录安装依赖
cd scripts/cli && pnpm install

# 生成睫毛图（512×512）和 AGC 图标（216×216）
node scripts/cli/cli generate-as-icon \
  -i image-1024x1024.png \
  -o AppScope/resources/base/media/app_icon.png \
  --agc app_icon_agc.png
```

**方式2：在线工具**

访问 [元服务图标生成工具](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-service-icon-generation) 在线生成。

**图标规格：**
- 本地图标：512×512 PNG → `AppScope/resources/base/media/app_icon.png`
- AGC 上传图标：216×216（`--agc` 参数输出）

## 修改应用名称和描述

```
AppScope/resources/base/element/string.json
  → app_name: 应用名称

entry/src/main/resources/base/element/string.json
  → EntryAbility_label: 应用标题
  → EntryAbility_desc: 应用描述

entry/src/main/resources/zh-CN/element/string.json
  → 中文本地化版本（同上字段）
```

## 包大小优化

发布要求：单包 ≤ 2MB，总包 ≤ 10MB（调试 debug 包不限制）。

**分析包组成：**

```bash
ascf compile . -c -m --analyzeBundle
# 在浏览器中打开报告查看各分包大小和依赖关系
```

**优化策略：**
1. 用系统提供接口替代三方库（减少 npm 包体积）
2. 图片、视频等资源文件上云，本地文件改用 webp 格式
3. 使用[分包](../docs/guides/develop-subpackages.md)拆分功能模块
4. 使用[分包异步化](../docs/guides/asynchronous-subcontracting.md)进一步降低主包体积

## 构建发布包

```bash
# 命令行构建（推荐）
ascf build assembleApp

# IDE：Build > Build Hap(s)/APP(s) > Build APP(s)
# 构建结果位于项目 build/ 目录
```

## 发布注意事项

| 事项 | 说明 |
|------|------|
| **包加密** | 不推荐开启，启动时解密会明显影响启动速度 |
| **邀请测试** | 正式发布前可先发邀请测试版，收集用户反馈后再全量发布 |
| **元服务备案** | 上架前必须完成 [ICP 备案](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-service-filing) |
| **审核自检** | 上架前阅读[元服务审核指南](https://developer.huawei.com/consumer/cn/doc/distribution/app/50129)逐项检查 |
| **HOS 4及以下分发** | AGC 上线后另行发邮件申请，见[跨版本适配指南](./ascf-cross-compat.md) |

## 发布前检查清单

**签名与证书**
- [ ] 使用 `release` 证书签名（非调试证书）
- [ ] `build-profile.json5` 中 release 签名配置正确

**图标与信息**
- [ ] 图标已用睫毛图工具生成（512×512），路径 `AppScope/resources/base/media/app_icon.png`
- [ ] 应用名称、描述已修改（string.json）

**包大小**
- [ ] 单包 ≤ 2MB，总包 ≤ 10MB（用 `--analyzeBundle` 验证）
- [ ] tabBar 页面在主包，不在分包

**合规**
- [ ] 完成 ICP 元服务备案
- [ ] 通过审核指南自检
- [ ] 接入平台隐私托管（不使用自定义隐私弹窗）
- [ ] 睫毛图标正确（512×512，工具生成）
- [ ] 无开屏页、无扑脸广告
- [ ] 一级页面支持边缘滑动手势退出
- [ ] 不诱导跳转 App
