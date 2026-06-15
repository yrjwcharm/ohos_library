# Taro 跨平台框架 Taro Framework

## 目录
- [Taro 4.x 概述](#taro-3x-概述)
- [项目初始化](#项目初始化)
- [React 开发模式](#react-开发模式)
- [Vue 3 开发模式](#vue-3-开发模式)
- [路由与导航](#路由与导航)
- [API 调用](#api-调用)
- [条件编译](#条件编译)
- [样式方案](#样式方案)
- [状态管理](#状态管理)
- [常见问题与陷阱](#常见问题与陷阱)

---

## Taro 4.x 概述

Taro 4.x 采用运行时架构，在运行时将 React/Vue 的渲染操作适配到小程序的视图层。

**支持平台：** 微信/支付宝/百度/字节/QQ/京东/快应用/H5/React Native/ASCF元服务

**架构原理：**
- 不编译 JSX/Vue 模板到 WXML，而是在运行时模拟 DOM/BOM
- 使用 `template` 递归渲染的方式将虚拟 DOM 映射到小程序视图
- 开发体验与 Web 一致，但有运行时性能开销

---

## 项目初始化

```bash
# 安装 CLI
npm install -g @tarojs/cli

# 创建项目（交互式选择 React/Vue、TypeScript、CSS 预处理器等）
taro init myApp

# 开发（ASCF元服务）
cd myApp
npm run dev:ascf

# 构建生产版本
npm run build:ascf

# 其他平台
npm run dev:h5       # H5
npm run dev:alipay   # 支付宝
npm run dev:tt       # 字节跳动
```

### 项目结构

```
├── config/
│   ├── index.ts          # 通用配置
│   ├── dev.ts            # 开发环境配置
│   └── prod.ts           # 生产环境配置
├── src/
│   ├── app.ts            # 入口文件
│   ├── app.config.ts     # 全局配置（等同 app.json）
│   ├── app.scss          # 全局样式
│   ├── pages/
│   │   └── index/
│   │       ├── index.tsx
│   │       ├── index.config.ts  # 页面配置（等同 page.json）
│   │       └── index.scss
│   └── components/
├── ascf.config.json   # ASCF元服务项目编译配置
└── package.json
```

---

## React 开发模式

### 页面组件

```tsx
// src/pages/index/index.tsx
import { View, Text, Button, Image } from '@tarojs/components'
import { useLoad, useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function Index() {
  const [count, setCount] = useState(0)

  useLoad((options) => {
    console.log('页面加载, 参数:', options)
  })

  useDidShow(() => {
    console.log('页面显示')
  })

  return (
    <View className='index'>
      <Text>计数: {count}</Text>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </View>
  )
}
```

```ts
// src/pages/index/index.config.ts
export default definePageConfig({
  navigationBarTitleText: '首页'
})
```

### Taro Hooks（对应小程序生命周期）

| Taro Hook | 小程序生命周期 | 说明 |
|-----------|---------------|------|
| `useLoad` | `onLoad` | 页面加载（接收 options 参数） |
| `useReady` | `onReady` | 首次渲染完成 |
| `useDidShow` | `onShow` | 页面显示 |
| `useDidHide` | `onHide` | 页面隐藏 |
| `useUnload` | `onUnload` | 页面卸载 |
| `usePullDownRefresh` | `onPullDownRefresh` | 下拉刷新 |
| `useReachBottom` | `onReachBottom` | 触底加载 |
| `useShareAppMessage` | `onShareAppMessage` | 分享 |
| `useShareTimeline` | `onShareTimeline` | 朋友圈分享 |
| `useRouter` | - | 获取路由参数 |

```tsx
import { useRouter, useShareAppMessage } from '@tarojs/taro'

function Detail() {
  const router = useRouter()
  const id = router.params.id  // URL 参数

  useShareAppMessage(() => ({
    title: '分享标题',
    path: `/pages/detail/detail?id=${id}`
  }))

  return <View>详情 {id}</View>
}
```

### 列表渲染

```tsx
// ⚠️ Taro 中 map 返回的元素必须用 View 等 Taro 组件包裹
function ItemList({ items }) {
  return (
    <View>
      {items.map((item) => (
        <View key={item.id} className='item'>
          <Text>{item.name}</Text>
          <Image src={item.image} mode='aspectFill' />
        </View>
      ))}
    </View>
  )
}
```

---

## Vue 3 开发模式

```vue
<!-- src/pages/index/index.vue -->
<template>
  <view class="index">
    <text>计数: {{ count }}</text>
    <button @tap="increment">+1</button>
    <view v-for="item in items" :key="item.id" class="item">
      {{ item.name }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'

const count = ref(0)
const items = ref([])

const increment = () => { count.value++ }

useLoad((options) => {
  console.log('页面加载', options)
})

useDidShow(() => {
  loadData()
})

async function loadData() {
  const res = await Taro.request({ url: 'https://api.example.com/items' })
  items.value = res.data
}
</script>

<style lang="scss">
.index { padding: 20rpx; }
.item { margin: 10rpx 0; }
</style>
```

---

## 路由与导航

```tsx
import Taro from '@tarojs/taro'

// 跳转（保留当前页）
Taro.navigateTo({ url: '/pages/detail/detail?id=123' })

// 重定向（关闭当前页）
Taro.redirectTo({ url: '/pages/result/result' })

// Tab 切换
Taro.switchTab({ url: '/pages/home/home' })

// 返回
Taro.navigateBack({ delta: 1 })

// 重启
Taro.reLaunch({ url: '/pages/index/index' })
```

### 全局配置

```ts
// src/app.config.ts
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mine/mine'
  ],
  subPackages: [
    {
      root: 'packageA',
      pages: ['pages/goods/goods']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro App',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      { pagePath: 'pages/index/index', text: '首页' },
      { pagePath: 'pages/mine/mine', text: '我的' }
    ]
  }
})
```

---

## API 调用

Taro 封装了跨平台 API，命名与微信小程序一致：

```tsx
import Taro from '@tarojs/taro'

// 网络请求
const res = await Taro.request({
  url: 'https://api.example.com/data',
  method: 'POST',
  header: { 'content-type': 'application/json' },
  data: { key: 'value' }
})

// 存储
Taro.setStorageSync('key', 'value')
const value = Taro.getStorageSync('key')

// UI
Taro.showToast({ title: '成功', icon: 'success' })
Taro.showLoading({ title: '加载中...' })
Taro.hideLoading()
Taro.showModal({ title: '确认', content: '是否删除？' })

// 系统信息
const info = Taro.getWindowInfo()

// 图片
const res = await Taro.chooseMedia({ count: 9, mediaType: ['image'] })
```

---

## 条件编译

### 代码中

```tsx
// 编译时常量
if (process.env.TARO_ENV === 'ascf') {
  // ASCF元服务专用代码
  has.login()
} else if (process.env.TARO_ENV === 'h5') {
  // H5 专用代码
  window.location.href = '/login'
}
```

### 文件级条件编译

```
src/pages/index/
├── index.tsx          # 通用
├── index.ascf.tsx    # ASCF元服务专用（优先级更高）
├── index.h5.tsx       # H5 专用
├── index.scss         # 通用样式
└── index.ascf.scss   # ASCF元服务专用样式
```

### 配置文件条件编译

```ts
// config/index.ts
export default {
  mini: {
    // 小程序端配置
    postcss: {
      pxtransform: { enable: true, config: { selectorBlackList: ['nut-'] } }
    }
  },
  h5: {
    // H5 端配置
    publicPath: '/',
    router: { mode: 'browser' }
  }
}
```

---

## 样式方案

### rpx 自动转换

Taro 默认将 `px` 转换为 `rpx`（设计稿 750px 宽）：

```scss
// 源码中写 px，编译后自动转 rpx
.box {
  width: 200px;   // → 200rpx
  height: 100px;  // → 100rpx
  font-size: 14px; // → 14rpx
}

// 不转换：使用大写 PX 或 Px
.border {
  border: 1PX solid #eee;  // 保持 1px
}
```

### 配置转换规则

```ts
// config/index.ts
export default {
  designWidth: 750,      // 设计稿宽度
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1           // 如果设计稿是 375px
  }
}
```

### CSS Modules

```tsx
import styles from './index.module.scss'

function Index() {
  return <View className={styles.container}>内容</View>
}
```

---

## 状态管理

### React: Zustand（推荐）

```tsx
// src/store/index.ts
import { create } from 'zustand'

interface AppState {
  count: number
  userInfo: { nickname: string; avatar: string } | null
  increment: () => void
  setUser: (info: AppState['userInfo']) => void
}

export const useStore = create<AppState>((set) => ({
  count: 0,
  userInfo: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  setUser: (info) => set({ userInfo: info })
}))

// 页面中使用
function Index() {
  const { count, increment } = useStore()
  return <Button onClick={increment}>{count}</Button>
}
```

### Vue 3: Pinia

```ts
// src/store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    nickname: '',
    avatar: ''
  }),
  actions: {
    async fetchUser() {
      const res = await Taro.request({ url: '/api/user' })
      this.nickname = res.data.nickname
      this.avatar = res.data.avatar
    }
  }
})
```

---

## 常见问题与陷阱

### 1. 组件必须从 @tarojs/components 导入

```tsx
// ❌ 错误：使用 HTML 标签
<div className="box"><span>文本</span></div>

// ✅ 正确：使用 Taro 组件
import { View, Text } from '@tarojs/components'
<View className='box'><Text>文本</Text></View>
```

### 2. 事件绑定差异

```tsx
// ❌ 错误：使用 onClick（仅部分场景可用）
<View onClick={handleClick}>

// ✅ 正确：使用 onTap（跨平台兼容）
<View onTap={handleClick}>

// Button 例外：onClick 可用
<Button onClick={handleClick}>按钮</Button>
```

### 3. 样式穿透限制

```scss
// 小程序端组件样式默认隔离
// 使用 :global 或在页面样式中覆盖
:global(.nut-button) {
  border-radius: 20rpx;
}
```

### 4. 不支持的 Web API

```tsx
// ❌ 这些在小程序端不可用
document.getElementById('xxx')
window.addEventListener('scroll', fn)
localStorage.setItem('key', 'value')

// ✅ 使用 Taro API 替代
Taro.createSelectorQuery().select('#xxx')
usePageScroll((payload) => { /* payload.scrollTop */ })
Taro.setStorageSync('key', 'value')
```

### 5. 调试建议

- H5 端直接在浏览器 DevTools 调试
- `Taro.getEnv()` 获取当前运行平台
- 开发时开启 `--watch` 模式实时编译

---

## React Web → Taro 小程序迁移指南

将现有 React Web 项目迁移到 Taro 小程序时，以下是经过实战验证的常见问题和解决方案。

### Monorepo 架构（pnpm workspace）

推荐使用 pnpm workspace monorepo 最大化代码复用：

```
project/
├── pnpm-workspace.yaml
├── packages/
│   ├── shared/          # 共享数据/类型/纯逻辑（@project/shared）
│   ├── web/             # 原 React Web 应用
│   └── mini-program/    # Taro 小程序
```

#### 关键配置：外部包 TypeScript 编译

Taro 的 webpack 默认只编译 `sourceRoot`（通常是 `src/`）下的文件。monorepo 中 shared 包的 TypeScript 文件不会被 babel-loader 处理，导致报错：

```
Module parse failed: Unexpected token
```

**⚠️ `alias` 只负责模块解析路径，不等于编译。** 必须额外配置 `compile.include`：

```ts
// config/index.ts
import path from 'path'

export default {
  alias: {
    '@project/shared': path.resolve(__dirname, '../../shared/src'),
  },
  mini: {
    compile: {
      // ✅ 关键：让 webpack 也编译 shared 包的 TypeScript
      include: [
        path.resolve(__dirname, '../../shared/src'),
      ],
    },
  },
}
```

#### Babel 预设依赖缺失

`babel-preset-taro` 依赖三个 babel 预设但未声明为直接依赖，需手动安装：

```bash
pnpm add -D @babel/preset-react @babel/preset-env @babel/preset-typescript
```

不安装会报错：`Cannot find module '@babel/preset-react'`

#### Star Export 名称冲突

使用 barrel 文件 `export *` 聚合多个模块时，如果两个模块导出了同名函数：

```ts
// shared/src/index.ts
export * from './data/achievementDatabase'  // 导出 getUnlockedAchievements
export * from './logic/gameLogic'           // 也导出 getUnlockedAchievements ← 冲突！
```

webpack 会发出警告，且其中一个导出会被覆盖。**解决方案**：重命名其中一个函数，或改用具名导出。

### 导航系统迁移

#### switchTab vs navigateTo

**最常见的错误**：对非 tabBar 页面使用 `Taro.switchTab()`。

```tsx
// ❌ 错误：review 不在 tabBar.list 中，运行时报错
Taro.switchTab({ url: '/pages/review/index' })

// ✅ 正确：非 tab 页面用 navigateTo
Taro.navigateTo({ url: '/pages/review/index' })
```

规则：
- `Taro.switchTab()` — **仅限** `app.config.ts` 的 `tabBar.list` 中声明的页面
- `Taro.navigateTo()` — 非 tab 页面，会压入页面栈
- `Taro.navigateBack()` — 返回上一页
- `Taro.redirectTo()` — 关闭当前页并跳转

#### 页面 URL 必须与 pages 配置一致

确保导航 URL 与 `app.config.ts` 中 `pages` 数组的路径完全匹配：

```ts
// app.config.ts
pages: ['pages/home/index', ...]

// ❌ 错误
Taro.switchTab({ url: '/pages/index/index' })

// ✅ 正确
Taro.switchTab({ url: '/pages/home/index' })
```

3. 取消 `app.config.ts` 中 `plugins` 的注释

### 平台 API 替换清单

| Web API | Taro 替代方案 | 注意事项 |
|---------|--------------|---------|
| `confirm()` | `Taro.showModal()` | 返回 Promise，通过 `res.confirm` 判断 |
| `alert()` | `Taro.showToast()` | `icon: 'none'` 显示纯文本 |
| `window.location.href` | `Taro.switchTab()` / `Taro.navigateTo()` | 区分 tab 和非 tab 页面 |
| `localStorage` | `Taro.setStorageSync()` / `Taro.getStorageSync()` | 同步 API，也有异步版本 |
| `<details>/<summary>` | `useState` 控制展开/收起 `<View>` | 无原生等价组件 |
| `<input type="time">` | `<Picker mode="time">` | Taro 组件 |
| `<input type="password">` | `<Input type="safe-password">` | 或 `password` 属性 |
| `document.getElementById()` | `Taro.createSelectorQuery()` | 异步查询 |
| Web Audio API（振荡器合成） | MP3 文件 + `Taro.createInnerAudioContext()` | 需管理生命周期 create→play→destroy |
| Web Speech API (TTS) | WechatSI 插件 / 自建 TTS 接口 | 插件需真实 AppID |
| Framer Motion | CSS `@keyframes` + state-driven 动画 | 见下方动画迁移 |
| lucide-react | 导出 SVG/PNG + 自定义 `<Icon>` 组件 | 用 `<Image>` 或 emoji 映射 |

### 动画系统迁移（Framer Motion → CSS + 状态驱动）

小程序不支持 Framer Motion，需要重写动画逻辑：

```tsx
// ❌ Web: Framer Motion
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
<AnimatePresence>{show && <motion.div exit={{ opacity: 0 }} />}</AnimatePresence>

// ✅ Taro: CSS @keyframes + 条件渲染
<View className='animate-fade-in'>内容</View>
{show && <View className='animate-fade-out'>内容</View>}
```

```scss
// 定义动画
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

特效（如 confetti、floating text）→ 使用 `useState` 管理动画元素列表 + CSS 动画：

```tsx
const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([])

function addFloatingText(text: string) {
  const id = Date.now()
  setFloatingTexts(prev => [...prev, { id, text }])
  setTimeout(() => {
    setFloatingTexts(prev => prev.filter(t => t.id !== id))
  }, 1000)
}
```

`whileHover` / `whileTap` → 使用 Taro 的 `hover-class` 属性：

```tsx
<View hoverClass='btn-pressed' hoverStayTime={100}>按钮</View>
```

### 音效系统迁移

Web Audio API 的振荡器合成在小程序不可用，需要预录制 MP3：

```ts
// utils/soundManager.ts
import Taro from '@tarojs/taro'

const SOUND_MAP: Record<string, string> = {
  click: '/assets/sounds/click.mp3',
  success: '/assets/sounds/success.mp3',
  error: '/assets/sounds/error.mp3',
}

export function playSound(name: string): void {
  const src = SOUND_MAP[name]
  if (!src) return

  const ctx = Taro.createInnerAudioContext()
  ctx.src = src
  ctx.onEnded(() => ctx.destroy())   // ⚠️ 必须销毁，否则内存泄漏
  ctx.onError(() => ctx.destroy())
  ctx.play()
}
```

**注意**：`InnerAudioContext` 用完必须调用 `ctx.destroy()`，否则会导致内存泄漏。小程序对同时存在的 `InnerAudioContext` 实例数有限制。

### 图标迁移（lucide-react → 自定义 Icon 组件）

小程序不支持 SVG 内联组件，需要替代方案：

方案一：emoji 映射（轻量，无额外资源）

```tsx
const ICON_MAP: Record<string, string> = {
  home: '🏠', star: '⭐', book: '📖', trophy: '🏆',
  chevronLeft: '◀', chevronRight: '▶', chevronUp: '▲', chevronDown: '▼',
}

// ⚠️ 组件传入可能是 kebab-case，需转换
const toCamelCase = (str: string): string =>
  str.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())

const Icon: React.FC<{ name: string; size?: number }> = ({ name, size = 48 }) => {
  const emoji = ICON_MAP[name] || ICON_MAP[toCamelCase(name)] || '•'
  return <Text style={{ fontSize: `${size}rpx` }}>{emoji}</Text>
}
```

方案二：导出 SVG 为 PNG 文件，用 `<Image>` 加载（高保真，增加包体积）

### Zustand + ASCF Storage 持久化适配

Web 版 Zustand 使用 `localStorage`，小程序需要自定义 storage 适配器：

```ts
// store/ASCFStorage.ts
import Taro from '@tarojs/taro'

export const ASCFStorage = {
  getItem: (name: string): string | null => {
    try {
      return Taro.getStorageSync(name) || null
    } catch {
      return null
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      Taro.setStorageSync(name, value)
    } catch {
      // storage full or other error
    }
  },
  removeItem: (name: string): void => {
    try {
      Taro.removeStorageSync(name)
    } catch {
      // ignore
    }
  },
}
```

```ts
// store/gameStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ascfStorage } from './ascfStorage'

export const useGameStore = create(
  persist(
    (set, get) => ({ /* state & actions */ }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => ascfStorage),  // ✅ 替代 localStorage
    }
  )
)
```

### 迁移检查清单

开发完成后逐项验证：

- [ ] 所有 HTML 标签已替换为 Taro 组件（`<View>`, `<Text>`, `<Button>`, `<Input>`, `<Image>`）
- [ ] 无 `window.*`、`document.*`、`localStorage.*` 等浏览器 API 残留
- [ ] 导航 API 正确区分 `switchTab`（tab页）和 `navigateTo`（非tab页）
- [ ] 导航 URL 与 `app.config.ts` 中 `pages` 路径完全匹配
- [ ] 插件配置在 touristappid 模式下已注释，代码中有优雅降级
- [ ] Monorepo 共享包已添加到 `compile.include`
- [ ] Babel 预设已安装（`@babel/preset-react` 等）
- [ ] Barrel 文件无 star export 名称冲突
- [ ] `InnerAudioContext` 使用后调用 `destroy()`
- [ ] 动画已从 Framer Motion 替换为 CSS @keyframes + 状态驱动
- [ ] 图标组件支持 kebab-case 和 camelCase 双向查找
