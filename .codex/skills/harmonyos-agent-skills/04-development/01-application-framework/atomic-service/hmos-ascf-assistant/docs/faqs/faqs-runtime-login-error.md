# has.login接口运行报错

**问题现象**

has.login接口运行报错，报错信息主要为：

errMsg：login error, message: Failed to check the fingerprint of the app bundle.Fingerprint verification error.

errCode：11000101

**可能原因**

1. 华为帐号登录认证不支持自动签名，当前签名为自动签名。
2. client_id未配置或配置的值不正确。
3. 应用的指纹证书未配置或配置错误。
4. debug安装包和release安装包的签名存在差异。

**解决措施**

1. 使用手动签名。
2. 检查module type为entry的模块下module.json5中的client_id是否配置或配置的值是否正确，请参考[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)。
3. 检查AGC上应用的指纹证书，详情请见[添加公钥指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-dev-overview#section1726913517284)。
4. 更新app.json5中的versionCode使本地缓存失效后再进行重试。
