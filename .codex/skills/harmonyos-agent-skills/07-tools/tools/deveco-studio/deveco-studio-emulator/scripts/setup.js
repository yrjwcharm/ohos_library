#!/usr/bin/env node
/**
 * HarmonyOS DevEco Studio Configuration Assistant
 * Finds DevEco Studio installation path and generates config file
 * Supports Windows/macOS/Linux, persists config to config.json
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const readline = require('readline');

const SCRIPT_DIR = __dirname;

/**
 * 获取配置文件路径
 * @returns {string} config.json 的完整路径
 */
function getConfigFile() {
    return path.join(SCRIPT_DIR, 'config.json');
}

/**
 * 加载现有配置
 * @returns {object|null} 配置对象，不存在或解析失败返回 null
 */
function loadExistingConfig() {
    const configFile = getConfigFile();

    if (!fs.existsSync(configFile)) {
        return null;
    }

    try {
        const content = fs.readFileSync(configFile, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        console.log(`Warning: Failed to read config file: ${e.message}`);
        return null;
    }
}

/**
 * 保存配置到 config.json
 * @param {object} config 配置对象
 * @returns {boolean} 是否保存成功
 */
function saveConfig(config) {
    const configFile = getConfigFile();

    try {
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf-8');
        console.log(`\n[OK] Config saved to: ${configFile}`);
        return true;
    } catch (e) {
        console.log(`\n[ERROR] Failed to save config: ${e.message}`);
        return false;
    }
}

/**
 * 查找 DevEco Studio 安装路径
 * 按平台搜索常见安装位置
 * @returns {string|null} 安装路径，未找到返回 null
 */
function findDevecoStudio() {
    const platform = process.platform;

    // Windows 常见安装路径
    const windowsPaths = [
        path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Huawei', 'DevEco Studio'),
        'C:\\Program Files\\Huawei\\DevEco Studio',
        'C:\\Program Files (x86)\\Huawei\\DevEco Studio',
        'D:\\Program Files\\Huawei\\DevEco Studio',
        'E:\\Program Files\\Huawei\\DevEco Studio',
        'E:\\Huawei\\DevEco Studio',
        path.join(process.env.LOCALAPPDATA || '', 'Huawei', 'DevEco Studio'),
    ];

    // macOS 路径
    const macosPaths = [
        '/Applications/DevEco-Studio.app/Contents',
        '/Users/Shared/Applications/DevEco-Studio.app/Contents',
    ];

    // Linux 路径
    const linuxPaths = [
        '/opt/Huawei/DevEco Studio',
        path.join(os.homedir(), 'Huawei', 'DevEco Studio'),
    ];

    let searchPaths;
    if (platform === 'win32') {
        searchPaths = windowsPaths;
    } else if (platform === 'darwin') {
        searchPaths = macosPaths;
    } else {
        searchPaths = linuxPaths;
    }

    for (const p of searchPaths) {
        if (fs.existsSync(p)) {
            return p;
        }
    }

    return null;
}

/**
 * 获取 emulator 可执行文件路径
 * @param {string} devecoPath DevEco Studio 安装路径
 * @returns {string|null} emulator 路径
 */
function getEmulatorPath(devecoPath) {
    if (!devecoPath) {
        return null;
    }

    if (process.platform === 'win32') {
        return path.join(devecoPath, 'tools', 'emulator', 'emulator.exe');
    } else {
        return path.join(devecoPath, 'tools', 'emulator', 'emulator');
    }
}

/**
 * 获取 DevEco Studio 自带的 Node.js 可执行文件路径
 * @param {string} devecoPath DevEco Studio 安装路径
 * @returns {string|null} Node.js 路径
 */
function getNodePath(devecoPath) {
    if (!devecoPath) {
        return null;
    }

    if (process.platform === 'win32') {
        return path.join(devecoPath, 'tools', 'node', 'node.exe');
    } else {
        return path.join(devecoPath, 'tools', 'node', 'node');
    }
}

/**
 * 获取 hdc 可执行文件路径
 * 在多个可能目录中递归搜索 hdc.exe / hdc
 * @param {string} devecoPath DevEco Studio 安装路径
 * @returns {string|null} hdc 路径
 */
function getHdcPath(devecoPath) {
    if (!devecoPath) {
        return null;
    }

    // 尝试多个可能的路径
    const possiblePaths = [
        path.join(devecoPath, 'sdk', 'default', 'openharmony', 'toolchains'),
        path.join(devecoPath, 'hmscore'),
    ];

    for (const basePath of possiblePaths) {
        if (fs.existsSync(basePath)) {
            const result = findFileRecursive(basePath, (file) => {
                const lower = file.toLowerCase();
                return lower === 'hdc.exe' || lower === 'hdc';
            });
            if (result) {
                return result;
            }
        }
    }

    return null;
}

/**
 * 递归搜索目录中的文件
 * @param {string} dir 搜索起始目录
 * @param {function} predicate 文件匹配函数
 * @returns {string|null} 匹配的文件完整路径
 */
function findFileRecursive(dir, predicate) {
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isFile() && predicate(entry.name)) {
                return fullPath;
            }
            if (entry.isDirectory()) {
                const result = findFileRecursive(fullPath, predicate);
                if (result) {
                    return result;
                }
            }
        }
    } catch (e) {
        // Skip directories we can't read
    }
    return null;
}

/**
 * 列出可用的模拟器实例
 * @param {string} emulatorPath emulator 可执行文件路径
 * @returns {string[]} 模拟器实例名称列表
 */
function listEmulators(emulatorPath) {
    if (!emulatorPath || !fs.existsSync(emulatorPath)) {
        return [];
    }

    try {
        const result = execSync(`"${emulatorPath}" -list`, {
            encoding: 'utf-8',
            timeout: 10000,
            stdio: ['pipe', 'pipe', 'pipe'],
        });
        return result.trim().split('\n').filter(Boolean);
    } catch (e) {
        console.log(`Error listing emulators: ${e.message}`);
    }

    return [];
}

/**
 * 查找模拟器部署路径
 * 优先从 emulator -list -details 获取，失败则回退到硬编码路径
 * @param {string} emulatorPath emulator 可执行文件路径
 * @returns {string|null} 部署路径
 */
function findEmulatorDeployPath(emulatorPath) {
    // 优先从 emulator.exe -list -details 获取
    if (emulatorPath && fs.existsSync(emulatorPath)) {
        try {
            const result = execSync(`"${emulatorPath}" -list -details`, {
                encoding: 'utf-8',
                timeout: 10000,
                stdio: ['pipe', 'pipe', 'pipe'],
            });
            try {
                const instances = JSON.parse(result);
                if (instances && Array.isArray(instances) && instances.length > 0) {
                    // 统计每个父目录的出现次数
                    const parentDirs = {};
                    for (const instance of instances) {
                        const instancePath = instance.instancePath || '';
                        if (instancePath) {
                            // 获取父目录（去掉实例名）
                            const parentDir = path.normalize(path.dirname(instancePath));
                            parentDirs[parentDir] = (parentDirs[parentDir] || 0) + 1;
                        }
                    }

                    // 选择出现次数最多的父目录
                    const entries = Object.entries(parentDirs);
                    if (entries.length > 0) {
                        entries.sort((a, b) => b[1] - a[1]);
                        return entries[0][0];
                    }
                }
            } catch (e) {
                // JSON parse failed, fall through
            }
        } catch (e) {
            console.log(`Error getting emulator deploy path from emulator.exe: ${e.message}`);
        }
    }

    // 回退到硬编码路径查找
    const platform = process.platform;

    // Windows 常见部署路径
    const windowsPaths = [
        path.join(process.env.LOCALAPPDATA || '', 'Huawei', 'emulator', 'deployed'),
        path.join(process.env.USERPROFILE || '', 'Huawei', 'emulator', 'deployed'),
        path.join(process.env.USERPROFILE || '', 'emu', 'deployed'),
    ];

    // macOS 路径
    const macosPath = path.join(os.homedir(), 'Library', 'Huawei', 'emulator', 'deployed');

    // Linux 路径
    const linuxPaths = [
        path.join(os.homedir(), '.local', 'share', 'Huawei', 'emulator', 'deployed'),
        path.join(os.homedir(), 'Huawei', 'emulator', 'deployed'),
    ];

    let searchPaths;
    if (platform === 'win32') {
        searchPaths = windowsPaths;
    } else if (platform === 'darwin') {
        searchPaths = [macosPath];
    } else {
        searchPaths = linuxPaths;
    }

    for (const p of searchPaths) {
        if (fs.existsSync(p)) {
            return p;
        }
    }

    return null;
}

/**
 * 获取临时文件目录路径
 * @returns {string} 临时目录路径
 */
function getTempPath() {
    if (process.platform === 'win32') {
        // Windows 优先使用 TEMP 环境变量
        const temp = process.env.TEMP || process.env.TMP || 'C:\\Temp';
        if (!fs.existsSync(temp)) {
            fs.mkdirSync(temp, { recursive: true });
        }
        return temp;
    } else {
        // macOS/Linux 使用 /tmp
        return '/tmp';
    }
}

/**
 * 生成 config.json 配置文件
 * @param {string} devecoPath DevEco Studio 安装路径
 * @param {string} emulatorPath emulator 路径
 * @param {string} hdcPath hdc 路径
 * @param {string} deployPath 模拟器部署路径
 * @param {string} nodePath Node.js 路径
 * @returns {boolean} 是否生成成功
 */
function generateConfig(devecoPath, emulatorPath, hdcPath, deployPath, nodePath) {
    const config = {
        devecoStudioPath: devecoPath || '',
        emulatorPath: emulatorPath || '',
        hdcPath: hdcPath || '',
        nodePath: nodePath || '',
        emulatorInstancePath: '',
        emulatorDeployPath: deployPath || '',
        tempPath: getTempPath(),
        _comment: {
            devecoStudioPath: 'DevEco Studio installation path',
            emulatorPath: 'Emulator executable path',
            hdcPath: 'HDC executable path',
            nodePath: 'Node.js executable path (bundled with DevEco Studio)',
            emulatorInstancePath: 'Emulator instance path (optional, specify at runtime)',
            emulatorDeployPath: 'Emulator deployment directory',
            tempPath: 'Temporary file directory',
        },
        _usage: [
            'Config priority: Environment variables > config.json > Auto-detection',
            'Supported environment variables: DEVECO_STUDIO_PATH, EMULATOR_PATH, HDC_PATH, NODE_PATH, EMULATOR_INSTANCE_PATH, EMULATOR_DEPLOY_PATH, TEMP_PATH',
        ],
    };

    const configFile = getConfigFile();

    try {
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf-8');
        console.log(`\n[OK] Config file generated: ${configFile}`);
        return true;
    } catch (e) {
        console.log(`\n[ERROR] Failed to generate config file: ${e.message}`);
        return false;
    }
}

/**
 * 解析命令行参数
 * @returns {object} { devecoPath, force, useExisting }
 */
function parseArgs() {
    const args = {
        devecoPath: null,
        force: false,
        useExisting: false,
    };

    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        if (arg === '--force') {
            args.force = true;
        } else if (arg === '--use-existing') {
            args.useExisting = true;
        } else if (arg === '--deveco-path' && i + 1 < process.argv.length) {
            args.devecoPath = process.argv[++i];
        }
    }

    return args;
}

/**
 * 交互式询问用户输入
 * @param {string} query 提示文字
 * @returns {Promise<string>} 用户输入（已转为大写）
 */
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer.trim().toUpperCase());
        });
    });
}

async function main() {
    // 解析命令行参数
    const args = parseArgs();

    console.log('HarmonyOS DevEco Studio Configuration Assistant');
    console.log('='.repeat(60));

    let existingConfig = null;
    let useExisting = false;

    // 检查现有配置
    if (!args.force) {
        existingConfig = loadExistingConfig();
        if (existingConfig) {
            console.log('\n[OK] Found existing config:');
            console.log(`  DevEco Studio: ${existingConfig.devecoStudioPath || 'N/A'}`);
            console.log(`  Emulator: ${existingConfig.emulatorPath || 'N/A'}`);
            console.log(`  HDC: ${existingConfig.hdcPath || 'N/A'}`);
            console.log(`  Deploy path: ${existingConfig.emulatorDeployPath || 'N/A'}`);

            if (args.useExisting) {
                useExisting = true;
            } else {
                console.log('\nUse existing config?');
                console.log(' [Y] Yes - Use existing config');
                console.log(' [N] No - Reconfigure');

                let choice;
                try {
                    if (process.stdin.isTTY) {
                        choice = await askQuestion('Choose [Y/N]: ');
                    } else {
                        choice = 'Y';
                    }
                } catch (e) {
                    console.log('\nCancelled');
                    return;
                }

                if (choice === 'Y') {
                    useExisting = true;
                } else if (choice === 'N') {
                    console.log('\nWill reconfigure...');
                    existingConfig = null;
                } else {
                    useExisting = true;
                }
            }
        } else {
            console.log('\nNo existing config found, will run full configuration');
            existingConfig = null;
        }
    }

    // 如果选择使用现有配置，验证现有配置的有效性
    if (useExisting && existingConfig) {
        // 验证现有配置
        const devecoPath = existingConfig.devecoStudioPath;
        const emulatorPath = existingConfig.emulatorPath;
        const hdcPath = existingConfig.hdcPath;
        const deployPath = existingConfig.emulatorDeployPath;

        let configValid = true;

        if (devecoPath && !fs.existsSync(devecoPath)) {
            console.log(`\n[ERROR] DevEco Studio path does not exist: ${devecoPath}`);
            configValid = false;
        }

        if (emulatorPath && !fs.existsSync(emulatorPath)) {
            console.log(`\n[ERROR] Emulator path does not exist: ${emulatorPath}`);
            configValid = false;
        }

        if (hdcPath && !fs.existsSync(hdcPath)) {
            console.log(`\n[ERROR] HDC path does not exist: ${hdcPath}`);
            configValid = false;
        }

        if (configValid) {
            console.log('\n[OK] Existing config is valid, using existing config');
            console.log(`  DevEco Studio: ${devecoPath}`);
            console.log(`  Emulator: ${emulatorPath}`);
            console.log(`  HDC: ${hdcPath}`);
            if (deployPath) {
                console.log(`  Deploy path: ${deployPath}`);
            }

            if (saveConfig(existingConfig)) {
                console.log('\nConfig file updated');
            }
            return;
        } else {
            console.log('\n[ERROR] Existing config is invalid, need to reconfigure');
            existingConfig = null;
        }
    }

    let devecoPath;
    // 查找 DevEco Studio
    if (args.devecoPath) {
        // 使用用户提供的路径
        devecoPath = args.devecoPath;
        if (fs.existsSync(devecoPath)) {
            console.log(`[OK] Using specified DevEco Studio path: ${devecoPath}`);
        } else {
            console.log(`[ERROR] Specified path does not exist: ${devecoPath}`);
            return;
        }
    } else {
        // 自动查找
        devecoPath = findDevecoStudio();
        if (devecoPath) {
            console.log(`[OK] Found DevEco Studio: ${devecoPath}`);
        } else {
            console.log('[ERROR] DevEco Studio installation path not found');
            console.log('Please use --deveco-path parameter to specify the path, or ensure DevEco Studio is installed correctly');
            console.log('');
            console.log('Examples:');
            console.log('  Windows: node setup.js --deveco-path "C:\\Program Files\\Huawei\\DevEco Studio"');
            console.log('  macOS:   node setup.js --deveco-path "/Applications/DevEco-Studio.app/Contents"');
            console.log('  Linux:   node setup.js --deveco-path "/opt/Huawei/DevEco Studio"');
            return;
        }
    }

    // 获取 emulator 路径
    const emulatorPath = getEmulatorPath(devecoPath);
    if (emulatorPath && fs.existsSync(emulatorPath)) {
        console.log(`[OK] Emulator path: ${emulatorPath}`);
    } else {
        console.log('[ERROR] Emulator tool not found');
    }

    // 获取 hdc 路径
    const hdcPath = getHdcPath(devecoPath);
    if (hdcPath && fs.existsSync(hdcPath)) {
        console.log(`[OK] HDC path: ${hdcPath}`);
    } else {
        console.log('[ERROR] HDC tool not found');
    }

    // 获取 Node.js 路径（DevEco Studio 自带）
    const nodePath = getNodePath(devecoPath);
    if (nodePath && fs.existsSync(nodePath)) {
        console.log(`[OK] Node.js path: ${nodePath}`);
    } else {
        console.log('[ERROR] Node.js not found');
    }

    // 查找模拟器部署路径
    const deployPath = findEmulatorDeployPath(emulatorPath);
    if (deployPath) {
        console.log(`[OK] Emulator deploy path: ${deployPath}`);
    } else {
        console.log('[ERROR] Emulator deploy path not found');
    }

    // 获取临时路径
    const tempPath = getTempPath();
    console.log(`[OK] Temp path: ${tempPath}`);

    // 列出可用模拟器
    if (emulatorPath && fs.existsSync(emulatorPath)) {
        const emulators = listEmulators(emulatorPath);
        if (emulators.length > 0) {
            console.log(`\nAvailable emulators (${emulators.length}):`);
            emulators.forEach((emu, i) => {
                console.log(`  ${i + 1}. ${emu}`);
            });
        } else {
            console.log('\nNo available emulators found');
        }
    }

    console.log('\n' + '='.repeat(60));
    // 生成配置文件
    console.log('Generating config file...');
    if (generateConfig(devecoPath, emulatorPath, hdcPath, deployPath, nodePath)) {
        console.log('\nConfig file generated, subsequent scripts will automatically read the config.');
        console.log('To modify the config, edit the config.json file.');
    } else {
        console.log('\n[ERROR] Failed to generate config file');
    }

    console.log('\nTip: Add the following paths to PATH environment variable for global command usage:');
    if (emulatorPath) {
        console.log(`  - ${path.dirname(emulatorPath)}`);
    }
    if (hdcPath) {
        console.log(`  - ${path.dirname(hdcPath)}`);
    }
    if (nodePath) {
        console.log(`  - ${path.dirname(nodePath)}`);
    }

    console.log('\nConfig priority:');
    console.log('1. Environment variables > config.json > Auto-detection');
    console.log('2. config.json > Auto-detection');
    console.log('3. --use-existing parameter to skip path detection and use existing config');
    console.log('4. --force parameter to force re-configuration');
}

main();