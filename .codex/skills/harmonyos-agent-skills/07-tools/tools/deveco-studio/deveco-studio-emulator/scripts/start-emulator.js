const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// 常见的 DevEco Studio 安装路径（作为回退）
const COMMON_PATHS = [
    process.env.DEVECO_STUDIO_PATH,
    'D:\\AI\\DevEco Studio',
    'C:\\Program Files\\Huawei\\DevEco Studio',
    'D:\\Program Files\\Huawei\\DevEco Studio',
    'C:\\Users\\' + (process.env.USERNAME || 'user') + '\\AppData\\Local\\Huawei\\DevEco Studio',
];

/**
 * 从 config.json 读取配置
 * @returns {object|null} 配置对象
 */
function loadConfig() {
    const configPath = path.join(__dirname, 'config.json');
    if (fs.existsSync(configPath)) {
        try {
            const content = fs.readFileSync(configPath, 'utf-8');
            return JSON.parse(content);
        } catch (e) {
            console.log(`Warning: Failed to read config.json: ${e.message}`);
        }
    }
    return null;
}

/**
 * 查找 DevEco Studio 安装路径
 * 优先从环境变量和 config.json 获取，否则自动检测
 * @returns {string|null} 安装路径
 */
function findDevecoPath() {
    // 1. 优先使用环境变量
    if (process.env.DEVECO_STUDIO_PATH) {
        const emulatorPath = path.join(process.env.DEVECO_STUDIO_PATH, 'tools', 'emulator', 'Emulator.exe');
        if (fs.existsSync(emulatorPath)) {
            console.log(`[Config] 使用环境变量 DEVECO_STUDIO_PATH: ${process.env.DEVECO_STUDIO_PATH}`);
            return process.env.DEVECO_STUDIO_PATH;
        }
    }

    // 2. 从 config.json 获取
    const config = loadConfig();
    if (config && config.devecoStudioPath) {
        const emulatorPath = path.join(config.devecoStudioPath, 'tools', 'emulator', 'Emulator.exe');
        if (fs.existsSync(emulatorPath)) {
            console.log(`[Config] 使用 config.json 中的路径: ${config.devecoStudioPath}`);
            return config.devecoStudioPath;
        }
    }

    // 3. 自动检测常见路径
    for (const p of COMMON_PATHS) {
        if (!p) continue;
        const emulatorPath = path.join(p, 'tools', 'emulator', 'Emulator.exe');
        if (fs.existsSync(emulatorPath)) {
            console.log(`[Auto-detect] 自动检测到路径: ${p}`);
            return p;
        }
    }

    return null;
}

function startEmulator(instanceName = 'MyPhone') {
    const isWindows = process.platform === 'win32';
    
    // 查找 DevEco Studio 路径
    const devecoPath = findDevecoPath();
    if (!devecoPath) {
        console.error('错误: 未找到 DevEco Studio 安装路径');
        console.error('请先运行 node scripts/setup.js 配置路径');
        console.error('或设置环境变量 DEVECO_STUDIO_PATH');
        process.exit(1);
    }
    
    let emulatorPath;
    if (isWindows) {
        emulatorPath = path.join(devecoPath, 'tools', 'emulator', 'Emulator.exe');
    } else {
        emulatorPath = path.join(devecoPath, 'tools', 'emulator', 'emulator');
    }

    console.log(`启动模拟器: ${instanceName}`);
    console.log(`模拟器路径: ${emulatorPath}`);

    if (isWindows) {
        // 使用 start /B 命令启动，避免创建新窗口，保持进程独立
        const command = `start /B "" "${emulatorPath}" -start "${instanceName}"`;
        console.log(`执行命令: cmd.exe /c ${command}`);
        
        exec(command, {
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
        }, (error) => {
            if (error) {
                console.error(`启动失败: ${error.message}`);
                process.exit(1);
            }
        });
        
        // 1秒后立即退出，避免超时
        setTimeout(() => {
            console.log('启动命令已发送，模拟器正在启动中...');
            process.exit(0);
        }, 1000);
        
    } else {
        // macOS/Linux
        const command = `nohup "${emulatorPath}" -start "${instanceName}" > /dev/null 2>&1 &`;
        exec(command, (error) => {
            if (error) {
                console.error(`启动失败: ${error.message}`);
                process.exit(1);
            }
        });
        
        setTimeout(() => {
            console.log('启动命令已发送，模拟器正在启动中...');
            process.exit(0);
        }, 1000);
    }
}

if (require.main === module) {
    const instanceName = process.argv[2] || 'MyPhone';
    startEmulator(instanceName);
}

module.exports = { startEmulator };