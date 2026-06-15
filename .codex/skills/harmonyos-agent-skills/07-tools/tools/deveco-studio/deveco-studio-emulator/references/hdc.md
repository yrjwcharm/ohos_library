# hdc命令行工具完整参考

## hdc (HarmonyOS Device Connector)

HarmonyOS设备连接器，用于与真实设备或模拟器进行交互的命令行工具。

## 工具路径

### Windows
```
{DevEco Studio安装目录}\sdk\default\openharmony\toolchains\hdc.exe
```

### macOS/Linux
```
{DevEco Studio安装目录}/sdk/default/openharmony/toolchains/hdc
```

## 基础命令

| 命令 | 说明 |
|------|------|
| `hdc -v` | 查看版本 |
| `hdc -h` | 查看帮助 |
| `hdc start` | 启动hdc服务 |
| `hdc start -r` | 重启hdc服务 |
| `hdc kill` | 停止hdc服务 |
| `hdc kill -r` | 强制停止并重启 |
| `hdc list targets` | 查看已连接设备 |
| `hdc list targets -v` | 查看设备详细信息 |

## 应用管理

### 安装应用
```bash
hdc install {hap包路径}
hdc app install {hap包路径}
```

### 卸载应用
```bash
hdc uninstall {bundleName}
hdc app uninstall
```

### 启动应用
```bash
hdc shell aa start -a {abilityName} -b {bundleName}
```

### 停止应用
```bash
hdc shell aa force-stop {bundleName}
hdc shell am force-stop {bundleName}
```

### 查看已安装应用
```bash
hdc shell bm dump -a
hdc shell bm dump -n {bundleName}
```

### 清除应用数据
```bash
hdc shell bm clean -d -n {bundleName}  # 清除数据
hdc shell bm clean -c -n {bundleName}  # 清除缓存
```

## 文件传输

### 发送文件到设备
```bash
hdc file send {本地文件} {设备路径}
```

### 从设备拉取文件
```bash
hdc file recv {设备文件} {本地路径}
```

## Shell命令

### 执行单条命令
```bash
hdc shell {命令}
```

### 进入交互式shell
```bash
hdc shell
```

### 常用shell命令
```bash
hdc shell ls -la
hdc shell rm -rf {路径}
hdc shell mkdir {路径}
hdc shell snapshot_display -f {路径}  # 截屏
```

## 端口转发

```bash
hdc fport ls              # 查看端口转发
hdc fport add {本地} {远程}  # 添加端口转发
hdc fport rm {本地}        # 删除端口转发
```

## 多设备操作

```bash
# 指定设备执行命令
hdc -t {设备ID} install app.hap
hdc -t {设备ID} shell ls /data
```

## 完整工作流程示例

```bash
# 1. 查看连接的设备
hdc list targets

# 2. 安装应用
hdc install entry-default.hap

# 3. 启动应用
hdc shell aa start -a EntryAbility -b com.example.app

# 4. 查看日志
hdc hilog

# 5. 停止应用
hdc shell aa force-stop com.example.app

# 6. 卸载应用
hdc uninstall com.example.app
```

## 官方文档
https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc
