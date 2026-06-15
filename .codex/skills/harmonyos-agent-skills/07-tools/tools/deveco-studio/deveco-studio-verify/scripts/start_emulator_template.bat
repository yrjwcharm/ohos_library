@echo off
REM HarmonyOS 模拟器启动脚本模板
REM 请根据需要修改模拟器名称

setlocal

REM 设置模拟器名称（请修改此处）
set EMULATOR_NAME=Pura 9022

REM DevEco Studio 路径
set DEVECO_PATH=C:\Program Files\Huawei\DevEco Studio
set EMULATOR_TOOL=%DEVECO_PATH%\tools\emulator\Emulator.exe

echo 正在启动模拟器: %EMULATOR_NAME%

cd /d "%DEVECO_PATH%\tools\emulator"
"%EMULATOR_TOOL%" -start "%EMULATOR_NAME%"

echo.
echo 模拟器启动命令已执行
echo 请等待 30-60 秒后检查连接状态
echo.
echo 检查连接命令:
echo hdc list targets

pause
endlocal