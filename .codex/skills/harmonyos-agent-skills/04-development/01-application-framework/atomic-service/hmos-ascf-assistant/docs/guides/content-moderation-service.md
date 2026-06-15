# 内容风控服务


内容风控服务接口用于对终端用户提交的文本或图片内容进行合规性检查的服务，如识别暴力、色情等违法的信息，有效协助用户进行风险预警和违法内容拦截。


该功能基于百万级样本库和多个文本、图片风控模型，结合多种文本、图片对抗方案等，通过分类模型、安全大模型等技术，高效识别违法违规内容；同时系统基于海量语料训练与实时误报纠偏体系，构建动态优化闭环，持续提升风险防控精度与模型鲁棒性。


## 常见使用场景

消费者在云服务提交的评论、账号昵称、账号头像等。


## 约束与限制

1. 内容风控服务接口流量控制策略：≤5 TPS。

2. 文本风控接口单次提交的文本上限500个字，需使用UTF-8编码。

3. 图片审核接口支持imageBase64/imageUrl，其中base64之后最大支持1M Bytes，最小边50px，最长边4096px，建议：640px\*640px，支持的格式PNG、JPG、JPEG、BMP、GIF。

**功能使用限制**

1. 当前仅支持通过元服务的服务端进行开通和对接。

2. 当前仅只支持中国境内（不包含中国香港、中国澳门、中国台湾）。


## 业务流程

![zh-cn_image_0000002418512934](figures/zh-cn_image_0000002418512934.png)

**开发准备**

内容风控服务的开发方式参见“指南应用服务[Cloud Foundation Kit(云开发服务)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloud-foundation-kit-guide)”。

1. 开通云函数。  
   内容风控服务以云函数的方式进行开放，如您是首次使用云函数，请先[申请开通云函数](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-function)。

   本服务仅在中国区开放，因此“数据处理位置”请选择“中国”。

2. [启用连接器](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/cloud-function-enable-connector-0000002237083942)。

3. [创建官方连接器](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/cloud-function-official-connector-0000002219452452)。

4. [调用官方连接器](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/call-official-connector-0000002240913702)。

5. 元服务应用服务器按照连接器的参数要求，发起文本或者图片审核，并获得审核结果。



## 个人数据处理说明

此文档针对华为作为最终用户数据处理者，开发者作为最终用户数据控制者的数据处理进行说明，包括：

- **华为处理的个人数据清单**  
  | **个人数据清单** | **使用目的** | **存留期** |
  | -------- | -------- | -------- |
  | 您主动提交的文本 | 在使用内容审核服务时，用于检测您提交的文本是否存在合规风险。 | 不留存 |
  | 您主动提交的图片 | 在使用内容审核服务时，用于检测您提交的图片是否存在合规风险。 | 不留存 |

- **指导开发者如何帮助最终用户实现对数据的控制**
  - 如何清除最终用户的数据？  
     不涉及，内容审核服务不涉及存储。
  - 如何导出最终用户的数据？  
     不涉及，内容审核服务不涉及存储。
