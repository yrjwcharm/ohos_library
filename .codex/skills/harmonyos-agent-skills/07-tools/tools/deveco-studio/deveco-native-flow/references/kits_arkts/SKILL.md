---
name: kits_arkts
description: "HarmonyOS ArkTS 基础能力集使用规范。包含并发编程（TaskPool、Worker）、工具类（util、buffer、process）、数据结构（ArrayList、HashMap等）、XML处理、URI/URL处理、UUID生成等核心能力。Use when: (1) 多线程并发，(2) Worker线程，(3) 工具函数，(4) 数据结构，(5) XML解析，(6) 生成UUID。Triggers: 并发、Worker、taskpool、util、buffer、process、ArrayList、HashMap、xml、uri、url、UUID、uuid、generateRandomUUID。"
user-invocable: false
---

# ArkTS 基础能力集 (kits_arkts)

本 skill 覆盖 HarmonyOS **ArkTS Kit** 基础能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| taskpool | @ohos.taskpool | 任务池并发 |
| worker | @ohos.worker | Worker线程 |
| util | @ohos.util | 工具函数 |
| buffer | @ohos.buffer | 缓冲区处理 |
| process | @ohos.process | 进程信息 |
| xml | @ohos.xml | XML解析/生成 |
| convertxml | @ohos.convertxml | XML转换 |
| uri | @ohos.uri | URI处理 |
| url | @ohos.url | URL处理 |
| ArrayList | @ohos.util.ArrayList | 动态数组 |
| HashMap | @ohos.util.HashMap | 哈希映射 |
| HashSet | @ohos.util.HashSet | 哈希集合 |
| TreeMap | @ohos.util.TreeMap | 有序映射 |
| TreeSet | @ohos.util.TreeSet | 有序集合 |
| LinkedList | @ohos.util.LinkedList | 链表 |
| Queue | @ohos.util.Queue | 队列 |
| Stack | @ohos.util.Stack | 栈 |
| Deque | @ohos.util.Deque | 双端队列 |
| LightWeightMap | @ohos.util.LightWeightMap | 轻量映射 |
| LightWeightSet | @ohos.util.LightWeightSet | 轻量集合 |
| PlainArray | @ohos.util.PlainArray | 稀疏数组 |
| Vector | @ohos.util.Vector | 向量 |
| List | @ohos.util.List | 列表 |

## 快速索引

### TaskPool 并发任务

```typescript
import taskpool from '@ohos.taskpool';

// 定义并发任务
@Concurrent
function computeTask(data: number[]): number {
  return data.reduce((sum, val) => sum + val, 0);
}

// 执行任务
async function runTask(): Promise<void> {
  let data = [1, 2, 3, 4, 5];
  let result = await taskpool.execute(computeTask, data);
  console.log('Result: ' + result); // 15
}

// 延迟执行
let task = new taskpool.Task(computeTask, data);
taskpool.execute(task, taskpool.Priority.HIGH);
```

### Worker 线程

```typescript
// 主线程
import worker from '@ohos.worker';

// 创建 Worker
let workerInstance = new worker.ThreadWorker('entry/ets/workers/MyWorker.ts');

// 发送消息到 Worker
workerInstance.postMessage({ type: 'start', data: [1, 2, 3] });

// 接收 Worker 消息
workerInstance.onmessage = (e: worker.MessageEvents) => {
  console.log('Received from worker: ' + JSON.stringify(e.data));
};

// 错误处理
workerInstance.onerror = (e: worker.ErrorEvent) => {
  console.error('Worker error: ' + e.message);
};

// 终止 Worker
workerInstance.terminate();
```

```typescript
// Worker 线程文件 (workers/MyWorker.ts)
import worker, { ThreadWorkerGlobalScope, MessageEvents } from '@ohos.worker';

const workerPort = worker.workerPort as ThreadWorkerGlobalScope;

// 接收主线程消息
workerPort.onmessage = (e: MessageEvents) => {
  let data = e.data;
  // 处理数据
  let result = data.map((x: number) => x * 2);
  // 返回结果
  workerPort.postMessage(result);
};
```

### util 工具函数

```typescript
import util from '@ohos.util';

// Base64 编解码
let encoded = util.encodeSync('Hello');
let decoded = util.decodeSync(encoded);

// UUID 生成
let uuid = util.generateRandomUUID();
console.log('UUID: ' + uuid);

// 字符串格式化
let formatted = util.format('%s is %d years old', 'Tom', 25);

// 文本编码
let encoder = new util.TextEncoder();
let bytes = encoder.encodeInto('Hello');

// 文本解码
let decoder = util.TextDecoder.create('utf-8');
let text = decoder.decodeToString(bytes);

// 日期时间格式化
let date = new Date();
let formattedDate = util.formatDate(date, 'yyyy-MM-dd HH:mm:ss');
```

### process 进程信息

```typescript
import process from '@ohos.process';

// 进程 ID
let pid = process.pid;

// 用户 ID
let uid = process.uid;

// 进程名称
let name = process.processName;

// 环境变量
let env = process.env;
let path = env['PATH'];

// 命令行参数
let args = process.argv;

// 退出进程
process.exit(0);

// 运行时间
let uptime = process.uptime();
```

### XML 解析

```typescript
import xml from '@ohos.xml';

// 解析 XML
let xmlStr = `
  <root>
    <item id="1">Apple</item>
    <item id="2">Banana</item>
  </root>
`;

let parser = new xml.XmlParser(xmlStr);
parser.parse((name: string, value: string) => {
  console.log(`${name}: ${value}`);
});

// 生成 XML
let serializer = new xml.XmlSerializer();
serializer.startElement('root');
serializer.setAttributes('version', '1.0');
serializer.startElement('item');
serializer.setText('Hello');
serializer.endElement();
serializer.endElement();
let xmlResult = serializer.getResult();
```

### URI/URL 处理

```typescript
import uri from '@ohos.uri';
import url from '@ohos.url';

// URI 解析
let uriObj = new uri.URI('https://example.com/path?query=1#fragment');
console.log('Scheme: ' + uriObj.scheme);     // https
console.log('Host: ' + uriObj.host);         // example.com
console.log('Path: ' + uriObj.path);         // /path
console.log('Query: ' + uriObj.query);       // query=1

// URL 解析
let urlObj = new url.URL('https://example.com/search?q=test&page=1');
console.log('SearchParams: ' + urlObj.searchParams.get('q')); // test

// 构建URL参数
let params = new url.URLParams();
params.append('name', '张三');
params.append('age', '25');
console.log(params.toString()); // name=%E5%BC%A0%E4%B8%89&age=25
```

### 数据结构集合

```typescript
import ArrayList from '@ohos.util.ArrayList';
import HashMap from '@ohos.util.HashMap';
import HashSet from '@ohos.util.HashSet';
import LinkedList from '@ohos.util.LinkedList';
import Queue from '@ohos.util.Queue';
import Stack from '@ohos.util.Stack';

// ArrayList 动态数组
let list = new ArrayList<string>();
list.add('Apple');
list.add('Banana');
list.insert(1, 'Orange');
list.removeByIndex(0);
list.forEach((value: string) => console.log(value));

// HashMap 哈希映射
let map = new HashMap<string, number>();
map.set('apple', 1);
map.set('banana', 2);
let value = map.get('apple'); // 1
map.remove('banana');
map.forEach((value: number, key: string) => {
  console.log(`${key}: ${value}`);
});

// HashSet 哈希集合
let set = new HashSet<string>();
set.add('Apple');
set.add('Banana');
set.add('Apple'); // 重复不添加
console.log('Size: ' + set.length); // 2
let hasApple = set.has('Apple'); // true

// LinkedList 链表
let linkedList = new LinkedList<number>();
linkedList.add(1);
linkedList.add(2);
linkedList.addFirst(0);
linkedList.removeLast();

// Queue 队列
let queue = new Queue<string>();
queue.add('First');
queue.add('Second');
let first = queue.pop(); // First (FIFO)

// Stack 栈
let stack = new Stack<number>();
stack.push(1);
stack.push(2);
let top = stack.pop(); // 2 (LIFO)
```

### TreeMap / TreeSet 有序集合

```typescript
import TreeMap from '@ohos.util.TreeMap';
import TreeSet from '@ohos.util.TreeSet';

// TreeMap 有序映射 (按键排序)
let treeMap = new TreeMap<string, number>();
treeMap.set('banana', 2);
treeMap.set('apple', 1);
treeMap.set('cherry', 3);
// 遍历时按键有序输出: apple, banana, cherry
treeMap.forEach((value: number, key: string) => {
  console.log(`${key}: ${value}`);
});

// TreeSet 有序集合
let treeSet = new TreeSet<number>();
treeSet.add(3);
treeSet.add(1);
treeSet.add(2);
// 遍历时有序输出: 1, 2, 3
treeSet.forEach((value: number) => console.log(value));

// 首尾元素
let first = treeSet.getFirst(); // 1
let last = treeSet.getLast();   // 3
```

### LightWeightMap / LightWeightSet 轻量集合

```typescript
import LightWeightMap from '@ohos.util.LightWeightMap';
import LightWeightSet from '@ohos.util.LightWeightSet';

// LightWeightMap 轻量映射 (内存占用更少)
let lwMap = new LightWeightMap<string, number>();
lwMap.set('a', 1);
lwMap.set('b', 2);
console.log('Value: ' + lwMap.get('a'));
console.log('Keys: ' + lwMap.keys());

// LightWeightSet 轻量集合
let lwSet = new LightWeightSet<string>();
lwSet.add('item1');
lwSet.add('item2');
console.log('Has item1: ' + lwSet.has('item1'));
```

### buffer 缓冲区

```typescript
import buffer from '@ohos.buffer';

// 创建 Buffer
let buf = buffer.from('Hello');
let buf2 = buffer.alloc(10); // 分配10字节
let buf3 = buffer.from([1, 2, 3, 4, 5]);

// 拼接
let combined = buffer.concat([buf, buf2]);

// 转换
let str = buf.toString('utf-8');
let json = JSON.stringify(buf.toJSON());

// 截取
let sliced = buf.slice(0, 3);

// 比较大小
let cmp = buffer.compare(buf, buf2);
```

## TaskPool vs Worker 选择

| 特性 | TaskPool | Worker |
|------|----------|--------|
| 创建方式 | @Concurrent 函数 | .ts 文件 |
| 生命周期 | 自动管理 | 需手动管理 |
| 通信方式 | 参数传递 | postMessage |
| 适用场景 | 短时计算任务 | 长时运行任务 |
| 复用性 | 自动复用 | 手动复用 |
| 错误处理 | Promise | onerror 回调 |

## 最佳实践

### 1. CPU 密集型任务用 TaskPool

```typescript
@Concurrent
function heavyComputation(n: number): number {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

// 自动在后台线程执行
let result = await taskpool.execute(heavyComputation, 1000000);
```

### 2. 长时间运行用 Worker

```typescript
// Worker 持续运行，适合定时任务、长连接等场景
// 例如：文件监听、持续数据处理
```

### 3. 集合选择

| 场景 | 推荐集合 |
|------|----------|
| 频繁增删 | LinkedList |
| 随机访问 | ArrayList |
| 键值存储 | HashMap |
| 有序遍历 | TreeMap |
| 内存敏感 | LightWeightMap |
| 去重存储 | HashSet |

## 注意事项

1. **TaskPool 限制**：
   - @Concurrent 函数不能访问 UI 组件
   - 不支持 async/await
   - 参数必须可序列化

2. **Worker 限制**：
   - 不能操作 UI 组件
   - 需要在配置文件中声明
   - 注意内存泄漏，用完要 terminate

3. **数据结构**：
   - 非线程安全，跨线程需序列化
   - 根据场景选择合适的数据结构