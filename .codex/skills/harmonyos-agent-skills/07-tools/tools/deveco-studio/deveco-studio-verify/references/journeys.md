# Journey（旅程）测试框架

Journey 是一种 XML 格式的 HarmonyOS 应用行为测试框架。它通过定义一系列 `<action>` 元素来测试应用的实际行为。

---

## Journey 结构

### 基本格式

```xml
<journey name="登录流程测试">
   <description>
      测试用户从登录到进入主页的完整流程
   </description>
   <actions>
     <action>
       启动应用并等待首页加载完成
     </action>
     <action>
       点击"登录"按钮
     </action>
     <action>
       在用户名输入框输入 "testuser"
     </action>
     <action>
       在密码输入框输入 "password123"
     </action>
     <action>
       点击"提交"按钮
     </action>
     <action>
       验证应用已进入主页，显示用户头像
     </action>
   </actions>
</journey>
```

---

## 执行规则

### 顺序执行

Journey 按 `<actions>` 列表的顺序逐步执行。每个 `<action>` 必须成功才能继续下一个。

**Journey 成功条件**：所有 `<action>` 元素都成功执行。

**Journey 失败条件**：
- 任何 `<action>` 无法执行
- 应用崩溃、冻结或意外退出
- 验证期望不满足

---

## Action 类型

### 1. 执行动作（Interaction Actions）

指定要执行的 UI 交互操作。

**示例**：
```xml
<action>点击"登录"按钮</action>
<action>在搜索框输入 "HarmonyOS"</action>
<action>向下滑动列表</action>
<action>点击第一个搜索结果</action>
```

**执行要求**：
- 必须严格按照 `<action>` 文本执行
- 不依赖其他步骤的上下文
- 如果操作无法执行，Journey 失败

**复合动作拆分**：
如果 `<action>` 包含多个操作，拆分为子动作：

```xml
<action>搜索商品并添加到购物车</action>
```

拆分为：
```xml
<action>在搜索框输入商品名称</action>
<action>点击搜索按钮</action>
<action>点击第一个商品</action>
<action>点击"添加到购物车"按钮</action>
```

---

### 2. 验证期望（Verification Actions）

以 "验证"、"检查" 开头的 `<action>`，用于验证当前应用状态。

**示例**：
```xml
<action>验证应用在首页，底部显示导航栏</action>
<action>检查用户头像是否显示在右上角</action>
<action>验证购物车数量为 3</action>
```

**验证要求**：
- 不执行任何 UI 交互
- 只检查当前屏幕状态
- 如果期望不满足，Journey 失败

**多期望验证**：
单个 `<action>` 可包含多个验证点，**全部满足才算成功**：

```xml
<action>验证应用在首页，"首页"图标高亮，商品列表可见</action>
```

必须同时满足：
- 应用在首页 ✅
- "首页"图标高亮 ✅
- 商品列表可见 ✅

---

## 执行流程

### Phase 1: 准备环境

```bash
# 1. 启动设备/模拟器
hdc list targets
emulator -hvd "Pura 90" -path ~/Huawei/emulator/deployed -imageRoot ~/Library/Huawei/Sdk

# 2. 安装应用
hdc -t <device_id> install -r <hap_path>

# 3. 启动应用
hdc -t <device_id> shell aa start -a <ability_name> -b <bundle_name>
```

---

### Phase 2: 逐 Action 执行

对每个 `<action>`：

#### 执行动作类
```bash
# 1. 获取 UI 元素树
hdc -t <device_id> shell hidumper -s WindowManagerService -a "-w <window_id> -inspector"

# 2. 定位目标元素（根据文本、坐标、类型）

# 3. 执行操作
# 点击
hdc -t <device_id> shell uitest uiInput click <x> <y>

# 输入
hdc -t <device_id> shell uitest uiInput inputText <x> <y> <text>

# 滑动
hdc -t <device_id> shell uitest uiInput swipe <fromX> <fromY> <toX> <toY>

# 4. 截图记录
hdc -t <device_id> shell snapshot_display -f /data/local/tmp/action_<step>.jpeg
hdc -t <device_id> file recv /data/local/tmp/action_<step>.jpeg ./screenshots/
```

#### 验证期望类
```bash
# 1. 获取当前 UI 状态（不交互）
hdc -t <device_id> shell hidumper -s WindowManagerService -a "-w <window_id> -inspector"

# 2. 截图当前状态
hdc -t <device_id> shell snapshot_display -f /data/local/tmp/verify_<step>.jpeg
hdc -t <device_id> file recv /data/local/tmp/verify_<step>.jpeg ./screenshots/

# 3. 检查期望是否满足（解析 UI 元素或视觉检查）
```

---

### Phase 3: 失败处理

**如果 `<action>` 失败**：
- Journey 立即停止
- 记录失败原因
- 不继续后续步骤
- 输出 JSON 结果报告

**失败原因类型**：
1. **元素不存在**：目标 UI 元素未找到
2. **无法执行操作**：操作无法完成（如元素不可点击）
3. **期望不满足**：验证期望失败
4. **应用崩溃**：应用异常退出
5. **超时**：操作或加载超时

---

### Phase 4: 生成报告

每个 Journey 执行完成后，输出 JSON 格式的结果报告：

```json
{
  "journey": "登录流程测试",
  "device": "Pura 90",
  "device_id": "emulator-123",
  "bundle_name": "com.example.myapp",
  "timestamp": "2026-05-07T14:30:00Z",
  "status": "FAILED",
  "results": [
    {
      "step": 1,
      "action": "启动应用并等待首页加载完成",
      "status": "PASSED",
      "commands": [
        "hdc -t emulator-123 shell aa start -a EntryAbility -b com.example.myapp"
      ],
      "screenshot": "./screenshots/action_1.jpeg",
      "comment": "应用成功启动，首页在 2.5s 内加载完成"
    },
    {
      "step": 2,
      "action": "点击\"登录\"按钮",
      "status": "PASSED",
      "commands": [
        "hdc -t emulator-123 shell uitest uiInput click 540 1200"
      ],
      "screenshot": "./screenshots/action_2.jpeg",
      "comment": "登录按钮在首页右上角，点击成功"
    },
    {
      "step": 3,
      "action": "在用户名输入框输入 \"testuser\"",
      "status": "PASSED",
      "commands": [
        "hdc -t emulator-123 shell uitest uiInput click 270 800",
        "hdc -t emulator-123 shell uitest uiInput inputText 270 800 testuser"
      ],
      "screenshot": "./screenshots/action_3.jpeg",
      "comment": "输入框已聚焦，文本成功输入"
    },
    {
      "step": 4,
      "action": "在密码输入框输入 \"password123\"",
      "status": "FAILED",
      "commands": [],
      "screenshot": "./screenshots/verify_4.jpeg",
      "comment": "密码输入框未找到，登录页面显示错误：\"用户名不能为空\""
    }
  ],
  "summary": {
    "total_steps": 6,
    "passed": 3,
    "failed": 1,
    "skipped": 2,
    "success_rate": "50%",
    "failure_reason": "密码输入框未显示，可能原因：用户名验证失败导致页面状态异常",
    "recommendation": "检查用户名输入验证逻辑，确保输入框值正确传递"
  }
}
```

---

## Journey 文件存储

**存储位置**：`.journeys/<journey_name>.xml`

**示例目录结构**：
```
.journeys/
├── login-flow.xml          # 登录流程测试
├── shopping-cart.xml       # 购物车测试
├── search-products.xml     # 搜索商品测试
└── user-settings.xml       # 用户设置测试
```

---

## Journey 最佳实践

### 1. 清晰的动作描述

**好的示例** ✅：
```xml
<action>点击屏幕中心位置的"提交"按钮</action>
<action>在顶部搜索框输入 "HarmonyOS"</action>
<action>验证页面标题为"用户设置"</action>
```

**不好的示例** ❌：
```xml
<action>点击按钮</action>  <!-- 模糊，哪个按钮？ -->
<action>输入文字</action>  <!-- 在哪里输入？输入什么？ -->
<action>验证正确</action>  <!-- 验证什么？什么是正确？ -->
```

---

### 2. 合理的步骤划分

**原则**：
- 每个 `<action>` 是一个独立的操作或验证
- 避免过于复杂的复合动作
- 关键步骤后添加验证

**示例**：
```xml
<!-- 好的划分 -->
<action>点击"搜索"按钮</action>
<action>验证搜索框已显示</action>
<action>输入搜索关键词</action>
<action>点击搜索图标</action>
<action>验证搜索结果列表已显示</action>
```

---

### 3. 多设备 Journey

支持在不同设备类型上运行同一 Journey：

```xml
<journey name="布局适配测试" devices="phone,fold,tablet">
   <description>
      测试应用在不同设备类型上的布局表现
   </description>
   <actions>
     <action>启动应用</action>
     <action>验证首页布局正确（手机：单列，折叠：双列，平板：三列）</action>
     <action>点击商品项</action>
     <action>验证详情页适配（手机：全屏，平板：左右分栏）</action>
   </actions>
</journey>
```

---

### 4. 错误提示和建议

**在失败时提供有用信息**：
- 失败原因（具体描述）
- 当前屏幕状态
- 可能的修复建议
- 是否需要截图或日志辅助

---

## 执行 Journey 示例

### 完整执行脚本

```bash
#!/bin/bash
# scripts/run-journey.sh

JOURNEY_FILE=$1
DEVICE_ID=$2

# 解析 journey XML
journey_name=$(grep '<journey name=' $JOURNEY_FILE | sed 's/.*name="\([^"]*\)".*/\1/')

echo "=== Journey: $journey_name ==="
echo "=== Device: $DEVICE_ID ==="

# 读取 actions
actions=$(grep '<action>' $JOURNEY_FILE | sed 's/<action>\(.*\)<\/action>/\1/')

step=0
passed=0
failed=0

# 逐步执行
for action in $actions; do
  step=$((step + 1))
  echo "Step $step: $action"
  
  # 执行操作或验证
  # ...（根据 action 类型调用 hdc 命令）
  
  # 截图
  hdc -t $DEVICE_ID shell snapshot_display -f /data/local/tmp/step_$step.jpeg
  hdc -t $DEVICE_ID file recv /data/local/tmp/step_$step.jpeg ./screenshots/
  
  # 检查结果
  # 如果失败，停止并记录
  
  echo "  Status: PASSED"
  passed=$((passed + 1))
done

echo "=== Summary ==="
echo "Passed: $passed/$step"
```

---

## Journey 示例库

### 示例 1: 登录流程

```xml
<journey name="用户登录测试">
   <description>测试完整的用户登录流程</description>
   <actions>
     <action>启动应用</action>
     <action>验证应用显示首页</action>
     <action>点击右上角"登录"按钮</action>
     <action>验证登录页面已打开</action>
     <action>在用户名输入框输入 "testuser"</action>
     <action>在密码输入框输入 "Test@123"</action>
     <action>点击"登录"按钮</action>
     <action>验证应用返回首页，用户头像显示在右上角</action>
     <action>验证用户名显示为 "testuser"</action>
   </actions>
</journey>
```

---

### 示例 2: 购物流程

```xml
<journey name="添加商品到购物车">
   <description>测试搜索商品并添加到购物车</description>
   <actions>
     <action>启动应用</action>
     <action>点击底部导航栏的"商品"图标</action>
     <action>验证商品列表页已显示</action>
     <action>点击顶部搜索框</action>
     <action>输入 "手机"</action>
     <action>点击搜索按钮</action>
     <action>验证搜索结果列表显示至少 3 个商品</action>
     <action>点击第一个商品</action>
     <action>验证商品详情页已打开</action>
     <action>点击"加入购物车"按钮</action>
     <action>验证购物车图标数量增加 1</action>
     <action>点击购物车图标</action>
     <action>验证刚添加的商品在购物车列表中</action>
   </actions>
</journey>
```

---

### 示例 3: 折叠屏适配测试

```xml
<journey name="折叠屏布局测试" devices="fold,widefold">
   <description>测试应用在折叠/展开状态下的布局适配</description>
   <actions>
     <action>启动应用（折叠状态）</action>
     <action>验证应用显示单列布局</action>
     <action>截图记录折叠状态布局</action>
     <action>展开设备</action>
     <action>等待布局重排完成（2秒）</action>
     <action>验证应用显示双列布局</action>
     <action>截图记录展开状态布局</action>
     <action>点击左侧列的商品项</action>
     <action>验证商品详情在右侧列显示</action>
     <action>折叠设备</action>
     <action>验证应用返回单列布局，详情页保持显示</action>
   </actions>
</journey>
```

---

## Journey 与 UserStory 对比

| 特性 | Journey | UserStory |
|------|---------|-----------|
| **格式** | XML 结构化 | Markdown 文本 |
| **粒度** | 单步操作 | 功能场景 |
| **自动化程度** | 高（可完全自动化） | 中（需人工判断） |
| **断言能力** | 强（精确验证） | 弱（依赖人工） |
| **适用场景** | 详细功能测试 | 整体业务流程 |
| **输出格式** | JSON 结果报告 | Markdown 报告 |

**建议**：
- **Journey**：用于可重复的自动化测试（回归测试、CI/CD）
- **UserStory**：用于人工验证的业务场景（验收测试、探索测试）

---

## 参考

- [verification-workflow.md](verification-workflow.md) - 完整验证流程
- [hdc-operations.md](hdc-operations.md) - hdc 命令参考
- [device-matrix.md](device-matrix.md) - 设备类型和验证项