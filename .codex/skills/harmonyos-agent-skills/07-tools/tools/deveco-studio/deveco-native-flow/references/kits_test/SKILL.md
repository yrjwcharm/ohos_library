---
name: kits_test
description: "HarmonyOS TestKit 测试能力集使用规范。包含UI自动化测试、单元测试、测试驱动、组件查找和操作等功能。Use when: (1) 编写UI测试，(2) 自动化测试脚本，(3) 组件查找和操作，(4) 测试运行器。Triggers: 测试、UI测试、自动化、单元测试、uitest、Driver、testRunner。"
user-invocable: false
---

# TestKit 测试能力集 (kits_test)

本 skill 覆盖 HarmonyOS **TestKit** 测试能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| Driver | @ohos.UiTest | UI测试驱动 |
| Component | @ohos.UiTest | UI组件对象 |
| By | @ohos.UiTest | 组件查找条件 |
| On | @ohos.UiTest | 组件匹配条件 |
| abilityDelegatorRegistry | @ohos.app.ability.abilityDelegatorRegistry | 测试注册 |

## 快速索引

### UI测试基础

```typescript
import { Driver, By, Component } from '@ohos.UiTest';

// 创建驱动
let driver = Driver.create();

// 等待组件出现
await driver.waitForComponent(By.text('登录'), 5000);

// 查找组件
let button = await driver.findComponent(By.text('登录'));
await button.click();

// 输入文本
let input = await driver.findComponent(By.type('TextInput'));
await input.inputText('Hello World');

// 滑动操作
await driver.swipe(100, 500, 100, 200, 600);  // 从(100,500)滑动到(100,200)，600ms

// 点击坐标
await driver.click(540, 1000);
```

### 组件查找条件

```typescript
import { By, On } from '@ohos.UiTest';

// 按文本查找
let byText = By.text('确定');
let byTextContains = By.textContains('确');
let byTextStartsWith = By.textStartsWith('确');
let byTextEndsWith = By定');

// 按ID查找
let byId = By.id('login_button');

// 按类型查找
let byType = By.type('Button');
let byTypeText = By.type('TextInput');

// 按描述查找
let byDesc = By.description('登录按钮');

// 组合条件
let combined = By.text('登录').id('btn_login');

// 正则匹配
let byRegex = By.textRegex(/^登录$/);
```

### 组件操作

```typescript
import { Driver, By } from '@ohos.UiTest';

let driver = Driver.create();
let component = await driver.findComponent(By.text('按钮'));

// 点击
await component.click();

// 长按
await component.longClick();

// 双击
await component.doubleClick();

// 输入文本（适用于输入框）
await component.inputText('test content');

// 清除文本
await component.clearText();

// 获取组件属性
let text = await component.getText();
let id = await component.getId();
let type = await component.getType();
let isEnabled = await component.isEnabled();
let isSelected = await component.isSelected();
let isChecked = await component.isChecked();

// 滚动到可见
await component.scrollToTop();
await component.scrollToBottom();

// 拖拽
await component.dragTo(targetComponent);
```

### 列表操作

```typescript
import { Driver, By } from '@ohos.UiTest';

let driver = Driver.create();

// 查找List组件
let list = await driver.findComponent(By.type('List'));

// 滚动列表
await list.scrollForward();
await list.scrollBackward();

// 滚动到指定Item
await list.scrollToIndex(5);

// 获取列表Item数量
let itemCount = await list.getChildCount();

// 查找列表中的Item
let listItem = await driver.findComponent(By.type('ListItem').index(3));
```

### 手势操作

```typescript
import { Driver, UiDirection } from '@ohos.UiTest';

let driver = Driver.create();

// 滑动方向
await driver.swipe(UiDirection.UP);      // 向上滑动
await driver.swipe(UiDirection.DOWN);    // 向下滑动
await driver.swipe(UiDirection.LEFT);    // 向左滑动
await driver.swipe(UiDirection.RIGHT);   // 向右滑动

// 自定义滑动
await driver.swipe(100, 500, 100, 100, 500);  // startX, startY, endX, endY, duration

// 捏合手势
await driver.pinch(0.5);   // 放大
await driver.pinch(2.0);   // 缩小

// 多点触控
let pointerMatrix = driver.createPointerMatrix(2, 2);
pointerMatrix.setPoint(0, 0, 100, 100);   // 第一个手指第0步
pointerMatrix.setPoint(0, 1, 100, 200);   // 第一个手指第1步
pointerMatrix.setPoint(1, 0, 200, 100);   // 第二个手指第0步
pointerMatrix.setPoint(1, 1, 200, 200);   // 第二个手指第1步
await driver.injectMultiPointerAction(pointerMatrix);
```

### 截图和等待

```typescript
import { Driver, By } from '@ohos.UiTest';

let driver = Driver.create();

// 截图
await driver.screenCap('/data/test/screenshot.png');

// 等待组件出现
await driver.waitForComponent(By.text('加载完成'), 10000);  // 最长等待10秒

// 等待组件消失
await driver.assertComponentNotExist(By.id('loading'), 5000);

// 断言组件存在
await driver.assertComponentExist(By.text('成功'));

// 获取屏幕尺寸
let displaySize = await driver.getDisplaySize();
console.log(`Screen: ${displaySize.width}x${displaySize.height}`);
```

### 测试用例结构

```typescript
import { Driver, By } from '@ohos.UiTest';
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';

describe('LoginTest', () => {
  let driver: Driver;

  beforeAll(async () => {
    driver = Driver.create();
    // 启动应用
    let delegator = abilityDelegatorRegistry.getAbilityDelegator();
    await delegator.startAbility({
      bundleName: 'com.example.myapp',
      abilityName: 'EntryAbility'
    });
    await driver.waitForComponent(By.text('登录'), 5000);
  });

  afterAll(() => {
    // 清理资源
  });

  it('test_login_success', async () => {
    // 输入用户名
    let usernameInput = await driver.findComponent(By.id('username_input'));
    await usernameInput.clearText();
    await usernameInput.inputText('testuser');

    // 输入密码
    let passwordInput = await driver.findComponent(By.id('password_input'));
    await passwordInput.inputText('password123');

    // 点击登录
    let loginButton = await driver.findComponent(By.text('登录'));
    await loginButton.click();

    // 断言登录成功
    await driver.waitForComponent(By.text('登录成功'), 3000);
    let successText = await driver.findComponent(By.text('欢迎'));
    expect(await successText.getText()).assertContain('欢迎');
  });

  it('test_login_failed_empty_password', async () => {
    // 不输入密码直接登录
    let usernameInput = await driver.findComponent(By.id('username_input'));
    await usernameInput.inputText('testuser');

    let loginButton = await driver.findComponent(By.text('登录'));
    await loginButton.click();

    // 断言错误提示
    let errorMsg = await driver.findComponent(By.text('请输入密码'));
    expect(await errorMsg.isVisible()).assertTrue();
  });
});
```

## 使用示例

### 登录流程测试

```typescript
import { Driver, By } from '@ohos.UiTest';
import abilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { describe, beforeAll, it, expect } from '@ohos/hypium';

describe('LoginFlowTest', () => {
  let driver: Driver;

  beforeAll(async () => {
    driver = Driver.create();

    // 启动应用
    let delegator = abilityDelegatorRegistry.getAbilityDelegator();
    await delegator.startAbility({
      bundleName: 'com.example.myapp',
      abilityName: 'EntryAbility'
    });

    // 等待应用启动
    await driver.waitForComponent(By.id('main_page'), 10000);
  });

  it('complete_login_flow', async () => {
    // 步骤1：点击登录入口
    let loginEntry = await driver.findComponent(By.text('登录/注册'));
    await loginEntry.click();

    // 步骤2：等待登录页面
    await driver.waitForComponent(By.id('login_page'), 3000);

    // 步骤3：输入账号密码
    let usernameInput = await driver.findComponent(By.id('et_username'));
    await usernameInput.inputText('13800138000');

    let passwordInput = await driver.findComponent(By.id('et_password'));
    await passwordInput.inputText('123456');

    // 步骤4：勾选协议
    let agreementCheckbox = await driver.findComponent(By.id('cb_agreement'));
    if (!await agreementCheckbox.isChecked()) {
      await agreementCheckbox.click();
    }

    // 步骤5：点击登录按钮
    let loginBtn = await driver.findComponent(By.id('btn_login'));
    await loginBtn.click();

    // 步骤6：验证登录成功
    await driver.waitForComponent(By.text('登录成功'), 5000);

    // 截图记录
    await driver.screenCap('/data/test/login_success.png');

    let welcomeText = await driver.findComponent(By.text('欢迎回来'));
    expect(await welcomeText.isVisible()).assertTrue();
  });
});
```

### 列表操作测试

```typescript
import { Driver, By } from '@ohos.UiTest';
import { describe, beforeAll, it, expect } from '@ohos/hypium';

describe('ListOperationTest', () => {
  let driver: Driver;

  beforeAll(async () => {
    driver = Driver.create();
  });

  it('scroll_and_select_item', async () => {
    // 进入列表页
    let listMenuItem = await driver.findComponent(By.text('商品列表'));
    await listMenuItem.click();

    await driver.waitForComponent(By.type('List'), 3000);
    let list = await driver.findComponent(By.type('List'));

    // 滚动到底部
    await list.scrollForward();
    await driver.delayMs(500);
    await list.scrollForward();

    // 查找特定商品
    let targetItem = await driver.findComponent(By.textContains('华为'));
    await targetItem.click();

    // 验证进入详情
    await driver.waitForComponent(By.id('product_detail'), 3000);
  });

  it('search_in_list', async () => {
    // 打开搜索
    let searchButton = await driver.findComponent(By.id('btn_search'));
    await searchButton.click();

    // 输入搜索词
    let searchInput = await driver.findComponent(By.type('TextInput'));
    await searchInput.inputText('手机');

    // 点击搜索
    await driver.pressEnter();

    // 验证搜索结果
    await driver.waitForComponent(By.type('List'), 3000);
    let resultCount = await driver.findComponents(By.type('ListItem'));
    expect(resultCount.length).assertLarger(0);
  });
});
```

### 表单验证测试

```typescript
import { Driver, By } from '@ohos.UiTest';
import { describe, beforeAll, it, expect } from '@ohos/hypium';

describe('FormValidationTest', () => {
  let driver: Driver;

  beforeAll(async () => {
    driver = Driver.create();
  });

  it('phone_number_validation', async () => {
    let phoneInput = await driver.findComponent(By.id('et_phone'));

    // 测试无效号码
    let invalidNumbers = ['123', '1234567890', 'abcdefghijk'];

    for (let num of invalidNumbers) {
      await phoneInput.clearText();
      await phoneInput.inputText(num);

      // 失去焦点触发验证
      await driver.click(10, 10);

      // 验证错误提示
      let errorText = await driver.findComponent(By.textContains('请输入正确的手机号'));
      expect(await errorText.isVisible()).assertTrue();
    }
  });

  it('email_validation', async () => {
    let emailInput = await driver.findComponent(By.id('et_email'));

    // 测试有效邮箱
    await emailInput.inputText('test@example.com');
    await driver.click(10, 10);

    // 验证无错误
    let existing = await driver.findComponent(By.textContains('邮箱格式错误')).catch(() => null);
    expect(existing === null).assertTrue();
  });
});
```

## Driver常用方法

| 方法 | 说明 |
|------|------|
| create() | 创建Driver实例 |
| findComponent(by) | 查找单个组件 |
| findComponents(by) | 查找多个组件 |
| waitForComponent(by, timeout) | 等待组件出现 |
| click(x, y) | 点击坐标 |
| swipe(...) | 滑动操作 |
| screenCap(path) | 截图 |
| delayMs(ms) | 延迟等待 |
| pressBack() | 按返回键 |
| pressHome() | 按Home键 |
| getDisplaySize() | 获取屏幕尺寸 |

## Component常用方法

| 方法 | 说明 |
|------|------|
| click() | 点击 |
| longClick() | 长按 |
| doubleClick() | 双击 |
| inputText(text) | 输入文本 |
| clearText() | 清除文本 |
| getText() | 获取文本 |
| getId() | 获取ID |
| getType() | 获取类型 |
| isEnabled() | 是否可用 |
| isVisible() | 是否可见 |
| isChecked() | 是否选中 |
| scrollToTop() | 滚动到顶部 |
| scrollToBottom() | 滚动到底部 |

## 测试配置

在 `entry/src/main/module.json5` 中配置：

```json
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ts",
        "description": "$string:EntryAbility_desc",
        "icon": "$media:icon",
        "label": "$string:EntryAbility_label",
        "exported": true
      }
    ]
  }
}
```

## 运行测试

```bash
# 运行所有测试
hdc shell aa test -b com.example.myapp -m entry_test -s unittest OpenHarmonyTestRunner

# 运行特定测试套件
hdc shell aa test -b com.example.myapp -m entry_test -s class LoginTest
```

## 最佳实践

1. **使用显式等待代替固定延迟**：
```typescript
// 推荐
await driver.waitForComponent(By.text('完成'), 5000);

// 不推荐
await driver.delayMs(3000);
```

2. **测试前确保初始状态**：
```typescript
beforeEach(async () => {
  // 返回首页
  await driver.pressBack();
  await driver.pressBack();
  await driver.waitForComponent(By.id('main_page'), 3000);
});
```

3. **截图记录关键步骤**：
```typescript
await driver.screenCap(`/data/test/step_${stepName}.png`);
```

## 注意事项

1. 测试需要在测试模块中运行
2. 组件查找可能因UI变化而失败
3. 使用有意义的ID便于测试查找
4. 测试用例应独立，不依赖执行顺序