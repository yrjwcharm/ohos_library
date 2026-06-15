# hsp依赖检查错误

**问题现象**

在编译过程中，报错显示hsp依赖检查错误，缺失文件。

**可能原因**

分包异步化功能依赖ASCF运行时版本为1.0.8及以上，需要在module.json5中修改依赖。

**解决措施**

找到主包module.json5添加如下依赖：

```json
 "dependencies": [
  {
    "bundleName": "com.huawei.hms.ascfruntime",
    "moduleName": "ascf",
      "versionCode": 10008300
  }
 ],
```
