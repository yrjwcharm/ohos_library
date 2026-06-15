#!/bin/bash
# HarmonyOS 设备验证辅助脚本
# 用法: ./hdc.sh <command> [args...]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 默认设备
DEVICE=${HDC_DEVICE:-""}

# 打印帮助
print_help() {
    echo "HarmonyOS 设备验证辅助脚本"
    echo ""
    echo "用法: ./hdc.sh <command> [args...]"
    echo ""
    echo "设备管理:"
    echo "  list                    列出已连接设备"
    echo "  emulators               列出已安装模拟器"
    echo "  start <name>            启动模拟器"
    echo "  info <device>           获取设备信息"
    echo ""
    echo "应用管理:"
    echo "  apps <device>           列出已安装应用"
    echo "  install <device> <hap>  安装应用"
    echo "  uninstall <device> <bundle>  卸载应用"
    echo "  launch <device> <bundle>  启动应用"
    echo "  stop <device> <bundle>  停止应用"
    echo ""
    echo "UI 操作:"
    echo "  tap <device> <x> <y>    点击"
    echo "  swipe <device> <dir>    滑动 (up/down/left/right)"
    echo "  input <device> <x> <y> <text>  输入文字"
    echo "  key <device> <key>      按键 (Back/Home/24/25...)"
    echo ""
    echo "截图和日志:"
    echo "  screenshot <device> [output]  截图"
    echo "  elements <device>       获取页面元素"
    echo "  logs <device> [bundle]  获取日志"
    echo "  errors <device>         获取错误日志"
    echo "  export-logs <device> [output_dir]  导出全量日志（推荐）"
    echo "  search-log <device> <keyword>  在全量日志中搜索关键字"
    echo ""
    echo "环境变量:"
    echo "  HDC_DEVICE  默认设备 ID"
    echo ""
    echo "示例:"
    echo "  ./hdc.sh list"
    echo "  ./hdc.sh screenshot 192.168.1.100:5555"
    echo "  ./hdc.sh logs 192.168.1.100:5555 com.example.app"
}

# 检查 hdc 命令
check_hdc() {
    if ! command -v hdc &> /dev/null; then
        echo -e "${RED}错误: hdc 命令未找到${NC}"
        echo "请确保 DevEco Studio SDK 已添加到 PATH"
        exit 1
    fi
}

# 列出设备
cmd_list() {
    echo -e "${GREEN}已连接设备:${NC}"
    hdc list targets 2>/dev/null || echo "无设备连接"
}

# 列出模拟器
cmd_emulators() {
    echo -e "${GREEN}已安装模拟器:${NC}"
    emulator -list 2>/dev/null || echo "无法获取模拟器列表"
}

# 获取设备信息
cmd_info() {
    local device=$1
    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    echo -e "${GREEN}设备信息:${NC}"
    echo "设备 ID: $device"

    # 判断是否为模拟器
    if [[ $device =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+$ ]]; then
        echo "类型: 模拟器"
        local name=$(hdc -t $device shell param get ohos.qemu.hvd.name 2>/dev/null | tr -d '\r\n')
        echo "名称: $name"
    else
        echo "类型: 真机"
        local name=$(hdc -t $device shell param get const.product.name 2>/dev/null | tr -d '\r\n')
        echo "名称: $name"
    fi

    local version=$(hdc -t $device shell getprop hw_sc.build.platform.version 2>/dev/null | tr -d '\r\n')
    echo "版本: $version"
}

# 列出应用
cmd_apps() {
    local device=$1
    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    echo -e "${GREEN}已安装应用:${NC}"
    hdc -t $device shell bm dump -a 2>/dev/null | grep -P '^\t[a-zA-Z0-9_.]+' | sed 's/^\t//' | sort -u
}

# 截图
cmd_screenshot() {
    local device=$1
    local output=${2:-"./screenshot_$(date +%Y%m%d_%H%M%S).jpeg"}

    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    local device_path="/data/local/tmp/screenshot_${RANDOM}.jpeg"

    echo -e "${YELLOW}正在截图...${NC}"
    hdc -t $device shell snapshot_display -f $device_path 2>/dev/null
    hdc -t $device file recv $device_path "$output" 2>/dev/null
    hdc -t $device shell rm $device_path 2>/dev/null

    echo -e "${GREEN}截图已保存: $output${NC}"
}

# 获取页面元素
cmd_elements() {
    local device=$1

    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    echo -e "${YELLOW}正在获取页面元素...${NC}"

    # 开启测试模式
    hdc -t $device shell param set persist.ace.testmode.enabled 1 2>/dev/null

    # 获取窗口 ID
    local window_id=$(hdc -t $device shell hidumper -s WindowManagerService -a -a 2>/dev/null | grep -oP 'Highlighted\s+windows:\s*\K\d+')

    if [ -z "$window_id" ]; then
        echo -e "${RED}错误: 无法获取窗口 ID${NC}"
        exit 1
    fi

    echo -e "${GREEN}窗口 ID: $window_id${NC}"
    echo ""

    # 获取元素树
    hdc -t $device shell hidumper -s WindowManagerService -a "-w $window_id -inspector" 2>/dev/null
}

# 获取日志
cmd_logs() {
    local device=$1
    local bundle=$2
    local lines=${3:-200}

    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    if [ -n "$bundle" ]; then
        # 获取应用 PID
        local pid=$(hdc -t $device shell aa dump -a 2>/dev/null | grep -A 2 "process name \[$bundle\]" | grep "pid" | grep -oP 'pid #\K\d+')

        if [ -z "$pid" ]; then
            echo -e "${RED}错误: 应用未运行: $bundle${NC}"
            exit 1
        fi

        echo -e "${GREEN}应用 PID: $pid${NC}"
        hdc -t $device shell hilog -x -n $lines -P $pid 2>/dev/null
    else
        hdc -t $device shell hilog -x -n $lines 2>/dev/null
    fi
}

# 获取错误日志
cmd_errors() {
    local device=$1
    local lines=${2:-100}

    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    echo -e "${GREEN}错误日志:${NC}"
    hdc -t $device shell hilog -x -n $lines -L E 2>/dev/null
}

# 导出全量日志
cmd_export_logs() {
    local device=$1
    local output_dir=${2:-"./hilog_$(date +%Y%m%d_%H%M%S)"}

    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    echo -e "${YELLOW}正在导出全量日志...${NC}"
    echo "设备: $device"
    echo "输出目录: $output_dir"

    # 导出 hilog 目录
    mkdir -p "$output_dir"
    hdc -t $device file recv /data/log/hilog/ "$output_dir/" 2>/dev/null

    # 解压 .gz 文件
    local hilog_dir="$output_dir/hilog"
    if [ -d "$hilog_dir" ]; then
        echo -e "${YELLOW}正在解压日志文件...${NC}"
        cd "$hilog_dir"
        for f in *.gz; do
            if [ -f "$f" ]; then
                gunzip -k "$f" 2>/dev/null
            fi
        done
        cd - > /dev/null

        local file_count=$(ls -1 "$hilog_dir" 2>/dev/null | grep -v ".gz" | wc -l | tr -d ' ')
        echo -e "${GREEN}导出完成!${NC}"
        echo "解压后日志文件数: $file_count"
        echo "日志目录: $hilog_dir"
    else
        echo -e "${RED}错误: 导出失败${NC}"
        exit 1
    fi
}

# 在全量日志中搜索
cmd_search_log() {
    local device=$1
    local keyword=$2
    local output_dir="/tmp/hilog_search_$(date +%Y%m%d_%H%M%S)"

    if [ -z "$device" ]; then
        echo -e "${RED}错误: 请指定设备 ID${NC}"
        exit 1
    fi

    if [ -z "$keyword" ]; then
        echo -e "${RED}错误: 请指定搜索关键字${NC}"
        exit 1
    fi

    echo -e "${YELLOW}正在导出并搜索日志...${NC}"
    echo "设备: $device"
    echo "关键字: $keyword"

    # 导出日志
    mkdir -p "$output_dir"
    hdc -t $device file recv /data/log/hilog/ "$output_dir/" 2>/dev/null

    # 解压并搜索
    local hilog_dir="$output_dir/hilog"
    if [ -d "$hilog_dir" ]; then
        cd "$hilog_dir"
        for f in *.gz; do
            if [ -f "$f" ]; then
                gunzip -k "$f" 2>/dev/null
            fi
        done

        echo ""
        echo -e "${GREEN}搜索结果:${NC}"
        local result=$(grep -h "$keyword" hilog.*.* 2>/dev/null | grep -v ".gz")
        if [ -n "$result" ]; then
            echo "$result"
            echo ""
            echo -e "${GREEN}找到匹配日志${NC}"
        else
            echo -e "${YELLOW}未找到匹配日志: $keyword${NC}"
        fi
        cd - > /dev/null
    else
        echo -e "${RED}错误: 导出失败${NC}"
        exit 1
    fi

    # 清理临时文件
    rm -rf "$output_dir"
}

# 点击
cmd_tap() {
    local device=$1
    local x=$2
    local y=$3

    if [ -z "$device" ] || [ -z "$x" ] || [ -z "$y" ]; then
        echo -e "${RED}错误: 用法: tap <device> <x> <y>${NC}"
        exit 1
    fi

    echo -e "${YELLOW}点击 ($x, $y)${NC}"
    hdc -t $device shell uitest uiInput click $x $y 2>/dev/null
    echo -e "${GREEN}完成${NC}"
}

# 滑动
cmd_swipe() {
    local device=$1
    local direction=$2

    if [ -z "$device" ] || [ -z "$direction" ]; then
        echo -e "${RED}错误: 用法: swipe <device> <up|down|left|right>${NC}"
        exit 1
    fi

    # 获取屏幕尺寸（这里使用默认值，实际应从 hidumper 获取）
    local width=1080
    local height=1920
    local center_x=$((width / 2))
    local center_y=$((height / 2))
    local distance=$((height * 40 / 100))

    local from_x from_y to_x to_y

    case $direction in
        up)
            from_x=$center_x
            from_y=$((center_y + distance / 2))
            to_x=$center_x
            to_y=$((center_y - distance / 2))
            ;;
        down)
            from_x=$center_x
            from_y=$((center_y - distance / 2))
            to_x=$center_x
            to_y=$((center_y + distance / 2))
            ;;
        left)
            from_x=$((center_x + distance / 2))
            from_y=$center_y
            to_x=$((center_x - distance / 2))
            to_y=$center_y
            ;;
        right)
            from_x=$((center_x - distance / 2))
            from_y=$center_y
            to_x=$((center_x + distance / 2))
            to_y=$center_y
            ;;
        *)
            echo -e "${RED}错误: 方向必须是 up/down/left/right${NC}"
            exit 1
            ;;
    esac

    echo -e "${YELLOW}滑动 $direction: ($from_x, $from_y) -> ($to_x, $to_y)${NC}"
    hdc -t $device shell uitest uiInput swipe $from_x $from_y $to_x $to_y 600 2>/dev/null
    echo -e "${GREEN}完成${NC}"
}

# 输入文字
cmd_input() {
    local device=$1
    local x=$2
    local y=$3
    local text=$4

    if [ -z "$device" ] || [ -z "$x" ] || [ -z "$y" ] || [ -z "$text" ]; then
        echo -e "${RED}错误: 用法: input <device> <x> <y> <text>${NC}"
        exit 1
    fi

    echo -e "${YELLOW}输入文字: $text${NC}"
    hdc -t $device shell uitest uiInput inputText $x $y "$text" 2>/dev/null
    echo -e "${GREEN}完成${NC}"
}

# 按键
cmd_key() {
    local device=$1
    local key=$2

    if [ -z "$device" ] || [ -z "$key" ]; then
        echo -e "${RED}错误: 用法: key <device> <key>${NC}"
        exit 1
    fi

    echo -e "${YELLOW}按键: $key${NC}"
    hdc -t $device shell uitest uiInput keyEvent $key 2>/dev/null
    echo -e "${GREEN}完成${NC}"
}

# 主入口
check_hdc

case "$1" in
    list) cmd_list ;;
    emulators) cmd_emulators ;;
    start) echo "启动模拟器功能需要 emulator -list -details 获取详情";;
    info) cmd_info "$2" ;;
    apps) cmd_apps "$2" ;;
    install)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${RED}错误: 用法: install <device> <hap>${NC}"
            exit 1
        fi
        hdc -t $2 install -r "$3"
        ;;
    uninstall)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${RED}错误: 用法: uninstall <device> <bundle>${NC}"
            exit 1
        fi
        hdc -t $2 uninstall "$3"
        ;;
    launch)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${RED}错误: 用法: launch <device> <bundle>${NC}"
            exit 1
        fi
        # 获取 mainAbility
        ability=$(hdc -t $2 shell bm dump -n "$3" 2>/dev/null | grep -oP '"mainAbility"\s*:\s*"\K[^"]+')
        if [ -z "$ability" ]; then
            echo -e "${RED}错误: 无法获取 mainAbility${NC}"
            exit 1
        fi
        echo -e "${GREEN}启动应用: $3 / $ability${NC}"
        hdc -t $2 shell aa start -a "$ability" -b "$3"
        ;;
    stop)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${RED}错误: 用法: stop <device> <bundle>${NC}"
            exit 1
        fi
        hdc -t $2 shell aa force-stop "$3"
        ;;
    tap) cmd_tap "$2" "$3" "$4" ;;
    swipe) cmd_swipe "$2" "$3" ;;
    input) cmd_input "$2" "$3" "$4" "$5" ;;
    key) cmd_key "$2" "$3" ;;
    screenshot) cmd_screenshot "$2" "$3" ;;
    elements) cmd_elements "$2" ;;
    logs) cmd_logs "$2" "$3" "$4" ;;
    errors) cmd_errors "$2" "$3" ;;
    export-logs) cmd_export_logs "$2" "$3" ;;
    search-log) cmd_search_log "$2" "$3" ;;
    help|--help|-h) print_help ;;
    *) print_help ;;
esac