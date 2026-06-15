#!/bin/bash

# Skill Format Automated Checker
# 用于自动检查 SKILL.md 文件格式的脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 计数器
errors=0
warnings=0
info=0
files_checked=0

# 打印函数
print_header() {
    echo -e "\n${BLUE}====================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}====================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    ((errors++))
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((warnings++))
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
    ((info++))
}

# 主函数
check_skill_file() {
    local file="$1"
    
    print_header "检查文件：$file"
    
    if [ ! -f "$file" ]; then
        print_error "文件不存在：$file"
        return 1
    fi
    
    ((files_checked++))
    
    # 检查 1: YAML frontmatter 存在
    first_line=$(head -n 1 "$file")
    if [[ "$first_line" != "---" ]]; then
        print_error "缺少 YAML frontmatter (第一行应该是 ---)"
    else
        print_success "YAML frontmatter 存在"
    fi
    
    # 检查 2: name 字段
    name_line=$(grep "^name:" "$file" | head -n 1)
    if [ -z "$name_line" ]; then
        print_error "缺少必填字段：name"
    else
        name=$(echo "$name_line" | cut -d':' -f2 | tr -d ' "')
        
        # name 格式检查
        if [[ ! $name =~ ^[a-z0-9-]+$ ]]; then
            print_error "name 字段包含非法字符：'$name' (只能包含小写字母、数字、连字符)"
        else
            print_success "name 格式正确：$name"
        fi
        
        # name 长度检查
        if [ ${#name} -gt 64 ]; then
            print_error "name 字段超过 64 字符 (当前：${#name}字符)"
        else
            print_success "name 长度合理 (${#name}字符)"
        fi
        
        # name 开头结尾检查
        if [[ $name == -* ]] || [[ $name == *- ]]; then
            print_error "name 不能以连字符开头或结尾：'$name'"
        else
            print_success "name 开头结尾格式正确"
        fi
        
        # name 连续连字符检查
        if [[ $name == *--* ]]; then
            print_error "name 不能包含连续连字符：'$name'"
        else
            print_success "name 无连续连字符"
        fi
        
        # 检查目录名一致性
        dir_name=$(dirname "$file" | xargs basename)
        if [ "$name" != "$dir_name" ]; then
            print_warning "name ('$name') 与目录名 ('$dir_name') 不一致"
        else
            print_success "name 与目录名一致"
        fi
    fi
    
    # 检查 3: description 字段
    desc_line=$(grep "^description:" "$file" | head -n 1)
    if [ -z "$desc_line" ]; then
        print_error "缺少必填字段：description"
    else
        desc=$(echo "$desc_line" | cut -d':' -f2-)
        desc_length=${#desc}
        
        if [ $desc_length -lt 20 ]; then
            print_warning "description 太短 ($desc_length 字符)，建议至少 50 字符以清晰描述技能"
        elif [ $desc_length -gt 1024 ]; then
            print_error "description 超过 1024 字符 (当前：$desc_length 字符)"
        else
            print_success "description 长度合理 ($desc_length 字符)"
        fi
        
        # 检查是否使用第一人称
        if [[ $desc =~ "I can" ]] || [[ $desc =~ "I will" ]] || [[ $desc =~ "you can" ]]; then
            print_warning "description 使用了第一人称，应该使用第三人称"
        else
            print_success "description 使用第三人称"
        fi
        
        # 检查是否包含触发场景
        if [[ ! $desc =~ "Use when" ]] && [[ ! $desc =~ "when " ]]; then
            print_info "description 可能缺少触发场景说明 (建议包含 'Use when...')"
        else
            print_success "description 包含触发场景"
        fi
    fi
    
    # 检查 4: license 字段 (可选)
    license_line=$(grep "^license:" "$file" | head -n 1)
    if [ -n "$license_line" ]; then
        print_success "包含 license 字段"
    else
        print_info "未指定 license (可选字段)"
    fi
    
    # 检查 5: metadata 字段 (可选)
    metadata_line=$(grep "^metadata:" "$file" | head -n 1)
    if [ -n "$metadata_line" ]; then
        print_success "包含 metadata 字段"
    else
        print_info "未指定 metadata (可选字段)"
    fi
    
    # 检查 6: compatibility 字段 (可选)
    compat_line=$(grep "^compatibility:" "$file" | head -n 1)
    if [ -n "$compat_line" ]; then
        compat=$(echo "$compat_line" | cut -d':' -f2-)
        compat_length=${#compat}
        if [ $compat_length -gt 500 ]; then
            print_warning "compatibility 超过 500 字符 (当前：$compat_length 字符)"
        else
            print_success "compatibility 长度合理"
        fi
    fi
    
    # 检查 7: 文件大小
    total_lines=$(wc -l < "$file")
    if [ $total_lines -gt 1000 ]; then
        print_warning "SKILL.md 超过 1000 行 (当前：$total_lines 行)，建议将详细内容移至 references/"
    elif [ $total_lines -gt 800 ]; then
        print_info "SKILL.md 较大 ($total_lines 行),考虑是否可以精简"
    else
        print_success "SKILL.md 大小合理 ($total_lines 行)"
    fi
    
    # 检查 8: 是否有工作流程部分
    if grep -qi "workflow\|流程\|步骤\|step" "$file"; then
        print_success "包含工作流程/步骤说明"
    else
        print_warning "未检测到工作流程/步骤说明 (建议添加## Workflow 或## Steps 章节)"
    fi
    
    # 检查 9: 是否有检查清单
    if grep -q "\- \[ \]" "$file" || grep -q "\- \[x\]" "$file" || grep -qi "checklist\|清单" "$file"; then
        print_success "包含检查清单"
    else
        print_warning "未检测到检查清单 (建议添加检查清单以提高可操作性)"
    fi
    
    # 检查 10: 是否有决策树或条件逻辑
    if grep -qi "if.*then\|如果.*则\|decision\|决策\|取决于" "$file"; then
        print_success "包含决策逻辑"
    else
        print_info "未检测到明显的决策树 (复杂技能建议添加决策树)"
    fi
    
    # 检查 11: references 目录引用
    if grep -qi "references/" "$file"; then
        print_success "引用了 references/目录"
        
        # 检查引用的文件是否存在 (如果 references 目录存在)
        skill_dir=$(dirname "$file")
        if [ -d "$skill_dir/references" ]; then
            ref_files=$(grep -oiE "references/[^\s\)]+" "$file" | sort -u)
            for ref in $ref_files; do
                if [ ! -f "$skill_dir/$ref" ]; then
                    print_error "引用的文件不存在：$skill_dir/$ref"
                fi
            done
            if [ $? -eq 0 ]; then
                print_success "所有引用的 references 文件都存在"
            fi
        fi
    else
        print_info "未引用 references/目录 (对于复杂技能，建议使用 references/存储详细文档)"
    fi
    
    # 检查 12: scripts 目录引用
    if grep -qi "scripts/" "$file"; then
        print_success "引用了 scripts/目录"
        
        skill_dir=$(dirname "$file")
        if [ -d "$skill_dir/scripts" ]; then
            script_refs=$(grep -oiE "scripts/[^\s\)]+" "$file" | sort -u)
            for script in $script_refs; do
                if [ ! -f "$skill_dir/$script" ]; then
                    print_error "引用的脚本不存在：$skill_dir/$script"
                fi
            done
        fi
    fi
    
    # 检查 13: 禁止的内容模式
    if grep -qi "第一章\|第二章\|第一节\|第二节" "$file"; then
        print_info "检测到教科书式的章节编号，建议改为任务导向的标题"
    fi
    
    if grep -qi "什么是\|是指\|定义为" "$file"; then
        print_info "检测到知识库型内容 (什么是/是指/定义为),确保这些不是 SKILL.md 的主要内容"
    fi
}

# 主程序
main() {
    print_header "Skill 格式自动化检查工具"
    
    if [ $# -eq 0 ]; then
        # 默认检查 skills 目录下的所有 SKILL.md
        if [ -d "skills" ]; then
            for skill_file in skills/*/SKILL.md; do
                if [ -f "$skill_file" ]; then
                    check_skill_file "$skill_file"
                fi
            done
        else
            echo "用法：$0 <SKILL.md 文件路径>"
            echo "   或：$0                     # 检查 skills/目录下的所有 SKILL.md"
            exit 1
        fi
    else
        for file in "$@"; do
            check_skill_file "$file"
        done
    fi
    
    # 打印汇总
    print_header "检查汇总"
    echo -e "检查文件数：${GREEN}$files_checked${NC}"
    echo -e "错误数：${RED}$errors${NC}"
    echo -e "警告数：${YELLOW}$warnings${NC}"
    echo -e "提示数：${BLUE}$info${NC}"
    
    if [ $errors -gt 0 ]; then
        print_error "检查未通过，请修复上述错误"
        exit 1
    elif [ $warnings -gt 5 ]; then
        print_warning "检查基本通过，但建议修复警告"
        exit 0
    else
        print_success "检查通过！"
        exit 0
    fi
}

# 执行主程序
main "$@"
