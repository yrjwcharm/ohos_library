@echo off
REM HarmonyOS 多设备模拟器启动脚本
REM 同时启动多个模拟器实例（顺序启动）

setlocal

REM DevEco Studio 路径
set DEVECO_PATH=C:\Program Files\Huawei\DevEco Studio
set EMULATOR_TOOL=%DEVECO_PATH%\tools\emulator\Emulator.exe
set HDC_TOOL=%DEVECO_PATH%\sdk\default\openharmony\toolchains\hdc.exe

REM 模拟器列表（请根据需要修改）
set EMULATOR1=Pura 9022
set EMULATOR2=Mate X7

echo ========================================
echo HarmonyOS 多设备模拟器启动脚本
echo ========================================
echo.
echo 将启动以下模拟器:
echo   1. %EMULATOR1%
echo   2. %EMULATOR2%
echo.

echo [步骤 1] 启动第一个模拟器: %EMULATOR1%
cd /d "%DEVECO_PATH%\tools\emulator"
"%EMULATOR_TOOL%" -start "%EMULATOR1%"
echo 等待 5 秒...
timeout /t 5 /nobreak
echo.

echo [步骤 2] 启动第二个模拟器: %EMULATOR2%
"%EMULATOR_TOOL%" -start "%EMULATOR2%"
echo.

echo [步骤 3] 等待模拟器启动完成...
echo 请等待 30-60 秒
timeout /t 30 /nobreak
echo.

echo [步骤 4] 检查多设备连接...
"%HDC_TOOL%" list targets
echo.

echo ========================================
echo 脚本执行完成！
echo ========================================
echo.
echo 提示:
echo   - 如果输出显示多个设备地址（如 127.0.0.1:5555 和 127.0.0.1:5557），说明启动成功
echo   - 使用 -t 参数指定设备操作: hdc -t ^<设备ID^> ...
echo   - 查看模拟器详情: emulator -list -details
echo.

pause
endlocal