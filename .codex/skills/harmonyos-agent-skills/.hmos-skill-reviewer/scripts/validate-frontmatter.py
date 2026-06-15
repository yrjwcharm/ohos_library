#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Skill YAML Frontmatter Validator
验证 SKILL.md 文件的 YAML frontmatter 是否符合规范
"""

import sys
import re
import yaml
from pathlib import Path
from typing import Dict, List, Tuple, Optional

# 颜色定义
class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'  # No Color

def print_success(msg: str):
    print(f"{Colors.GREEN}✅ {msg}{Colors.NC}")

def print_error(msg: str):
    print(f"{Colors.RED}❌ {msg}{Colors.NC}")

def print_warning(msg: str):
    print(f"{Colors.YELLOW}⚠️  {msg}{Colors.NC}")

def print_info(msg: str):
    print(f"{Colors.BLUE}ℹ️  {msg}{Colors.NC}")

def extract_frontmatter(file_path: str) -> Optional[str]:
    """提取 YAML frontmatter 内容"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if not content.startswith('---'):
            return None
            
        # 查找第二个 ---
        end_match = re.search(r'\n---\s*\n', content[4:])
        if not end_match:
            return None
            
        return content[4:4 + end_match.start()]
    except Exception as e:
        print_error(f"读取文件失败：{e}")
        return None

def validate_name(name: str, dir_name: Optional[str] = None) -> Tuple[bool, List[str]]:
    """验证 name 字段"""
    errors = []
    warnings = []
    
    if not name:
        errors.append("name 字段为空")
        return False, errors
    
    # 长度检查
    if len(name) > 64:
        errors.append(f"name 字段超过 64 字符 (当前：{len(name)}字符)")
    
    # 字符合法性检查
    if not re.match(r'^[a-z0-9-]+$', name):
        errors.append(f"name 包含非法字符：'{name}' (只能包含小写字母、数字、连字符)")
    
    # 开头结尾检查
    if name.startswith('-') or name.endswith('-'):
        errors.append(f"name 不能以连字符开头或结尾：'{name}'")
    
    # 连续连字符检查
    if '--' in name:
        errors.append(f"name 不能包含连续连字符：'{name}'")
    
    # 目录名一致性检查
    if dir_name and name != dir_name:
        warnings.append(f"name ('{name}') 与目录名 ('{dir_name}') 不一致")
    
    # 版本号检查
    if re.search(r'-v?\d+(\.\d+)*', name):
        warnings.append(f"name 包含版本信息：'{name}' (建议移除)")
    
    is_valid = len(errors) == 0
    return is_valid, errors + warnings

def validate_description(desc: str) -> Tuple[bool, List[str]]:
    """验证 description 字段"""
    errors = []
    warnings = []
    info = []
    
    if not desc:
        errors.append("description 字段为空")
        return False, errors
    
    desc_length = len(desc)
    
    # 长度检查
    if desc_length > 1024:
        errors.append(f"description 超过 1024 字符 (当前：{desc_length}字符)")
    elif desc_length < 20:
        warnings.append(f"description 太短 ({desc_length}字符)，建议至少 50 字符")
    
    # 人称检查
    first_person_patterns = [
        r'\bI can\b', r'\bI will\b', r'\bI help\b',
        r'\byou can\b', r'\byou should\b', r'\bmy skill\b'
    ]
    for pattern in first_person_patterns:
        if re.search(pattern, desc, re.IGNORECASE):
            warnings.append("description 使用了第一人称，应该使用第三人称")
            break
    
    # 触发场景检查
    if not re.search(r'(use when|when |for |to )', desc, re.IGNORECASE):
        info.append("description 可能缺少触发场景说明 (建议包含 'Use when...')")
    
    # 关键词检查
    action_words = ['review', 'check', 'validate', 'generate', 'create', 
                    'analyze', 'process', 'extract', 'convert', 'help']
    has_action = any(word in desc.lower() for word in action_words)
    if not has_action:
        info.append("description 可能缺少动作词 (如 review, check, validate 等)")
    
    is_valid = len(errors) == 0
    return is_valid, errors + warnings + info

def validate_license(license_str: str) -> Tuple[bool, List[str]]:
    """验证 license 字段"""
    warnings = []
    
    if len(license_str) > 200:
        warnings.append(f"license 字段较长 ({len(license_str)}字符)，建议保持简短")
    
    return True, warnings

def validate_compatibility(compat: str) -> Tuple[bool, List[str]]:
    """验证 compatibility 字段"""
    errors = []
    warnings = []
    
    if len(compat) > 500:
        errors.append(f"compatibility 超过 500 字符 (当前：{len(compat)}字符)")
    
    return True, warnings

def validate_metadata(metadata: dict) -> Tuple[bool, List[str]]:
    """验证 metadata 字段"""
    warnings = []
    
    if not isinstance(metadata, dict):
        errors.append("metadata 应该是键值对映射")
        return False, errors
    
    # 检查常见字段
    if 'version' in metadata:
        version = str(metadata['version'])
        if not re.match(r'^v?\d+\.\d+(\.\d+)?(-[\w.]+)?$', version):
            warnings.append(f"version 格式不规范：'{version}' (建议使用语义化版本，如 1.0.0)")
    
    return True, warnings

def validate_skill_file(file_path: str) -> bool:
    """验证单个 Skill 文件"""
    path = Path(file_path)
    
    if not path.exists():
        print_error(f"文件不存在：{file_path}")
        return False
    
    if not path.is_file():
        print_error(f"不是文件：{file_path}")
        return False
    
    print(f"\n{Colors.BLUE}验证文件：{file_path}{Colors.NC}")
    print("=" * 60)
    
    # 提取 frontmatter
    frontmatter_str = extract_frontmatter(str(path))
    if not frontmatter_str:
        print_error("无法提取 YAML frontmatter (确保以 --- 开头和结束)")
        return False
    
    # 解析 YAML
    try:
        frontmatter = yaml.safe_load(frontmatter_str)
    except yaml.YAMLError as e:
        print_error(f"YAML 解析失败：{e}")
        return False
    
    if not isinstance(frontmatter, dict):
        print_error("frontmatter 应该是 YAML 字典")
        return False
    
    # 获取目录名
    dir_name = path.parent.name
    
    # 验证各个字段
    all_valid = True
    
    # 1. 验证 name (必填)
    if 'name' not in frontmatter:
        print_error("缺少必填字段：name")
        all_valid = False
    else:
        name = str(frontmatter['name'])
        is_valid, messages = validate_name(name, dir_name)
        for msg in messages:
            if '❌' in msg or '错误' in msg:
                print_error(msg)
            elif '⚠️' in msg or '警告' in msg:
                print_warning(msg)
            else:
                print_info(msg)
        if is_valid:
            print_success(f"name 验证通过：{name}")
        else:
            all_valid = False
    
    # 2. 验证 description (必填)
    if 'description' not in frontmatter:
        print_error("缺少必填字段：description")
        all_valid = False
    else:
        desc = str(frontmatter['description'])
        is_valid, messages = validate_description(desc)
        for msg in messages:
            if '❌' in msg or '错误' in msg:
                print_error(msg)
            elif '⚠️' in msg or '警告' in msg:
                print_warning(msg)
            else:
                print_info(msg)
        if is_valid:
            print_success(f"description 验证通过 ({len(desc)}字符)")
        else:
            all_valid = False
    
    # 3. 验证 license (可选)
    if 'license' in frontmatter:
        license_str = str(frontmatter['license'])
        is_valid, messages = validate_license(license_str)
        for msg in messages:
            print_warning(msg)
        print_success("license 字段存在")
    else:
        print_info("未指定 license (可选字段)")
    
    # 4. 验证 metadata (可选)
    if 'metadata' in frontmatter:
        metadata = frontmatter['metadata']
        is_valid, messages = validate_metadata(metadata)
        for msg in messages:
            print_warning(msg)
        print_success("metadata 字段存在")
    else:
        print_info("未指定 metadata (可选字段)")
    
    # 5. 验证 compatibility (可选)
    if 'compatibility' in frontmatter:
        compat = str(frontmatter['compatibility'])
        is_valid, messages = validate_compatibility(compat)
        for msg in messages:
            print_warning(msg)
        print_success("compatibility 字段存在")
    
    # 检查额外字段
    allowed_fields = {'name', 'description', 'license', 'metadata', 
                      'compatibility', 'allowed-tools'}
    extra_fields = set(frontmatter.keys()) - allowed_fields
    if extra_fields:
        print_info(f"发现额外字段：{extra_fields} (确保这些是标准字段)")
    
    print("=" * 60)
    if all_valid:
        print_success("✅ YAML frontmatter 验证通过")
        return True
    else:
        print_error("❌ YAML frontmatter 验证失败")
        return False

def main():
    """主函数"""
    print(f"\n{Colors.BLUE}{'='*60}{Colors.NC}")
    print(f"{Colors.BLUE}Skill YAML Frontmatter 验证工具{Colors.NC}")
    print(f"{Colors.BLUE}{'='*60}{Colors.NC}")
    
    if len(sys.argv) == 1:
        # 默认检查 skills 目录
        skills_dir = Path('skills')
        if not skills_dir.exists():
            print_error("当前目录下找不到 skills/ 目录")
            print("用法：python validate-frontmatter.py <SKILL.md 文件路径>")
            sys.exit(1)
        
        skill_files = list(skills_dir.glob('*/SKILL.md'))
        if not skill_files:
            print_warning("在 skills/ 目录下没有找到 SKILL.md 文件")
            sys.exit(0)
        
        print(f"\n发现 {len(skill_files)} 个 Skill 文件\n")
        
        results = []
        for skill_file in skill_files:
            result = validate_skill_file(str(skill_file))
            results.append(result)
        
        # 汇总
        print(f"\n{Colors.BLUE}{'='*60}{Colors.NC}")
        print(f"{Colors.BLUE}验证汇总{Colors.NC}")
        print(f"{Colors.BLUE}{'='*60}{Colors.NC}")
        passed = sum(results)
        total = len(results)
        print(f"通过：{passed}/{total}")
        
        if passed == total:
            print_success("所有 Skills 验证通过！")
            sys.exit(0)
        else:
            print_error(f"{total - passed} 个 Skills 验证失败")
            sys.exit(1)
    
    else:
        # 检查指定的文件
        results = []
        for file_path in sys.argv[1:]:
            result = validate_skill_file(file_path)
            results.append(result)
        
        if all(results):
            print_success("所有文件验证通过！")
            sys.exit(0)
        else:
            print_error("有文件验证失败")
            sys.exit(1)

if __name__ == '__main__':
    main()
