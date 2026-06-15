# 测试提示词

本文档包含验证 deveco-studio-emulator skill 功能的测试提示词。

---

## 一、基础功能测试

### 测试场景 1：首次启动模拟器

**提示词**：
```
打开模拟器
```

**预期输出**：
- 检查 scripts/config.json 是否存在
- 如果不存在，运行 node scripts/setup.js --force
- 列出可用的模拟器实例（使用 emulator -list -details）
- 识别 Beta 版本和 Release 版本
- 优先选择 Release 版本实例启动
- 使用批处理文件方式启动模拟器（Windows）
- 等待 30-60 秒后检查设备连接状态（hdc list targets）
- 报告模拟器启动结果（包含设备地址如 127.0.0.1:5555）

---

### 测试场景 2：启动指定模拟器实例

**提示词**：
```
启动 MyPhone 模拟器
```

**预期输出**：
- 读取 scripts/config.json 获取路径
- 检查实例是否存在（emulator -list）
- 检查实例版本是否为 Release（非 Beta）
- 如果是 Beta 版本，提示用户通过 DevEco Studio 界面启动
- 如果是 Release 版本，使用批处理方式启动
- 启动后成功连接设备

---

### 测试场景 3：推包安装应用

**提示词**：
```
帮我推包安装 C:\build\outputs\default\myapp-default-signed.hap
```

**预期输出**：
- 检查模拟器是否已连接（hdc list targets）
- 如果未连接，提示启动模拟器
- 检查 hap 文件是否存在
- 执行 hdc install 命令安装应用
- 等待安装完成
- 验证安装结果（hdc shell bm dump -a）
- 报告安装成功并显示 bundleName

---

### 测试场景 4：启动已安装的应用

**提示词**：
```
启动 myapp 应用
```

**预期输出**：
- 查询已安装应用列表（hdc shell bm dump -a）
- 匹配应用名称获取 bundleName
- 识别应用的 Ability 名称（通常是 EntryAbility）
- 执行 hdc shell aa start -a {abilityName} -b {bundleName}
- 等待应用启动
- 验证应用运行状态（hdc shell aa dump -a）
- 获取进程 ID

---

### 测试场景 5：推包并启动应用

**提示词**：
```
帮我推包并打开应用，hap包在 D:\project\build\app.hap
```

**预期输出**：
- 步骤1：检查模拟器连接状态
- 步骤2：安装应用（hdc install）
- 步骤3：验证安装成功
- 步骤4：启动应用（hdc shell aa start）
- 步骤5：验证应用运行状态
- 步骤6：获取进程 ID
- 总结：报告应用已成功启动运行，提供 bundleName 和进程 ID

---

## 二、边界条件测试

### 测试场景 6：Beta版本模拟器启动

**提示词**：
```
启动 Mate 80 Pro 模拟器（这是Beta版本）
```

**预期输出**：
- 正确识别 Beta 版本（osVersion 包含 "Beta"）
- 提示 Beta 版本镜像无法通过命令行启动
- 建议用户通过 DevEco Studio 界面启动
- 或者建议选择其他 Release 版本实例

---

### 测试场景 7：覆盖安装应用

**提示词**：
```
重新推包安装，覆盖旧版本
```

**预期输出**：
- 查询已安装应用确认存在
- 使用 hdc install -r 进行覆盖安装
- 验证安装结果
- 启动应用验证功能

---

### 测试场景 8：卸载应用

**提示词**：
```
卸载 myapp
```

**预期输出**：
- 查询已安装应用获取 bundleName
- 先停止应用（hdc shell aa force-stop）
- 执行卸载（hdc uninstall）
- 验证卸载结果

---

## 三、错误处理测试

### 测试场景 9：许可证未接受

**提示词**：
```
模拟器启动失败，提示许可证问题
```

**预期输出**：
- 识别许可证问题
- 执行 emulator -license accept
- 重新尝试启动模拟器
- 验证启动结果

---

### 测试场景 10：hdc无法连接设备

**提示词**：
```
模拟器启动了但 hdc 连不上
```

**预期输出**：
- 检查等待时间是否足够（模拟器启动需要30-60秒）
- 执行 hdc kill && hdc start 重启服务
- 重新检查 hdc list targets
- 如果仍失败，检查模拟器进程状态
- 提供具体解决方案

---

### 测试场景 11：安装失败-签名问题

**提示词**：
```
推包失败，提示签名问题
```

**预期输出**：
- 识别签名错误类型
- 检查 hap 是否已签名
- 建议使用 DevEco Studio 重新签名
- 或使用 hap-sign-tool 进行签名
- 提供签名命令示例

---

### 测试场景 12：找不到DevEco Studio路径

**提示词**：
```
找不到 DevEco Studio 安装路径
```

**预期输出**：
- 使用 setup.js 自动查找：node scripts/setup.js
- 或手动设置环境变量
- 或检查常见安装位置
- 提供具体的配置方法

---

## 四、场景化设备控制测试

### 测试场景 13：旋转屏幕

**提示词**：
```
将模拟器屏幕旋转到右边
```

**预期输出**：
- 使用 -rotation right 命令
- 添加 -instance 参数指定模拟器实例名
- 执行成功后确认屏幕方向变化

---

### 测试场景 14：截取屏幕

**提示词**：
```
截取模拟器屏幕截图
```

**预期输出**：
- 使用 -screenshot 命令
- 添加 -instance 参数指定模拟器实例名
- 截图保存到指定路径
- 报告截图保存位置

---

### 测试场景 15：触发摇一摇

**提示词**：
```
触发模拟器的摇一摇传感器
```

**预期输出**：
- 使用 -shake 命令
- 添加 -instance 参数指定模拟器实例名
- 确认传感器触发成功


### 测试场景 16：增加音量

**提示词**：
```
增加模拟器音量
```

**预期输出**：
- 使用 -volume up 命令
- 添加 -instance 参数指定模拟器实例名
- 音量增加一级
- 确认音量状态更新

---

### 测试场景 17：关闭屏幕电源

**提示词**：
```
关闭模拟器屏幕电源
```

**预期输出**：
- 使用 -power 命令
- 添加 -instance 参数指定模拟器实例名
- 屏幕电源关闭
- 确认电源状态更新

---

### 测试场景 18：创建远程管理会话

**提示词**：
```
创建一个远程管理会话，连接到 192.168.1.100:8555，使用无认证模式
```

**预期输出**：
- 使用 emulator-rpc-service 命令
- 使用 -session 参数指定会话名称
- 使用 -ip 和 -port 参数指定远程地址
- 使用 --no-auth 标志
- 确认会话创建成功

---

### 测试场景 19：通过远程会话启动模拟器

**提示词**：
```
通过远程会话启动 MyPhone 模拟器
```

**预期输出**：
- 使用 emulator-rpc-service -session shell 命令
- 执行 -start 'MyPhone' 命令
- 确认模拟器启动成功
- 实例名使用单引号包裹

---

### 测试场景 20：通过远程会话关闭模拟器

**提示词**：
```
通过远程会话关闭 MyPhone 模拟器
```

**预期输出**：
- 使用 emulator-rpc-service -session shell 命令
- 执行 -stop 'MyPhone' 命令
- 确认模拟器关闭成功
- 实例名使用单引号包裹

---

### 测试场景 21：远程截屏

**提示词**：
```
通过远程会话截取 MyPhone 模拟器屏幕并保存到本地
```

**预期输出**：
- 使用 emulator-rpc-service -session shell 命令
- 执行 -instance 'MyPhone' -screenshot -out 命令
- 截图保存到本地指定路径
- 实例名和路径使用单引号包裹
- 确认截图成功

---

### 测试场景 22：远程摇一摇

**提示词**：
```
通过远程会话触发 MyPhone 模拟器摇一摇
```

**预期输出**：
- 使用 emulator-rpc-service -session shell 命令
- 执行 -instance 'MyPhone' -shake 命令
- 确认摇一摇触发成功
- 实例名使用单引号包裹

---

### 测试场景 23：删除远程会话

**提示词**：
```
删除远程管理会话
```

**预期输出**：
- 使用 emulator-rpc-service -session -delete 命令
- 确认会话删除成功

---

### 测试场景 24：启动远程管理 Server

**提示词**：
```
启动远程管理服务端，监听 8555 端口，使用无认证模式
```

**预期输出**：
- 使用 emulator-rpc-service -server 命令
- 使用 -port 参数指定端口
- 使用 --no-auth 标志
- 确认 Server 启动成功

---

### 测试场景 25：查看远程会话列表

**提示词**：
```
查看远程管理会话列表及详细信息
```

**预期输出**：
- 使用 emulator-rpc-service -list -details 命令
- 列出所有会话及关联的模拟器实例
- 确认列表显示正确

---