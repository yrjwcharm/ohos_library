# CPP_CRASH 故障模式库参考手册

> 本文件为 HarmonyOS/OpenHarmony Native Crash (CPP_CRASH) 故障分析技能的参考资料。
> 数据源文件: `references/cpp_crash_fault_patterns.json`

## 快速查找流程

分析 CPP_CRASH 日志时，按以下顺序提取关键字段：

1. 从日志中提取 `signo` → 定位信号类型（二级根因）
2. 从日志中提取 `code` → 定位具体子码（三级根因）
3. 从日志中提取 `address` → 辅助判断故障场景

## 信号分类速查表

| 信号 | 含义 | 常见场景 |
|------|------|----------|
| SIGILL | 非法指令 | 架构不兼容、损坏的二进制、指针校验失败 |
| SIGTRAP | 断点/陷阱 | 栈保护(brk)、调试断点、硬件断点 |
| SIGABRT | 主动终止 | abort()调用、assert失败、C++异常未捕获 |
| SIGBUS | 非法内存访问 | 地址未对齐、mmap文件截断、ECC硬件错误 |
| SIGFPE | 算术异常 | 除零、整数/浮点溢出 |
| SIGSEGV | 无效内存引用 | 空指针、野指针、缓冲区溢出、写只读内存 |
| SIGSTKFLT | 栈错误 | 递归过深（现代系统少见，通常表现为SIGSEGV） |
| SIGSYS | 非法系统调用 | Seccomp沙箱拦截 |

## 详细故障模式

---

### SIGILL — 非法指令

进程执行了非法、格式错误、未知或特权指令。

| si_code | 名称 | 说明 |
|---------|------|------|
| ILL_ILLOPC | 非法操作码 | CPU读到无法解析的机器码（如不支持的ISA扩展指令） |
| ILL_ILLOPN | 非法操作数 | 指令使用了不正确的操作数或操作数类型错误 |
| ILL_ILLADR | 非法地址 | 解码阶段的无效内存地址访问（区别于SIGSEGV的执行阶段） |
| ILL_ILLTRP | 非法陷阱 | 尝试执行非法的陷阱指令或未定义操作 |
| ILL_PRVOPC | 特权操作码 | 用户态尝试执行特权指令 |
| ILL_PRVREG | 特权寄存器 | 用户态尝试访问特权寄存器 |
| ILL_COPROC | 协处理器异常 | 使用未定义的协处理器指令 |
| ILL_BADSTK | 无效堆栈 | 在无效堆栈地址操作或堆栈溢出 |
| ILL_ILLPACCFI | 指针校验失败 | PAC/CFI指针校验机制失败 |

**排查要点**: 检查目标设备CPU架构与编译产物是否匹配；关注地址附近的反汇编指令。

---

### SIGTRAP — 断点或陷阱

异常或trap指令发生。

| si_code | 名称 | 说明 |
|---------|------|------|
| TRAP_BRKPT | 软件断点 | 栈保护校验插入brk强制中止，或调试软件断点 |
| TRAP_TRACE | 单步调试 | 单步执行模式触发 |
| TRAP_BRANCH | 分支跟踪 | 分支指令跟踪触发 |
| TRAP_HWBKPT | 硬件断点 | CPU硬件断点触发 |

**排查要点**: TRAP_BRKPT 最常见，通常是栈保护(stack canary)检测到栈被破坏后主动触发brk中止。

---

### SIGABRT — 进程主动终止

进程调用 `abort()` 主动终止。

| si_code | 名称 | 说明 |
|---------|------|------|
| SIGABRT | 应用主动终止 | 进程自身调用abort()，常见于assert失败、C++未捕获异常 |

**排查要点**: 关注abort前的日志输出；检查是否有assert/CHECK宏失败；排查C++ `std::terminate` 调用链。

---

### SIGBUS — 非法内存访问

进程访问了对齐错误或不存在的物理地址。

| si_code | 名称 | 说明 |
|---------|------|------|
| BUS_ADRALN | 地址对齐错误 | 在非x86架构上访问未对齐内存（原子指令对齐要求） |
| BUS_ADRERR | 非法内存地址 | mmap区域文件被截断或物理内存不存在 |
| BUS_OBJERR | 对象访问错误 | mmap文件大小与访问地址不一致 |
| BUS_MCEERR_AR | 硬件内存错误(必须处理) | ECC校验发现无法纠正的内存损坏 |
| BUS_MCEERR_AO | 硬件内存错误(可选处理) | 通知进程某处内存坏了但当前未访问 |

**排查要点**: ARM架构对齐要求严格；BUS_ADRERR 常见于mmap文件被其他进程截断；MCEERR 指向硬件问题。

---

### SIGFPE — 浮点/算术异常

进程执行了错误的算术运算。

| si_code | 名称 | 说明 |
|---------|------|------|
| FPE_INTDIV | 整数除零 | 整数除法除数为零 |
| FPE_INTOVF | 整数溢出 | 整数运算结果超出范围 |
| FPE_FLTDIV | 浮点除零 | 浮点除法除数为零 |
| FPE_FLTOVF | 浮点上溢 | 浮点结果超出上限 |
| FPE_FLTUND | 浮点下溢 | 浮点结果小于下限 |
| FPE_FLTRES | 浮点结果未定义 | 浮点运算结果未定义 |
| FPE_FLTINV | 无效浮点操作 | 无效浮点运算（如NaN参与运算） |
| FPE_FLTSUB | 浮点越界 | 浮点运算结果越界 |

**排查要点**: 最常见是整数除零 FPE_INTDIV；检查除法运算前是否有除数校验。

---

### SIGSEGV — 无效内存引用

进程访问了无效内存引用，**最常见的崩溃类型**。

| si_code | 名称 | 说明 |
|---------|------|------|
| SEGV_MAPERR | 地址未映射 | 访问不存在或未映射的内存地址（空指针、野指针、内存泄漏） |
| SEGV_ACCERR | 权限错误 | 映射存在但读写权限不符（写只读段、执行数据段、缓冲区溢出） |

**排查要点**:
- `address` 接近 0 → 空指针解引用
- `address` 为极大值或随机值 → 野指针 / Use-After-Free
- SEGV_ACCERR → 检查是否修改了字符串常量或只读映射区域

---

### SIGSTKFLT — 栈错误

处理器执行了错误的栈操作。在现代Linux/ARM上基本废弃。

| si_code | 名称 | 说明 |
|---------|------|------|
| SIGSTKFLT | 递归调用过深 | 协处理器栈错误，栈溢出通常触发SIGSEGV而非此信号 |

---

### SIGSYS — 非法系统调用

非法的系统调用。

| si_code | 名称 | 说明 |
|---------|------|------|
| Seccomp | Seccomp拦截 | 沙箱Seccomp策略拦截了不允许的系统调用 |

**排查要点**: 检查Seccomp过滤规则；确认应用是否调用了沙箱策略禁止的系统调用号。

---

## 日志匹配模式

### SysEvent 匹配模板
```
name_：CPP_CRASH
REASON：signal（signo={SIGNAL}，code={SI_CODE}, address）
```

### AppEvent 匹配模板
```
name：APP_CRASH
crash_type：NativeCrash
exception: signal（signo={SIGNAL}，code={SI_CODE}, address）
```

## 使用方式

技能在分析日志时应：

1. **正则提取**: 从日志中提取 `signo=XXX` 和 `code=XXX`
2. **查表定位**: 用 `lookup` 表通过 si_code 快速定位到具体故障条目
3. **输出根因**: 按 `一级根因 → 二级根因 → 三级根因` 层级输出根因链
4. **给出建议**: 结合排查要点和故障描述给出修复建议
