---
name: kits_localization
description: "HarmonyOS LocalizationKit 本地化能力集使用规范。包含 i18n 国际化、intl 格式化、resourceManager 资源管理等能力。Use when: (1) 多语言国际化，(2) 日期时间格式化，(3) 数字货币格式化，(4) 资源管理。Triggers: 国际化、多语言、i18n、intl、resourceManager、locale、本地化、翻译、格式化。"
user-invocable: false
---

# LocalizationKit 本地化能力集 (kits_localization)

本 skill 覆盖 HarmonyOS **LocalizationKit** 本地化能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| i18n | @ohos.i18n | 国际化设置 |
| intl | @ohos.intl | 格式化（日期、数字、货币） |
| resourceManager | @ohos.resourceManager | 资源管理 |

## 快速索引

### 系统语言和区域设置

```typescript
import i18n from '@ohos.i18n';

// 获取系统语言
let systemLanguage = i18n.System.getSystemLanguage();
console.log('System language: ' + systemLanguage); // zh-Hans

// 设置应用语言
i18n.System.setPreferredLanguage('en-US');

// 获取系统区域
let systemRegion = i18n.System.getSystemRegion();
console.log('System region: ' + systemRegion); // CN

// 获取系统Locale
let systemLocale = i18n.System.getSystemLocale();
console.log('System locale: ' + systemLocale); // zh-Hans-CN

// 获取时区
let timeZone = i18n.getTimeZone();
console.log('Timezone: ' + timeZone.getID()); // Asia/Shanghai
```

### Locale 对象

```typescript
import i18n from '@ohos.i18n';

// 创建 Locale
let locale = new i18n.Locale('zh-Hans-CN');
console.log('Language: ' + locale.language);      // zh
console.log('Script: ' + locale.script);          // Hans
console.log('Region: ' + locale.region);          // CN
console.log('BaseName: ' + locale.baseName);      // zh-Hans

// 获取本地化名称
let displayName = locale.getDisplayName('en');
console.log('Display name: ' + displayName); // Chinese (Simplified, China)

// 获取日历
let calendar = locale.getCalendar();
```

### 日期时间格式化

```typescript
import intl from '@ohos.intl';

// 日期格式化
let dateFormat = new intl.DateTimeFormat('zh-Hans', {
  dateStyle: 'full',
  timeStyle: 'long'
});
let formattedDate = dateFormat.format(new Date());
console.log('Formatted date: ' + formattedDate);
// 2024年3月9日 星期六 中国标准时间 19:30:00

// 自定义格式
let customFormat = new intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit'
});
let customDate = customFormat.format(new Date());
console.log('Custom date: ' + customDate);
// Saturday, March 9, 2024 at 07:30 PM

// 格式化范围
let rangeFormat = new intl.DateTimeFormat('zh-Hans', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});
let range = rangeFormat.formatRange(new Date('2024-01-01'), new Date('2024-12-31'));
console.log('Date range: ' + range);
```

### 数字格式化

```typescript
import intl from '@ohos.intl';

// 数字格式化
let numberFormat = new intl.NumberFormat('zh-Hans', {
  style: 'decimal',
  maximumFractionDigits: 2
});
let formattedNumber = numberFormat.format(1234567.891);
console.log('Formatted number: ' + formattedNumber); // 1,234,567.89

// 百分比格式化
let percentFormat = new intl.NumberFormat('zh-Hans', {
  style: 'percent',
  minimumFractionDigits: 1
});
let percent = percentFormat.format(0.856);
console.log('Percent: ' + percent); // 85.6%

// 科学计数法
let scientificFormat = new intl.NumberFormat('en-US', {
  notation: 'scientific'
});
let scientific = scientificFormat.format(1234567);
console.log('Scientific: ' + scientific); // 1.235E6
```

### 货币格式化

```typescript
import intl from '@ohos.intl';

// 货币格式化
let currencyFormat = new intl.NumberFormat('zh-Hans', {
  style: 'currency',
  currency: 'CNY',
  currencyDisplay: 'symbol'
});
let cny = currencyFormat.format(1234.56);
console.log('CNY: ' + cny); // ¥1,234.56

// 美元
let usdFormat = new intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
let usd = usdFormat.format(1234.56);
console.log('USD: ' + usd); // $1,234.56

// 欧元
let eurFormat = new intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});
let eur = eurFormat.format(1234.56);
console.log('EUR: ' + eur); // 1.234,56 €
```

### 相对时间格式化

```typescript
import intl from '@ohos.intl';

let relativeFormat = new intl.RelativeTimeFormat('zh-Hans', {
  numeric: 'auto'
});

// 格式化相对时间
console.log(relativeFormat.format(-1, 'day'));    // 昨天
console.log(relativeFormat.format(1, 'day'));     // 明天
console.log(relativeFormat.format(-2, 'week'));   // 2周前
console.log(relativeFormat.format(3, 'month'));   // 3个月后
console.log(relativeFormat.format(-1, 'year'));   // 去年
```

### 复数规则

```typescript
import intl from '@ohos.intl';

let pluralRules = new intl.PluralRules('zh-Hans');
console.log(pluralRules.select(0));   // other
console.log(pluralRules.select(1));   // other
console.log(pluralRules.select(2));   // other

// 英语复数规则
let pluralRulesEn = new intl.PluralRules('en');
console.log(pluralRulesEn.select(1));   // one
console.log(pluralRulesEn.select(2));   // other
console.log(pluralRulesEn.select(0));   // other
```

### 排序规则

```typescript
import intl from '@ohos.intl';

let collator = new intl.Collator('zh-Hans', {
  sensitivity: 'base',
  ignorePunctuation: true
});

// 比较字符串
let result = collator.compare('张三', '李四');
console.log('Compare result: ' + result); // 负数表示"张三"排在"李四"前面

// 数组排序
let names = ['张三', '李四', '王五', '赵六'];
names.sort((a, b) => collator.compare(a, b));
console.log('Sorted: ' + names.join(', '));
```

### 资源管理

```typescript
import resourceManager from '@ohos.resourceManager';

// 获取资源管理器
let resMgr = getContext(this).resourceManager;

// 获取字符串资源
async function getString(resId: number): Promise<string> {
  let value = await resMgr.getStringValue(resId);
  return value;
}

// 获取字符串资源（通过名称）
async function getStringByName(name: string): Promise<string> {
  let value = await resMgr.getStringByName(name);
  return value;
}

// 获取字符串数组
async function getStringArray(resId: number): Promise<Array<string>> {
  let values = await resMgr.getStringArrayValue(resId);
  return values;
}

// 获取整数数组
async function getIntArray(resId: number): Promise<Array<number>> {
  let values = await resMgr.getIntArrayValue(resId);
  return values;
}

// 获取颜色资源
async function getColor(resId: number): Promise<number> {
  let color = await resMgr.getColor(resId);
  return color;
}

// 获取图片资源
async function getMedia(resId: number): Promise<Uint8Array> {
  let media = await resMgr.getMediaContent(resId);
  return media;
}
```

### 多语言资源文件

```json
// resources/base/element/string.json
{
  "string": [
    { "name": "app_name", "value": "我的应用" },
    { "name": "hello", "value": "你好" }
  ]
}

// resources/en_US/element/string.json
{
  "string": [
    { "name": "app_name", "value": "My App" },
    { "name": "hello", "value": "Hello" }
  ]
}

// resources/zh_Hant/element/string.json
{
  "string": [
    { "name": "app_name", "value": "我的應用" },
    { "name": "hello", "value": "你好" }
  ]
}
```

### 获取设备支持的Locale

```typescript
import i18n from '@ohos.i18n';

// 获取系统支持的语言列表
let languages = i18n.System.getDisplayLanguage(['zh-Hans', 'en-US', 'ja-JP'], 'zh-Hans');
console.log('Languages: ' + JSON.stringify(languages));

// 获取系统支持的Locale列表
let locales = i18n.System.getSystemLocales();
console.log('System locales: ' + JSON.stringify(locales));

// 获取日历支持的区域
let calendarLocales = i18n.getCalendar('zh-Hans').getTimeZoneDisplayName('Asia/Shanghai');
console.log('Calendar timezone: ' + calendarLocales);
```

### 设置应用语言

```typescript
import i18n from '@ohos.i18n';

// 获取应用偏好语言列表
let preferredLanguages = i18n.System.getPreferredLanguages();
console.log('Preferred languages: ' + JSON.stringify(preferredLanguages));

// 添加偏好语言
i18n.System.addPreferredLanguage('en-US', 0); // 添加到第一位

// 移除偏好语言
i18n.System.removePreferredLanguage(0);

// 设置首个偏好语言
i18n.System.setPreferredLanguage('zh-Hans');
```

### 日历操作

```typescript
import i18n from '@ohos.i18n';

// 获取日历
let calendar = i18n.getCalendar('zh-Hans', 'gregory');

// 设置日期
calendar.set(2024, 2, 9); // 2024年3月9日（月份从0开始）

// 获取日期信息
let year = calendar.get('year');
let month = calendar.get('month');
let day = calendar.get('date');
let dayOfWeek = calendar.get('day_of_week');

console.log(`Date: ${year}-${month + 1}-${day}, weekday: ${dayOfWeek}`);

// 获取时区显示名称
let tzName = calendar.getTimeZoneDisplayName('Asia/Shanghai');
console.log('Timezone name: ' + tzName);
```

## 资源目录结构

```
resources/
├── base/                 # 默认资源
│   ├── element/
│   │   ├── string.json   # 字符串资源
│   │   ├── color.json    # 颜色资源
│   │   └── float.json    # 浮点数资源
│   ├── media/
│   │   └── icon.png      # 图片资源
│   └── profile/
│       └── main_pages.json
├── en_US/                # 英语（美国）
│   └── element/
│       └── string.json
├── zh_Hans/              # 简体中文
│   └── element/
│       └── string.json
└── zh_Hant/              # 繁体中文
    └── element/
        └── string.json
```

## Locale 命名规范

| 格式 | 示例 | 说明 |
|------|------|------|
| 语言 | zh, en | 仅语言代码 |
| 语言-区域 | zh-CN, en-US | 语言+国家/地区 |
| 语言-脚本-区域 | zh-Hans-CN | 语言+脚本+区域 |
| 语言-区域-扩展 | zh-CN-u-ca-chinese | 包含Unicode扩展 |

常用 Locale：

| Locale | 语言 |
|--------|------|
| zh-Hans-CN | 简体中文（中国） |
| zh-Hant-TW | 繁体中文（台湾） |
| en-US | 英语（美国） |
| en-GB | 英语（英国） |
| ja-JP | 日语（日本） |
| ko-KR | 韩语（韩国） |
| de-DE | 德语（德国） |
| fr-FR | 法语（法国） |

## 最佳实践

### 封装国际化工具类

```typescript
import i18n from '@ohos.i18n';
import resourceManager from '@ohos.resourceManager';

class I18nUtil {
  private static instance: I18nUtil;
  private resMgr: resourceManager.ResourceManager | null = null;

  static getInstance(): I18nUtil {
    if (!I18nUtil.instance) {
      I18nUtil.instance = new I18nUtil();
    }
    return I18nUtil.instance;
  }

  init(context: Context): void {
    this.resMgr = context.resourceManager;
  }

  async getString(name: string): Promise<string> {
    return await this.resMgr!.getStringByName(name);
  }

  getCurrentLocale(): string {
    return i18n.System.getSystemLocale();
  }

  setLanguage(locale: string): void {
    i18n.System.setPreferredLanguage(locale);
  }
}

export default I18nUtil.getInstance();
```

## 注意事项

1. **资源文件编码**：确保所有 string.json 文件使用 UTF-8 编码
2. **语言回退**：系统会按优先级回退到可用的语言资源
3. **实时更新**：切换语言后需要刷新页面才能生效
4. **复数处理**：不同语言的复数规则不同，使用 PluralRules 处理