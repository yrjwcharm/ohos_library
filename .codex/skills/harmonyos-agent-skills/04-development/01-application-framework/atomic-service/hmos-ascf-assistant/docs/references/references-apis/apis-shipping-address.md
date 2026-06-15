# 收货地址

## has.chooseAddress

has.chooseAddress(Object object)

获取用户收货地址。唤起用户编辑收货地址系统界面，并在编辑完成后返回用户选择的地址。

**需要权限：** 在调用获取收货地址API前，需完成对应的权限申请，申请方式请参考[获取收货地址](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-guide-atomic-choose-address)。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| userName | string | 收货人姓名。 |
| postalCode | string | 邮编。 |
| provinceName | string | 省份名称。 |
| cityName | string | 城市名称。 |
| countyName | string | 地区名称。 |
| streetName | string | 街道名称。 |
| detailInfo | string | 详细收货地址信息（包括街道地址）。 |
| detailInfoNew | string | 新选择器详细收货地址信息。 |
| nationalCode | string | 收货地址国家码。 |
| telNumber | string | 收货人手机号码。 |

**示例：**

```js
has.chooseAddress({
  success: (res) => {
    console.info('chooseAddress success', res);
  },
  fail: (err) => {
    console.error('chooseAddress fail', err);
  },
  complete: (res) => {
    console.info('chooseAddress complete', res);
  }
});
```
