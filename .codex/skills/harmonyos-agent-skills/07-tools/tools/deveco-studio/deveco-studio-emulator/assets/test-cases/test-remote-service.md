# 模拟器远程管理服务测试用例集合

本文档包含模拟器远程管理服务（emulator-rpc-service）的所有测试用例，每个用例包含命令输入和期望的执行结果。

---

## 一、会话管理测试

### 1.1 创建会话测试

#### 用例1：创建认证模式会话
**场景描述**：测试使用 TLS + Token 认证创建会话

**命令输入**：
```bash
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 -token mytoken123 -pem_root_certs /path/root.pem -pem_private_key /path/client.key -pem_cert_chain /path/client.pem
```

**期望结果**：
- 会话创建成功
- 命令执行成功，无错误信息
- 会话可用于后续远程操作

---

#### 用例2：创建无认证模式会话
**场景描述**：测试使用无认证模式创建会话

**命令输入**：
```bash
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 --no-auth
```

**期望结果**：
- 会话创建成功
- 命令执行成功，无错误信息
- 无需提供 TLS 证书和 Token

---

#### 用例3：缺少必选参数（错误用例）
**场景描述**：测试缺少必选参数时的错误处理

**命令输入**：
```bash
emulator-rpc-service -session MySession -ip 192.168.1.100
```

**期望结果**：
- 命令执行失败
- 返回错误信息提示缺少端口参数
- 会话未创建

---

### 1.2 删除会话测试

#### 用例4：删除会话
**场景描述**：测试删除已创建的会话

**命令输入**：
```bash
emulator-rpc-service -session MySession -delete
```

**期望结果**：
- 会话删除成功
- 命令执行成功，无错误信息
- 该会话不再可用

---

#### 用例5：删除不存在的会话（错误用例）
**场景描述**：测试删除不存在的会话

**命令输入**：
```bash
emulator-rpc-service -session NonExistentSession -delete
```

**期望结果**：
- 命令执行失败
- 返回错误信息提示会话不存在

---

### 1.3 查看会话列表测试

#### 用例6：查看会话列表
**场景描述**：测试查看所有会话

**命令输入**：
```bash
emulator-rpc-service -list
```

**期望结果**：
- 列出所有已创建的会话
- 命令执行成功，无错误信息

---

#### 用例7：查看会话列表及详细信息
**场景描述**：测试查看会话列表及详细信息

**命令输入**：
```bash
emulator-rpc-service -list -details
```

**期望结果**：
- 列出所有会话及其详细信息
- 包含关联的模拟器实例信息
- 命令执行成功，无错误信息

---

## 二、远程操作模拟器测试

### 2.1 启动模拟器测试

#### 用例 8：远程启动模拟器
**场景描述**：测试通过远程会话启动模拟器

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-start 'MyPhone'"
```

**期望结果**：
- 模拟器启动成功
- 命令执行成功，无错误信息
- 模拟器进入运行状态

---

#### 用例 9：远程启动无窗口模拟器
**场景描述**：测试通过远程会话启动无窗口模拟器

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-start 'MyPhone' -noWindow"
```

**期望结果**：
- 模拟器以无窗口模式启动成功
- 命令执行成功，无错误信息
- 模拟器在后台运行

---

### 2.2 关闭模拟器测试

#### 用例 10：远程关闭模拟器
**场景描述**：测试通过远程会话关闭模拟器

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-stop 'MyPhone'"
```

**期望结果**：
- 模拟器关闭成功
- 命令执行成功，无错误信息
- 模拟器停止运行

---

#### 用例 11：关闭不存在的模拟器（错误用例）
**场景描述**：测试关闭不存在的模拟器

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-stop 'NonExistentPhone'"
```

**期望结果**：
- 命令执行失败
- 返回错误信息提示模拟器实例不存在

---

### 2.3 远程截屏测试

#### 用例 12：远程截屏并保存到指定路径
**场景描述**：测试远程截屏并保存到本地指定路径

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot -out 'D:\screenshots\screenshot.png'"
```

**期望结果**：
- 截图成功保存到本地指定路径
- 文件存在且为有效图片格式
- 命令执行成功，无错误信息

---

#### 用例 13：远程截屏并保存到默认路径
**场景描述**：测试远程截屏并保存到默认路径

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot"
```

**期望结果**：
- 截图成功保存到默认路径
- 文件存在且为有效图片格式
- 命令执行成功，无错误信息

---

### 2.4 远程场景化命令测试

#### 用例 14：远程旋转设备
**场景描述**：测试通过远程会话旋转设备

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -rotation left"
```

**期望结果**：
- 设备成功旋转到左屏
- 命令执行成功，无错误信息

---

#### 用例 15：远程电源控制
**场景描述**：测试通过远程会话控制屏幕电源

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -power"
```

**期望结果**：
- 屏幕电源状态切换（关闭->开启 或 开启->关闭）
- 命令执行成功，无错误信息

---

#### 用例 16：远程音量控制
**场景描述**：测试通过远程会话调节音量

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -volume up"
```

**期望结果**：
- 音量成功增加一级
- 命令执行成功，无错误信息

---

#### 用例 17：远程摇一摇
**场景描述**：测试通过远程会话触发摇一摇

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -shake"
```

**期望结果**：
- 设备触发摇一摇动作
- 命令执行成功，无错误信息

---

#### 用例 18：远程三折叠设备控制
**场景描述**：测试通过远程会话控制三折叠设备

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState triple"
```

**期望结果**：
- 三折叠设备设置为三屏模式
- 命令执行成功，无错误信息

---

#### 用例 19：远程双折叠设备控制
**场景描述**：测试通过远程会话控制双折叠设备

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyFold' -foldedState open"
```

**期望结果**：
- 双折叠设备展开
- 命令执行成功，无错误信息

---

#### 用例 20：远程折叠 PC 控制
**场景描述**：测试通过远程会话控制折叠 PC

**命令输入**：
```bash
emulator-rpc-service -session MySession shell "-instance 'MyFoldPC' -foldedState open"
```

**期望结果**：
- 折叠 PC 横展（完全展开）
- 命令执行成功，无错误信息

---

## 三、Server 模式测试

### 3.1 启动 Server 测试

#### 用例21：启动认证模式 Server
**场景描述**：测试启动 TLS 认证模式的远程管理服务端

**命令输入**：
```bash
emulator-rpc-service -server -port 8555 -pem_root_certs /path/root.pem -pem_private_key /path/server.key -pem_cert_chain /path/server.pem
```

**期望结果**：
- Server 启动成功
- 监听指定端口
- 支持 TLS 加密连接

---

#### 用例22：启动无认证模式 Server
**场景描述**：测试启动无认证模式的远程管理服务端

**命令输入**：
```bash
emulator-rpc-service -server -port 8555 --no-auth
```

**期望结果**：
- Server 启动成功
- 监听指定端口
- 无需 TLS 证书即可连接

---

#### 用例23：启动 Server 不指定端口
**场景描述**：测试启动 Server 使用默认端口

**命令输入**：
```bash
emulator-rpc-service -server --no-auth
```

**期望结果**：
- Server 启动成功
- 使用默认端口监听
- 命令执行成功，无错误信息

---

## 四、帮助测试

#### 用例24：获取帮助信息
**场景描述**：测试获取帮助信息

**命令输入**：
```bash
emulator-rpc-service -h
```

**期望结果**：
- 显示帮助信息
- 包含所有可用命令和参数说明
- 命令执行成功

---

## 五、综合场景测试

### 5.1 完整远程管理流程

#### 用例 25：创建会话并远程操作模拟器
**场景描述**：测试完整的远程管理流程

**命令序列**：
```bash
# 1. 创建会话
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 --no-auth

# 2. 启动模拟器
emulator-rpc-service -session MySession shell "-start 'MyPhone'"

# 3. 旋转设备
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -rotation left"

# 4. 截屏
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot -out 'D:\screenshots\remote.png'"

# 5. 关闭模拟器
emulator-rpc-service -session MySession shell "-stop 'MyPhone'"

# 6. 删除会话
emulator-rpc-service -session MySession -delete
```

**期望结果**：
- 所有命令按顺序执行成功
- 会话创建、操作、删除流程完整
- 无错误信息

---

### 5.2 Server-Client 完整流程

#### 用例 26：Server 模式完整流程
**场景描述**：测试 Server 启动后客户端连接操作

**命令序列**：
```bash
# 1. 启动 Server（无认证模式）
emulator-rpc-service -server -port 8555 --no-auth

# 2. 客户端创建会话连接 Server
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 --no-auth

# 3. 远程操作模拟器
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -shake"

# 4. 查看会话列表
emulator-rpc-service -list -details

# 5. 删除会话
emulator-rpc-service -session MySession -delete
```

**期望结果**：
- Server 启动成功并监听
- 客户端成功连接并创建会话
- 远程命令执行成功
- 会话管理正常

---

## 六、边界和错误测试

### 6.1 参数错误测试

#### 用例 27：shell 命令格式错误（错误用例）
**场景描述**：测试 shell 命令格式错误

**命令输入**：
```bash
emulator-rpc-service -session MySession shell -start MyPhone
```

**期望结果**：
- 命令执行失败
- 返回错误信息提示命令格式错误
- shell 后的命令需要用引号包裹

---

#### 用例 28：未创建会话直接执行命令（错误用例）
**场景描述**：测试未创建会话直接执行远程命令

**命令输入**：
```bash
emulator-rpc-service -session NonExistentSession shell "-start 'MyPhone'"
```

**期望结果**：
- 命令执行失败
- 返回错误信息提示会话不存在
- 需要先创建会话

---

## 注意事项

1. **路径要求**：
   - `emulator-rpc-service` 位于 `emulator.exe` 相同目录下
   - 使用前需确保已通过 `setup.js` 配置好 DevEco Studio 路径

2. **认证模式**：
   - 认证模式需要提供完整的 TLS 证书链和 Token
   - 无认证模式使用 `--no-auth` 标志
   - 测试环境建议使用无认证模式

3. **会话管理**：
   - 创建会话后才能执行远程命令
   - 会话名称用于标识不同的远程连接
   - 使用完毕后应删除会话

4. **命令格式**：
   - `-session shell` 后的命令需要用引号包裹
   - 场景化命令与本地 `emulator` 命令参数一致
   - 截屏命令的 `-out` 参数用于指定本地保存路径
   - **实例名（hvd）和路径包含空格时，必须使用单引号包裹**，如：`'My Phone'`、`'D:\my screenshots\screen shot.png'`

5. **Server 模式**：
   - Server 模式用于启动远程管理服务端
   - 客户端通过创建会话连接到 Server
   - `-port` 为可选参数

---

## 相关工具

- **emulator-rpc-service**：模拟器远程管理服务
- **emulator 命令**：本地模拟器管理命令
- **scene-commands.md**：场景化设备控制命令完整参考
