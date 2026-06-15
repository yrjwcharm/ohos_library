---
name: kits_security
description: "HarmonyOS 安全能力集使用规范。包含 CryptoArchitectureKit 加密解密、UserAuthenticationKit 用户认证（指纹、人脸）、UniversalKeystoreKit 密钥库等安全功能。Use when: (1) 数据加密解密，(2) 用户认证，(3) 指纹/人脸识别，(4) 密钥管理。Triggers: 加密、解密、指纹、人脸、认证、密码、密钥、crypto、cipher、userAuth、fingerprint、face。"
user-invocable: false
---

# SecurityKit 安全能力集 (kits_security)

本 skill 覆盖 HarmonyOS **CryptoArchitectureKit**、**UserAuthenticationKit**、**UniversalKeystoreKit** 等安全能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| cryptoFramework | @ohos.security.cryptoFramework | 加密解密 |
| userAuth | @ohos.userIAM.userAuth | 用户认证 |
| faceAuth | @ohos.userIAM.faceAuth | 人脸认证 |
| huks | @ohos.security.huks | 密钥管理 |

## 快速索引

### AES 对称加密

```typescript
import cryptoFramework from '@ohos.security.cryptoFramework';

// 创建AES加密器
let cipher = cryptoFramework.createCipher('AES256|GCM|PKCS7');

// 生成密钥
let symKeyGenerator = cryptoFramework.createSymKeyGenerator('AES256');
let symKey = await symKeyGenerator.generateSymKey();

// 生成IV（初始化向量）
let iv = cryptoFramework.createBlob({ data: new Uint8Array(12) });

// 初始化加密
await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, {
  algName: 'GcmParamsSpec',
  iv: iv,
  aad: cryptoFramework.createBlob({ data: new Uint8Array(0) }),
  authTag: cryptoFramework.createBlob({ data: new Uint8Array(16) })
});

// 加密数据
let plainText = cryptoFramework.createBlob({ data: new TextEncoder().encode('Hello World') });
let cipherText = await cipher.doFinal(plainText);
console.log('Encrypted: ' + cipherText.data);

// 解密
await cipher.init(cryptoFramework.DECRYPT_MODE, symKey, {
  algName: 'GcmParamsSpec',
  iv: iv,
  aad: cryptoFramework.createBlob({ data: new Uint8Array(0) }),
  authTag: cryptoFramework.createBlob({ data: new Uint8Array(16) })
});

let decryptedText = await cipher.doFinal(cipherText);
console.log('Decrypted: ' + new TextDecoder().decode(decryptedText.data));
```

### RSA 非对称加密

```typescript
import cryptoFramework from '@ohos.security.cryptoFramework';

// 创建RSA密钥对生成器
let keyPairGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024');
let keyPair = await keyPairGenerator.generateKeyPair();

// 创建RSA加密器
let cipher = cryptoFramework.createCipher('RSA1024|PKCS1');

// 公钥加密
await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, keyPair.pubKey, null);
let plainText = cryptoFramework.createBlob({ data: new TextEncoder().encode('Secret data') });
let cipherText = await cipher.doFinal(plainText);

// 私钥解密
await cipher.init(cryptoFramework.DECRYPT_MODE, keyPair.priKey, null);
let decryptedText = await cipher.doFinal(cipherText);
console.log('Decrypted: ' + new TextDecoder().decode(decryptedText.data));
```

### 数字签名

```typescript
import cryptoFramework from '@ohos.security.cryptoFramework';

// 创建RSA密钥对
let keyPairGenerator = cryptoFramework.createAsyKeyGenerator('RSA2048');
let keyPair = await keyPairGenerator.generateKeyPair();

// 创建签名器
let signer = cryptoFramework.createSign('RSA2048|PKCS1|SHA256');
await signer.init(keyPair.priKey);

// 签名
let data = cryptoFramework.createBlob({ data: new TextEncoder().encode('Data to sign') });
let signature = await signer.sign(data);

// 验证签名
let verifier = cryptoFramework.createVerify('RSA2048|PKCS1|SHA256');
await verifier.init(keyPair.pubKey);
let isValid = await verifier.verify(data, signature);
console.log('Signature valid: ' + isValid);
```

### 哈希算法（SHA、MD5）

```typescript
import cryptoFramework from '@ohos.security.cryptoFramework';

// SHA-256
let md = cryptoFramework.createMd('SHA256');
await md.update({ data: new TextEncoder().encode('Hello World') });
let hashResult = await md.digest();
console.log('SHA256: ' + Array.from(new Uint8Array(hashResult.data))
  .map(b => b.toString(16).padStart(2, '0')).join(''));

// MD5（不推荐用于安全场景）
let md5 = cryptoFramework.createMd('MD5');
await md5.update({ data: new TextEncoder().encode('Hello') });
let md5Result = await md5.digest();

// HMAC
let keyGenerator = cryptoFramework.createSymKeyGenerator('HMAC|SHA256');
let hmacKey = await keyGenerator.generateSymKey();
let mac = cryptoFramework.createMac('SHA256');
await mac.init(hmacKey);
await mac.update({ data: new TextEncoder().encode('Data') });
let hmacResult = await mac.doFinal();
```

### 随机数生成

```typescript
import cryptoFramework from '@ohos.security.cryptoFramework';

// 创建安全随机数生成器
let random = cryptoFramework.createRandom();

// 生成随机字节
let randomBytes = await random.generateRandom(32);
console.log('Random bytes: ' + Array.from(new Uint8Array(randomBytes.data))
  .map(b => b.toString(16).padStart(2, '0')).join(''));

// 设置种子（可选）
random.setSeed(new Uint8Array([1, 2, 3, 4, 5]));
```

### 用户认证（指纹/人脸）

```typescript
import userAuth from '@ohos.userIAM.userAuth';

// 创建认证实例
let authInstance = userAuth.getAuthInstance({
  challenge: new Uint8Array([1, 2, 3, 4]),  // 挑战码
  authType: [userAuth.UserAuthType.PIN, userAuth.UserAuthType.FINGERPRINT, userAuth.UserAuthType.FACE],
  authTrustLevel: userAuth.AuthTrustLevel.ATL3  // S3级别
});

// 检查认证能力
let isAvailable = await authInstance.isAvailable();
console.log('Auth available: ' + isAvailable);

// 开始认证
authInstance.on('result', {
  onResult: (result: userAuth.AuthResultInfo) => {
    console.log('Auth result: ' + result.result);
    // AuthResult: SUCCESS(0), FAIL(1), CANCELED(2)
    if (result.result === userAuth.AuthResult.SUCCESS) {
      console.log('Authentication succeeded!');
      // token可用于后续操作
      console.log('Token: ' + result.token);
    }
  }
});

await authInstance.start();

// 取消认证
// authInstance.cancel();
```

### 指纹认证

```typescript
import userAuth from '@ohos.userIAM.userAuth';

// 仅使用指纹认证
let authInstance = userAuth.getAuthInstance({
  challenge: new Uint8Array([1, 2, 3, 4]),
  authType: [userAuth.UserAuthType.FINGERPRINT],
  authTrustLevel: userAuth.AuthTrustLevel.ATL2
});

authInstance.on('result', {
  onResult: (result) => {
    switch (result.result) {
      case userAuth.AuthResult.SUCCESS:
        console.log('指纹认证成功');
        break;
      case userAuth.AuthResult.FAIL:
        console.log('指纹认证失败');
        break;
      case userAuth.AuthResult.CANCELED:
        console.log('指纹认证已取消');
        break;
    }
  }
});

await authInstance.start();
```

### 人脸认证

```typescript
import userAuth from '@ohos.userIAM.userAuth';
import faceAuth from '@ohos.userIAM.faceAuth';

// 检查人脸识别是否可用
let authInstance = userAuth.getAuthInstance({
  challenge: new Uint8Array([1, 2, 3, 4]),
  authType: [userAuth.UserAuthType.FACE],
  authTrustLevel: userAuth.AuthTrustLevel.ATL3
});

if (await authInstance.isAvailable()) {
  authInstance.on('result', {
    onResult: (result) => {
      if (result.result === userAuth.AuthResult.SUCCESS) {
        console.log('Face authentication succeeded');
      }
    }
  });

  await authInstance.start();
}
```

### 获取认证方式信息

```typescript
import userAuth from '@ohos.userIAM.userAuth';

// 获取所有支持的认证方式
let authTypes = await userAuth.getAvailableStatus(userAuth.AuthTrustLevel.ATL3);
console.log('Available auth types: ' + authTypes);

// 检查特定认证方式状态
let status = await userAuth.getAuthTrustLevel(userAuth.UserAuthType.FINGERPRINT);
console.log('Fingerprint trust level: ' + status);
```

### 密钥存储 (HUKS)

```typescript
import huks from '@ohos.security.huks';

// 密钥属性
let properties: huks.HuksOptions = {
  properties: [
    { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
    { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256 },
    { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT | huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT },
    { tag: huks.HuksTag.HUKS_TAG_PADDING, value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7 },
    { tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE, value: huks.HuksCipherMode.HUKS_MODE_CBC }
  ]
};

// 生成密钥并存储
let keyAlias = 'my_secret_key';
await huks.generateKeyItem(keyAlias, properties);

// 使用密钥加密
let encryptOptions: huks.HuksOptions = {
  properties: [
    { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT },
    { tag: huks.HuksTag.HUKS_TAG_IV, value: new Uint8Array(16) }
  ],
  inData: new TextEncoder().encode('Hello World')
};
let encryptedData = await huks.initSession(keyAlias, encryptOptions);
// 完成加密
let encryptResult = await huks.finishSession(encryptedData.handle, encryptOptions);

// 删除密钥
await huks.deleteKeyItem(keyAlias, properties);
```

## 使用示例

### 加密存储工具类

```typescript
import cryptoFramework from '@ohos.security.cryptoFramework';
import preferences from '@ohos.data.preferences';

class SecureStorage {
  private key: cryptoFramework.SymKey | null = null;
  private cipher: cryptoFramework.Cipher | null = null;
  private pref: preferences.Preferences | null = null;

  async init(context: Context): Promise<void> {
    // 初始化密钥
    let keyGenerator = cryptoFramework.createSymKeyGenerator('AES256');
    this.key = await keyGenerator.generateSymKey();

    // 初始化加密器
    this.cipher = cryptoFramework.createCipher('AES256|GCM|PKCS7');

    // 初始化Preferences
    this.pref = await preferences.getPreferences(context, 'secure_data');
  }

  async save(key: string, value: string): Promise<void> {
    if (!this.cipher || !this.key || !this.pref) {
      throw new Error('SecureStorage not initialized');
    }

    // 加密
    let iv = cryptoFramework.createBlob({ data: new Uint8Array(12) });
    await this.cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, this.key, {
      algName: 'GcmParamsSpec',
      iv: iv,
      aad: cryptoFramework.createBlob({ data: new Uint8Array(0) }),
      authTag: cryptoFramework.createBlob({ data: new Uint8Array(16) })
    });

    let plainData = cryptoFramework.createBlob({ data: new TextEncoder().encode(value) });
    let encryptedData = await this.cipher.doFinal(plainData);

    // 存储
    let encryptedString = btoa(String.fromCharCode(...new Uint8Array(encryptedData.data)));
    await this.pref.put(key, encryptedString);
    await this.pref.flush();
  }

  async get(key: string): Promise<string | undefined> {
    if (!this.cipher || !this.key || !this.pref) {
      throw new Error('SecureStorage not initialized');
    }

    let encryptedString = await this.pref.get(key, '') as string;
    if (!encryptedString) {
      return undefined;
    }

    // 解密
    let encryptedData = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));

    let iv = cryptoFramework.createBlob({ data: new Uint8Array(12) });
    await this.cipher.init(cryptoFramework.DECRYPT_MODE, this.key, {
      algName: 'GcmParamsSpec',
      iv: iv,
      aad: cryptoFramework.createBlob({ data: new Uint8Array(0) }),
      authTag: cryptoFramework.createBlob({ data: new Uint8Array(16) })
    });

    let decryptedData = await this.cipher.doFinal({ data: encryptedData });
    return new TextDecoder().decode(decryptedData.data);
  }
}
```

### 指纹登录验证

```typescript
import userAuth from '@ohos.userIAM.userAuth';

@Entry
@Component
struct FingerprintLoginPage {
  @State authStatus: string = '请点击进行指纹验证';
  @State isAuthenticated: boolean = false;
  private authInstance: userAuth.AuthInstance | null = null;

  async startAuth(): Promise<void> {
    try {
      this.authInstance = userAuth.getAuthInstance({
        challenge: new Uint8Array([1, 2, 3, 4]),
        authType: [userAuth.UserAuthType.FINGERPRINT],
        authTrustLevel: userAuth.AuthTrustLevel.ATL2
      });

      let isAvailable = await this.authInstance.isAvailable();
      if (!isAvailable) {
        this.authStatus = '指纹认证不可用，请先录入指纹';
        return;
      }

      this.authStatus = '请触摸指纹传感器...';

      this.authInstance.on('result', {
        onResult: (result) => {
          if (result.result === userAuth.AuthResult.SUCCESS) {
            this.authStatus = '验证成功！';
            this.isAuthenticated = true;
            // 跳转到主页
          } else if (result.result === userAuth.AuthResult.FAIL) {
            this.authStatus = '验证失败，请重试';
          } else if (result.result === userAuth.AuthResult.CANCELED) {
            this.authStatus = '已取消验证';
          }
        }
      });

      await this.authInstance.start();
    } catch (error) {
      this.authStatus = '认证出错: ' + error.message;
    }
  }

  build() {
    Column({ space: 30 }) {
      if (!this.isAuthenticated) {
        Text('指纹登录')
          .fontSize(28)
          .fontWeight(FontWeight.Bold)

        Text(this.authStatus)
          .fontSize(16)
          .fontColor('#666')

        Button('验证指纹')
          .width('80%')
          .onClick(() => this.startAuth())

        Text('或使用密码登录')
          .fontSize(14)
          .fontColor('#007DFF')
      } else {
        Text('登录成功')
          .fontSize(28)
          .fontColor('#07C160')
      }
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```

### 文件完整性校验

```typescript
import cryptoFramework from '@ohos.security.cryptoFramework';
import fs from '@ohos.file.fs';

async function calculateFileHash(filePath: string): Promise<string> {
  let md = cryptoFramework.createMd('SHA256');
  let file = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
  let stat = fs.statSync(filePath);

  // 分块读取更新哈希
  let chunkSize = 1024 * 1024;  // 1MB
  let buffer = new ArrayBuffer(chunkSize);

  for (let offset = 0; offset < stat.size; offset += chunkSize) {
    let readLen = fs.readSync(file.fd, buffer, { offset: 0, length: chunkSize });
    if (readLen === 0) break;

    let chunk = new Uint8Array(buffer, 0, readLen);
    await md.update({ data: chunk });
  }

  fs.closeSync(file);
  let hashResult = await md.digest();

  return Array.from(new Uint8Array(hashResult.data))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// 使用
let hash = await calculateFileHash('/data/file.zip');
console.log('File SHA256: ' + hash);
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      { "name": "ohos.permission.ACCESS_BIOMETRIC" },
      { "name": "ohos.permission.USE_FINGERPRINT" },
      { "name": "ohos.permission.USE_FACE" }
    ]
  }
}
```

## AuthTrustLevel 枚举

```typescript
enum AuthTrustLevel {
  ATL1 = 10000,  // 低安全级别，简单的PIN码
  ATL2 = 20000,  // 中安全级别，指纹
  ATL3 = 30000,  // 高安全级别，人脸或指纹+PIN
  ATL4 = 40000   // 最高安全级别
}
```

## UserAuthType 枚举

```typescript
enum UserAuthType {
  PIN = 0,           // PIN码
  FINGERPRINT = 1,   // 指纹
  FACE = 2           // 人脸
}
```

## 最佳实践

1. **敏感数据加密存储**：
```typescript
// 使用HUKS存储密钥，而非自己管理
// HUKS密钥存储在安全区域，无法被提取
```

2. **认证失败处理**：
```typescript
let retryCount = 0;
authInstance.on('result', {
  onResult: (result) => {
    if (result.result === userAuth.AuthResult.FAIL) {
      retryCount++;
      if (retryCount >= 3) {
        // 锁定或切换其他认证方式
        useFallbackAuth();
      }
    }
  }
});
```

3. **使用安全的加密模式**：
```typescript
// 推荐 AES-GCM 或 AES-CBC + HMAC
// 避免使用 ECB 模式
let cipher = cryptoFramework.createCipher('AES256|GCM|PKCS7');
```

## 注意事项

1. 生物认证需要用户授权
2. 加密操作建议使用HUKS管理密钥
3. SHA256以上算法用于安全场景
4. 认证token有时效性，需及时使用