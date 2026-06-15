# hmos-ascf-assistant ASCF元服务开发助手 SKILL

## 技能概述

hmos-ascf-assistant 是开发ASCF元服务的SKILL，辅助开发者使用 ASCF 工具链创建、编译、调试、运行 ASCF 元服务项目，将小程序（微信/支付宝）转换为 ASCF 元服务并完成适配，以及为已有 ASCF 元服务开发功能（华为账号登录、隐私托管、授权、支付、分享、web-view 等）。当需要创建/编译/调试/运行 ASCF 项目、转换小程序为元服务、开发元服务页面组件和平台能力、将 Taro/uni-app 适配为 ASCF 元服务时使用此技能。

通过该SKILL，你可以：

- 创建ASCF元服务
- 编译构建，打包运行元服务
- 将小程序快速转换为元服务
- 将三方框架Taro/Uniapp项目快速适配为元服务
- 符合元服务规范要求开发元服务功能

## 安装

```bash
git clone https://gitcode.com/atomicservice/harmonyos-agent-skills.git

# 元服务开发助手
npx skills add ./harmonyos-agent-skills/04-development/01-application-framework/atomic-service/hmos-atomicservice-assistant

# ASCF元服务开发助手
npx skills add ./harmonyos-agent-skills/04-development/01-application-framework/atomic-service/hmos-ascf-assistant

# Taro项目适配ASCF元服务
npx skills add ./harmonyos-agent-skills/04-development/01-application-framework/atomic-service/hmos-ascf-convert-taro

# Uniapp项目适配ASCF元服务
npx skills add ./harmonyos-agent-skills/04-development/01-application-framework/atomic-service/hmos-ascf-convert-uniapp
```

## 使用示例

### 创建项目并且配置签名后调试运行

`````md
1. 帮我创建一个XXX功能的ASCF元服务。
2. 使用如下配置，编译，构建运行。

配置：（可选，仅编译编译运行才需要）
1. "bundleName" 改为 "com.atomicservice.111",
2. debug包签名配置（改为自己的配置，与bundleName需要匹配）：
```json
{
  "name": "default",
  "type": "HarmonyOS",
  "material": {
    "storeFile": "path/to/me.p12",
    "storePassword": "***",
    "keyAlias": "me",
    "keyPassword": "***",
    "signAlg": "SHA256withECDSA",
    "profile": "path/to/mapDebug.p7b",
    "certpath": "path/to/map.cer"
  }
}
```

`````

## 声明

为保障平台及开发者双方的合法权益，特此声明如下：

1. 代码生成责任：我方不对生成代码的正确性、安全性做任何担保。使用本SKILL文档自动生成的代码，开发者在使用过程中应自行审核、测试并确保其适用性与准确性。因代码错误、不兼容或使用不当所引发的任何直接或间接损失，包括但不限于经济损失、数据丢失、系统故障等，均由开发者自行承担全部责任。
2. 平台免责：开发者应自行选择合法合规的AI工具，严格遵循所选AI工具的版权规定及使用规范。我们不对因使用本SKILL文档生成的代码所导致的任何问题承担责任，包括但不限于法律纠纷、第三方索赔、系统运行异常等。
3. 使用前提：开发者在使用本SKILL文档前，应充分理解并接受其使用风险，建议在正式上线前进行充分测试与验证。
4. 合规提示：开发者应确保其使用行为符合相关法律法规及行业规范，平台不对开发者的行为合法性进行担保或审查。
5. 版权声明：本SKILL文档的版权归属我方所有，开发者不得擅自篡改、传播、转售、出租本文档，不得用于与接入鸿蒙支付服务无关的其他用途。如开发者存在前述违规使用行为，我方有权追究法律责任。

## 版本信息

* 2026/04/28 更新最新的docs的内容
