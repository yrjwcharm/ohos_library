#!/usr/bin/env node
/**
 * HarmonyOS模拟器崩溃日志分析脚本（跨平台版本）
 *
 * 自动解压和分析HarmonyOS模拟器的崩溃日志。
 * 它会查找最新的崩溃报告文件，解压崩溃报告，解压hilog_tmp_xxx文件夹中的.gz日志，
 * 并显示崩溃摘要信息。
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
    console.log(`${COLORS.cyan}=== HarmonyOS 模拟器崩溃日志分析 ===${COLORS.reset}`);
}

function printColor(message, color) {
    const c = COLORS[color] || COLORS.white;
    console.log(`${c}${message}${COLORS.reset}`);
}

function normalizePath(p) {
    if (!p) return null;
    return path.resolve(p);
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
 * 自动查找模拟器实例路径
 */
function findEmulatorInstance() {
    printColor('正在查找模拟器实例路径...', 'yellow');

    const envPath = process.env.EMULATOR_INSTANCE_PATH;
    if (envPath && fs.existsSync(envPath)) {
        printColor(`从环境变量找到实例路径: ${envPath}`, 'green');
        return envPath;
    }

    const config = getConfig();
    if (config && config.emulatorInstancePath) {
        const configPath = config.emulatorInstancePath;
        if (configPath && fs.existsSync(configPath)) {
            printColor(`从配置文件找到实例路径: ${configPath}`, 'green');
            return configPath;
        } else {
            printColor(`警告: 配置文件中的实例路径不存在: ${configPath}`, 'yellow');
        }
    }

    if (config && config.emulatorDeployPath) {
        const deployPath = config.emulatorDeployPath;
        if (deployPath && fs.existsSync(deployPath)) {
            const instances = fs.readdirSync(deployPath).filter(d =>
                fs.statSync(path.join(deployPath, d)).isDirectory()
            );
            if (instances.length > 0) {
                printColor(`从配置文件找到部署路径: ${deployPath}`, 'green');
                printColor('找到以下模拟器实例:', 'cyan');
                instances.forEach(i => printColor(`  - ${i}`, 'white'));
                printColor('');
                printColor('请使用 --instance-path 参数指定实例路径', 'yellow');
                const firstInstance = path.join(deployPath, instances[0]);
                printColor(`例如: node analyze_crash_log.js --instance-path "${firstInstance}"`, 'cyan');
                return null;
            }
        }
    }

    const platform = process.platform;
    let commonPaths;
    if (platform === 'win32') {
        const localappdata = process.env.LOCALAPPDATA || '';
        const userprofile = process.env.USERPROFILE || '';
        commonPaths = [
            path.join(localappdata, 'Huawei', 'emulator', 'deployed'),
            path.join(userprofile, 'Huawei', 'emulator', 'deployed'),
            path.join(userprofile, 'emu', 'deployed'),
        ];
    } else if (platform === 'darwin') {
        commonPaths = [
            path.join(os.homedir(), 'Library', 'Huawei', 'emulator', 'deployed'),
            path.join(os.homedir(), 'Huawei', 'emulator', 'deployed'),
        ];
    } else {
        commonPaths = [
            path.join(os.homedir(), '.local', 'share', 'Huawei', 'emulator', 'deployed'),
            path.join(os.homedir(), 'Huawei', 'emulator', 'deployed'),
        ];
    }

    for (const basePath of commonPaths) {
        if (fs.existsSync(basePath)) {
            const instances = fs.readdirSync(basePath).filter(d =>
                fs.statSync(path.join(basePath, d)).isDirectory()
            );
            if (instances.length > 0) {
                printColor('找到以下模拟器实例:', 'cyan');
                instances.forEach(i => printColor(`  - ${i}`, 'white'));
                printColor('');
                printColor('请使用 --instance-path 参数指定实例路径', 'yellow');
                const firstInstance = path.join(basePath, instances[0]);
                printColor(`例如: node analyze_crash_log.js --instance-path "${firstInstance}"`, 'cyan');
                return null;
            }
        }
    }

    printColor('未找到模拟器实例路径', 'red');
    printColor('请使用 --instance-path 参数指定实例路径，或运行 setup.js 生成配置文件', 'yellow');
    return null;
}

/**
 * 验证实例路径
 */
function testInstancePath(p) {
    p = normalizePath(p);

    if (!p) {
        printColor('错误: 实例路径为空', 'red');
        return false;
    }

    printColor(`验证实例路径: ${p}`, 'yellow');

    if (!fs.existsSync(p)) {
        printColor(`错误: 实例路径不存在: ${p}`, 'red');
        printColor('');
        printColor('调试信息:', 'yellow');
        printColor('  请检查路径是否正确', 'white');
        printColor('  请确保你有访问该路径的权限', 'white');
        return false;
    }

    if (!fs.statSync(p).isDirectory()) {
        printColor(`错误: 路径不是目录: ${p}`, 'red');
        return false;
    }

    printColor('实例路径验证成功', 'green');
    return true;
}

/**
 * 查找崩溃日志目录
 */
function findCrashLogDir(instancePath) {
    instancePath = normalizePath(instancePath);

    if (!instancePath) {
        printColor('错误: 实例路径为空', 'red');
        return null;
    }

    const possiblePaths = [
        path.join(instancePath, 'Log', 'crash_report'),
        path.join(instancePath, 'log', 'crash_report'),
    ];

    for (const p of possiblePaths) {
        printColor(`检查路径: ${p}`, 'cyan');
        if (fs.existsSync(p)) {
            printColor(`找到崩溃日志目录: ${p}`, 'green');
            return p;
        }
    }

    printColor('错误: 未找到崩溃日志目录', 'red');
    printColor('');
    printColor('已尝试的路径:', 'yellow');
    possiblePaths.forEach(p => printColor(`  - ${p}`, 'white'));
    printColor('');
    printColor('调试信息:', 'yellow');
    printColor('  请检查实例路径下是否存在 Log/crash_report 目录', 'white');
    printColor('  请确保模拟器已发生过崩溃', 'white');
    return null;
}

/**
 * 查找崩溃报告文件
 */
function findCrashReportFile(crashLogDir, crashReportPath) {
    if (crashReportPath) {
        const crashReportFile = path.join(crashLogDir, crashReportPath);
        if (fs.existsSync(crashReportFile)) {
            printColor(`找到指定的崩溃报告文件: ${crashReportPath}`, 'green');
            return crashReportFile;
        } else {
            printColor(`错误: 指定的崩溃报告文件不存在: ${crashReportFile}`, 'red');
            return null;
        }
    }

    printColor('查找最新的崩溃报告文件...', 'yellow');
    const crashReportFiles = fs.readdirSync(crashLogDir).filter(
        f => f.startsWith('crash_report-') && f.endsWith('.zip')
    );

    if (crashReportFiles.length === 0) {
        printColor('错误: 未找到崩溃报告文件', 'red');
        printColor('');
        printColor('调试信息:', 'yellow');
        printColor('  请确保崩溃报告文件存在', 'white');
        printColor('  崩溃报告文件格式: crash_report-YYYY-MM-DDTHHMMSS.zip', 'white');
        return null;
    }

    const filesWithTime = crashReportFiles.map(f => {
        const filePath = path.join(crashLogDir, f);
        return { mtime: fs.statSync(filePath).mtimeMs, name: f };
    });

    filesWithTime.sort((a, b) => b.mtime - a.mtime);
    const latestFile = filesWithTime[0].name;
    const latestFilePath = path.join(crashLogDir, latestFile);

    printColor(`找到最新的崩溃报告文件: ${latestFile}`, 'green');
    const fileSize = fs.statSync(latestFilePath).size / 1024;
    printColor(`文件大小: ${fileSize.toFixed(2)} KB`, 'cyan');
    printColor(`修改时间: ${new Date(filesWithTime[0].mtime).toISOString()}`, 'cyan');

    return latestFilePath;
}

/**
 * 解压zip文件（使用系统命令或内置模块）
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
        printColor('');
        printColor('调试信息:', 'yellow');
        printColor('  请检查文件是否损坏', 'white');
        printColor('  请检查是否有足够的磁盘空间', 'white');
        printColor('  请检查是否有写入权限', 'white');
        return false;
    }
}

/**
 * 解压目录中的.gz文件
 */
function extractGzFiles(directory) {
    const gzFiles = fs.readdirSync(directory).filter(f => f.endsWith('.gz'));

    if (gzFiles.length === 0) {
        return { success: true, totalFiles: 0, successCount: 0, failCount: 0, files: [] };
    }

    printColor(`  找到 ${gzFiles.length} 个.gz文件`, 'cyan');

    let successCount = 0;
    let failCount = 0;
    const filesInfo = [];

    for (const gzFile of gzFiles) {
        const gzFilePath = path.join(directory, gzFile);
        const outputFile = gzFilePath.slice(0, -3);

        const fileInfo = { gzFile, success: false, error: null };

        try {
            const compressed = fs.readFileSync(gzFilePath);
            const decompressed = zlib.gunzipSync(compressed);
            fs.writeFileSync(outputFile, decompressed);
            printColor(`  解压成功: ${path.basename(outputFile)}`, 'green');
            successCount++;
            fileInfo.success = true;
        } catch (e) {
            printColor(`  解压失败: ${gzFile}: ${e.message}`, 'red');
            failCount++;
            fileInfo.error = e.message;
        }

        filesInfo.push(fileInfo);
    }

    printColor(`  解压完成: 成功 ${successCount} 个，失败 ${failCount} 个`, 'green');

    return {
        success: true,
        totalFiles: gzFiles.length,
        successCount,
        failCount,
        files: filesInfo,
    };
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
        instancePath: null,
        crashReportPath: null,
        noAutoFind: false,
    };

    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        if (arg === '--instance-path' && i + 1 < process.argv.length) {
            args.instancePath = process.argv[++i];
        } else if (arg === '--crash-report-path' && i + 1 < process.argv.length) {
            args.crashReportPath = process.argv[++i];
        } else if (arg === '--no-auto-find') {
            args.noAutoFind = true;
        }
    }

    return args;
}

function main() {
    const args = parseArgs();

    printBanner();
    printColor('');

    let instancePath = args.instancePath;
    if (!instancePath) {
        if (!args.noAutoFind) {
            instancePath = findEmulatorInstance();
            if (!instancePath) {
                process.exit(1);
            }
        } else {
            printColor('错误: 请提供实例路径或使用自动查找', 'red');
            process.exit(1);
        }
    }

    if (!testInstancePath(instancePath)) {
        process.exit(1);
    }

    instancePath = normalizePath(instancePath);

    const crashLogDir = findCrashLogDir(instancePath);
    if (!crashLogDir) {
        process.exit(1);
    }

    const crashReportFile = findCrashReportFile(crashLogDir, args.crashReportPath);
    if (!crashReportFile) {
        process.exit(1);
    }

    const extractDir = path.join(crashLogDir, 'crash_report_extracted');
    printColor('');
    printColor(`创建解压目录: ${extractDir}`, 'yellow');

    if (fs.existsSync(extractDir)) {
        printColor('删除旧的解压目录...', 'cyan');
        fs.rmSync(extractDir, { recursive: true, force: true });
    }

    fs.mkdirSync(extractDir, { recursive: true });

    printColor('');
    printColor('正在解压崩溃报告...', 'yellow');
    if (!extractZip(crashReportFile, extractDir)) {
        process.exit(1);
    }

    printColor('解压完成', 'green');

    const hilogDirs = fs.readdirSync(extractDir).filter(
        d => d.startsWith('hilog_tmp_') && fs.statSync(path.join(extractDir, d)).isDirectory()
    );
    if (hilogDirs.length > 0) {
        printColor('');
        printColor('正在解压hilog日志...', 'yellow');

        for (const dirName of hilogDirs) {
            const hilogDir = path.join(extractDir, dirName);
            printColor(`  解压目录: ${dirName}`, 'cyan');
            extractGzFiles(hilogDir);
        }

        printColor('hilog日志解压完成', 'green');
    }

    printColor('');
    printColor('=== 崩溃摘要 ===', 'yellow');

    const detailsFile = path.join(extractDir, 'details.txt');
    if (fs.existsSync(detailsFile)) {
        printColor('');
        printColor('--- 崩溃详情 ---', 'cyan');
        try {
            console.log(fs.readFileSync(detailsFile, 'utf-8'));
        } catch (e) {
            printColor(`读取文件失败: ${e.message}`, 'yellow');
        }
    }

    const reproductionFile = path.join(extractDir, 'reproductionsteps.txt');
    if (fs.existsSync(reproductionFile)) {
        printColor('');
        printColor('--- 崩溃前的操作 ---', 'cyan');
        try {
            console.log(fs.readFileSync(reproductionFile, 'utf-8'));
        } catch (e) {
            printColor(`读取文件失败: ${e.message}`, 'yellow');
        }
    }

    printColor('');
    printColor('=== 解压后的文件 ===', 'yellow');
    printFilesRecursive(extractDir);

    const reportFile = path.join(crashLogDir, 'crash_analysis_report.txt');
    printColor('');
    printColor('=== 生成分析报告 ===', 'yellow');

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    let reportContent = 'HarmonyOS模拟器崩溃日志分析报告\n';
    reportContent += '====================================\n\n';
    reportContent += `分析时间: ${now}\n`;
    reportContent += `实例路径: ${instancePath}\n`;
    reportContent += `崩溃报告: ${path.basename(crashReportFile)}\n`;
    reportContent += `解压目录: ${extractDir}\n`;
    reportContent += '\n---\n\n';

    if (fs.existsSync(detailsFile)) {
        reportContent += '[崩溃详情]\n\n';
        try {
            reportContent += fs.readFileSync(detailsFile, 'utf-8');
        } catch (e) { /* ignore */ }
        reportContent += '\n\n';
    }

    if (fs.existsSync(reproductionFile)) {
        reportContent += '[崩溃前的操作]\n\n';
        try {
            reportContent += fs.readFileSync(reproductionFile, 'utf-8');
        } catch (e) { /* ignore */ }
        reportContent += '\n\n';
    }

    try {
        fs.writeFileSync(reportFile, reportContent, 'utf-8');
        printColor(`分析报告已保存到: ${reportFile}`, 'green');
    } catch (e) {
        printColor(`保存报告失败: ${e.message}`, 'yellow');
    }

    printColor('');
    printColor('分析完成！', 'green');
    printColor(`解压目录: ${extractDir}`, 'cyan');
    printColor(`分析报告: ${reportFile}`, 'cyan');
}

main();