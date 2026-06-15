# 扫码

## has.scanCode

has.scanCode(Object object)

调起客户端扫码界面进行扫码。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| onlyFromCamera | boolean | false | 否 | 是否只能从相机扫码，不允许从相册选择图片。 |
| scanType | Array&lt;string&gt; | ['barCode', 'qrCode'] | 否 | 扫码类型。<br/>barCode：一维码<br/>qrCode：二维码<br/>datamatrix：Data Matrix 码<br/>pdf417：PDF417 条码 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| result | string | 所扫码的内容。 |
| scanType | string | 所扫码的类型。详细内容参见“scanType合法值”。 |

**scanType合法值：**

| 合法值 | 描述 |
| -------- | -------- |
| FORMAT_UNKNOWN | 未知类型，用于事先不知道要扫哪种类型码的场景，此参数不可用作码图生成。 |
| AZTEC | AZTEC一维码。 |
| CODABAR | CODABAR一维码。 |
| CODE_39 | CODE 39一维码。 |
| CODE_93 | CODE 93一维码。 |
| CODE_128 | CODE 128一维码。 |
| DATA_MATRIX | DATA MATRIX二维码。 |
| EAN_8 | EAN-8一维码。 |
| EAN_13 | EAN-13一维码。 |
| ITF_14 | ITF-14。 |
| PDF_417 | PDF417二维码。 |
| QR_CODE | QR CODE二维码。 |
| UPC_A | UPC-A一维码。 |
| UPC_E | UPC-E一维码。 |
| MULTIFUNCTIONAL | MULTIFUNCTIONAL CODE，暂不支持码图生成。 |

**示例：**

```js
has.scanCode({
  success: (res) => {
    console.info('scanCode success', res);
  },
  fail: (err) => {
    console.error('scanCode fail', err);
  },
  complete: (res) => {
    console.info('scanCode complete', res);
  }
});
```
