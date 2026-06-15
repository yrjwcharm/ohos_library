# 联系人

## has.chooseContact

has.chooseContact(Object object)

拉起手机通讯录，选择联系人。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数 |
| fail | function | 否 | 接口调用失败的回调函数 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| phoneNumber | string | 手机号 |
| displayName | string | 联系人姓名 |

**示例：**

```js
has.chooseContact({
  success: (res) => {
    console.info('chooseContact success', res);
  },
  fail: (err) => {
    console.error('chooseContact fail', err);
  },
  complete: (res) => {
    console.info('chooseContact complete', res);
  }
});
```

## has.addPhoneContact

has.addPhoneContact(Object object)

添加手机通讯录联系人。用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录。

**起始版本：** 1.0.13

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| firstName | string | 是 | 名字 |
| photoFilePath | string | 否 | 头像本地文件路径 |
| remark | string | 否 | 备注 |
| mobilePhoneNumber | string | 否 | 手机号 |
| addressCountry | string | 否 | 联系地址国家 |
| addressState | string | 否 | 联系地址省份 |
| addressCity | string | 否 | 联系地址城市 |
| addressStreet | string | 否 | 联系地址街道 |
| addressPostalCode | string | 否 | 联系地址邮政编码 |
| organization | string | 否 | 公司 |
| title | string | 否 | 职位 |
| workFaxNumber | string | 否 | 工作传真 |
| workPhoneNumber | string | 否 | 工作电话 |
| hostNumber | string | 否 | 公司电话 |
| email | string | 否 | 电子邮件 |
| url | string | 否 | 网站 |
| workAddressCountry | string | 否 | 工作地址国家 |
| workAddressState | string | 否 | 工作地址省份 |
| workAddressCity | string | 否 | 工作地址城市 |
| workAddressStreet | string | 否 | 工作地址街道 |
| workAddressPostalCode | string | 否 | 工作地址邮政编码 |
| homeFaxNumber | string | 否 | 住宅传真 |
| homePhoneNumber | string | 否 | 住宅电话 |
| homeAddressCountry | string | 否 | 住宅地址国家 |
| homeAddressState | string | 否 | 住宅地址省份 |
| homeAddressCity | string | 否 | 住宅地址城市 |
| homeAddressStreet | string | 否 | 住宅地址街道 |
| homeAddressPostalCode | string | 否 | 住宅地址邮政编码 |
| success | function | 否 | 接口调用成功的回调函数 |
| fail | function | 否 | 接口调用失败的回调函数 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**示例：**

```js
has.addPhoneContact({
  firstName: '某',
  success: () => {
    console.info('addPhoneContact success');
  },
  fail: (err) => {
    console.error('addPhoneContact fail', err);
  },
  complete: (res) => {
    console.info('addPhoneContact complete', res);
  }
});
```
