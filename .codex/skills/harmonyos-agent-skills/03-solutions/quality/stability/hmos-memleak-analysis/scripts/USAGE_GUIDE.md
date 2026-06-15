# HarmonyOS Memory Leak Detection Skill - 使用指南

本指南详细说明如何在HarmonyOS开发流程中集成和使用内存泄漏检测技能。

## 快速开始

### 1. 基本使用

```bash
# 检测事件监听器内存泄漏
python scripts/filter_on.py ./src --json

# 完整内存泄漏分析
python scripts/skill_main.py ./src --language=arkts --output=report.json
```

### 2. 在开发流程中集成

#### Pre-commit 钩子

```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "检测内存泄漏..."
python scripts/filter_on.py ./src --json --output=memleak_check.json

# 检查是否有严重问题
critical_count=$(cat memleak_check.json | python -c "import sys, json; print(len([i for i in json.load(sys.stdin)['issues'] if i['severity'] == 'Critical']))")
if [ $critical_count -gt 0 ]; then
    echo "发现 $critical_count 个严重内存泄漏问题，请修复后提交！"
    exit 1
fi
```

#### CI/CD 集成 (GitHub Actions)

```yaml
name: Memory Leak Check
on: [push, pull_request]

jobs:
  memleak-check:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.8'
    
    - name: Run Memory Leak Detection
      run: |
        python scripts/skill_main.py ./src --output=memleak_report.json
    
    - name: Upload Results
      uses: actions/upload-artifact@v2
      with:
        name: memory-leak-report
        path: memleak_report.json
    
    - name: Check for Critical Issues
      run: |
        critical_count=$(cat memleak_report.json | python -c "import sys, json; print(json.load(sys.stdin)['summary']['critical_issues'])")
        if [ $critical_count -gt 0 ]; then
          echo "发现 $critical_count 个严重内存泄漏问题！"
          exit 1
        fi
```

## 技能集成示例

### 1. 作为分析工具使用

```python
# 在其他分析工具中集成
from scripts.skill_main import analyze_codebase, generate_report

def analyze_harmonyos_app(app_path):
    """分析HarmonyOS应用的内存泄漏"""
    result = analyze_codebase(app_path, language="arkts")
    
    if not result['success']:
        print(f"分析失败: {result.get('error')}")
        return None
    
    # 处理结果
    summary = result['summary']
    print(f"发现 {summary['critical_issues']} 个严重问题")
    print(f"发现 {summary['major_issues']} 个主要问题")
    print(f"发现 {summary['minor_issues']} 个次要问题")
    
    # 生成详细报告
    report_path = generate_report(result, f"{app_path}_memleak_report.json")
    return report_path

# 使用示例
app_path = "./my_harmonyos_app"
report = analyze_harmonyos_app(app_path)
```

### 2. 作为PR审查工具

```python
# 自动化PR审查
def review_pr_for_memleaks(pr_diff, repo_path):
    """审查PR中的内存泄漏问题"""
    result = analyze_codebase(repo_path, language="arkts")
    
    if result['summary']['critical_issues'] > 0:
        # 生成PR评论
        comment = generate_pr_comment(result)
        post_pr_comment(comment, pr_number)
        return False  # 不建议合并
    return True  # 建议合并

def generate_pr_comment(analysis_result):
    """生成PR评论内容"""
    summary = analysis_result['summary']
    issues = analysis_result['issues']
    
    comment = f"## 内存泄漏检测结果\n\n"
    comment += f"- 严重问题: {summary['critical_issues']}\n"
    comment += f"- 主要问题: {summary['major_issues']}\n"
    comment += f"- 次要问题: {summary['minor_issues']}\n\n"
    
    if summary['critical_issues'] > 0:
        comment += "### 严重问题需要修复:\n\n"
        for issue in issues[:5]:  # 只显示前5个
            if issue['severity'] == 'Critical':
                comment += f"- **{issue['file_path']}:{issue['line_number']}** - {issue['type']}\n"
                comment += f"  ```
                {issue['code_snippet']}
                ```\n"
    
    return comment
```

### 3. 与IDE集成

#### VSCode 扩展示例

```javascript
// VSCode扩展中的使用
const { execSync } = require('child_process');
const path = require('path');

function activate(context) {
    // 注册命令
    let disposable = vscode.commands.registerCommand('harmonyos.checkMemoryLeaks', () => {
        const workspaceFolder = vscode.workspace.workspaceFolders[0];
        const scriptPath = path.join(workspaceFolder.uri.fsPath, 'scripts/skill_main.py');
        
        try {
            const result = execSync(`python ${scriptPath} . --output=temp_report.json`);
            const report = JSON.parse(require('fs').readFileSync('temp_report.json', 'utf8'));
            
            // 显示结果
            showMemoryLeaksReport(report);
        } catch (error) {
            vscode.window.showErrorMessage(`内存泄漏检测失败: ${error.message}`);
        }
    });
    
    context.subscriptions.push(disposable);
}

function showMemoryLeaksReport(report) {
    const panel = vscode.window.createWebviewPanel(
        'memleakReport', '内存泄漏报告', vscode.ViewColumn.One
    );
    
    panel.webview.html = generateReportHtml(report);
}
```

## 高级用法

### 1. 自定义检测规则

```python
# 扩展检测规则
from scripts.filter_on import missing_off, white_list

def custom_white_list(pre_part):
    """自定义白名单"""
    # 添加自定义白名单逻辑
    if pre_part.startswith('this.safeObject'):
        return True
    return white_list(pre_part)

def custom_analysis(file_path):
    """自定义分析逻辑"""
    with open(file_path, 'r') as f:
        lines = f.readlines()
    
    # 使用增强的检测逻辑
    result = missing_off(lines, file_path)
    
    # 添加自定义后处理
    filtered_result = []
    for issue in result:
        # 自定义过滤逻辑
        if not should_ignore_issue(issue):
            filtered_result.append(issue)
    
    return filtered_result
```

### 2. 批量分析多个项目

```python
# 批量分析脚本
import os
from scripts.skill_main import analyze_codebase

def batch_analyze_projects(projects_dir):
    """批量分析多个项目"""
    results = {}
    
    for project_name in os.listdir(projects_dir):
        project_path = os.path.join(projects_dir, project_name)
        if os.path.isdir(project_path):
            print(f"分析项目: {project_name}")
            result = analyze_codebase(project_path)
            results[project_name] = result
            
            # 生成单独的报告
            report_path = os.path.join(project_path, 'memleak_report.json')
            generate_report(result, report_path)
    
    # 生成汇总报告
    summary_path = os.path.join(projects_dir, 'batch_analysis_summary.json')
    generate_batch_summary(results, summary_path)
    
    return results

def generate_batch_summary(results, output_path):
    """生成批量分析汇总"""
    summary = {
        'total_projects': len(results),
        'projects_with_issues': 0,
        'total_issues': 0,
        'breakdown': {}
    }
    
    for project_name, result in results.items():
        if result['success'] and result['summary']['critical_issues'] > 0:
            summary['projects_with_issues'] += 1
        
        summary['total_issues'] += result['summary']['critical_issues']
        summary['breakdown'][project_name] = result['summary']
    
    with open(output_path, 'w') as f:
        json.dump(summary, f, indent=2)
```

## 性能优化建议

1. **增量分析**: 只分析修改的文件
2. **缓存结果**: 缓存分析结果避免重复计算
3. **并行处理**: 对于大型项目使用多进程分析
4. **过滤规则**: 精细化白名单和过滤规则减少误报

## 故障排除

### 常见问题

1. **编码问题**: 确保源文件使用UTF-8编码
2. **权限问题**: 确保有读取源文件的权限
3. **依赖问题**: 确保Python环境和依赖正确安装

### 调试技巧

```bash
# 启用详细日志
python scripts/filter_on.py ./src --json --debug

# 分析单个文件
python scripts/filter_on.py ./src/main.ts --json --single-file

# 查看详细错误信息
python scripts/skill_main.py ./src --verbose
```

这个技能现在完全集成到您的HarmonyOS开发工作流中，可以有效地检测和预防内存泄漏问题。