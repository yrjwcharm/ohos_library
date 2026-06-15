# 测试提示词

## 基础功能测试

### 测试场景 1：运行 entry 模块所有测试并生成覆盖率报告
**提示词**：
```
运行 entry 模块的所有测试用例并生成覆盖率报告
```

**预期输出**：
- 调用 `run_instrument_test.py` 脚本，参数包括 `--project-path`、`--module entry` 和 `--coverage`
- 返回成功状态和测试报告路径

### 测试场景 2：运行指定测试套件，禁用覆盖率
**提示词**：
```
对 ability.test.ets 中的测试套件 ActsAbilityTest 执行测试，不收集覆盖率
```

**预期输出**：
- 调用脚本，参数包括 `--project-path`、`--module entry`、`--scope ActsAbilityTest` 和 `--no-coverage`
- 返回成功状态和测试结果文件路径

## 边界条件测试

### 测试场景 3：运行多个模块测试
**提示词**：
```
运行 entry 和 feature 模块的测试，启用 ASan 检测
```

**预期输出**：
- 调用脚本，参数包括 `--project-path`、`--module entry,feature` 和 `--asan`
- 返回成功状态和两个模块的测试报告

### 测试场景 4：指定超时时间
**提示词**：
```
运行 entry 模块测试，超时时间设为 600 秒
```

**预期输出**：
- 调用脚本，参数包括 `--project-path`、`--module entry` 和 `--timeout 600`
- 返回成功状态

## 错误处理测试

### 测试场景 5：项目路径不存在
**提示词**：
```
在 /nonexistent/path 运行 instrument test
```

**预期输出**：
- 调用脚本，参数 `--project-path /nonexistent/path`
- 返回错误状态，提示项目路径无效或找不到 hvigorw

### 测试场景 6：模块不存在
**提示词**：
```
运行 nonexistent 模块的测试
```

**预期输出**：
- 调用脚本，参数包括 `--project-path` 和 `--module nonexistent`
- 返回错误状态，提示模块不存在或构建失败