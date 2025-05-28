## Crypto
___
#### 简介
**crypto** 这是一款HarmonyNext加解密的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/crypto
```


## SM2（SM2加解密）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/SM2Page.ets)

| 方法                                          | 介绍                                        |
|:--------------------------------------------|:------------------------------------------|
| encrypt<br/>encryptSync                     | 加密                                        |
| decrypt<br/>decryptSync                     | 解密                                        |
| generateKeyPair<br/>generateKeyPairSync     | 生成非对称密钥KeyPair                            |
| getConvertKeyPair<br/>getConvertKeyPairSync | 获取转换的非对称密钥KeyPair                         |
| getSM2PubKey                                | 获取转换SM2公钥, 将C1C2C3格式的SM2公钥转换为鸿蒙所需的ASN.1格式 |
| getSM2PubKey                                | 获取转换SM2私钥                                 |
| getCipherTextSpec                           | 获取转换SM2密文格式，ASN.1格式转换为C1C2C3或C1C3C2       |
| sign<br/>signSync                           | 对数据进行签名                                   |
| verify<br/>verifySync                       | 对数据进行验签                                   |
| signSegment<br/>signSegmentSync             | 对数据进行分段签名                                 |
| verifySegment<br/>verifySegmentSync         | 对数据进行分段验签                                 |

## SM3（SM3工具类）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/SM3Page.ets)

| 方法                                  | 介绍            |
|:------------------------------------|:--------------|
| digest<br/>digestSync               | SM3摘要         |
| digestSegment<br/>digestSegmentSync | SM3分段摘要       |
| hmac<br/>hmacSync                   | SM3消息认证码计算    |
| hmacSegment<br/>hmacSegmentSync     | SM3消息认证码计算，分段 |

## SM4（SM4加解密）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/SM4Page.ets)

| 方法                                          | 介绍           |
|:--------------------------------------------|:-------------|
| encrypt<br/>encryptSync                     | 加密           |
| decrypt<br/>decryptSync                     | 解密           |
| encryptGCM<br/>encryptGCMSync               | 加密（GCM模式）    |
| decryptGCM<br/>decryptGCMSync               | 解密（GCM模式）    |
| encryptCBC<br/>encryptCBCSync               | 加密（CBC模式）    |
| decryptCBC<br/>decryptCBCSync               | 解密（CBC模式）    |
| encryptECB<br/>encryptECBSync               | 加密（ECB模式）    |
| decryptECB<br/>decryptECBSync               | 解密（ECB模式）    |
| encryptGCMSegment<br/>encryptGCMSegmentSync | 加密（GCM模式）分段  |
| decryptGCMSegment<br/>decryptGCMSegmentSync | 解密（GCM模式）分段  |
| generateSymKey<br/>generateSymKeySync       | 生成对称密钥SymKey |

## AES（AES加解密）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/AESPage.ets)

| 方法                                          | 介绍           |
|:--------------------------------------------|:-------------|
| encrypt<br/>encryptSync                     | 加密           |
| decrypt<br/>decryptSync                     | 解密           |
| encryptGCM<br/>encryptGCMSync               | 加密（GCM模式）    |
| decryptGCM<br/>decryptGCMSync               | 解密（GCM模式）    |
| encryptCBC<br/>encryptCBCSync               | 加密（CBC模式）    |
| decryptCBC<br/>decryptCBCSync               | 解密（CBC模式）    |
| encryptECB<br/>encryptECBSync               | 加密（ECB模式）    |
| decryptECB<br/>decryptECBSync               | 解密（ECB模式）    |
| encryptGCMSegment<br/>encryptGCMSegmentSync | 加密（GCM模式）分段  |
| decryptGCMSegment<br/>decryptGCMSegmentSync | 解密（GCM模式）分段  |
| generateSymKey<br/>generateSymKeySync       | 生成对称密钥SymKey |

## DES（DES加解密）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/DESPage.ets)

| 方法                                    | 介绍           |
|:--------------------------------------|:-------------|
| encrypt<br/>encryptSync               | 加密           |
| decrypt<br/>decryptSync               | 解密           |
| encryptECB<br/>encryptECBSync         | 加密（ECB模式）    |
| decryptECB<br/>decryptECBSync         | 解密（ECB模式）    |
| encryptCBC<br/>encryptCBCSync         | 加密（CBC模式）    |
| decryptCBC<br/>decryptCBCSync         | 解密（CBC模式）    |
| generateSymKey<br/>generateSymKeySync | 生成对称密钥SymKey |

## RSA（RSA加解密）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/RSAPage.ets)

| 方法                                          | 介绍                     |
|:--------------------------------------------|:-----------------------|
| encrypt<br/>encryptSync                     | 加密                     |
| decrypt<br/>decryptSync                     | 解密                     |
| encryptSegment<br/>encryptSegmentSync       | 加密,分段                  |
| decryptSegment<br/>decryptSegmentSync       | 解密,分段                  |
| generateKeyPair<br/>generateKeyPairSync     | 生成非对称密钥KeyPair         |
| getConvertKeyPair<br/>getConvertKeyPairSync | 获取转换的非对称密钥KeyPair      |
| sign<br/>signSync                           | 对数据进行签名                |
| verify<br/>verifySync                       | 对数据进行验签                |
| signSegment<br/>signSegmentSync             | 对数据进行分段签名              |
| verifySegment<br/>verifySegmentSync         | 对数据进行分段验签              |
| recover<br/>recoverSync                     | 对数据进行签名恢复原始数据，目前仅RSA支持 |

## MD5（MD5工具类）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/MD5Page.ets)

| 方法                                  | 介绍         |
|:------------------------------------|:-----------|
| digest<br/>digestSync               | MD5摘要      |
| digestSegment<br/>digestSegmentSync | MD5摘要，分段   |
| hmac<br/>hmacSync                   | 消息认证码计算    |
| hmacSegment<br/>hmacSegmentSync     | 消息认证码计算，分段 |

## SHA（SHA工具类）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/SHAPage.ets)

| 方法                                  | 介绍         |
|:------------------------------------|:-----------|
| digest<br/>digestSync               | SHA摘要      |
| digestSegment<br/>digestSegmentSync | SHA摘要，分段   |
| hmac<br/>hmacSync                   | 消息认证码计算    |
| hmacSegment<br/>hmacSegmentSync     | 消息认证码计算，分段 |

## ECDSA（ECDSA工具类）[使用案例](https://gitee.com/tongyuyan/harmony-utils/blob/master/entry/src/main/ets/pages/crypto/ECDSAPage.ets)

| 方法                                  | 介绍        |
|:------------------------------------|:----------|
| sign<br/>signSync                   | 对数据进行签名   |
| verify<br/>verifySync               | 对数据进行验签   |
| signSegment<br/>signSegmentSync     | 对数据进行分段签名 |
| verifySegment<br/>verifySegmentSync | 对数据进行分段验签 |

## CryptoUtil（加解密公用工具类，配合各个加密模块使用）

| 方法                                          | 介绍                |
|:--------------------------------------------|:------------------|
| encrypt<br/>encryptSync                     | 加密                |
| decrypt<br/>decryptSync                     | 解密                |
| generateSymKey<br/>generateSymKeySync       | 生成对称密钥SymKey      |
| getConvertSymKey<br/>getConvertSymKeySync   | 获取转换的对称密钥SymKey   |
| generateKeyPair<br/>generateKeyPairSync     | 生成非对称密钥KeyPair    |
| getConvertKeyPair<br/>getConvertKeyPairSync | 获取转换的非对称密钥KeyPair |
| getPemKeyPair                               | 获取指定数据生成非对称密钥     |
| generateIvParamsSpec                        | 生成IvParamsSpec    |
| getIvParamsSpec                             | 获取转换IvParamsSpec  |
| generateGcmParamsSpec                       | 生成GcmParamsSpec   |
| getGcmParamsSpec                            | 获取转换GcmParamsSpec |
| sign<br/>signSync                           | 对数据进行签名           |
| verify<br/>verifySync                       | 对数据进行验签           |
| signSegment<br/>signSegmentSync             | 对数据进行分段签名         |
| verifySegment<br/>verifySegmentSync         | 对数据进行分段验签         |
| dynamicKey<br/>dynamicKeySync               | 密钥协商              |
| digest<br/>digestSync                       | 摘要                |
| digestSegment<br/>digestSegmentSync         | 摘要，分段             |
| hmac<br/>hmacSync                           | 消息认证码计算           |
| hmacSegment<br/>hmacSegmentSync             | 消息认证码计算，分段        |

## CryptoHelper（加解密数据类型转换，配合各个加密模块使用）

| 方法                       | 介绍                    |
|:-------------------------|:----------------------|
| strToDataBlob            | 字符串转DataBlob          |
| dataBlobToStr            | DataBlob转字符串          |
| strToUint8Array          | 字符串转Uint8Array        |
| uint8ArrayToStr          | Uint8Array转字符串        |
| getSymKeyDataBlob        | 获取DataBlob类型的密钥       |
| getKeyDataBlob           | 获取DataBlob类型的公钥或私钥    |
| getRandomUint8Array      | 根据传入的大小生成随机Uint8Array |
| getUint8ArrayPaddingZero | Uint8Array补零操作        |
| toHexWithPaddingZero     | 补零操作                  |
| stringToHex              | 字符串转Hex字符串            |
| uint8ArrayToString       | 字节流转成可理解的字符串          |
