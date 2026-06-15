#!/usr/bin/env node
/**
 * 解压指定目录中的所有 .gz 文件（跨平台兼容）
 *
 * 使用方法:
 *     node extract_gz.js <目录路径>
 *
 * 支持 Windows/macOS/Linux
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/**
 * 解压指定目录下的所有 .gz 文件
 * @param {string} sourceDir 包含 .gz 文件的目录路径
 * @returns {object} 包含解压结果的字典
 */
function decompressGzFiles(sourceDir) {
    const result = {
        success: false,
        directory: sourceDir,
        totalFiles: 0,
        successCount: 0,
        failCount: 0,
        files: [],
    };

    if (!fs.existsSync(sourceDir)) {
        result.error = `目录不存在: ${sourceDir}`;
        result.message = `错误: ${result.error}`;
        return result;
    }

    const stat = fs.statSync(sourceDir);
    if (!stat.isDirectory()) {
        result.error = `不是目录: ${sourceDir}`;
        result.message = `错误: ${result.error}`;
        return result;
    }

    const gzFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.gz'));

    if (gzFiles.length === 0) {
        result.message = `未找到 .gz 文件在: ${sourceDir}`;
        result.success = true;
        return result;
    }

    result.totalFiles = gzFiles.length;

    for (const gzFile of gzFiles) {
        const gzFilePath = path.join(sourceDir, gzFile);
        const outputFile = gzFilePath.slice(0, -3);

        const fileResult = {
            gzFile: gzFile,
            outputFile: path.basename(outputFile),
            success: false,
            error: null,
            originalSize: 0,
            outputSize: 0,
        };

        try {
            const originalSize = fs.statSync(gzFilePath).size;

            const compressed = fs.readFileSync(gzFilePath);
            const decompressed = zlib.gunzipSync(compressed);
            fs.writeFileSync(outputFile, decompressed);

            const outputSize = fs.statSync(outputFile).size;

            fileResult.success = true;
            fileResult.originalSize = originalSize;
            fileResult.outputSize = outputSize;
            result.successCount++;
        } catch (e) {
            fileResult.error = e.message;
            result.failCount++;
        }

        result.files.push(fileResult);
    }

    result.success = true;
    result.message = `完成: 成功 ${result.successCount} 个, 失败 ${result.failCount} 个`;

    return result;
}

function main() {
    if (process.argv.length < 3) {
        console.log('用法: extract_gz.js <目录路径>');
        console.log('示例:');
        console.log('  Windows:  node extract_gz.js D:\\logs\\emulator_log_extracted\\SystemLog');
        console.log('  macOS/Linux:  node extract_gz.js /tmp/emulator_log_extracted/SystemLog');
        process.exit(1);
    }

    const directory = process.argv[2];

    console.log('='.repeat(60));
    console.log('开始解压 .gz 文件');
    console.log('='.repeat(60));
    console.log(`目标目录: ${directory}`);
    console.log();

    const result = decompressGzFiles(directory);

    if (result.success) {
        console.log(`找到 ${result.totalFiles} 个 .gz 文件`);
        console.log('-'.repeat(60));

        for (const fileInfo of result.files) {
            console.log(`解压: ${fileInfo.gzFile}`);
            if (fileInfo.success) {
                console.log(`  ✓ 成功 -> ${fileInfo.outputFile}`);
                console.log(`  压缩大小: ${fileInfo.originalSize.toLocaleString()} 字节`);
                console.log(`  解压后大小: ${fileInfo.outputSize.toLocaleString()} 字节`);
            } else {
                console.log(`  ✗ 失败: ${fileInfo.error}`);
            }
            console.log();
        }

        console.log('-'.repeat(60));
        console.log(result.message);
    } else {
        console.log(`错误: ${result.error || '未知错误'}`);
    }

    if (process.argv.includes('--json')) {
        console.log('\n' + JSON.stringify(result, null, 2));
    }

    process.exit(result.success ? 0 : 1);
}

main();