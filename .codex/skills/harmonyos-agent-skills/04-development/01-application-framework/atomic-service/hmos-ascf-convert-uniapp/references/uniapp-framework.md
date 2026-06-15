# uni-app 跨平台框架 uni-app Framework

## 目录
- [uni-app 概述](#uni-app-概述)
- [项目初始化](#项目初始化)
- [Vue 3 开发](#vue-3-开发)
- [页面与路由](#页面与路由)
- [API 调用](#api-调用)
- [条件编译](#条件编译)
- [样式与布局](#样式与布局)
- [组件库](#组件库)
- [状态管理](#状态管理)
- [常见问题与陷阱](#常见问题与陷阱)

---

## uni-app 概述

uni-app 基于 Vue.js，编译到多端，采用编译时 + 运行时双引擎。

**支持平台：** 微信/支付宝/百度/字节/QQ/快应用/H5/App/ASCF (iOS + Android)

**架构特点：**
- Vue 2 或 Vue 3（推荐 Vue 3 + Vite）
- 编译时将 Vue 模板转为各平台模板（WXML/AXML 等）
- 小程序端性能接近原生（编译时方案）
- 使用 HBuilderX IDE 或 CLI 方式开发

---

## 项目初始化

### CLI 方式（推荐）

```bash
# Vue 3 + Vite
npx degit dcloudio/uni-preset-vue#vite-ts my-project
cd my-project
npm install

# 手动设置输出目录
set UNI_OUTPUT_DIR=ASCF_PROJECT/ascf/ascf_src

# 开发（ASCF元服务）
npm run dev:mp-harmony

# 构建
npm run build:mp-harmony


### 项目结构

```
├── src/
│   ├── App.vue           # 应用入口
│   ├── main.ts           # 初始化
│   ├── manifest.json     # 应用配置（appid、模块权限等）
│   ├── pages.json        # 页面路由配置（等同 app.json）
│   ├── uni.scss          # uni-app 内置样式变量
│   ├── pages/
│   │   └── index/
│   │       └── index.vue
│   ├── components/
│   ├── static/           # 静态资源（不编译）
│   └── store/
├── vite.config.ts
└── package.json
```

---

## Vue 3 开发

### 页面组件

```vue
<!-- src/pages/index/index.vue -->
<template>
  <view class="container">
    <text class="title">{{ message }}</text>
    <button @click="increment">计数: {{ count }}</button>

    <view v-for="item in items" :key="item.id" class="item" @click="goDetail(item.id)">
      <image :src="item.image" mode="aspectFill" class="item-img" />
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onLoad, onShow, onPullDownRefresh, onReachBottom, onShareAppMessage } from '@dcloudio/uni-app'

const message = ref('Hello uni-app')
const count = ref(0)
const items = ref<Array<{ id: string; name: string; image: string }>>([])

const increment = () => { count.value++ }

const goDetail = (id: string) => {
  uni.navigateTo({ url: `/pages/detail/detail?id=${id}` })
}

onLoad((options) => {
  console.log('页面加载, 参数:', options)
})

onShow(() => {
  console.log('页面显示')
})

onPullDownRefresh(() => {
  loadData().finally(() => uni.stopPullDownRefresh())
})

onReachBottom(() => {
  loadMore()
})

onShareAppMessage(() => ({
  title: '分享标题',
  path: '/pages/index/index'
}))

async function loadData() {
  const res = await uni.request({ url: 'https://api.example.com/items' })
  items.value = res.data as any[]
}

onMounted(() => { loadData() })
</script>

<style lang="scss" scoped>
.container { padding: 20rpx; }
.item { display: flex; align-items: center; margin: 10rpx 0; }
.item-img { width: 120rpx; height: 120rpx; margin-right: 20rpx; }
</style>
```

### 生命周期

| uni-app Hook | 说明 | 对应小程序 |
|-------------|------|-----------|
| `onLoad(options)` | 页面加载 | onLoad |
| `onShow()` | 页面显示 | onShow |
| `onReady()` | 渲染完成 | onReady |
| `onHide()` | 页面隐藏 | onHide |
| `onUnload()` | 页面卸载 | onUnload |
| `onPullDownRefresh()` | 下拉刷新 | onPullDownRefresh |
| `onReachBottom()` | 触底 | onReachBottom |
| `onShareAppMessage()` | 分享 | onShareAppMessage |
| `onShareTimeline()` | 朋友圈 | onShareTimeline |
| `onPageScroll(e)` | 页面滚动 | onPageScroll |

**App 级别：** `onLaunch`, `onShow`, `onHide`, `onError`

```vue
<!-- App.vue -->
<script setup lang="ts">
import { onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App 启动')
})

onShow(() => {
  console.log('App 显示')
})
</script>
```

---

## 页面与路由

### pages.json 配置

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",
        "enablePullDownRefresh": true
      }
    },
    {
      "path": "pages/mine/mine",
      "style": { "navigationBarTitleText": "我的" }
    }
  ],
  "subPackages": [
    {
      "root": "pages-sub",
      "pages": [
        { "path": "detail/detail", "style": { "navigationBarTitleText": "详情" } }
      ]
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#1296db",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/tab/home.png",
        "selectedIconPath": "static/tab/home-active.png"
      },
      {
        "pagePath": "pages/mine/mine",
        "text": "我的",
        "iconPath": "static/tab/mine.png",
        "selectedIconPath": "static/tab/mine-active.png"
      }
    ]
  }
}
```

### 路由导航

```typescript
// 跳转
uni.navigateTo({ url: '/pages-sub/detail/detail?id=123' })

// 重定向
uni.redirectTo({ url: '/pages/result/result' })

// Tab 切换
uni.switchTab({ url: '/pages/index/index' })

// 返回
uni.navigateBack({ delta: 1 })

// 重启
uni.reLaunch({ url: '/pages/index/index' })
```

### 获取页面参数

```vue
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

onLoad((options) => {
  const id = options?.id  // URL 参数
})
</script>
```

---

## API 调用

uni-app 封装了统一 API，以 `uni.` 为前缀：

```typescript
// 网络请求
const [err, res] = await uni.request({
  url: 'https://api.example.com/data',
  method: 'POST',
  data: { key: 'value' }
})
if (!err) console.log(res.data)

// Promise 风格（推荐）
const res = await uni.request({ url: '/api/data' })

// 存储
uni.setStorageSync('token', 'xxx')
const token = uni.getStorageSync('token')

// UI 反馈
uni.showToast({ title: '成功', icon: 'success' })
uni.showLoading({ title: '加载中' })
uni.hideLoading()
uni.showModal({
  title: '确认',
  content: '是否删除？',
  success: (res) => {
    if (res.confirm) { /* 确认 */ }
  }
})

// 图片选择
const res = await uni.chooseImage({ count: 9, sourceType: ['album', 'camera'] })
const tempFiles = res.tempFilePaths

// 文件上传
uni.uploadFile({
  url: 'https://api.example.com/upload',
  filePath: tempFiles[0],
  name: 'file',
  success: (res) => { console.log(JSON.parse(res.data)) }
})
```

---

## 条件编译

uni-app 使用注释标记实现条件编译，编译时移除不匹配的代码。

### 模板中

```vue
<template>
  <!-- #ifdef MP-HARMONY -->
  <button open-type="contact">ASCF元服务</button>
  <!-- #endif -->

  <!-- #ifdef H5 -->
  <a href="tel:10086">拨打电话</a>
  <!-- #endif -->

  <!-- #ifndef MP-ALIPAY -->
  <view>支付宝以外的平台显示</view>
  <!-- #endif -->
</template>
```

### JS 中

```typescript
// #ifdef MP-HARMONY
has.login({ success(res) { console.log(res.code) } })
// #endif

// #ifdef H5
window.location.href = '/login'
// #endif

// #ifdef APP-PLUS
plus.runtime.openURL('https://example.com')
// #endif
```

### 样式中

```scss
/* #ifdef MP-HARMONY */
.ascf-only { color: #07C160; }
/* #endif */

/* #ifdef H5 */
.h5-only { cursor: pointer; }
/* #endif */
```

### 平台标识

| 标识 | 平台 |
|------|------|
| `MP-HARMONY` | ASCF元服务 |
| `MP-WEIXIN` | 微信小程序 |
| `MP-ALIPAY` | 支付宝小程序 |
| `MP-BAIDU` | 百度小程序 |
| `MP-TOUTIAO` | 字节跳动小程序 |
| `MP` | 所有小程序 |
| `H5` | H5 |
| `APP-PLUS` | App (iOS + Android) |
| `APP-ANDROID` | Android App |
| `APP-IOS` | iOS App |

组合：`#ifdef MP-HARMONY || MP-ALIPAY`（多平台）

---

## 样式与布局

### rpx 单位

uni-app 直接支持 rpx，与ASCF元服务一致（750rpx = 屏幕宽度）：

```scss
.box {
  width: 750rpx;       // 满屏宽
  padding: 20rpx;
  font-size: 28rpx;    // 约等于 14px
  border: 1px solid #eee; // px 不转换
}
```

### scss 变量

```scss
// uni.scss（全局变量，自动引入）
$primary-color: #1296db;
$text-color: #333;
$border-color: #eee;
$spacing: 20rpx;

// 页面中直接使用
.title { color: $primary-color; }
```

### 样式注意事项

- `page` 选择器设置页面背景色（等同ASCF元服务的 page）
- 组件使用 `scoped` 防止样式泄漏
- 小程序端不支持 `*` 通配符选择器
- 小程序端不支持 `v-html`（可用 `rich-text` 组件替代）

---

## 组件库

### uni-ui（官方）

```bash
npm install @dcloudio/uni-ui
```

```vue
<template>
  <uni-card title="标题">内容</uni-card>
  <uni-badge text="99+" type="error" />
  <uni-popup ref="popup" type="bottom">
    <view>弹出内容</view>
  </uni-popup>
</template>

<script setup>
import { ref } from 'vue'
const popup = ref()
const openPopup = () => popup.value.open()
</script>
```

### uView（社区热门）

```bash
npm install uview-plus
```

```typescript
// main.ts
import uView from 'uview-plus'
app.use(uView)
```

### 页面 easycom 自动注册

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
      "^u-(.*)": "uview-plus/components/u-$1/u-$1.vue"
    }
  }
}
```

配置后组件无需手动 import，直接在模板中使用。

---

## 状态管理

### Pinia（推荐）

```typescript
// src/store/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<{ nickname: string; avatar: string } | null>(null)

  async function login() {
    const [, loginRes] = await uni.login({ provider: 'ascf' })
    const res = await uni.request({
      url: 'https://api.example.com/login',
      method: 'POST',
      data: { code: loginRes?.code }
    })
    token.value = (res.data as any).token
    uni.setStorageSync('token', token.value)
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    uni.removeStorageSync('token')
  }

  return { token, userInfo, login, logout }
})
```

```typescript
// src/main.ts
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  return { app }
}
```

```vue
<!-- 页面中使用 -->
<script setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
</script>
```

---

## 常见问题与陷阱

### 1. 组件标签必须用小程序组件

```vue
<!-- ❌ 错误：HTML 标签 -->
<div class="box"><span>文本</span></div>

<!-- ✅ 正确：小程序组件 -->
<view class="box"><text>文本</text></view>
```

### 2. v-html 不可用

```vue
<!-- ❌ 小程序端不支持 v-html -->
<view v-html="htmlContent"></view>

<!-- ✅ 使用 rich-text -->
<rich-text :nodes="htmlContent"></rich-text>
```

### 3. 动态样式绑定

```vue
<!-- ✅ 正确方式 -->
<view :style="{ color: textColor, fontSize: fontSize + 'rpx' }">文本</view>
<view :class="{ active: isActive, 'text-bold': isBold }">文本</view>
```

### 4. 小程序端不支持的 Vue 特性

| 特性 | 支持情况 |
|------|----------|
| `v-html` | 不支持（用 rich-text） |
| `<component :is>` | 不支持（用条件编译） |
| `<transition>` | 部分支持 |
| `<keep-alive>` | 不支持 |
| DOM 操作 | 不支持（用 createSelectorQuery） |
| `$refs` 操作 DOM | 不支持 |

### 5. 请求封装

```typescript
// src/utils/request.ts
const BASE_URL = 'https://api.example.com'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, any>
}

export async function request<T = any>(options: RequestOptions): Promise<T> {
  const token = uni.getStorageSync('token')

  const res = await uni.request({
    url: BASE_URL + options.url,
    method: options.method || 'GET',
    data: options.data,
    header: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  })

  if (res.statusCode === 401) {
    uni.removeStorageSync('token')
    uni.reLaunch({ url: '/pages/login/login' })
    throw new Error('未登录')
  }

  if (res.statusCode !== 200) {
    throw new Error((res.data as any)?.message || '请求失败')
  }

  return res.data as T
}
```

### 6. 小程序分包

```json
// pages.json
{
  "subPackages": [
    {
      "root": "pages-sub",
      "pages": [
        { "path": "detail/detail" }
      ]
    }
  ],
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["pages-sub"]
    }
  }
}
```
