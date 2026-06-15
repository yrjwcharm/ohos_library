# CodeLinter 规则集参考

## 规则集总览

| 规则集 | recommended | all | 规则数量级 |
|--------|:-----------:|:---:|-----------|
| `plugin:@typescript-eslint/recommended` | ✅ | ✅ | ~30 / ~100 |
| `plugin:@hw-stylistic/recommended` | ✅ | ✅ | ~10 / ~15 |
| `plugin:@performance/recommended` | ✅ | ✅ | ~20 / ~60 |
| `plugin:@security/recommended` | ✅ | ✅ | ~10 / ~20 |
| `plugin:@correctness/recommended` | ✅ | ✅ | ~5 / ~10 |
| `plugin:@cross-device-app-dev/recommended` | ✅ | ✅ | ~5 / ~10 |
| `plugin:@compatibility/recommended` | ✅ | ✅ | ~1 / ~1 |
| `plugin:@previewer/recommended` | ✅ | ✅ | ~3 / ~3 |

---

## @typescript-eslint — ArkTS/TS 语法规范

面向 TypeScript/ArkTS 的语法、类型安全和代码风格规则，基于 `@typescript-eslint` 规则集。

**典型规则（recommended 包含）**：

| 规则 ID | 说明 |
|---------|------|
| `@typescript-eslint/no-explicit-any` | 禁止使用 `any` 类型 |
| `@typescript-eslint/no-unused-vars` | 禁止未使用的变量 |
| `@typescript-eslint/no-floating-promises` | Promise 必须被处理 |
| `@typescript-eslint/await-thenable` | 不允许 await 非 Thenable 值 |
| `@typescript-eslint/no-misused-promises` | 禁止在非 Promise 场景中使用 Promise |
| `@typescript-eslint/no-non-null-assertion` | 禁止非空断言 `!` |
| `@typescript-eslint/prefer-optional-chain` | 优先使用可选链 `?.` |
| `@typescript-eslint/require-await` | async 函数内必须有 await |

**all 新增的典型规则**：

| 规则 ID | 说明 |
|---------|------|
| `@typescript-eslint/explicit-function-return-type` | 函数必须声明返回类型 |
| `@typescript-eslint/no-magic-numbers` | 禁止魔法数字 |
| `@typescript-eslint/naming-convention` | 强制命名规范 |
| `@typescript-eslint/prefer-readonly` | 未修改的私有属性应声明为 readonly |

---

## @hw-stylistic — 代码风格

HarmonyOS 华为风格规范，约束代码格式和一致性。

| 规则 ID | 说明 |
|---------|------|
| `@hw-stylistic/indent` | switch 中 case/default 的缩进 |
| `@hw-stylistic/max-len` | 最大行长度（默认 120 字符） |
| `@hw-stylistic/quotes` | 强制单引号 |
| `@hw-stylistic/semi-spacing` | 分号前后间距 |
| `@hw-stylistic/no-tabs` | 禁止使用 tab 缩进 |
| `@hw-stylistic/file-naming-convention` | 文件命名规范 |
| `@hw-stylistic/curly` | 所有控制语句必须用大括号 |
| `@hw-stylistic/operator-linebreak` | 换行时操作符位置 |

---

## @performance — 性能优化

针对 ArkUI 渲染性能、内存、资源使用的检查规则。

**UI 渲染优化**：

| 规则 ID | 说明 |
|---------|------|
| `@performance/hp-arkui-load-on-demand` | 推荐使用 LazyForEach 代替 ForEach |
| `@performance/hp-arkui-remove-container-without-property` | 减少无属性的冗余容器嵌套 |
| `@performance/hp-arkui-use-row-column-to-replace-flex` | 优先用 Row/Column 替代 Flex |
| `@performance/hp-arkui-no-state-var-access-in-loop` | 避免在循环中频繁读取状态变量 |
| `@performance/hp-arkui-use-reusable-component` | 复杂组件应使用 @Reusable |
| `@performance/hp-arkui-use-object-link-to-replace-prop` | 用 @ObjectLink 替代 @Prop 减少深拷贝 |
| `@performance/hp-arkui-remove-redundant-state-var` | 删除未与 UI 关联的状态变量 |
| `@performance/foreach-args-check` | ForEach 应设置 keyGenerator 提升性能 |
| `@performance/foreach-index-check` | 避免用 index 作为 ForEach 的 key |

**状态管理**：

| 规则 ID | 说明 |
|---------|------|
| `@performance/hp-arkui-use-local-var-to-replace-state-var` | 临时计算用本地变量而非状态变量 |
| `@performance/hp-arkui-remove-unchanged-state-var` | 删除从不变化的状态变量 |
| `@performance/multiple-associations-state-var-check` | 多组件共用数据源时使用条件更新 |

**动画**：

| 规则 ID | 说明 |
|---------|------|
| `@performance/hp-arkui-combine-same-arg-animateto` | 合并参数相同的 animateTo 调用 |
| `@performance/hp-arkui-use-scale-to-replace-attr-animateto` | 布局变化时用 scale 动画替代 animateTo |
| `@performance/hp-arkui-use-transition-to-replace-animateto` | 组件进退场动画用 transition |
| `@performance/update-state-var-between-animatetos-check` | 避免在两次 animateTo 之间更新状态变量 |

**图片与媒体**：

| 规则 ID | 说明 |
|---------|------|
| `@performance/hp-arkui-image-async-load` | 大图应异步加载 |
| `@performance/gif-hardware-decoding-check` | GIF 图片启用硬件解码 |
| `@performance/start-window-icon-check` | 启动图标不超过 256x256 |
| `@performance/lottie-animation-destroy-check` | Lottie 动画使用后需销毁 |

**资源使用**：

| 规则 ID | 说明 |
|---------|------|
| `@performance/reasonable-audio-use-check` | 合理使用音频资源 |
| `@performance/reasonable-sensor-use-check` | 合理使用传感器资源 |
| `@performance/reasonable-gps-use-check` | 合理使用 GPS 资源 |
| `@performance/datashare-query-unrelease-check` | 数据库查询结果用完需关闭 |
| `@performance/dark-color-mode-check` | 实现深色模式以降低功耗 |

**代码质量**：

| 规则 ID | 说明 |
|---------|------|
| `@performance/hp-performance-no-dynamic-cls-func` | 避免动态声明函数和类 |
| `@performance/hp-arkts-no-use-any-export-current` | 不用 `export *` 导出当前模块 |
| `@performance/no-use-any-import` | 避免 `import *` |
| `@performance/bad-deep-clone-check` | 检测不合理的深拷贝 |
| `@performance/constant-property-referencing-check-in-loops` | 循环内提取常量属性访问 |
| `@performance/high-frequency-log-check` | 高频函数中避免打印日志 |
| `@performance/module-top-level-code-check` | 模块顶层代码不应影响懒加载 |

---

## @security — 安全规则

检查加密算法的安全性，防止使用不安全的算法或密钥长度。

| 规则 ID | 说明 |
|---------|------|
| `@security/no-unsafe-aes` | 禁止不安全的 AES 模式（如 ECB） |
| `@security/no-unsafe-rsa-encrypt` | 禁止不安全的 RSA 加密（如 PKCS1） |
| `@security/no-unsafe-rsa-sign` | 禁止不安全的 RSA 签名 |
| `@security/no-unsafe-rsa-key` | RSA 密钥长度不足 |
| `@security/no-unsafe-hash` | 禁止不安全的 Hash 算法（如 MD5、SHA1） |
| `@security/no-unsafe-mac` | 禁止不安全的 MAC 算法 |
| `@security/no-unsafe-dh` | 禁止不安全的 DH 算法 |
| `@security/no-unsafe-dsa` | 禁止不安全的 DSA 算法 |
| `@security/no-unsafe-ecdsa` | 禁止不安全的 ECDSA 参数 |
| `@security/no-unsafe-3des` | 禁止 3DES 算法 |
| `@security/no-unsafe-huks` | 禁止不安全的 HUKS 算法配置 |
| `@security/no-unsafe-kdf` | 禁止不安全的 KDF 算法 |
| `@security/no-commented-code` | 删除注释掉的无效代码 |
| `@security/no-cycle` | 禁止循环依赖 |

---

## @correctness — 行为正确性

检查特定场景下的 API 使用是否符合 HarmonyOS 规范。

| 规则 ID | 说明 |
|---------|------|
| `@correctness/audio-interrupt-check` | 正确处理音频打断事件 |
| `@correctness/audio-pause-or-mute-check` | 扬声器不可用时暂停播放 |
| `@correctness/avsession-metadata-check` | AVSession 需提供正确的元数据和播放状态 |
| `@correctness/avsession-buttons-check` | AVSession 需监听按键事件并正确响应 |
| `@correctness/listen-default-network-change` | 监听默认网络变化并重新建立连接 |
| `@correctness/listen-multi-network-concurrent` | 监听 Wi-Fi/蜂窝网络切换通知 |
| `@correctness/image-interpolation-check` | 检测可能因插值档位导致的严重锯齿 |
| `@correctness/image-pixel-format-check` | 检测低位宽导致的色阶问题 |
| `@correctness/redundant-dependency-check` | 检查配置文件中的无效依赖 |

---

## @cross-device-app-dev — 跨设备适配

检查跨设备（手机/平板/PC）开发的 UI 适配规范。

| 规则 ID | 说明 |
|---------|------|
| `@cross-device-app-dev/size-unit` | 布局尺寸应使用 vp 单位 |
| `@cross-device-app-dev/font-size-unit` | 字体大小应使用 fp 单位 |
| `@cross-device-app-dev/font-size` | 字体大小范围校验 |
| `@cross-device-app-dev/color-value` | 颜色值格式校验 |
| `@cross-device-app-dev/color-contrast` | 颜色对比度检查 |
| `@cross-device-app-dev/touch-target-size` | 触控目标大小（responseRegion）检查 |
| `@cross-device-app-dev/grid-columns-span` | 栅格布局 columns/span 校验 |
| `@cross-device-app-dev/sidebar-navigation` | PC/平板导航栏设置校验 |
| `@cross-device-app-dev/one-multi-breakpoint-check` | 响应式布局断点使用检查 |
| `@cross-device-app-dev/immersive-effect-check` | 全屏显示时是否设置避让区 |
| `@cross-device-app-dev/window-size-change-listener-check` | 必须监听窗口大小变化 |

---

## @compatibility — API 兼容性

| 规则 ID | 说明 |
|---------|------|
| `@compatibility/api-compatibility-check` | 检查潜在的 API 版本兼容性问题 |

---

## @previewer — Previewer 组件规则

| 规则 ID | 说明 |
|---------|------|
| `@previewer/mandatory-default-value-for-local-initialization` | 可本地初始化的组件属性需提供默认值 |
| `@previewer/no-page-method-on-preview-component` | @Preview 组件不能调用页面方法 |
| `@previewer/no-unallowed-decorator-on-root-component` | @Entry/@Preview 根组件不能含禁止本地初始化的装饰器 |
