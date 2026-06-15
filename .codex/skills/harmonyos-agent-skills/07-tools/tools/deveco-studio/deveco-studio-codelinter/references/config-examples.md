# CodeLinter 配置示例

## 配置文件结构

`codelinter.json5`（默认配置文件名）支持以下顶层字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `files` | `string[]` | 检查范围，glob 模式 |
| `ignore` | `string[]` | 排除范围，glob 模式 |
| `ruleSet` | `string[]` | 应用的规则集 |
| `rules` | `object` | 单条规则覆盖 |
| `overrides` | `array` | 针对特定路径的规则覆盖 |
| `plugins` | `string[]` | 自定义插件（保留字段） |
| `extRuleSet` | `array` | 外部规则集扩展 |

---

## 示例 1：日常开发（推荐配置）

适合大多数项目的入门配置，告警量适中。保存为 `codelinter.json5`。

```json
{
  "files": ["**/*.ets", "**/*.ts", "**/*.js"],
  "ignore": [
    "**/oh_modules/**",
    "**/build/**",
    "**/.preview/**",
    "**/node_modules/**"
  ],
  "ruleSet": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@hw-stylistic/recommended",
    "plugin:@performance/recommended"
  ],
  "rules": {}
}
```

---

## 示例 2：安全审计专项

重点检查加密算法安全性。

```json
{
  "files": ["**/*.ets", "**/*.ts"],
  "ignore": ["**/oh_modules/**", "**/build/**"],
  "ruleSet": [
    "plugin:@security/all"
  ],
  "rules": {
    "@security/no-commented-code": "warn"
  }
}
```

---

## 示例 3：性能优化专项

全量性能规则，适合性能调优阶段。

```json
{
  "files": ["**/*.ets"],
  "ignore": ["**/oh_modules/**", "**/build/**"],
  "ruleSet": [
    "plugin:@performance/all"
  ],
  "rules": {
    "@performance/hp-arkui-remove-redundant-state-var": "error",
    "@performance/hp-arkui-load-on-demand": "error",
    "@performance/high-frequency-log-check": "warn"
  }
}
```

---

## 示例 4：跨设备适配检查

检查多设备 UI 适配规范。

```json
{
  "files": ["**/*.ets"],
  "ignore": ["**/oh_modules/**", "**/build/**"],
  "ruleSet": [
    "plugin:@cross-device-app-dev/recommended",
    "plugin:@compatibility/recommended"
  ],
  "rules": {}
}
```

---

## 示例 5：严格全量检查（发布前）

发布前全面扫描，规则最严格。

```json
{
  "files": ["**/*.ets", "**/*.ts", "**/*.js"],
  "ignore": ["**/oh_modules/**", "**/build/**"],
  "ruleSet": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@hw-stylistic/recommended",
    "plugin:@performance/recommended",
    "plugin:@security/recommended",
    "plugin:@correctness/recommended",
    "plugin:@compatibility/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@performance/hp-arkui-load-on-demand": "error",
    "@performance/hp-arkui-remove-redundant-nest-container": "warn"
  }
}
```

---

## 示例 6：使用 overrides 对不同目录差异化配置

```json
{
  "files": ["**/*.ets", "**/*.ts"],
  "ignore": ["**/oh_modules/**", "**/build/**"],
  "ruleSet": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@performance/recommended"
  ],
  "rules": {},
  "overrides": [
    {
      "files": ["**/test/**/*.ts"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-magic-numbers": "off"
      }
    },
    {
      "files": ["**/pages/**/*.ets"],
      "rules": {
        "@performance/hp-arkui-load-on-demand": "error",
        "@performance/hp-arkui-remove-container-without-property": "error"
      }
    }
  ]
}
```

---

## 规则级别速查

```json
{
  "rules": {
    "rule-id": "off",           // 0: 关闭规则
    "rule-id": "warn",          // 1: 警告（不影响退出码）
    "rule-id": "error",         // 2: 错误（退出码为 1）
    "rule-id": "suggestion",    // 3: 建议

    // 带参数的规则：["级别", 参数对象]
    "@hw-stylistic/max-len": ["warn", { "code": 120 }],
    "@typescript-eslint/array-type": ["error", { "default": "array" }]
  }
}
```

---

## 常用 ignore 模式

```json
{
  "ignore": [
    "**/oh_modules/**",     // 第三方依赖（必须排除）
    "**/build/**",          // 构建产物（必须排除）
    "**/.preview/**",       // Previewer 临时文件
    "**/node_modules/**",   // Node 依赖
    "**/*.d.ts",            // 类型声明文件
    "**/generated/**"       // 自动生成代码
  ]
}
```
