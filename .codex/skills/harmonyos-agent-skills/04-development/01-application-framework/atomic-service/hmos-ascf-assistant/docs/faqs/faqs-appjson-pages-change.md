# app.json配置pages字段重复报错

**问题现象**

工具链1.0.13版本开始，针对app.json配置中的pages字段加了重复性校验。如果pages字段有重复的元素，编译会报错，错误会提示具体哪两项重复。

编译报错如下：

![faqs-appjson-pages-change-figure-w800](figures/faqs-appjson-pages-change-figure.png)

**解决措施**

根据错误提示找到重复的项，去掉重新编译即可。
