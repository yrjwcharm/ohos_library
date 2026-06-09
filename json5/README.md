## JSON5
___
#### 简介
**json5** 这是一款JSON序列化、反序列化防止后端返回Long类型导致精度缺失的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/json5
```
#### 基本用法
```typescript
 let jsonStr ="{\"courseId\": 342607746727688192}"
JSONUtil.parse(jsonStr)
```
