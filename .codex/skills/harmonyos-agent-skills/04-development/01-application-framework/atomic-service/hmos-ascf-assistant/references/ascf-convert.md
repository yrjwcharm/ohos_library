# 小程序转换 ASCF 参考

## ASCF 与小程序的相同点

1. 代码语法遵守小程序语法规范
2. 添加页面需在 `app.json` 中添加对应页面路径
3. 事件绑定使用 `bindtap`
4. 目录结构相同，源码路径为 `ascf/ascf_src` 目录
5. 样式单位使用 `rpx`

## ASCF 与小程序的不同点

| 小程序 | ASCF | 说明 |
|--------|------|------|
| `.wxml` | `.hxml` | 模板文件，属性前缀 `wx:` → `has:` |
| `.wxss` | `.css` | 样式文件 |
| `.wxs` | `.hjs` | 视图层逻辑，可在 hxml 中用 `<hjs>` 标签内联 |
| `.js` 中 `wx.*` | `has.*` | 全局 API 对象替换 |
| `.json` | `.json` | 配置文件，保持不变 |

### 其他关键差异

- 分包：单包 ≤ 2MB，总包 ≤ 10MB，tabBar 页面必须在主包
- image 组件**不能**显示本地图片，须使用网络图片
- 平板默认居中显示，无法强制竖屏
- hjs 中数组 `constructor` 返回函数而非字符串
- API version 12 时 `navigationBarTextStyle: "white"` 不生效，需用 `navigationStyle: "custom"`
- 自定义组件不支持 `getPageId` 方法
- 一个组件的 hxml 可有多个 slot，无需声明 `multipleSlots: true`
- 不支持部分小程序接口（如 `showModal` 不支持 `editable` 参数、不支持 `hideToast`）

## 转换命令

```bash
ascf convert -i <inputPath> -o <outputPath> [-c]
```

详细参数说明见 [CLI 参考 - convert](./ascf-toolkit-cli.md#convert--转换小程序)。

## 转换后适配流程

```
转换完成后按顺序处理：
│
├─ 1. 查看转换报告
│   ├─ 打开 ascf/ascf_src/_ascfConvertReport/index.html
│   └─ 查看 ascf/ascf_src/transform.log 中 TODO 标记
│
├─ 2. 文件格式验证
│   ├─ .wxml → .hxml，wx: → has:
│   ├─ .js 中 wx. → has.
│   ├─ .wxss → .css
│   └─ .wxs → .hjs
│
├─ 3. 语法修复
│   ├─ let 作用域、变量未定义使用
│   ├─ function/package 关键字冲突
│   ├─ 以 v 开头的变量名
│   ├─ 非整型 px 值改为整型（如 0.5px → 1px）
│   └─ <toast> 组件替换为 has.showToast
│
├─ 4. 支付宝小程序额外适配（如适用）
│   ├─ 自定义组件声明 options: { styleIsolation: 'isolated' }
│   ├─ slot 定义处的 class 在 ASCF 不生效，需单独处理
│   └─ 不支持 $page、$slots 属性，需去除
│
├─ 5. npm 依赖处理
│   ├─ vant-weapp 等源码需拷贝到源码目录后转换
│   └─ 或使用 ascf buildNpm 处理
│
├─ 6. AGC 注册与配置
│   ├─ 在 AppGallery Connect 注册元服务
│   └─ 配置域名、权限
│
├─ 7. 平台能力适配
│   └─ 参考 guide.md 中【平台能力接入决策树】
│   └─ 重点：隐私托管、华为账号登录、支付替换
│
└─ 8. 编译验证
    ├─ ascf compile -c -m .
    └─ ascf build assembleAndInstallHap
```

## 所有支持的 API/组件/框架参考

不在以下文档中定义的接口均不支持，需要适配或移除功能：

- [ASCF 框架功能](../docs/references/references-framework/Readme-CN.md)
- [ASCF 组件功能](../docs/references/references-components/Readme-CN.md)
- [ASCF 接口功能](../docs/references/references-apis/Readme-CN.md)

## 常见问题

转换后遇到问题可查阅 [FAQ](../docs/faqs/Readme-CN.md)。
