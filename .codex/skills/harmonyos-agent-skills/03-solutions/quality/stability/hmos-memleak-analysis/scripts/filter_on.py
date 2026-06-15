#!/usr/bin/env python3
"""
HarmonyOS Memory Leak Detection Tool - For ArkTS/JS File Event Listener Module Checker

This script is part of the appcheck-memleak skill for analyzing HarmonyOS applications
to detect potential memory leaks caused by unmatched event listeners.

Usage:
    python filter_on.py <directory> [--json] [--output=<file>]
    
Integration:
    This script can be called from the main skill analyzer to detect JS/TS/ArkTS
    event listener memory leaks as part of a comprehensive memory leak analysis.
"""

import os
import sys
import argparse
import json
import re
from pathlib import Path
from typing import List, Tuple, Dict, Any, Optional

def white_list(pre_part: str) -> bool:
    """Check if the object is in the whitelist (known safe cases)"""
    white_list = ["netCon", "netConnection", "netConn"]
    for white in white_list:
        if white in pre_part:
            return True
    return False

def missing_off(func_line: List[str], code_path: str) -> List[List[Any]]:
    on_list = []
    off_list = []
    match = False
    result = []
    in_function = False
    flag = 0
    
    # 识别类/组件/函数的起始位置
    for num, line in enumerate(func_line, start=1):
        stripped_line = line.strip()
        
        # 检测是否进入了组件/函数内部
        if (any(keyword in stripped_line for keyword in ["class ", "struct ", "interface ", "function ", "build()", "aboutToDisappear()"]) or
            (re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*\s*\(', stripped_line) and not stripped_line.startswith("//"))):
            in_function = True
        
        # 跳过注释行
        if stripped_line.startswith("//") or stripped_line.startswith("/*") or stripped_line.startswith("*"):
            continue
            
        # 检测.on()事件注册
        if ".on(" in line and in_function:
            issue_num = num
            # 找到.on()语句的完整内容
            if ")" in line:
                on_part = line.rsplit(")", 1)[0]
            else:
                on_part = line
                
            pre_part = on_part.split(".on")[0].strip()
            key_part = on_part.split("on(")[-1].strip()
            
            # 检查是否在白名单中
            if white_list(pre_part):
                continue

            # 解析事件类型和回调函数
            if "," in key_part:
                key_part = key_part.split(",", 1)
                key = key_part[0].strip().strip('"\'')
                value = key_part[1].strip() if len(key_part) > 1 else ""
            else:
                key = key_part.strip().strip('"\'')
                value = ""
                
            # 处理复杂表达式，如 emitter.on({...})
            if key == "{" and "emitter" in line:
                flag = 1
                
            # 过滤掉变量引用（以$开头的）
            if not key.startswith("$") and key != "":
                on_list.append([code_path, issue_num, pre_part, key, value, line.strip()])

        # 处理多行.on()语句（用于emitter.on({...})情况）
        if flag == 2:
            flag = 0
            if ":" in line:
                key = line.split(":")[1].strip().strip(',').strip('"\'')
                if key and on_list:
                    on_list[-1][3] = key
                    
        if flag == 1:
            flag = 2

        # 检测unregisterEvent调用（另一种取消事件注册的方式）
        if "unregisterEvent" in line:
            issue_num = num
            if ")" in line:
                on_part = line.rsplit(")", 1)[0]
            else:
                on_part = line
                
            pre_part = on_part.split("unregisterEvent(")[0].strip()
            key_part = on_part.split("unregisterEvent(")[-1].strip()
            
            if "," in key_part:
                key_part = key_part.split(",", 1)
                key = key_part[0].strip().strip('"\'')
                value = key_part[1].strip() if len(key_part) > 1 else ""
            else:
                key = key_part.strip().strip('"\'')
                value = ""
                
            off_list.append([code_path, issue_num, pre_part, key, value, line.strip()])

        # 检测.off()事件取消注册
        if ".off(" in line and in_function:
            issue_num = num
            if ")" in line:
                on_part = line.rsplit(")", 1)[0]
            else:
                on_part = line
                
            pre_part = on_part.split(".off")[0].strip()
            key_part = on_part.split("off(")[-1].strip()
            
            if "," in key_part:
                key_part = key_part.split(",", 1)
                key = key_part[0].strip().strip('"\'')
                value = key_part[1].strip() if len(key_part) > 1 else ""
            else:
                key = key_part.strip().strip('"\'')
                value = ""
                
            off_list.append([code_path, issue_num, pre_part, key, value, line.strip()])
    
    # 匹配检测：查找有.on()但没有对应.off()的事件
    if on_list and off_list:
        for on in on_list:
            matched = False
            for off in off_list:
                # 检查是否是同一个对象且事件类型匹配
                if (on[2] == off[2] and on[3] == off[3]) or \
                   (on[3] in off[3] or off[3] in on[3]):  # 部分匹配
                    matched = True
                    break
            if not matched:
                result.append(on)
    elif on_list and not off_list:
        result = on_list
        
    return result


def mismatch_off(func_line, code_path):
    pass



def analyze_file(file_path: Path) -> List[List[Any]]:
    """
    分析单个文件中的事件监听器
    
    Args:
        file_path: 文件路径
        
    Returns:
        发现的潜在内存泄漏问题列表
    """
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            code_lines = f.readlines()
        return missing_off(code_lines, str(file_path))
    except Exception as e:
        print(f"process {file_path} error: {e}")
        return []

def search_code(code_dir: str, output_format: str = "console", output_file: Optional[str] = None) -> Dict[str, Any]:
    """
    搜索指定目录中的JS/TS文件，检测可能存在内存泄漏的.on()事件注册
    
    Args:
        code_dir: 要扫描的代码目录路径
        output_format: 输出格式 ("console", "json", "skill")
        output_file: 输出文件路径（可选）
        
    Returns:
        分析结果字典
    """
    # 支持的文件扩展名
    supported_extensions = ['.js', '.ts', '.ets', '.jsx', '.tsx']
    
    final_results = []
    processed_items = set()  # 用于去重
    stats = {
        'total_files': 0,
        'scanned_files': 0,
        'issues_found': 0
    }
    
    # 扫描目录
    for root, dirs, files in os.walk(code_dir):
        for file in files:
            file_ext = os.path.splitext(file)[1].lower()
            if file_ext in supported_extensions:
                stats['total_files'] += 1
                file_path = Path(root) / file
                
                # 分析文件
                result = analyze_file(file_path)
                stats['scanned_files'] += 1
                
                # 去重并添加到结果中
                for item in result:
                    item_key = (item[0], item[1])  # 文件路径和行号作为唯一标识
                    if item_key not in processed_items:
                        final_results.append(item)
                        processed_items.add(item_key)
    
    stats['issues_found'] = len(final_results)
    
    # 格式化输出
    if output_format == "console":
        print_console_output(final_results, stats)
    elif output_format == "json":
        output_json_results(final_results, stats, output_file if output_file else "memleak_report.json")
    elif output_format == "skill":
        return format_skill_output(final_results, stats)
    
    return {
        'results': final_results,
        'stats': stats,
        'success': True
    }

def print_console_output(results: List[List[Any]], stats: Dict[str, Any]) -> None:
    """控制台输出结果"""
    print(f"\nscan summary: scan {stats['scanned_files']} files")
    print("=" * 50)
    
    if results:
        print(f"\nfind {len(results)} leaks:")
        print("=" * 80)
        
        for item in results:
            file_path, line_num, object_name, event_type, callback, code_line = item
            print(f"\nfilePath: {file_path}")
            print(f"lineNumber: {line_num}")
            print(f"object: {object_name}")
            print(f"eventType: {event_type}")
            print(f"code: {code_line}")
            print("-" * 40)
    else:
        print("\n No Found Leak!")

def output_json_results(results: List[List[Any]], stats: Dict[str, Any], output_file: str) -> None:
    """输出JSON格式结果"""
    json_results = {
        'scan_stats': stats,
        'issues': []
    }
    
    for item in results:
        file_path, line_num, object_name, event_type, callback, code_line = item
        json_results['issues'].append({
            'file': file_path,
            'line': line_num,
            'object': object_name,
            'event_type': event_type,
            'callback': callback,
            'code': code_line.strip(),
            'severity': 'high',
            'issue_type': 'Event Listener Memory Leak',
            'spec_reference': 'HarmonyOS_App_MemoryLeak_Specifications_arkts_js_api.md#1.3.8',
            'recommendation': '请在组件生命周期结束时（如aboutToDisappear()）调用对应的.off()方法取消事件监听',
            'fix_example': '''
// 在aboutToDisappear()中添加:
this.object.off('eventType', callback);
'''
        })
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(json_results, f, ensure_ascii=False, indent=2)
    print(f"\n结果已保存到 {output_file}")

def format_skill_output(results: List[List[Any]], stats: Dict[str, Any]) -> Dict[str, Any]:
    """
    格式化输出为skill集成格式
    
    Returns:
        适合skill处理的格式化结果
    """
    issues = []
    
    for item in results:
        file_path, line_num, object_name, event_type, callback, code_line = item
        
        # 根据事件类型确定严重程度
        severity = "Major"
        if any(window_event in event_type for window_event in 
               ["windowSizeChange", "keyboardHeightChange", "avoidAreaChange"]):
            severity = "Critical"
        elif event_type in ["foldStatusChange", "brightnessInfoChange"]:
            severity = "Major"
        else:
            severity = "Minor"
            
        issues.append({
            'severity': severity,
            'type': 'Lifecycle Subscription Leak',
            'file_path': file_path,
            'line_number': line_num,
            'technical_breakdown': f"""
对象 {object_name} 在第 {line_num} 行注册了事件监听器 '{event_type}'，但没有在组件生命周期结束时对应的 .off() 调用。

根据 HarmonyOS 内存泄漏规范:
- 所有的 window.on 接口需要在 aboutToDisappear 时主动调用 off 接口进行注销
- 开发者需要主动配对 .on/.off 使用，确保第一个参数 key 也要配对
- off 时注意不要 off 匿名函数，因为匿名函数函数名唯一，会造成与 on 不配对
""",
            'optimized_solution': f'''
// 在组件的 aboutToDisappear() 方法中添加:
if ({object_name}) {{
    {object_name}.off('{event_type}');
}}

// 或者，如果使用了具名回调函数:
const {event_type}Callback = (data) => {{
    // 处理事件
}};

// aboutToAppear() 中:
{object_name}.on('{event_type}', {event_type}Callback);

// aboutToDisappear() 中:
{object_name}.off('{event_type}', {event_type}Callback);
''',
            'spec_source': 'HarmonyOS_App_MemoryLeak_Specifications_arkts_js_api.md#1.3.8',
            'code_snippet': code_line.strip()
        })
    
    return {
        'analyzer': 'event_listener_memory_leak',
        'stats': stats,
        'issues': issues
    }


def main() -> None:
    """主函数 - 处理命令行参数并执行分析"""
    parser = argparse.ArgumentParser(
        description='HarmonyOS Memory Leak Detection Tool - Event Listener Module',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python filter_on.py ./src
  python filter_on.py ./src --json
  python filter_on.py ./src --json --output=custom_report.json
  python filter_on.py ./src --skill
        """
    )
    
    parser.add_argument('directory', help='要扫描的源代码目录')
    parser.add_argument('--json', action='store_true', help='输出JSON格式报告')
    parser.add_argument('--output', help='指定输出文件路径（仅用于JSON格式）')
    parser.add_argument('--skill', action='store_true', help='输出Skill集成格式')
    parser.add_argument('--version', action='version', version='%(prog)s 1.0')
    
    args = parser.parse_args()
    
    # 确定输出格式
    if args.skill:
        output_format = "skill"
    elif args.json:
        output_format = "json"
    else:
        output_format = "console"
    
    # 执行分析
    result = search_code(args.directory, output_format, args.output)
    
    # 对于skill格式，返回结果而不是打印
    if output_format == "skill":
        print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()