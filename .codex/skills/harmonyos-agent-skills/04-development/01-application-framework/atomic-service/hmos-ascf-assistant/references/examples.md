# ASCF 开发示例

## App 生命周期

```javascript
App({
  onLaunch(options) {
    // App 初始化（只执行一次）。options.scene = 启动场景值
    // 适合：全局初始化、登录检查、更新检查
  },
  onShow(options) {
    // App 进入前台，onLaunch 后及每次重新显示时调用
  },
  onHide() {
    // App 进入后台
  },
  onError(msg) {
    // 脚本错误或 API 调用报错
    console.error('App error:', msg)
  },
  globalData: {
    userInfo: null
  }
})
```

## 页面生命周期

```javascript
Page({
  data: {
    items: [],
    loading: false
  },
  onLoad(options) {
    // 页面加载，options = 路由参数，只执行一次
    const { id } = options
  },
  onShow() {
    // 页面显示，每次显示（包括返回导航）都会调用
  },
  onReady() {
    // 首次渲染完成，DOM 可用于 has.createSelectorQuery
  },
  onHide() {
    // 页面隐藏（navigateTo 到另一个页面）
  },
  onUnload() {
    // 页面销毁（navigateBack 或 redirectTo），在此清理资源
  },
  onPullDownRefresh() {
    // 下拉刷新触发（需在 json 中启用 enablePullDownRefresh）
    this.loadData().then(() => has.stopPullDownRefresh())
  },
  onReachBottom() {
    // 滚动到底部 — 加载更多数据
  },
  onShareAppMessage() {
    return { title: '分享标题', path: '/pages/index/index' }
  }
})
```

## Data Binding & setData

```html
<!-- hxml：使用 {{ }} 进行数据绑定 -->
<view class="container">
  <text>{{message}}</text>
  <view has:if="{{showDetail}}">详情内容</view>
  <view has:for="{{items}}" has:key="id">
    <text>{{index}}: {{item.name}}</text>
  </view>
</view>
```

```javascript
Page({
  data: { message: 'Hello', items: [], showDetail: false },
  updateMessage() {
    // 重要：setData 是异步的，使用回调处理渲染后逻辑
    this.setData({ message: '已更新' }, () => {
      // 渲染完成
    })
  },
  // 最佳实践：批量更新，减少 setData 调用次数
  loadItems() {
    this.setData({
      items: newItems,
      loading: false,
      hasMore: newItems.length >= PAGE_SIZE
    })
  }
})
```

## 事件处理

```html
<!-- bindtap：事件冒泡；catchtap：阻止冒泡 -->
<button bindtap="handleTap" data-id="{{item.id}}">点击</button>
<view catchtap="handleStop">不会冒泡</view>

<!-- 输入事件 -->
<input bindinput="onInput" value="{{inputValue}}" />
```

```javascript
Page({
  handleTap(e) {
    const id = e.currentTarget.dataset.id  // 访问 data-* 属性
    // e.target = 触发事件的元素
    // e.currentTarget = 绑定 bindtap 的元素
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  }
})
```

## 网络请求封装

```javascript
// utils/request.js
function getBaseUrl() {
  // 重要：运行时获取，不要在模块级别缓存
  return getApp().globalData.baseUrl || 'https://api.example.com'
}

function request(options) {
  return new Promise((resolve, reject) => {
    has.request({
      url: `${getBaseUrl()}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${has.getStorageSync('token') || ''}`,
        ...options.header
      },
      timeout: options.timeout || 10000,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          has.removeStorageSync('token')
          has.navigateTo({ url: '/pages/login/login' })
          reject(new Error('Unauthorized'))
        } else {
          reject(new Error(res.data.message || `请求失败: ${res.statusCode}`))
        }
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络错误'))
      }
    })
  })
}

module.exports = { request }
```

## 登录示例

```javascript
async function login() {
  try {
    // 1. 获取临时登录凭证（客户端）
    const { code } = await has.login()

    // 2. 用 code 换取 session（服务端）
    const res = await request({
      url: '/auth/has-login',
      method: 'POST',
      data: { code }
    })
    // 服务端调用华为账号接口换取 openid/session_key
    // 服务端返回自定义 token（不要将 session_key 返回客户端）

    // 3. 存储 token
    has.setStorageSync('token', res.token)

    return res
  } catch (err) {
    console.error('登录失败:', err)
    throw err
  }
}
```

## 自定义组件

```javascript
// components/product-card/product-card.js
Component({
  properties: {
    product: { type: Object, value: {} },
    showPrice: { type: Boolean, value: true }
  },
  data: {
    formattedPrice: ''
  },
  observers: {
    'product.price'(price) {
      this.setData({ formattedPrice: `¥${(price / 100).toFixed(2)}` })
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('select', { id: this.properties.product.id })
    }
  }
})
```

```html
<!-- components/product-card/product-card.hxml -->
<view class="card" bindtap="onTap">
  <image src="{{product.image}}" mode="aspectFill" lazy-load />
  <text class="name">{{product.name}}</text>
  <text has:if="{{showPrice}}" class="price">{{formattedPrice}}</text>
</view>
```

## 路由导航

```javascript
// 保留当前页面，跳转到新页面（入栈）
has.navigateTo({ url: '/pages/detail/detail?id=1' })

// 关闭当前页面，跳转到新页面（替换）
has.redirectTo({ url: '/pages/other/other' })

// 返回上一页
has.navigateBack({ delta: 1 })

// 关闭所有页面，打开指定页面
has.reLaunch({ url: '/pages/index/index' })

// 切换 tabBar 页面
has.switchTab({ url: '/pages/home/home' })
```

## 页面间通信（EventChannel）

```javascript
// 页面 A：跳转到页面 B，并建立事件通道
has.navigateTo({
  url: '/pages/detail/detail?id=123',
  events: {
    // 监听页面 B 回传的数据
    onResult: (data) => { console.info('收到 B 的结果:', data) }
  },
  success: (res) => {
    // 向页面 B 发送初始数据
    res.eventChannel.emit('initData', { from: 'pageA' })
  }
})

// 页面 B：接收数据并回传结果
Page({
  onLoad() {
    const channel = this.getOpenerEventChannel()
    channel.on('initData', (data) => { console.info('来自 A:', data) })
    channel.emit('onResult', { status: 'done' })
  }
})
```

## 数据存储

```javascript
// 同步写入
has.setStorageSync('userToken', 'abc123')

// 同步读取
const token = has.getStorageSync('userToken')

// 同步删除
has.removeStorageSync('userToken')

// 批量写入
has.batchSetStorageSync([
  { key: 'key1', value: 'value1' },
  { key: 'key2', value: 'value2' }
])

// 获取存储信息（当前占用、上限、所有 key）
const info = has.getStorageInfoSync()
console.info(info.keys, info.currentSize, info.limitSize)
// 限制：单个 key 最大 1MB，总存储最大 10MB
```

## 跳转其他元服务

```javascript
has.navigateToAtomicService({
  appId: 'TARGET_APP_ID',       // 目标元服务 appId
  path: 'pages/index/index',    // 目标页面路径
  extraData: { from: 'myService' },
  success: () => { console.info('跳转成功') },
  fail: (err) => { console.error('跳转失败:', err) }
})
```

## 动画

```javascript
// 创建动画实例
const anim = has.createAnimation({
  duration: 2000,
  timingFunction: 'ease',
  delay: 400
})

// 链式调用动画属性，step() 表示一组动画完成
anim.opacity(0.5).rotate(45).height(200).step()

// 导出到 data 供 hxml 使用
this.setData({ animationData: anim.export() })
```

```html
<!-- 在 hxml 中绑定动画 -->
<view animation="{{animationData}}">动画内容</view>
```

## App 生命周期事件监听

```javascript
// 监听 App 进入前台
has.onAppShow((res) => {
  console.info('App 进入前台:', res.path, res.query)
})

// 监听 App 进入后台
has.onAppHide(() => {
  console.info('App 进入后台')
})

// 监听页面不存在
has.onPageNotFound((res) => {
  console.info('页面不存在:', res)
  // 可在此重定向到首页
  has.redirectTo({ url: '/pages/index/index' })
})
```

## 加速度传感器

```javascript
// 需在 module.json5 中声明 ohos.permission.ACCELEROMETER
has.startAccelerometer({ interval: 'game' }) // game | ui | normal

has.onAccelerometerChange((res) => {
  console.info('x:', res.x, 'y:', res.y, 'z:', res.z)
})

// 停止监听
has.stopAccelerometer()
```

## 音频播放

```javascript
// 简单语音播放
has.playVoice({
  filePath: 'internal://tmp/audio.mp3',
  duration: 60,
  success: () => { console.info('播放中') }
})

// 高级音频控制（InnerAudioContext）
const ctx = has.createInnerAudioContext()
ctx.src = 'https://example.com/music.mp3'
ctx.onCanplay(() => { ctx.play() })
ctx.onEnded(() => { console.info('播放结束') })
// ctx.pause() / ctx.stop() / ctx.destroy()
```

## 华为账号登录

```javascript
// 需先配置签名指纹和 Client ID
has.login({
  success: (res) => {
    console.info('登录凭证:', JSON.stringify(res))
    // 将 res.code 发送到服务端换取 openid 和 session
  },
  fail: (err) => {
    console.error('登录失败:', JSON.stringify(err))
  }
})
```
