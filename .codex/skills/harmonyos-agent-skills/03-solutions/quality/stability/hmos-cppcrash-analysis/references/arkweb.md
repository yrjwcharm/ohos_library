# arkweb 常见问题分析参考手册

---

## 一、libace_compatible.z.so（JSWebResourceRequest 空指针）

### 前置

cppcrash 堆栈

### 规则

```
#00 pc 0000000000b94e8c /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::RefPtr<OHOS::Ace::Kit::FrameNode>::operator=(OHOS::Ace::RefPtr<OHOS::Ace::Kit::FrameNode> const&)+60)(e396829cf06b76ec87ccc92d7e45e3ed)
#01 pc 0000000001072444 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::JSWebResourceRequest::SetLoadInterceptEvent(OHOS::Ace::LoadInterceptEvent const&)+44)(e396829cf06b76ec87ccc92d7e45e3ed)
#02 pc 00000000014a8d0c /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::LoadInterceptEventToJSValue(OHOS::Ace::LoadInterceptEvent const&)+164)(e396829cf06b76ec87ccc92d7e45e3ed)
```

1. 栈顶为：`/system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::RefPtr<OHOS::Ace::Kit::FrameNode>`
2. 01帧为：`/system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::JSWebResourceRequest::SetLoadInterceptEvent`
3. 02帧为：`/system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::LoadInterceptEventToJSValue`

### 结论

cppcrash 是 js 执行异常在执行 web 函数的时候导致传入参数为空，导致空指针异常崩溃，需要应用定位修复 js 异常

---

## 二、libace_compatible.z.so（JSWebConsoleLog 空指针）

### 前置

cppcrash 堆栈

### 规则

```
#00 pc 00000000009b95b4 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::RefPtr<OHOS::Ace::Kit::FrameNode>::operator=(OHOS::Ace::RefPtr<OHOS::Ace::Kit::FrameNode> const&)+84)(7910b530f4391dd5a1650e2fd77a1ceb)
#01 pc 000000000311e9c8 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::JSWebConsoleLog::SetMessage(OHOS::Ace::RefPtr<OHOS::Ace::WebConsoleLog> const&)+44)(7910b530f4391dd5a1650e2fd77a1ceb)
#02 pc 000000000311e8a8 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::LoadWebConsoleLogEventToJSValue(OHOS::Ace::LoadWebConsoleLogEvent const&)+160)(7910b530f4391dd5a1650e2fd77a1ceb)
```

1. 栈顶为：`/system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::RefPtr<OHOS::Ace::Kit::FrameNode>`
2. 01帧为：`/system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::JSWebConsoleLog::SetMessage`
3. 02帧为：`/system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Framework::LoadWebConsoleLogEventToJSValue`

### 结论

cppcrash 是 js 执行异常在执行 web 函数的时候导致传入参数为空，导致空指针异常崩溃，需要应用定位修复 js 异常

---

## 三、libarkweb_engine.so（FD 释放失败）

### 前置

cppcrash 堆栈

### 规则

```
#00 pc 00000000049ab650 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_LogMessage::Flush()+2204)(cb360cdd34137a03eaf44712f69f1fa4126e6698)
#01 pc 00000000049aad14 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_LogMessage::~PAC_LogMessage()+36)(cb360cdd34137a03eaf44712f69f1fa4126e6698)
#02 pc 00000000049abbc8 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_ErrnoLogMessage::~PAC_ErrnoLogMessage()+40)(cb360cdd34137a03eaf44712f69f1fa4126e6698)
#03 pc 0000000004991c88 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_CheckError::~PAC_CheckError()+52)(cb360cdd34137a03eaf44712f69f1fa4126e6698)
#04 pc 00000000049a053c /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(base::internal::PAC_ScopedFDCloseTraits::Free(int)+272)(cb360cdd34137a03eaf44712f69f1fa4126e6698)
```

1. 栈顶为：`/data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_LogMessage::Flush`
2. 04帧为：`/data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(base::internal::PAC_ScopedFDCloseTraits::Free`

### 结论

满足上面堆栈，arkweb 释放 fd 失败打印 F 级别的日志主动 crash。下一步分析需要应用排查有没有 double free fd 的问题。


---

## 四、libarkweb_engine.so（调试网站 crash）

### 前置

cppcrash 堆栈

### 规则

```
#00 pc 018d4b42 /data/app/el1/bundle/public/com.ohos.arkwebcore/libs/arm/libarkweb_engine.so(blink::internal::CrashIntentionally()+14)(c5d309aedb3de39965ad55442b989b8f9eee8ca5)
#01 pc 018d4b3f /data/app/el1/bundle/public/com.ohos.arkwebcore/libs/arm/libarkweb_engine.so(blink::internal::CrashIntentionally()+10)(c5d309aedb3de39965ad55442b989b8f9eee8ca5)
```

栈顶为：`/data/app/el1/bundle/public/com.ohos.arkwebcore/libs/arm/libarkweb_engine.so(blink::internal::CrashIntentionally`

### 结论

cppcrash 是应用主动访问 chromium 中的调试网站 `chrome://crash/` 导致 crash 的，属于非问题

---

## 五、GPU 启动失败

### 前置

cppcrash 堆栈

### 规则

```
#00 pc 0000000004773018 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_LogMessage::Flush()+2188)(6618c93af03ca2792c0f232853d64ef85fb57cb9)
#01 pc 00000000047726ec /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_LogMessage::~PAC_LogMessage()+36)(6618c93af03ca2792c0f232853d64ef85fb57cb9)
#02 pc 000000000338a030 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(content::(anonymous namespace)::IntentionallyCrashBrowserForUnusableGpuProcess() (.llvm.1605366364318870803)+184)(6618c93af03ca2792c0f232853d64ef85fb57cb9)
```

1. 栈顶为：`/data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::PAC_LogMessage::Flush`
2. 02帧为：`/data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(content::(anonymous namespace)::IntentionallyCrashBrowserForUnusableGpuProcess`

### 结论

AMS 孵化 GPU 进程失败，导致 crash，下一步分析领域为**渲染合成**

---

## 六、crashpad

### 前置

cppcrash 堆栈

### 规则

```
#00 pc 0000000004f78268 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::LogMessage::~LogMessage()+1200)(4b14f7815d5a5e079bcd159220d7ac0b49521897)
#01 pc 0000000004f787f8 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::ErrnoLogMessage::~ErrnoLogMessage()+120)(4b14f7815d5a5e079bcd159220d7ac0b49521897)
#02 pc 00000000069a8730 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(4b14f7815d5a5e079bcd159220d7ac0b49521897)
#03 pc 000000000699cd5c /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(4b14f7815d5a5e079bcd159220d7ac0b49521897)
#04 pc 000000000699a880 /data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(crash_reporter::internal::StartHandlerForClient(int, bool)+1212)(4b14f7815d5a5e079bcd159220d7ac0b49521897)
```

1. 00帧：`/data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(logging::LogMessage::~LogMessage`
2. 04帧：`/data/storage/el1/bundle/arkwebcore/libs/arm64/libarkweb_engine.so(crash_reporter::internal::StartHandlerForClient`

### 结论

三方应用拉起 crashpad 进程失败导致的 crash，应该是应用的 selinux 权限问题或者系统资源不足导致，下一步分析责任领域为 **arkweb 稳定性 & DFX 领域**
