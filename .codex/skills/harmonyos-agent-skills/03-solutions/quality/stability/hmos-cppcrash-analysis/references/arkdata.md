# arkdata 常见问题分析参考手册

---

## 一、OHOS::AppDataFwk::SharedBlock 栈顶访问共享内存报没权限 Crash

### 前置：典型栈顶 AppDataFwk::SharedBlock 相关栈

**案例 1**

```
Reason: Signal:SIGSEGV(SEGV_ACCERR)@0x0000005baff86000
Fault thread info:
Tid:16205, Name:OS_FFRT_2_865
#00 pc 0000000000004388 /system/lib64/platformsdk/libnative_appdatafwk.z.so(OHOS::AppDataFwk::SharedBlock::Clear()+60)
#01 pc 0000000000004574 /system/lib64/platformsdk/libnative_appdatafwk.z.so(OHOS::AppDataFwk::SharedBlock::CreateSharedBlock(...)+284)
#02 pc 0000000000004850 /system/lib64/platformsdk/libnative_appdatafwk.z.so(OHOS::AppDataFwk::SharedBlock::Create(...)+424)
#03 pc 000000000009bdfc /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::AbsSharedResultSet::GetBlock()+192)
#04 pc 000000000009caf4 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::AbsSharedResultSet::HasBlock()+100)
#05 pc 0000000000397b84 /system/lib64/platformsdk/libabilityms.z.so(OHOS::AbilityRuntime::RdbDataManager::QueryData(...)+708)
#06 pc 0000000000394820 /system/lib64/platformsdk/libabilityms.z.so(OHOS::AbilityRuntime::AmsResidentProcessRdb::GetResidentProcessEnable(...)+244)
#07 pc 0000000000430124 /system/lib64/platformsdk/libabilityms.z.so(OHOS::AAFwk::ResidentProcessManager::OnAppStateChanged(...))
```

**案例 2**

```
Reason: Signal:SIGSEGV(SEGV_ACCERR)@0x0000005c08379000
Fault thread info:
Tid:15050, Name:OS_FFRT_3_7070
#00 pc 00000000000a4290 /system/lib/ld-musl-aarch64.so.1(memcpy+336)
#01 pc 0000000000037b7c /system/lib64/chipset-pub-sdk/libutils.z.so(memcpy_s+92)
#02 pc 0000000000005860 /system/lib64/platformsdk/libnative_appdatafwk.z.so(OHOS::AppDataFwk::SharedBlock::PutBlobOrString(...)+220)
#03 pc 00000000000d308c /system/lib64/platformsdk/libnative_rdb.z.so(SeriPutString.cfi+28)
#04 pc 000000000006fef8 /system/lib64/platformsdk/libsqlite.z.so(copySharedBlockRow+408)
#05 pc 000000000006f69c /system/lib64/platformsdk/libsqlite.z.so(sqlite3VdbeExec+37692)
#06 pc 000000000002ec20 /system/lib64/platformsdk/libsqlite.z.so(sqlite3_step+644)
#07 pc 00000000000d3264 /system/lib64/platformsdk/libnative_rdb.z.so(FillSharedBlockOpt+412)
#08 pc 00000000000a03a0 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::SqliteStatement::FillBlockInfo(...)+140)
#09 pc 00000000000d6504 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::SqliteSharedResultSet::ExecuteForSharedBlock(...)+288)
#10 pc 00000000000d61a4 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::SqliteSharedResultSet::FillBlock(int)+296)
#11 pc 00000000000d5d6c /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::SqliteSharedResultSet::OnGo(int, int)+332)
#12 pc 00000000000b4e44 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::AbsSharedResultSet::UpdateBlockPos(int, int)+184)
#13 pc 00000000000b3ac4 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::AbsSharedResultSet::GoToRow(int)+416)
#14 pc 0000000000068de4 /system/lib64/module/data/librelationalstore.z.so(OHOS::RelationalStoreJsKit::ResultSetProxy::GoToFirstRow(...)+120)
```

### 规则

1. 上报错误为 **SEGV_ACCERR**。
2. 栈顶包含 `libnative_appdatafwk.z.so`，且其调用接口都是 SharedBlock 上的方法。
3. 报错的地址在故障日志中的 maps 表中是存在且权限 `rw-s` 正常。

**maps 表示例：**

```
5baff85000-5baff86000 rw-p 00002000 /system/lib64/platformsdk/libdialog_request_info.z.so
5baff86000-5bb0186000 rw-s 00000000 anon_inode:dev/ashmem/SharedBlock:/ability_manager_service.db8278
```

4. 一般这个问题时间点附近有内核日志报错 `<ashmem is not enough>`，可以作为补充条件。

### 结论

此时整机中某个进程或业务有**共享内存泄漏**，导致整机共享内存耗尽，需要当前进程找内核同事分析内核日志，找到泄漏模块处理解决。

### 原因

一般共享内存申请会先分配虚拟地址，不会分配物理页，使用此地址时才会真正的分配物理页。此时如果共享内存耗尽，没有物理页，使用共享内存的业务去访问就会发生 crash。

---

## 二、异常操作数据库文件导致 sqlite 上报 SIGBUS(BUS_OBJERR)

### 前置

```
Timestamp:2024-07-30 07:44:07.698
Pid:41206
Uid:20020034
Process name:com.huawei.hmos.hinote
Process life time:2s
Reason:Signal:SIGBUS (BUS OBJERR) @0x0000005b6fa71000
Fault thread info:
Tid:41206, Name:wei.hmos.hinote
#00 pc 00000000000a87a8 /system/lib/ld-musl-aarch64.so.1(memcpy+360)
#01 pc 0000000000053de8 /system/lib64/platformsdk/libsqlite.z.so(walIndexReadHdr+2348)
#02 pc 0000000000052e1c /system/lib64/platformsdk/libsqlite.z.so(walTryBeginRead+596)
#03 pc 0000000000059cd4 /system/lib64/platformsdk/libsqlite.z.so(sqlite3PagerSharedLock+132)
#04 pc 00000000000315c4 /system/lib64/platformsdk/libsqlite.z.so(sqlite3BtreeBeginTrans+636)
#05 pc 0000000000064228 /system/lib64/platformsdk/libsqlite.z.so(sqlite3VdbeExec+3696)
#06 pc 000000000002ec70 /system/lib64/platformsdk/libsqlite.z.so(sqlite3_step+644)
#07 pc 000000000008ffa8 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::SqliteStatement::Step()+128)
#08 pc 000000000009041c /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::SqliteStatement::Execute(...)+272)
#09 pc 0000000000090688 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::SqliteStatement::ExecuteForValue(...)+80)
#10 pc 0000000000072288 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS::NativeRdb::RdbStoreImpl::GetVersion(int&)+296)
#11 pc 000000000003fe14 /system/lib64/module/data/librelationalstore.z.so(OHOS::RelationalStoreJsKit::RdbStoreProxy::GetVersion(...))
```

### 规则

1. 报错为 **SIGBUS(BUS_OBJERR)**
2. 栈顶是 `sqlite.z.so`
3. 访问的地址段是 maps 里面合法的地址

**maps 示例：**

```
行 1899：5b6fa6a000-5b6fa70000 rw-p 00000000 [anon:signal_stack:41250]
行 1900：5b6fa70000-5b6fa78000 rw-s 00000000 /proc/41265/root/data/storage/e12/database/rdb/memo-shm
```

4. 内核日志一般会有映射文件出错的日志 `<page error>`，这一点可以作为参考

**内核日志示例：**

```
pid-41206 tid=41206 comm=wei.hmos.hinote [vfs_op_mmap_fill_page:1089] The node page_idx 1 node size 3 name memo-shm
pid-41206 tid=41206 comm=wei.hmos.hinote [do core page fault:330] process: /system/bin/appspawn (pid 41206), faultin page error = E_HM_NXIO, addr = 0x5b6fa71000, prot = 0x3, flags = 0x81
```

### 结论

业务使用了非数据库接口操作了数据库文件，包括拷贝，移动，关闭等，需要业务自行排查是否有类似的操作。

### 原因

使用非数据库接口操作数据库文件可能会导致文件锁失效，文件 fd double close 等问题，使得 sqlite 操作文件时因为文件内容异常出现无法访问的问题。

---

## 三、锁屏状态下调用 rdb 或 distributeddb 接口访问 el4 目录下数据库文件导致 crash

### 前置

```
Process name:com.huawei.hms.myfamily:FamilyShareUIExtensionAbility:169
Process life time:2471s
Process Memory(kB): 123764(Rss)
Device Memory(kB): Total 11862608, Free 332436, Available 2401280
Reason:Signal:SIGSEGV(SEGV_ACCERR)@0x00000059e7f4a000 
Fault thread info:
Tid:31469, Name:OS_FFRT_3_7
#00 pc 000000000008d884 /system/lib64/platformsdk/libsqlite.z.so(walIndexTryHdr+60)
#01 pc 000000000008ce5c /system/lib64/platformsdk/libsqlite.z.so(walIndexReadHdr+108)
#02 pc 000000000008bc10 /system/lib64/platformsdk/libsqlite.z.so(walTryBeginRead+96)
#03 pc 000000000008b0ec /system/lib64/platformsdk/libsqlite.z.so(sqlite3PagerSharedLock+144)
#04 pc 000000000008695c /system/lib64/platformsdk/libsqlite.z.so(btreeBeginTrans+304)
#05 pc 00000000000748b4 /system/lib64/platformsdk/libsqlite.z.so(sqlite3VdbeExec+5856)
#06 pc 0000000000072508 /system/lib64/platformsdk/libsqlite.z.so(sqlite3_step+152)
```

### 规则

1. 一般栈顶为 sqlite，函数都为 `wal***`
2. 在 maps 表中或者寄存器上都可以找到这个报错地址（如 59e7f4a000），看寄存器信息它是在 el4 目录下的共享内存，此地址的值是全 fffff 的。

**寄存器信息：**

```
x21(/proc/5499/root/data/storage/el4/database/rdb/FamilyCertificate.db-shm):
    00000059e7f49ff0 0000000000000000
    00000059e7f49ff8 0000000000000000
    00000059e7f4a000 00000000002de218
    00000059e7f4a008 0400000100000003
```

**maps 信息：**

```
59e7f49000-59e7f4a000 rw-p 00006000 /system/lib64/platformsdk/libappexecfwk_common.z.so
59e7f4a000-59e7f52000 rw-s 00000000 /data/storage/el4/database/rdb/FamilyCertificate.db-shm
```

### 结论

在锁屏状态下访问数据库导致的 crash 问题。

1. 业务评估是否一定要在 el4 下保存数据库，尽可能不要使用 el4 目录。
2. 如果一定要在 el4 目录存数据库，需要监听锁屏事件，锁屏后立即停止所有的数据库操作，已经开始的操作会在锁屏后留有 10s 的 buffer 等待执行结束。

### 原因

锁屏下会卸载文件秘钥，数据库访问共享内存时 mmap 如果没有权限就会直接 crash。

---

## 四、IO 压测导致的 freeze 问题

### 前置

1. 栈顶为 pread

```
#00 pc 00000000001c780c /system/lib/ld-musl-aarch64.so.1(pread +72)
#01 pc 000004b2b8/system/lib6/platfrmsdk/libsqite.zso(unixRead+180)
#02 pc 00000000566e4 /system/lib64/platformsdk/libsqlite.z.so(readDbPage+116)
#03 pc 0000056594/system/lib64/platformsdk/libsqlite.z.so(getPageNomal+864)
#04 pc 0078024/system/li64/laformsdk/ibsqlite.zso(getAndlnitPage+216)
#05 pc 00000000072ab4 /system/lib64/platformsdk/libsqlite.z.so(sqlite3BtreeTableMoveto+528)
#06 pc 00000000071b9c /system/lib64/platformsdk/libsqlite.z.so(sqlite3VdbeFinishMoveto+60)
#07 pc00006f820/system/lib6/platformscdk/libsqlite.zso(sqlite3VdbeExec+4284)
#08 pc 000000000e2dfc /system/lib64/platformsdk/libnative_rdb.z.so(FillSharedBlockOpt+416)
#09 pc 000000000acf8/system/ib6/latomsd/ibnativrdbzoHS:NativeRd:SqlitStatement:FilocklnfoHOS:NativeRdb：SharedBlokfo const+140)
#10 pc 000000000e5cd4 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS:NativeRdb:SqliteSharedResultSet:Filllock(int)+300)
#11 pc 000000000e5894 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS:NativeRdb:SqliteSharedResultSet:OnGo(int, int)+336)
#12 pc000c4350/ystem/ib64/platfomsdk/ibnativerdb.zso(HOS:Nativedba:AbsSharedResultSet:UpdateBlockPosint int+ 180)
#13 pc00000000000c2f90/system/lib64/platfomrsdk/libnative_rdb.z.so(OHOS:NativeRdbAbsSharedResultSet::GoToRow(int) +428)
```

2. 栈顶为 fdatasync

```
Tid:1125, Name:0S_IPC_0_1125
#00 pc 00000000001c9328 syscall ret at third party/musl/intermidiates/linux/musl_src_ported/src/internal/syscall_ret.c:6
	(inlined by) fdatasync at third_party/musl/intermidiates/linux/musl_src_ported/src/unistd/fdatasync.c:8
#01 pc 00000004eb28 full_fsync at third _party/sqlite/src/sqlite3.c:40532
	(inlined by) unixSync at third_party/sqlite/src/sqlite3.c:40625
#02 pc 0000000055bd4 sqlite30sSync at third_party/sqlite/src/sqlite3.c:24981
	(inlined by) sqlite3WalFrames at third_party/sqlite/src/sqlite3.c:67174
	(inlined by) pagerWalFrames at third_party/sqlite/sr/sqlite3.c:58746
#03 pc 000000003565c sqlite3PagerCommitPhase0ne at third_party/sqlite/src/sqlite3.c:62036
#04 pc 000000003606c sqlite3BtreeCommitPhase0ne at third_party/sqlite/src/sqlite3.c:72822
```

3. 还有栈顶为 pwrite64 等文件操作的接口。

### 规则

1. freeze 的栈顶为 c 库操作文件类的接口，目前常见的有 **pread、fdatasync 和 pwrite64**
2. 搜索 **stress-ng** 关键字，一般在 freeze 文件的 cpu 信息里有，日志里也可以搜到
3. 数据团队的 IO 压测关键字为 **filefill**，有此关键字也是 IO 压测，非问题处理

### 结论

IO 压力测试引起的读写文件慢的问题按**非问题处理**。

### 原因

IO 压测会导致非常高的 IO 负载，数据库读写文件受其影响会变慢，执行耗时不可控，并非数据库自身问题，按非问题处理。

---

## 五、主线程遍历 resultSet 超时

### 前置

```
Timestamp: 2024-10-27 13: 32: 35:232
Cid:6528, Namle:m0s.heaith.c0re
#00 pc 00000000001c7520 /system/lib/ld-musl-aarch64.so.1(pread+72)
#01 pc 000000000004a120 /system/lib64/platformsdk/libsqlite.z.so(unixRead+180)
#02 pc 00000000000550b8 /system/lib64/platformsdk/libsqlite.z.so (readDbPage+116)
#03 pc 0000000000054f68 /system/lib64/platformsdk/libsqlite.z.so (getPageNormal+864)
#04 pc 0000000000076a04 /system/lib64/platformsdk/libsqlite.z.so (getAndInitPage+216)
#05 pc 0000000000078148 /system/lib64/platformsdk/libsqlite.z.so (moveToRightmost+172)
#06 pc 0000000000064e38 /system/lib64/platformsdk/libsqlite.z.s0 (sqlite3VdbeExec+6456)
#07 pc 000000000002ec38 /system/lib64/platformsdk/libsqlite.z.so (sqlite3_step+644)
#08 pc 00000000000d5d44 /system/lib64/platformsdk/libnative_rdb.z.so (FilisharedBlockopt+416)
#09 pc 00000000000a4030 /system/lib64/platformsdk/libnative_rdb.z.so (OHOs:NativeRdb::SqliteStatement:FillBlockInfo (OHOS::NativeRdb: :SharedBlockInfo*)const+140)
#10 pc 00000000000d9034 /system/lib64/platformsdk/libnative _rdb.z.so(OHOs: :NativeRdb::SqlitesharedResultset::ExecuteForsharedBlock(OHOs: :AppDataFwk: :SharedBlock*, int, int) +288)
#11 pc 00000000000d8cd0 /system/lib64/platformsdk/libnative_rdb.z.so (0HOs:NativeRdb::SqlitesharedResultset::FillBlock(int)+300)
#12 pc 00000000000d8890 /system/lib64/platformsdk/libnativerdb.z.so(0HOS:NativeRdb:SqlitesharedResultset:onGo（int,int)+336)
#13 pc 00000000000b7288 /system/lib64/platformsdk/libnative_rdb.z.so(OHOS:NativeRdb:AbsSharedResultSet:UpdateBlockPos(int, int) +188)
#14 pc 00000000000b5ec8 /system/lib64/platformsdk/libnative_rdb.z.so (0HOS:NativeRdb::AbssharedResultset:GoToRow(int)+428)
#15 pc 0000000000069338 /system/lib64/module/data/librelationalstore.z.so(OHOs::RelationalstoreJsKit::ResultSetProxy::GoToFirstRow (napi_env_*,
```

### 规则

1. 调用栈如上图，在调用 resultSet 相关接口，librelationalstore.z.so 调用 goTo、goToRow、goToFirstRow、getValue、getBlob、getString、getLong、getDouble、getAsset、getAssets、getRow、getSendableRow、getColumnIndex、getColumnName 等接口

### 结论

resultSet 的接口带有 IO 操作，其耗时不稳定，业务需要将遍历结果集的逻辑放到**异步线程**。

1. 可以考虑使用 **taskpool** 或 **worker**，将查询以及遍历结果集都放到异步线程执行，不会阻塞主线程。
2. 数据库 resultSet 对象新提供了 **getRows** 异步接口，可改用异步接口。


### 原因

1. 业务查询的数据量很大，数据量越大遍历 resultSet 耗时越长，可能会出现 freeze。
2. 受 IO、CPU 资源负载的影响，数据库操作文件的耗时可能会变慢导致 freeze。
3. 业务短时间高频调用 query，可能会导致主线程任务堆积。

---

## 六、调用 batchInsert 插入数据超时

### 前置

```
Tid:27979, Name:ynext.ulbclient 
#00 pc 000000000a373c /system/lib/ld-musl-aarch64.so.1
#01 pc 000000006f779c /system/lib64/platformsdk/libark_jsruntime.so(panda:os:thread:GetCurrentThreadId()+12)
#02 pc 000000006502f4 /system/li64/platformsdk/libark-jsruntime so(panda: :ecmascript:Taskpool:IsDaemonThreadorInThreadpool(std:_h:_thread_id) const+84)
#03 pc 000000003872a4 /system/lib64/platformsdk/libark_jsruntime so(panda:ecmascript:EcmavM: CheckThread() const+68)
#04 pc 00000000057fof8 /system/lib64/platformsdk/libark_jsruntime.so(panda:JSValueRef: :Null(panda: :ecmascript: EcmaVM const*)+72)
#05 pc 000000000556be /system/lib64/platformsdk/libace_napi.z.so(napi_get_null+48)
#06 pc 0000000001dcfc /systemlib64/module/data/librelationalstore.z.so(Oos:AppDataMgrskit:SUtils:Convert2value(napi_env*, napi_value_*, std:_h:monostate&)+52)
#07 pc 0000000003f268 /system/lib64/module/data/librelationalstore.z.so(OHos:RelationalSstoreJskit:ParsevaluesBucket(napi_env_*, napi_value_*, std:_h:shared_ptr<OHOS:RelationalStoreJskit::RdbSt
#08 pc 0eoooooo03f66c /system/lib64/module/data/librelationalstore.z.so(OHos::RelationalStoreJsKit::ParseValuesBuckets(napi_env__-*, napi_value__*, std::__h::shared_ptr<OHOs::RelationalStoreJsKit::RdbSt
#09 pc 00000000056468 /system/lib64/module/data/librelationalstore.z.so(04f86a08b59f232f8e273a147a4a5b52)
#10 pc 00000000020df4 /system/lib64/module/data/librelationalstore.z.so(OHos:RelationalStoreJskit:ContextBase:SetAction(napi env_*, napi_callback_info_*, std:_h:functin<void (napi_env_*, unsi
#11 pc 0000000003b304 /system/lib64/module/data/librelationalstore.z.so(CHo5:RelationalStoreJskit:RdbStoreProxy:BatchInsert(napilenv_*, napi_callback_info_*)+568)
#12 pc 0000000003d2e8 /system/lib64/platformsdk/libace_napi.z.so(panda:JSvalueRef ArkNativeFunctioncal1Back<true>(panda:JsiRuntimeCallInfo*)+216)
#13 pc 0000000042f2aa /system/lib64/module/arkcompiler/stub.an(RTStub_PushCallArgsAndDispatchNative+40)
#14 pc 000000000ec014 /system/lib64/module/arkcompiler/stub.an(BCStub_HandleCallthis3Imm8v8v8v8V8+332)
#15 at anonymous (entry| ssecore|1.0.0|src/main/ets/b/14/w10.js:53:1)
#16at getRdbStore (entry| ssecore|1.0.0|src/main/ets/b/14/w10.js:46:1)
```

### 规则

1. 调用栈如上图，业务调用 batchInsert，卡在了 ParseValueBucket 接口上，也有其他的栈，主要看入口是 batchInsert 的就是此类问题

### 结论

1. 业务可以考虑将整个 **batchInsert** 操作挪到 **taskpool** 或者 **worker** 异步线程中执行。
2. 可以减少每次调用 batchInsert 时插入的数据量，防止在系统负载高时偶现的出现 freeze。

### 原因

业务单次插入的数据量太大，在主线程解析这些参数（JS 类型转换为 C++ 类型）耗时过长 freeze。