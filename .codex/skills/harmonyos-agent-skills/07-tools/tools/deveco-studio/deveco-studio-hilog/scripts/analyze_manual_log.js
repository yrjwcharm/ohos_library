#!/usr/bin/env node
/**
 * HarmonyOS模拟器手动保存日志分析脚本（跨平台版本）
 *
 * 自动查找、解压和分析HarmonyOS模拟器手动保存的日志。
 * 它会查找DevEco Studio日志目录，查找最新的bugreport文件，解压bugreport文件，
 * 解压SystemLog文件夹中的.gz日志，并显示日志摘要信息。
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');
const { execSync } = require('child_process');

const SCRIPT_DIR = __dirname;

const COLORS = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m',
};

function printBanner() {
    console.log(`${COLORS.cyan}=== HarmonyOS 模拟器手动保存日志分析 ===${COLORS.reset}`);
}

function printColor(message, color) {
    const c = COLORS[color] || COLORS.white;
    console.log(`${c}${message}${COLORS.reset}`);
}

/**
 * 读取配置文件（优先从 deveco-studio-emulator skill 读取）
 */
function getConfig() {
    const scriptDir = path.resolve(SCRIPT_DIR, '..');
    const emulatorConfigFile = path.join(scriptDir, '..', 'deveco-studio-emulator', 'scripts', 'config.json');

    if (fs.existsSync(emulatorConfigFile)) {
        try {
            const config = JSON.parse(fs.readFileSync(emulatorConfigFile, 'utf-8'));
            printColor(`已加载配置文件: ${emulatorConfigFile}`, 'cyan');
            return config;
        } catch (e) {
            printColor(`警告: 配置文件格式错误: ${e.message}`, 'yellow');
        }
    }

    const localConfigFile = path.join(scriptDir, 'config.json');
    if (fs.existsSync(localConfigFile)) {
        try {
            const config = JSON.parse(fs.readFileSync(localConfigFile, 'utf-8'));
            printColor(`已加载配置文件: ${localConfigFile}`, 'cyan');
            return config;
        } catch (e) {
            printColor(`警告: 配置文件格式错误: ${e.message}`, 'yellow');
        }
    }

    printColor('提示: 未找到配置文件，将使用环境变量或自动查找', 'cyan');
    printColor('提示: 请运行 node ../deveco-studio-emulator/scripts/setup.js 初始化配置', 'yellow');
    return null;
}

/**
 * 查找DevEco Studio日志目录
 */
function findDevecoLogDir(version) {
    if (version) {
        let logDir;
        if (process.platform === 'win32') {
            logDir = path.join(process.env.LOCALAPPDATA || '', 'Huawei', `DevEcoStudio${version}`, 'log');
        } else if (process.platform === 'darwin') {
            logDir = path.join(os.homedir(), 'Library', 'Huawei', `DevEcoStudio${version}`, 'log');
        } else {
            logDir = path.join(os.homedir(), '.local', 'share', 'Huawei', `DevEcoStudio${version}`, 'log');
        }

        if (fs.existsSync(logDir)) {
            return logDir;
        }
        return null;
    }

    let logDirs;
    if (process.platform === 'win32') {
        const localappdata = process.env.LOCALAPPDATA || '';
        logDirs = [
            path.join(localappdata, 'Huawei', 'DevEcoStudio7.0', 'log'),
            path.join(localappdata, 'Huawei', 'DevEcoStudio6.1', 'log'),
            path.join(localappdata, 'Huawei', 'DevEcoStudio', 'log'),
        ];
    } else if (process.platform === 'darwin') {
        logDirs = [
            path.join(os.homedir(), 'Library', 'Huawei', 'DevEcoStudio7.0', 'log'),
            path.join(os.homedir(), 'Library', 'Huawei', 'DevEcoStudio6.1', 'log'),
            path.join(os.homedir(), 'Library', 'Huawei', 'DevEcoStudio', 'log'),
        ];
    } else {
        logDirs = [
            path.join(os.homedir(), '.local', 'share', 'Huawei', 'DevEcoStudio7.0', 'log'),
            path.join(os.homedir(), '.local', 'share', 'Huawei', 'DevEcoStudio6.1', 'log'),
            path.join(os.homedir(), '.local', 'share', 'Huawei', 'DevEcoStudio', 'log'),
        ];
    }

    for (const logDir of logDirs) {
        if (fs.existsSync(logDir)) {
            return logDir;
        }
    }

    return null;
}

/**
 * 解压zip文件
 */
function extractZip(zipFile, extractDir) {
    try {
        if (process.platform === 'win32') {
            execSync(`powershell -Command "Expand-Archive -Path '${zipFile}' -DestinationPath '${extractDir}' -Force"`, { stdio: 'pipe' });
        } else {
            execSync(`unzip -o "${zipFile}" -d "${extractDir}"`, { stdio: 'pipe' });
        }
        return true;
    } catch (e) {
        printColor(`错误: 解压失败: ${e.message}`, 'red');
        return false;
    }
}

/**
 * 解压目录中的.gz文件
 */
function extractGzFiles(directory) {
    const gzFiles = fs.readdirSync(directory).filter(f => f.endsWith('.gz'));

    if (gzFiles.length === 0) {
        return { success: true, totalFiles: 0, successCount: 0, failCount: 0 };
    }

    printColor(`  找到 ${gzFiles.length} 个.gz文件`, 'cyan');

    let successCount = 0;
    let failCount = 0;

    for (const gzFile of gzFiles) {
        const gzFilePath = path.join(directory, gzFile);
        const outputFile = gzFilePath.slice(0, -3);

        try {
            const compressed = fs.readFileSync(gzFilePath);
            const decompressed = zlib.gunzipSync(compressed);
            fs.writeFileSync(outputFile, decompressed);
            printColor(`  解压成功: ${path.basename(outputFile)}`, 'green');
            successCount++;
        } catch (e) {
            printColor(`  解压失败: ${gzFile}: ${e.message}`, 'red');
            failCount++;
        }
    }

    printColor(`  解压完成: 成功 ${successCount} 个，失败 ${failCount} 个`, 'green');

    return {
        success: true,
        totalFiles: gzFiles.length,
        successCount,
        failCount,
    };
}

/**
 * 在文件中查找错误信息
 */
function findErrorsInFile(filePath, patterns) {
    if (!fs.existsSync(filePath)) {
        return [];
    }

    if (!patterns) {
        patterns = [/Error/, /error/, /ERROR/, /Exception/, /exception/, /EXCEPTION/];
    }

    const errors = [];
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            for (const pattern of patterns) {
                if (pattern.test(lines[i])) {
                    errors.push(`  [${i + 1}] ${lines[i].trim()}`);
                    break;
                }
            }
        }
    } catch (e) {
        printColor(`  读取文件失败: ${e.message}`, 'yellow');
    }

    return errors;
}

/**
 * 递归打印文件树
 */
function printFilesRecursive(directory, prefix) {
    prefix = prefix || '';
    let items;
    try {
        items = fs.readdirSync(directory).sort();
    } catch (e) {
        printColor(`无法读取目录: ${e.message}`, 'yellow');
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemPath = path.join(directory, item);
        const isLast = i === items.length - 1;
        const currentPrefix = isLast ? '└── ' : '├── ';
        const nextPrefix = isLast ? '    ' : '│   ';

        if (fs.statSync(itemPath).isDirectory()) {
            console.log(`${prefix}${currentPrefix}${item}/`);
            printFilesRecursive(itemPath, prefix + nextPrefix);
        } else {
            try {
                const size = fs.statSync(itemPath).size / 1024;
                console.log(`${prefix}${currentPrefix}${item} (${size.toFixed(2)} KB)`);
            } catch (e) {
                console.log(`${prefix}${currentPrefix}${item}`);
            }
        }
    }
}

function parseArgs() {
    const args = {
        devecoVersion: null,
        bugReportPath: null,
    };

    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        if (arg === '--deveco-version' && i + 1 < process.argv.length) {
            args.devecoVersion = process.argv[++i];
        } else if (arg === '--bug-report-path' && i + 1 < process.argv.length) {
            args.bugReportPath = process.argv[++i];
        }
    }

    return args;
}

function main() {
    const args = parseArgs();

    printBanner();
    printColor('');

    const logDir = findDevecoLogDir(args.devecoVersion);

    if (!logDir) {
        printColor('错误: 未找到DevEco Studio日志目录', 'red');
        printColor('请检查DevEco Studio是否正确安装', 'yellow');
        process.exit(1);
    }

    printColor(`找到日志目录: ${logDir}`, 'green');

    let bugReportFile;
    if (args.bugReportPath) {
        bugReportFile = path.join(logDir, args.bugReportPath);
        if (!fs.existsSync(bugReportFile)) {
            printColor(`错误: bugreport文件不存在: ${bugReportFile}`, 'red');
            process.exit(1);
        }
    } else {
        const bugReportFiles = fs.readdirSync(logDir).filter(
            f => f.startsWith('bugreport-') && f.endsWith('.zip')
        );
        if (bugReportFiles.length === 0) {
            printColor('错误: 未找到bugreport文件', 'red');
            printColor('请确保已手动保存过日志', 'yellow');
            process.exit(1);
        }

        const filesWithTime = bugReportFiles.map(f => {
            const filePath = path.join(logDir, f);
            return { mtime: fs.statSync(filePath).mtimeMs, name: f };
        });

        filesWithTime.sort((a, b) => b.mtime - a.mtime);
        bugReportFile = path.join(logDir, filesWithTime[0].name);
    }

    printColor(`找到bugreport文件: ${path.basename(bugReportFile)}`, 'green');

    const extractDir = path.join(logDir, 'bugreport_extracted');
    if (fs.existsSync(extractDir)) {
        fs.rmSync(extractDir, { recursive: true, force: true });
    }
    fs.mkdirSync(extractDir, { recursive: true });

    printColor('正在解压bugreport文件...', 'yellow');
    if (!extractZip(bugReportFile, extractDir)) {
        process.exit(1);
    }

    printColor('解压完成', 'green');

    const systemLogDir = path.join(extractDir, 'SystemLog');
    if (fs.existsSync(systemLogDir)) {
        printColor('');
        printColor('正在解压SystemLog...', 'yellow');

        extractGzFiles(systemLogDir);
        printColor('SystemLog解压完成', 'green');
    }

    printColor('');
    printColor('=== 日志摘要 ===', 'yellow');

    const detailsFile = path.join(extractDir, 'details.json');
    if (fs.existsSync(detailsFile)) {
        printColor('');
        printColor('--- 基本信息 ---', 'cyan');
        try {
            const details = JSON.parse(fs.readFileSync(detailsFile, 'utf-8'));
            for (const [key, value] of Object.entries(details)) {
                console.log(`  ${key}: ${value}`);
            }
        } catch (e) {
            printColor(`警告: 无法解析details.json: ${e.message}`, 'yellow');
        }
    }

    printColor('');
    printColor('=== 解压后的文件 ===', 'yellow');
    printFilesRecursive(extractDir);

    const reportFile = path.join(logDir, 'manual_log_analysis_report.txt');
    printColor('');
    printColor('=== 生成分析报告 ===', 'yellow');

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    let reportContent = 'HarmonyOS模拟器手动保存日志分析报告\n';
    reportContent += '=====================================\n\n';
    reportContent += `分析时间: ${now}\n`;
    reportContent += `日志目录: ${logDir}\n`;
    reportContent += `BugReport文件: ${path.basename(bugReportFile)}\n`;
    reportContent += `解压目录: ${extractDir}\n`;
    reportContent += '\n---\n\n';

    if (fs.existsSync(detailsFile)) {
        reportContent += '【基本信息】\n\n';
        try {
            const details = JSON.parse(fs.readFileSync(detailsFile, 'utf-8'));
            for (const [key, value] of Object.entries(details)) {
                reportContent += `${key}: ${value}\n`;
            }
        } catch (e) {
            reportContent += `无法解析details.json: ${e.message}\n`;
        }
        reportContent += '\n\n';
    }

    const emulatorLogFile = path.join(extractDir, 'Emulator.log');
    if (fs.existsSync(emulatorLogFile)) {
        reportContent += '【模拟器日志错误】\n\n';
        const errors = findErrorsInFile(emulatorLogFile);
        if (errors.length > 0) {
            reportContent += errors.slice(0, 20).join('\n');
            if (errors.length > 20) {
                reportContent += `\n  ... 还有 ${errors.length - 20} 条错误信息`;
            }
        } else {
            reportContent += '未找到错误信息\n';
        }
        reportContent += '\n\n';
    }

    const kernelLogFile = path.join(extractDir, 'kernel.log');
    if (fs.existsSync(kernelLogFile)) {
        reportContent += '【内核日志错误】\n\n';
        const errors = findErrorsInFile(kernelLogFile);
        if (errors.length > 0) {
            reportContent += errors.slice(0, 20).join('\n');
            if (errors.length > 20) {
                reportContent += `\n  ... 还有 ${errors.length - 20} 条错误信息`;
            }
        } else {
            reportContent += '未找到错误信息\n';
        }
        reportContent += '\n\n';
    }

    if (fs.existsSync(systemLogDir)) {
        reportContent += '【SystemLog错误】\n\n';
        const logFiles = fs.readdirSync(systemLogDir).filter(f => f.endsWith('.log'));
        if (logFiles.length > 0) {
            for (const logFile of logFiles.slice(0, 5)) {
                const logFilePath = path.join(systemLogDir, logFile);
                reportContent += `文件: ${logFile}\n`;
                const errors = findErrorsInFile(logFilePath);
                if (errors.length > 0) {
                    reportContent += errors.slice(0, 10).join('\n');
                    if (errors.length > 10) {
                        reportContent += `\n  ... 还有 ${errors.length - 10} 条错误信息`;
                    }
                } else {
                    reportContent += '  未找到错误信息\n';
                }
                reportContent += '\n';
            }
        } else {
            reportContent += '未找到日志文件\n';
        }
        reportContent += '\n\n';
    }

    try {
        fs.writeFileSync(reportFile, reportContent, 'utf-8');
        printColor(`分析报告已保存到: ${reportFile}`, 'green');
    } catch (e) {
        printColor(`保存报告失败: ${e.message}`, 'yellow');
    }

    const screenshotFile = path.join(extractDir, 'screenshot.png');
    if (fs.existsSync(screenshotFile)) {
        printColor('');
        printColor('=== 截图 ===', 'yellow');
        printColor(`截图文件: ${screenshotFile}`, 'cyan');
        printColor('可以使用图片查看器打开截图', 'yellow');
    }

    printColor('');
    printColor('分析完成！', 'green');
    printColor(`解压目录: ${extractDir}`, 'cyan');
    printColor(`分析报告: ${reportFile}`, 'cyan');
}

main();