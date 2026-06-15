# HarmonyOS 设备验证辅助脚本 (Windows PowerShell)
# 用法: .\hdc.ps1 <command> [args...]

param(
    [Parameter(Position = 0)]
    [string]$Command,

    [Parameter(Position = 1, ValueFromRemainingArguments)]
    [string[]]$Args
)

$ErrorActionPreference = "Stop"

$Device = if ($env:HDC_DEVICE) { $env:HDC_DEVICE } else { "" }

function Write-Err   { param([string]$Msg) Write-Host $Msg -ForegroundColor Red }
function Write-Ok    { param([string]$Msg) Write-Host $Msg -ForegroundColor Green }
function Write-Warn  { param([string]$Msg) Write-Host $Msg -ForegroundColor Yellow }

function Print-Help {
    Write-Host "HarmonyOS 设备验证辅助脚本"
    Write-Host ""
    Write-Host "用法: .\hdc.ps1 <command> [args...]"
    Write-Host ""
    Write-Host "设备管理:"
    Write-Host "  list                    列出已连接设备"
    Write-Host "  emulators               列出已安装模拟器"
    Write-Host "  start <name>            启动模拟器"
    Write-Host "  info <device>           获取设备信息"
    Write-Host ""
    Write-Host "应用管理:"
    Write-Host "  apps <device>           列出已安装应用"
    Write-Host "  install <device> <hap>  安装应用"
    Write-Host "  uninstall <device> <bundle>  卸载应用"
    Write-Host "  launch <device> <bundle>  启动应用"
    Write-Host "  stop <device> <bundle>  停止应用"
    Write-Host ""
    Write-Host "UI 操作:"
    Write-Host "  tap <device> <x> <y>    点击"
    Write-Host "  swipe <device> <dir>    滑动 (up/down/left/right)"
    Write-Host "  input <device> <x> <y> <text>  输入文字"
    Write-Host "  key <device> <key>      按键 (Back/Home/24/25...)"
    Write-Host ""
    Write-Host "截图和日志:"
    Write-Host "  screenshot <device> [output]  截图"
    Write-Host "  elements <device>       获取页面元素"
    Write-Host "  logs <device> [bundle]  获取日志"
    Write-Host "  errors <device>         获取错误日志"
    Write-Host "  export-logs <device> [output_dir]  导出全量日志"
    Write-Host "  search-log <device> <keyword>  在全量日志中搜索关键字"
    Write-Host ""
    Write-Host "环境变量:"
    Write-Host "  HDC_DEVICE  默认设备 ID"
    Write-Host ""
    Write-Host "示例:"
    Write-Host "  .\hdc.ps1 list"
    Write-Host "  .\hdc.ps1 screenshot 192.168.1.100:5555"
    Write-Host "  .\hdc.ps1 logs 192.168.1.100:5555 com.example.app"
}

function Check-Hdc {
    if (-not (Get-Command hdc -ErrorAction SilentlyContinue)) {
        Write-Err "错误: hdc 命令未找到"
        Write-Host "请确保 DevEco Studio SDK 已添加到 PATH"
        exit 1
    }
}

function Cmd-List {
    Write-Ok "已连接设备:"
    try { hdc list targets 2>$null } catch { Write-Host "无设备连接" }
}

function Cmd-Emulators {
    Write-Ok "已安装模拟器:"
    try { emulator -list 2>$null } catch { Write-Host "无法获取模拟器列表" }
}

function Cmd-Info {
    param([string]$DeviceId)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }

    Write-Ok "设备信息:"
    Write-Host "设备 ID: $DeviceId"

    if ($DeviceId -match '^\d+\.\d+\.\d+\.\d+:\d+$') {
        Write-Host "类型: 模拟器"
        $name = (hdc -t $DeviceId shell param get ohos.qemu.hvd.name 2>$null) -replace "`r|`n", ""
        Write-Host "名称: $name"
    } else {
        Write-Host "类型: 真机"
        $name = (hdc -t $DeviceId shell param get const.product.name 2>$null) -replace "`r|`n", ""
        Write-Host "名称: $name"
    }

    $version = (hdc -t $DeviceId shell getprop hw_sc.build.platform.version 2>$null) -replace "`r|`n", ""
    Write-Host "版本: $version"
}

function Cmd-Apps {
    param([string]$DeviceId)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }

    Write-Ok "已安装应用:"
    $output = hdc -t $DeviceId shell bm dump -a 2>$null
    $output | Where-Object { $_ -match '^\t[a-zA-Z0-9_.]+' } | ForEach-Object { $_.Trim() } | Sort-Object -Unique
}

function Cmd-Screenshot {
    param([string]$DeviceId, [string]$Output)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }
    if (-not $Output) { $Output = ".\screenshot_$(Get-Date -Format 'yyyyMMdd_HHmmss').jpeg" }

    $rand = Get-Random -Maximum 99999
    $devicePath = "/data/local/tmp/screenshot_$rand.jpeg"

    Write-Warn "正在截图..."
    hdc -t $DeviceId shell snapshot_display -f $devicePath 2>$null
    hdc -t $DeviceId file recv $devicePath $Output 2>$null
    hdc -t $DeviceId shell rm $devicePath 2>$null

    Write-Ok "截图已保存: $Output"
}

function Cmd-Elements {
    param([string]$DeviceId)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }

    Write-Warn "正在获取页面元素..."
    hdc -t $DeviceId shell param set persist.ace.testmode.enabled 1 2>$null

    $dump = hdc -t $DeviceId shell hidumper -s WindowManagerService -a -a 2>$null
    $windowId = ($dump | Select-String 'Highlighted\s+windows:\s*(\d+)').Matches | ForEach-Object { $_.Groups[1].Value }

    if (-not $windowId) { Write-Err "错误: 无法获取窗口 ID"; exit 1 }

    Write-Ok "窗口 ID: $windowId"
    Write-Host ""
    hdc -t $DeviceId shell hidumper -s WindowManagerService -a "-w $windowId -inspector" 2>$null
}

function Cmd-Logs {
    param([string]$DeviceId, [string]$Bundle, [int]$Lines = 200)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }

    if ($Bundle) {
        $dump = hdc -t $DeviceId shell aa dump -a 2>$null
        $pidLine = ($dump | Select-String "process name \[$Bundle\]" -Context 0,2).Context.PostContext | Select-String 'pid #(\d+)'
        $pid = if ($pidLine.Matches) { $pidLine.Matches[0].Groups[1].Value } else { $null }

        if (-not $pid) { Write-Err "错误: 应用未运行: $Bundle"; exit 1 }

        Write-Ok "应用 PID: $pid"
        hdc -t $DeviceId shell hilog -x -n $Lines -P $pid 2>$null
    } else {
        hdc -t $DeviceId shell hilog -x -n $Lines 2>$null
    }
}

function Cmd-Errors {
    param([string]$DeviceId, [int]$Lines = 100)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }

    Write-Ok "错误日志:"
    hdc -t $DeviceId shell hilog -x -n $Lines -L E 2>$null
}

function Cmd-ExportLogs {
    param([string]$DeviceId, [string]$OutputDir)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }
    if (-not $OutputDir) { $OutputDir = ".\hilog_$(Get-Date -Format 'yyyyMMdd_HHmmss')" }

    Write-Warn "正在导出全量日志..."
    Write-Host "设备: $DeviceId"
    Write-Host "输出目录: $OutputDir"

    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    hdc -t $DeviceId file recv /data/log/hilog/ "$OutputDir\" 2>$null

    $hilogDir = Join-Path $OutputDir "hilog"
    if (Test-Path $hilogDir) {
        Write-Warn "正在解压日志文件..."
        Get-ChildItem -Path $hilogDir -Filter "*.gz" | ForEach-Object {
            try {
                $inFile  = $_.FullName
                $outFile = $inFile -replace '\.gz$', ''
                $inStream  = [System.IO.File]::OpenRead($inFile)
                $gzStream  = New-Object System.IO.Compression.GZipStream($inStream, [System.IO.Compression.CompressionMode]::Decompress)
                $outStream = [System.IO.File]::Create($outFile)
                $gzStream.CopyTo($outStream)
                $outStream.Close(); $gzStream.Close(); $inStream.Close()
            } catch {
                # skip files that fail to decompress
            }
        }

        $fileCount = (Get-ChildItem -Path $hilogDir -File | Where-Object { $_.Extension -ne '.gz' }).Count
        Write-Ok "导出完成!"
        Write-Host "解压后日志文件数: $fileCount"
        Write-Host "日志目录: $hilogDir"
    } else {
        Write-Err "错误: 导出失败"
        exit 1
    }
}

function Cmd-SearchLog {
    param([string]$DeviceId, [string]$Keyword)
    if (-not $DeviceId) { Write-Err "错误: 请指定设备 ID"; exit 1 }
    if (-not $Keyword) { Write-Err "错误: 请指定搜索关键字"; exit 1 }

    $tmpDir = Join-Path $env:TEMP "hilog_search_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

    Write-Warn "正在导出并搜索日志..."
    Write-Host "设备: $DeviceId"
    Write-Host "关键字: $Keyword"

    New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null
    hdc -t $DeviceId file recv /data/log/hilog/ "$tmpDir\" 2>$null

    $hilogDir = Join-Path $tmpDir "hilog"
    if (Test-Path $hilogDir) {
        Get-ChildItem -Path $hilogDir -Filter "*.gz" | ForEach-Object {
            try {
                $inFile  = $_.FullName
                $outFile = $inFile -replace '\.gz$', ''
                $inStream  = [System.IO.File]::OpenRead($inFile)
                $gzStream  = New-Object System.IO.Compression.GZipStream($inStream, [System.IO.Compression.CompressionMode]::Decompress)
                $outStream = [System.IO.File]::Create($outFile)
                $gzStream.CopyTo($outStream)
                $outStream.Close(); $gzStream.Close(); $inStream.Close()
            } catch {}
        }

        Write-Host ""
        Write-Ok "搜索结果:"
        $found = $false
        Get-ChildItem -Path $hilogDir -File | Where-Object { $_.Extension -ne '.gz' } | ForEach-Object {
            $matches = Select-String -Path $_.FullName -Pattern $Keyword -SimpleMatch
            if ($matches) {
                $found = $true
                $matches | ForEach-Object { Write-Host $_.Line }
            }
        }

        if (-not $found) {
            Write-Warn "未找到匹配日志: $Keyword"
        }
    } else {
        Write-Err "错误: 导出失败"
        exit 1
    }

    Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue
}

function Cmd-Tap {
    param([string]$DeviceId, [string]$X, [string]$Y)
    if (-not $DeviceId -or -not $X -or -not $Y) { Write-Err "错误: 用法: tap <device> <x> <y>"; exit 1 }

    Write-Warn "点击 ($X, $Y)"
    hdc -t $DeviceId shell uitest uiInput click $X $Y 2>$null
    Write-Ok "完成"
}

function Cmd-Swipe {
    param([string]$DeviceId, [string]$Direction)
    if (-not $DeviceId -or -not $Direction) { Write-Err "错误: 用法: swipe <device> <up|down|left|right>"; exit 1 }

    $width = 1080; $height = 1920
    $centerX = [int]($width / 2); $centerY = [int]($height / 2)
    $distance = [int]($height * 40 / 100)

    switch ($Direction) {
        "up" {
            $fromX = $centerX; $fromY = $centerY + [int]($distance / 2)
            $toX   = $centerX; $toY   = $centerY - [int]($distance / 2)
        }
        "down" {
            $fromX = $centerX; $fromY = $centerY - [int]($distance / 2)
            $toX   = $centerX; $toY   = $centerY + [int]($distance / 2)
        }
        "left" {
            $fromX = $centerX + [int]($distance / 2); $fromY = $centerY
            $toX   = $centerX - [int]($distance / 2); $toY   = $centerY
        }
        "right" {
            $fromX = $centerX - [int]($distance / 2); $fromY = $centerY
            $toX   = $centerX + [int]($distance / 2); $toY   = $centerY
        }
        default { Write-Err "错误: 方向必须是 up/down/left/right"; exit 1 }
    }

    Write-Warn "滑动 $Direction`: ($fromX, $fromY) -> ($toX, $toY)"
    hdc -t $DeviceId shell uitest uiInput swipe $fromX $fromY $toX $toY 600 2>$null
    Write-Ok "完成"
}

function Cmd-Input {
    param([string]$DeviceId, [string]$X, [string]$Y, [string]$Text)
    if (-not $DeviceId -or -not $X -or -not $Y -or -not $Text) {
        Write-Err "错误: 用法: input <device> <x> <y> <text>"; exit 1
    }

    Write-Warn "输入文字: $Text"
    hdc -t $DeviceId shell uitest uiInput inputText $X $Y $Text 2>$null
    Write-Ok "完成"
}

function Cmd-Key {
    param([string]$DeviceId, [string]$Key)
    if (-not $DeviceId -or -not $Key) { Write-Err "错误: 用法: key <device> <key>"; exit 1 }

    Write-Warn "按键: $Key"
    hdc -t $DeviceId shell uitest uiInput keyEvent $Key 2>$null
    Write-Ok "完成"
}

# --- 主入口 ---
Check-Hdc

switch ($Command) {
    "list"        { Cmd-List }
    "emulators"   { Cmd-Emulators }
    "start"       { Write-Host "启动模拟器功能需要 emulator -list -details 获取详情" }
    "info"        { Cmd-Info $Args[0] }
    "apps"        { Cmd-Apps $Args[0] }
    "install" {
        if ($Args.Count -lt 2) { Write-Err "错误: 用法: install <device> <hap>"; exit 1 }
        hdc -t $Args[0] install -r $Args[1]
    }
    "uninstall" {
        if ($Args.Count -lt 2) { Write-Err "错误: 用法: uninstall <device> <bundle>"; exit 1 }
        hdc -t $Args[0] uninstall $Args[1]
    }
    "launch" {
        if ($Args.Count -lt 2) { Write-Err "错误: 用法: launch <device> <bundle>"; exit 1 }
        $dump = hdc -t $Args[0] shell bm dump -n $Args[1] 2>$null
        $abilityMatch = ($dump | Select-String '"mainAbility"\s*:\s*"([^"]+)"')
        $ability = if ($abilityMatch.Matches) { $abilityMatch.Matches[0].Groups[1].Value } else { $null }
        if (-not $ability) { Write-Err "错误: 无法获取 mainAbility"; exit 1 }
        Write-Ok "启动应用: $($Args[1]) / $ability"
        hdc -t $Args[0] shell aa start -a $ability -b $Args[1]
    }
    "stop" {
        if ($Args.Count -lt 2) { Write-Err "错误: 用法: stop <device> <bundle>"; exit 1 }
        hdc -t $Args[0] shell aa force-stop $Args[1]
    }
    "tap"         { Cmd-Tap $Args[0] $Args[1] $Args[2] }
    "swipe"       { Cmd-Swipe $Args[0] $Args[1] }
    "input"       { Cmd-Input $Args[0] $Args[1] $Args[2] $Args[3] }
    "key"         { Cmd-Key $Args[0] $Args[1] }
    "screenshot"  { Cmd-Screenshot $Args[0] $Args[1] }
    "elements"    { Cmd-Elements $Args[0] }
    "logs"        { Cmd-Logs $Args[0] $Args[1] $Args[2] }
    "errors"      { Cmd-Errors $Args[0] $Args[1] }
    "export-logs" { Cmd-ExportLogs $Args[0] $Args[1] }
    "search-log"  { Cmd-SearchLog $Args[0] $Args[1] }
    { $_ -in "help", "--help", "-h" } { Print-Help }
    default       { Print-Help }
}
