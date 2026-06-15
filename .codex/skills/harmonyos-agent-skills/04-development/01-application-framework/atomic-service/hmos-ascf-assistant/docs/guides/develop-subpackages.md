# 分包


假设应用根目录文件组织如下：


```txt
|— ascf.config.json
|— app.json
|— app.js
|— app.css
|— components
|  |— cart.json
|  |— cart.hxml
|  |— cart.js
|  |— cart.css
|— pages
|  |— user
|  |  |— user.json
|  |  |— user.hxml
|  |  |— user.js
|  |  |— user.css
|— pkgA
|  |— pageA1
|  |  |— user.json
|  |  |— user.hxml
|  |  |— user.js
|  |  |— user.css
```


在app.json的subpackages字段中声明项目分包结构如下：


```json
"subpackages": [
  {
    "root": "pkgA",
    "pages": [
     "pageA1/user"
    ]
  }
],
```


小程序转换为元服务的规则：


1. 从app.json复制新增root字段，resource 改成下划线形式起分包名。

2. 子包rawfile里保持root中的目录结构。


## 打包原则

- 声明 subpackages 后，将按照 subpackages 配置的资源路径进行打包， subpackages 配置路径以外的目录将被打包到主包中。

- 主包也能包含自己的页面，打包时会依据路径的规则将页面内的页面划分到对应的分包中，subpackages 配置路径以外的页面将保留在主包中。

- 分包的根目录不能是另外一个分包的子目录。

- 分包之间不能有资源依赖，分包可依赖主包资源，主包不能依赖分包资源。

- tabbar页面必须在主包。
