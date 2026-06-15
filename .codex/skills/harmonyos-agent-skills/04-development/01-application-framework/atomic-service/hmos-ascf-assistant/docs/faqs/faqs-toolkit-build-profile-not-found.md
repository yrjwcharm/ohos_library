# 报错ERROR: build-profile.json5 file not found

**问题现象**

使用命令行转换工具时报错：“ERROR: build-profile.json5 file not found.”

**解决措施**

方法一：检查编译命令路径参数，应为元服务ASCF模板工程的根路径。

方法二：确认ASCF模板工程根目录下应包含build-profile.json5文件，如有损坏可重新创建ASCF模板工程，替换ascf_src目录。
