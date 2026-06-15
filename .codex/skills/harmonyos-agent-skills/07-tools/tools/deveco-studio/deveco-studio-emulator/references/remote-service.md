# 模拟器远程管理服务参考

## emulator-rpc-service 远程管理服务

`emulator-rpc-service` 是模拟器远程管理服务，支持 TLS 加密、Token 认证和会话管理功能。

用法：`emulator-rpc-service <command> [args...]`

---

## 基础参数

### 通用参数

| 参数 | 说明 |
|------|------|
| `-session <session_name>` | 会话名称 |
| `-ip <ip>` | 远程服务 IP 地址 |
| `-port <port>` | 远程服务端口 |
| `-token <token>` | 认证 Token |
| `-pem_root_certs <path>` | 根证书路径（PEM 格式） |
| `-pem_private_key <path>` | 客户端私钥路径（PEM 格式） |
| `-pem_cert_chain <path>` | 客户端证书链路径（PEM 格式） |
| `--no-auth` | 使用无认证模式 |

---

## 一、会话管理

### 1.1 创建会话

```bash
# 认证模式（TLS + Token）
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 -token mytoken123 -pem_root_certs /path/root.pem -pem_private_key /path/client.key -pem_cert_chain /path/client.pem

# 无认证模式
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 --no-auth
```

**参数说明**：
- `-session`：会话名称（必选）
- `-ip`：远程服务 IP 地址（必选）
- `-port`：远程服务端口（必选）
- 认证模式下必选：`-token`、`-pem_root_certs`、`-pem_private_key`、`-pem_cert_chain`
- 无认证模式：使用 `--no-auth` 标志，无需提供认证相关参数

---

### 1.2 删除会话

```bash
emulator-rpc-service -session MySession -delete
```

---

### 1.3 查看会话列表

```bash
# 列出所有会话
emulator-rpc-service -list

# 列出所有会话及详细信息（包含模拟器实例）
emulator-rpc-service -list -details
```

---

## 二、使用会话操作模拟器

通过 `-session shell` 执行远程命令操作模拟器：

```bash
emulator-rpc-service -session MySession shell "<cmd>"
```

### 2.1 启动模拟器

```bash
# 启动模拟器
emulator-rpc-service -session MySession shell "-start 'MyPhone'"

# 启动无窗口模拟器
emulator-rpc-service -session MySession shell "-start 'MyPhone' -noWindow"

# 实例名包含空格时使用单引号包裹
emulator-rpc-service -session MySession shell "-start 'My Phone Instance'"
```

---

### 2.2 关闭模拟器

```bash
emulator-rpc-service -session MySession shell "-stop 'MyPhone'"
```

---

### 2.3 截屏

```bash
# 截屏并保存到本地指定路径
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot -out 'D:\screenshots\my screenshot.png'"

# 截屏并保存到默认路径
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot"

# 实例名和路径包含空格时必须使用单引号包裹
emulator-rpc-service -session MySession shell "-instance 'My Phone' -screenshot -out 'D:\my screenshots\screen shot.png'"
```

**注意**：
- 远程截屏命令以本命令为准，`-out` 参数指定本地保存路径
- 实例名（hvd）和路径包含空格时，必须使用单引号包裹，如：`'My Phone'`、`'D:\my screenshots\screen shot.png'`

---

### 2.4 场景化设备控制命令

以下命令与 `emulator` 的场景化命令一致，通过 `-session shell` 执行：

#### 旋转设备

```bash
# 旋转到左屏
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -rotation left"

# 旋转到右屏
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -rotation right"

# 实例名包含空格时使用单引号包裹
emulator-rpc-service -session MySession shell "-instance 'My Phone' -rotation left"
```

**注意**：必选参数 `-rotation left` 或 `-rotation right`

---

#### 电源控制

```bash
# 关闭/开启屏幕电源
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -power"
```

---

#### 音量控制

```bash
# 增加音量
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -volume up"

# 降低音量
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -volume down"
```

**注意**：必选参数 `-volume up` 或 `-volume down`

---

#### 摇一摇

```bash
# 触发摇一摇动作
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -shake"
```

---

#### 折叠设备命令

##### 三折叠设备

```bash
# 单屏
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState single"

# 双屏
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState double"

# 三屏
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState triple"

# 左折叠右半折
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState left-folded-right-half-folded"

# 左半折右展开
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState left-half-folded-right-expanded"

# 左展开右折叠
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState left-expanded-right-folded"

# 左半折右折叠
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState left-half-folded-right-folded"

# 左展开右半折
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState left-expanded-right-half-folded"

# 左半折右半折
emulator-rpc-service -session MySession shell "-instance 'MyTripleFold' -foldedState left-half-folded-right-half-folded"
```

##### 双折叠/阔折叠设备

```bash
# 展开
emulator-rpc-service -session MySession shell "-instance 'MyFold' -foldedState open"

# 折叠
emulator-rpc-service -session MySession shell "-instance 'MyFold' -foldedState close"

# 半折
emulator-rpc-service -session MySession shell "-instance 'MyFold' -foldedState half-open"
```

##### 折叠 PC 设备

```bash
# 横展（展开）
emulator-rpc-service -session MySession shell "-instance 'MyFoldPC' -foldedState open"

# 磁吸（悬停）
emulator-rpc-service -session MySession shell "-instance 'MyFoldPC' -foldedState vertical-open"

# 半折
emulator-rpc-service -session MySession shell "-instance 'MyFoldPC' -foldedState half-open"

# 竖展
emulator-rpc-service -session MySession shell "-instance 'MyFoldPC' -foldedState close"
```

---

## 三、Server 模式

启动远程管理服务端：

```bash
# 认证模式（TLS）
emulator-rpc-service -server -port 8555 -pem_root_certs /path/root.pem -pem_private_key /path/server.key -pem_cert_chain /path/server.pem

# 无认证模式
emulator-rpc-service -server -port 8555 --no-auth
```

**参数说明**：
- `-server`：启动 Server 模式
- `-port`：监听端口（可选参数）
- 认证模式下必选：`-pem_root_certs`、`-pem_private_key`、`-pem_cert_chain`
- 无认证模式：使用 `--no-auth` 标志

---

## 四、帮助

```bash
# 获取帮助信息
emulator-rpc-service -h
```

---

## 五、典型工作流

### 5.1 完整远程管理工作流

**步骤 1：启动远程管理服务端（可选）**

如果远程设备尚未启动服务，先启动 Server：
```bash
# 在远程设备上启动无认证模式 Server
emulator-rpc-service -server -port 8555 --no-auth
```

**步骤 2：创建会话**

创建到远程设备的连接会话：
```bash
# 创建会话（无认证模式）
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 --no-auth
```

**步骤 3：执行远程操作**

通过会话执行各种远程命令：
```bash
# 启动模拟器
emulator-rpc-service -session MySession shell "-start 'MyPhone'"

# 旋转设备
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -rotation left"

# 截屏
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot -out 'D:\screenshots\remote.png'"

# 触发摇一摇
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -shake"
```

**步骤 4：查看会话状态（可选）**

```bash
# 查看会话列表及详细信息
emulator-rpc-service -list -details
```

**步骤 5：删除会话**

完成操作后删除会话：
```bash
emulator-rpc-service -session MySession -delete
```

---

### 5.2 会话重复使用工作流（推荐）

**会话创建后可重复使用，无需每次都重新创建：**

```bash
# 1. 创建会话（只需执行一次）
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 --no-auth

# 2. 第一次操作：启动模拟器
emulator-rpc-service -session MySession shell "-start 'MyPhone'"

# 3. 第二次操作：旋转设备（复用同一个会话）
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -rotation left"

# 4. 第三次操作：截屏（复用同一个会话）
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot"

# 5. 第四次操作：音量控制（复用同一个会话）
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -volume up"

# 6. 第五次操作：关闭模拟器（复用同一个会话）
emulator-rpc-service -session MySession shell "-stop 'MyPhone'"

# 7. 最后删除会话
emulator-rpc-service -session MySession -delete
```

**优势**：
- 避免重复建立连接的开销
- 提高批量操作效率
- 保持会话状态一致性

---

### 5.3 多会话并行工作流

**可以同时创建多个会话管理不同设备：**

```bash
# 创建到设备 A 的会话
emulator-rpc-service -session SessionA -ip 192.168.1.100 -port 8555 --no-auth

# 创建到设备 B 的会话
emulator-rpc-service -session SessionB -ip 192.168.1.101 -port 8555 --no-auth

# 操作设备 A
emulator-rpc-service -session SessionA shell "-start 'MyPhone'"

# 操作设备 B
emulator-rpc-service -session SessionB shell "-start 'MyTablet'"

# 查看两个设备的截屏
emulator-rpc-service -session SessionA shell "-instance 'MyPhone' -screenshot -out 'D:\deviceA.png'"
emulator-rpc-service -session SessionB shell "-instance 'MyTablet' -screenshot -out 'D:\deviceB.png'"

# 查看会话列表
emulator-rpc-service -list -details

# 删除两个会话
emulator-rpc-service -session SessionA -delete
emulator-rpc-service -session SessionB -delete
```

---

## 注意事项

1. **路径要求**：
   - `emulator-rpc-service` 位于 `emulator.exe` 相同目录下
   - 使用前需确保已通过 `setup.js` 配置好 DevEco Studio 路径

2. **认证模式**：
   - 认证模式需要提供完整的 TLS 证书链和 Token
   - 无认证模式使用 `--no-auth` 标志，适用于开发测试环境
   - 生产环境建议使用认证模式

3. **会话管理**：
   - 创建会话后才能执行远程命令
   - 会话名称用于标识不同的远程连接
   - **会话可以重复使用**：创建一次会话后，可执行多次远程操作，无需重复创建（推荐）
   - 使用完毕后可通过 `-delete` 删除会话

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

- **emulator 命令**：本地模拟器管理命令
- **scene-commands.md**：场景化设备控制命令完整参考
- **setup.js**：DevEco Studio 路径配置脚本
