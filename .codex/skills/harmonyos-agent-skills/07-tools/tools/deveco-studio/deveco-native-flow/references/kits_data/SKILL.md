---
name: kits_data
description: "HarmonyOS ArkData 数据能力集使用规范。包含 Preferences、RelationalStore、KVStore、分布式数据、数据共享等数据存储能力。Use when: (1) 本地数据存储，(2) 关系型数据库，(3) 键值对存储，(4) 分布式数据同步。Triggers: 数据库、存储、Preferences、RdbStore、KVStore、分布式数据、preferences、relationalStore、@ohos.data。"
user-invocable: false
---

# ArkData 数据能力集 (kits_data)

本 skill 覆盖 HarmonyOS **ArkData** 数据能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| preferences | @ohos.data.preferences | 轻量级键值存储 |
| relationalStore | @ohos.data.relationalStore | 关系型数据库 |
| distributedKVStore | @ohos.data.distributedKVStore | 分布式键值存储 |
| preferences (legacy) | @system.storage | 简易键值存储 |

## 快速索引

### Preferences（轻量级存储）

```typescript
import preferences from '@ohos.data.preferences';
import common from '@ohos.app.ability.common';

// 获取 Preferences 实例
let context = getContext(this) as common.Context;
let dataPreferences = await preferences.getPreferences(context, 'myStore');

// 存储数据
await dataPreferences.put('key', 'value');
await dataPreferences.put('count', 100);
await dataPreferences.flush();  // 持久化

// 读取数据
let value = await dataPreferences.get('key', 'default');
let count = await dataPreferences.get('count', 0);

// 删除数据
await dataPreferences.delete('key');
await dataPreferences.flush();

// 清空所有数据
await dataPreferences.clear();
await dataPreferences.flush();
```

### RelationalStore（关系型数据库）

```typescript
import relationalStore from '@ohos.data.relationalStore';

// 创建数据库
const STORE_CONFIG: relationalStore.StoreConfig = {
  name: 'MyDatabase.db',
  securityLevel: relationalStore.SecurityLevel.S1
};

let rdbStore = await relationalStore.getRdbStore(context, STORE_CONFIG);

// 创建表
const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER
  )
`;
await rdbStore.executeSql(CREATE_TABLE_SQL);

// 插入数据
let valueBucket: relationalStore.ValuesBucket = {
  name: '张三',
  age: 25
};
let rowId = await rdbStore.insert('user', valueBucket);

// 查询数据
let predicates = new relationalStore.RdbPredicates('user');
predicates.equalTo('age', 25);
let resultSet = await rdbStore.query(predicates, ['id', 'name', 'age']);

while (resultSet.goToNextRow()) {
  let id = resultSet.getLong(resultSet.getColumnIndex('id'));
  let name = resultSet.getString(resultSet.getColumnIndex('name'));
  let age = resultSet.getLong(resultSet.getColumnIndex('age'));
}
resultSet.close();

// 更新数据
let updateBucket: relationalStore.ValuesBucket = {
  age: 26
};
let predicates = new relationalStore.RdbPredicates('user');
predicates.equalTo('name', '张三');
await rdbStore.update(updateBucket, predicates);

// 删除数据
let deletePredicates = new relationalStore.RdbPredicates('user');
deletePredicates.equalTo('id', rowId);
await rdbStore.delete(deletePredicates);
```

### DistributedKVStore（分布式键值存储）

```typescript
import distributedKVStore from '@ohos.data.distributedKVStore';

// 创建 KVStore
let kvManager = distributedKVStore.createKVManager({
  context: context,
  bundleName: 'com.example.myapp'
});

let kvStore = await kvManager.getKVStore('myKVStore', {
  createIfMissing: true,
  securityLevel: distributedKVStore.SecurityLevel.S1
});

// 存储数据
await kvStore.put('key1', 'value1');

// 读取数据
let value = await kvStore.get('key1');

// 删除数据
await kvStore.delete('key1');

// 监听数据变更
kvStore.on('dataChange', distributedKVStore.SubscribeType.SUBSCRIBE_TYPE_ALL, (data) => {
  console.log('Data changed: ' + JSON.stringify(data));
});
```

## Preferences 详解

### 支持的数据类型

| 类型 | 示例 |
|------|------|
| number | `put('key', 123)` |
| string | `put('key', 'value')` |
| boolean | `put('key', true)` |
| Array\<number> | `put('key', [1, 2, 3])` |
| Array\<string> | `put('key', ['a', 'b'])` |
| Array\<boolean> | `put('key', [true, false])` |

### 常用方法

| 方法 | 说明 |
|------|------|
| put(key, value) | 存储数据 |
| get(key, defaultValue) | 读取数据 |
| delete(key) | 删除数据 |
| clear() | 清空所有数据 |
| flush() | 持久化到磁盘 |
| has(key) | 检查是否存在 |
| getAll() | 获取所有数据 |

## RelationalStore 详解

### 数据类型

| 类型 | 对应 SQLite 类型 |
|------|------------------|
| null | NULL |
| integer | INTEGER |
| real | REAL |
| text | TEXT |
| blob | BLOB |

### RdbPredicates 查询条件

```typescript
let predicates = new relationalStore.RdbPredicates('user');

// 等于
predicates.equalTo('name', '张三');

// 不等于
predicates.notEqualTo('age', 25);

// 范围
predicates.between('age', 20, 30);
predicates.greaterThan('age', 18);
predicates.lessThan('age', 60);

// 模糊查询
predicates.like('name', '%张%');

// 排序
predicates.orderByDesc('age');
predicates.orderByAsc('name');

// 限制数量
predicates.limitAs(10);
predicates.offsetAs(5);  // 分页偏移

// 组合条件
predicates.equalTo('status', 1)
  .and()
  .greaterThan('age', 18);
```

## 使用示例

### 用户设置存储

```typescript
import preferences from '@ohos.data.preferences';

class UserPreferences {
  private static INSTANCE: UserPreferences;
  private dataPreferences: preferences.Preferences | null = null;

  static getInstance(): UserPreferences {
    if (!UserPreferences.INSTANCE) {
      UserPreferences.INSTANCE = new UserPreferences();
    }
    return UserPreferences.INSTANCE;
  }

  async init(context: common.Context): Promise<void> {
    this.dataPreferences = await preferences.getPreferences(context, 'user_settings');
  }

  async setTheme(theme: string): Promise<void> {
    await this.dataPreferences?.put('theme', theme);
    await this.dataPreferences?.flush();
  }

  async getTheme(): Promise<string> {
    return await this.dataPreferences?.get('theme', 'light') as string;
  }

  async setFontSize(size: number): Promise<void> {
    await this.dataPreferences?.put('fontSize', size);
    await this.dataPreferences?.flush();
  }
}
```

### 数据库操作封装

```typescript
import relationalStore from '@ohos.data.relationalStore';

class DatabaseHelper {
  private rdbStore: relationalStore.RdbStore | null = null;

  async init(context: common.Context): Promise<void> {
    this.rdbStore = await relationalStore.getRdbStore(context, {
      name: 'app.db',
      securityLevel: relationalStore.SecurityLevel.S1
    });
  }

  async createTables(): Promise<void> {
    const tables = [
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
      )`,
      `CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        title TEXT,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user(id)
      )`
    ];

    for (const sql of tables) {
      await this.rdbStore?.executeSql(sql);
    }
  }

  async insert(table: string, values: relationalStore.ValuesBucket): Promise<number> {
    return await this.rdbStore?.insert(table, values) ?? -1;
  }

  async query(table: string, columns?: string[]): Promise<relationalStore.ResultSet | null> {
    let predicates = new relationalStore.RdbPredicates(table);
    return await this.rdbStore?.query(predicates, columns);
  }
}
```

## 最佳实践

1. **Preferences 使用场景**：
   - 用户设置
   - 应用配置
   - 简单的缓存数据

2. **RelationalStore 使用场景**：
   - 结构化数据存储
   - 复杂查询需求
   - 需要 ACID 事务

3. **数据安全**：
```typescript
// 设置安全级别
const config: relationalStore.StoreConfig = {
  name: 'secure.db',
  securityLevel: relationalStore.SecurityLevel.S3  // S1-S4 安全等级递增
};
```

## 注意事项

1. 数据库操作是异步的，需要使用 async/await 或 Promise
2. 数据库文件存储在应用的私有目录
3. 使用完 ResultSet 后需要手动 close()
4. 分布式数据需要设备登录同一华为账号