@echo off
REM HarmonyOS 模拟器创建和启动脚本
REM 使用方法: create_and_start_emulator.bat [实例名称] [设备类型] [系统版本]

setlocal

REM 默认参数
set EMULATOR_NAME=%1
set DEVICE_TYPE=%2
set OS_VERSION=%3

REM 设置默认值
if "%EMULATOR_NAME%"=="" set EMULATOR_NAME=TestPhone
if "%DEVICE_TYPE%"=="" set DEVICE_TYPE=Phone
if "%OS_VERSION%"=="" set OS_VERSION=HarmonyOS 6.0.2(22)

REM DevEco Studio 路径（请根据实际路径修改）
set DEVECO_PATH=C:\Program Files\Huawei\DevEco Studio
set EMULATOR_TOOL=%DEVECO_PATH%\tools\emulator\Emulator.exe
set HDC_TOOL=%DEVECO_PATH%\sdk\default\openharmony\toolchains\hdc.exe

echo ========================================
echo HarmonyOS 模拟器创建和启动脚本
echo ========================================
echo.

echo [步骤 1] 检查环境...
if not exist "%EMULATOR_TOOL%" (
    echo 错误: 找不到 Emulator.exe
    echo 请检查 DevEco Studio 路径: %DEVECO_PATH%
    pause
    exit /b 1
)

echo Emulator 工具路径: %EMULATOR_TOOL%
echo HDC 工具路径: %HDC_TOOL%
echo.

echo [步骤 2] 创建模拟器实例...
echo 实例名称: %EMULATOR_NAME%
echo 设备类型: %DEVICE_TYPE%
echo 系统版本: %OS_VERSION%

"%EMULATOR_TOOL%" -create "%EMULATOR_NAME%" -deviceType %DEVICE_TYPE% -osVersion "%OS_VERSION%"
if %errorlevel% neq 0 (
    echo 错误: 创建模拟器失败
    echo 可能原因:
    echo   1. 许可证未接受，请运行: emulator -license accept
    echo   2. 镜像未下载，请运行: emulator -imageList
    echo   3. 实例名称已存在，请运行: emulator -list
    pause
    exit /b 1
)

echo 模拟器创建成功！
echo.

echo [步骤 3] 查看模拟器详情...
"%EMULATOR_TOOL%" -list -details
echo.

echo [步骤 4] 启动模拟器...
cd /d "%DEVECO_PATH%\tools\emulator"
"%EMULATOR_TOOL%" -start "%EMULATOR_NAME%"
echo 模拟器启动命令已执行...
echo 请等待 30-60 秒让模拟器完全启动
echo.

echo [步骤 5] 等待启动完成...
timeout /t 30 /nobreak
echo.

echo [步骤 6] 检查设备连接...
"%HDC_TOOL%" list targets
if %errorlevel% neq 0 (
    echo 提示: 设备未连接
    echo 请尝试:
    echo   1. 等待更多时间
    echo   2. 重启 hdc 服务: hdc kill ^& hdc start
    echo   3. 检查模拟器窗口是否已打开
) else (
    echo 设备连接成功！
    echo.
    echo [步骤 7] 获取设备信息...
    "%HDC_TOOL%" shell param get const.product.devicetype
    "%HDC_TOOL%" shell param get const.product.model
)

echo.
echo ========================================
echo 脚本执行完成！
echo ========================================
echo.
echo 后续操作:
echo   - 安装应用: hdc install -r ^<hap文件路径^>
echo   - 启动应用: hdc shell aa start -a ^<ability^> -b ^<bundle^>
echo   - 删除实例: emulator -delete "%EMULATOR_NAME%"
echo.

pause
endlocal