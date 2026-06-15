#!/usr/bin/env python3
"""
优化后的文档切分脚本，解决以下问题：
1. 移除二级标题，避免章节编号混乱
2. 重新编号章节，使其连续
3. 标准化字段格式
4. 添加API索引
"""

import re
from pathlib import Path

def split_and_renumber_specifications(input_file, output_capi_file, output_arkts_jsapi_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    
    # 找到章节边界
    section1_start = -1
    section2_start = -1
    for i, line in enumerate(lines):
        if line.startswith('## 1. 内存泄漏案例'):
            section1_start = i
        elif line.startswith('## 2.'):
            section2_start = i
            break
    
    if section1_start < 0:
        print('错误: 找不到第1章')
        return
    
    section1_lines = lines[section1_start:section2_start] if section2_start > 0 else lines[section1_start:]
    section2_lines = lines[section2_start:] if section2_start > 0 else []
    
    # 移除二级标题（保留主标题"## 1. 内存泄漏案例"）
    section1_lines = [line for line in section1_lines if not (line.startswith('## ') and line != '## 1. 内存泄漏案例')]
    
    # 收集章节并分类
    capi_chapters = []
    arkts_jsapi_chapters = []
    
    current_chapter = []
    current_lang_type = None
    in_code_block = False
    
    for line in section1_lines:
        if line.startswith('###'):
            if current_chapter and current_lang_type:
                if current_lang_type == 'C-API':
                    capi_chapters.append(current_chapter)
                elif current_lang_type == 'ArkTS-API':
                    arkts_jsapi_chapters.append(current_chapter)
            
            current_chapter = [line]
            current_lang_type = None
        elif line.startswith('## ') and not line.startswith('## 1.'):
            # 跳过二级标题，不开始新章节
            if current_chapter and current_lang_type:
                if current_lang_type == 'C-API':
                    capi_chapters.append(current_chapter)
                elif current_lang_type == 'ArkTS-API':
                    arkts_jsapi_chapters.append(current_chapter)
            current_chapter = []
            current_lang_type = None
        else:
            if current_chapter:  # 只在章节内容存在时才添加行
                if '```' in line:
                    in_code_block = not in_code_block
                
                if not in_code_block and '**语言类型:**' in line:
                    match = re.search(r'\*\*语言类型:\*\*\s*(.+)', line)
                    if match:
                        current_lang_type = match.group(1).strip()
                
                current_chapter.append(line)
    
    # 处理最后一个章节
    if current_chapter and current_lang_type:
        if current_lang_type == 'C-API':
            capi_chapters.append(current_chapter)
        elif current_lang_type == 'ArkTS-API':
            arkts_jsapi_chapters.append(current_chapter)
    
    # 重新编号章节
    def renumber_chapters(chapters):
        renumbered = []
        for i, chapter in enumerate(chapters, 1):
            new_chapter = []
            header_modified = False
            for line in chapter:
                if line.startswith('###') and not header_modified:
                    # 提取API名称
                    match = re.search(r'###\s+\d+\.\d+\.\d+\s+(.+)', line)
                    if match:
                        api_name = match.group(1)
                        new_header = f'### {i}. {api_name}'
                        new_chapter.append(new_header)
                        header_modified = True
                    else:
                        # 如果没有匹配到，保持原样
                        new_chapter.append(line)
                elif line.startswith('## ') and not line.startswith('## 1.'):
                    # 跳过二级标题
                    continue
                else:
                    new_chapter.append(line)
            renumbered.append('\n'.join(new_chapter))
        return renumbered
    
    capi_renumbered = renumber_chapters(capi_chapters)
    arkts_jsapi_renumbered = renumber_chapters(arkts_jsapi_chapters)
    
    # 生成API索引
    def generate_index(chapters, api_type):
        index_lines = ['## API索引\n', '### 按首字母排序\n']
        api_names = []
        for chapter in chapters:
            match = re.search(r'###\s+\d+\.\s+(.+)', chapter)
            if match:
                api_names.append(match.group(1))
        
        api_names.sort()
        for name in api_names:
            index_lines.append(f'- {name}')
        
        return '\n'.join(index_lines)
    
    # 组装最终内容
    section2_content = '\n'.join(section2_lines) if section2_lines else ''
    
    capi_content = '## 1. 内存泄漏案例\n\n' + '\n\n'.join(capi_renumbered)
    capi_content += '\n\n' + generate_index(capi_renumbered, 'C-API')
    if section2_content:
        capi_content += '\n\n' + section2_content
    
    arkts_jsapi_content = '## 1. 内存泄漏案例\n\n' + '\n\n'.join(arkts_jsapi_renumbered)
    arkts_jsapi_content += '\n\n' + generate_index(arkts_jsapi_renumbered, 'ArkTS/JS API')
    if section2_content:
        arkts_jsapi_content += '\n\n' + section2_content
    
    # 写入文件
    with open(output_capi_file, 'w', encoding='utf-8') as f:
        f.write(capi_content)
    
    with open(output_arkts_jsapi_file, 'w', encoding='utf-8') as f:
        f.write(arkts_jsapi_content)
    
    print(f'C-API 规范已生成: {output_capi_file}')
    print(f'ArkTS/JS API 规范已生成: {output_arkts_jsapi_file}')
    print(f'C-API 章节数: {len(capi_chapters)}')
    print(f'ArkTS/JS API 章节数: {len(arkts_jsapi_chapters)}')

if __name__ == '__main__':
    script_dir = Path(__file__).parent
    input_file = script_dir / 'HarmonyOS_App_MemoryLeak_Specifications.md'
    output_capi_file = script_dir / 'HarmonyOS_App_MemoryLeak_Specifications_c_api.md'
    output_arkts_jsapi_file = script_dir / 'HarmonyOS_App_MemoryLeak_Specifications_arkts_js_api.md'
    
    split_and_renumber_specifications(input_file, output_capi_file, output_arkts_jsapi_file)
