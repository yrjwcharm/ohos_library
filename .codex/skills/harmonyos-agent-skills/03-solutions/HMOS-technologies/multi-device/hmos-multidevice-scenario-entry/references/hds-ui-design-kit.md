# HarmonyOS HDS (UI Design Kit) 快查表

> 所有组件均来自 `@kit.UIDesignKit`，最低版本要求见各组件标注。
> 从 **6.0.2(22)** 版本开始，无需手动导入 `*Attribute` 类型。

---

## 目录

| 类别 | 组件 | 最低版本 |
|------|------|---------|
| [1. 组件导航](#1-hdsnavigation-组件导航) | `HdsNavigation` / `HdsNavDestination` | 5.1.0(18) |
| [2. 底部页签](#2-hdstabs-底部页签) | `HdsTabs` / `HdsTabsController` | 6.0.0(20) |
| [3. 侧边栏](#3-hdssidebar-侧边栏) | `HdsSideBar` / `HdsSideMenu` | 6.0.0(20) |
| [4. 即时操作](#4-hdssnackbar-即时操作) | `HdsSnackBar` | 6.0.0(20) |
| [5. 核心操作栏](#5-hdsactionbar-核心操作栏) | `HdsActionBar` | 6.0.0(20) |
| [6. 列表](#6-hdslistitem-列表) | `HdsListItem` / `HdsListItemCard` | 6.0.0(20) |
| [7. 应用内多窗](#7-multiwindowentryinapp-应用内多窗) | `MultiWindowEntryInAPP` | 6.0.0(20) |
| [8. 图标处理](#8-hdsdrawable-图标处理) | `hdsDrawable` | 5.0.0(12) |
| [9. 自定义Symbol](#9-symbolregister-自定义symbol) | `symbolRegister` | 5.1.1(19) |
| [10. 沉浸光感](#10-hdsmaterial-沉浸光感) | `hdsMaterial` | 6.1.0(23) |
| [11. 视效](#11-hdseffect-视效) | `hdsEffect` / `HdsVisualComponent` | 6.0.0(20) |

---

## 1. HdsNavigation 组件导航

**导入**: `import { HdsNavigation, HdsNavDestination, HdsNavigationTitleMode, ScrollEffectType, BottomBuilderShowType, HideMode, IconStyleMode, TextStyleMode } from '@kit.UIDesignKit'`

### 1.1 基础用法

```typescript
HdsNavigation(this.pageInfos) { /* 内容 */ }
  .titleBar({
    enableComponentSafeArea: true,
    content: {
      title: { mainTitle: 'MainTitle', subTitle: 'SubTitle' },
      menu: {
        value: [{
          content: { label: 'menu1', icon: $r('sys.symbol.search_things'), isEnabled: true, action: () => {} },
          badge: { count: 1 }  // 或 { value: '文本' }
        }],
        maxCount: 3
      },
      subIcon: { content: { icon: $r('app.media.avatar'), type: IconStyleMode.LARGE } }
    }
  })
  .hideBackButton(true)
  .bindToScrollable([this.scroller])
  .titleMode(HdsNavigationTitleMode.MINI)
```

### 1.2 动态模糊（滚动模糊标题栏）

```typescript
import { LengthMetrics } from '@kit.ArkUI'

.titleBar({
  style: {
    scrollEffectOpts: {
      enableScrollEffect: true,
      scrollEffectType: ScrollEffectType.COMMON_BLUR, // TRANSITION_BLUR | GRADIENT_BLUR (6.0.0+)
      blurEffectiveStartOffset: LengthMetrics.vp(0),
      blurEffectiveEndOffset: LengthMetrics.vp(20)
    },
    originalStyle: {
      backgroundStyle: { backgroundColor: $r('sys.color.ohos_id_color_background') },
      contentStyle: {
        titleStyle: { mainTitleColor: $r('sys.color.font_primary') },
        menuStyle: { backgroundColor: $r('sys.color.comp_background_tertiary'), iconColor: $r('sys.color.icon_primary') }
      }
    },
    scrollEffectStyle: {
      backgroundStyle: { backgroundColor: $r('sys.color.ohos_id_color_background_transparent') }
    }
  }
})
.bindToScrollable([this.scroller])
```

| ScrollEffectType | 版本 | 适用场景 |
|---|---|---|
| `COMMON_BLUR` | 5.1.0(18) | 列表页/非沉浸式 |
| `TRANSITION_BLUR` | 6.0.0(20) | 沉浸式图文标题 |
| `GRADIENT_BLUR` | 6.0.0(20) | 增强沉浸式 |

### 1.3 自定义区域（stackBuilder / bottomBuilder）

```typescript
// stackBuilder: 覆盖在标题栏之上
content: { stackBuilder: (): void => this.myStackBuilder() }

// bottomBuilder: 标题栏下方自定义区域
content: {
  bottomBuilder: {
    builder: (): void => this.myBottomBuilder(),
    height: 56,
    showType: BottomBuilderShowType.DIRECTLY_SHOW
  }
}
```

### 1.4 标题栏动态显隐

```typescript
.dynamicHideTitleBar({
  hideTitleArea: true,
  hideBottomBuilder: true,
  hideStatusBar: false,       // 需 hideTitleArea=true 才生效
  mode: HideMode.SCROLL_UP_TO,
  hideOffset: 10
})
```

### 1.5 半模态样式

```typescript
HdsNavigation() { /* 内容 */ }
  .titleBar({
    content: {
      title: { mainTitle: '壁纸' },
      menu: { value: [{ content: { icon: $r('sys.symbol.xmark'), type: IconStyleMode.SMALL, action: () => { this.isShow = false } } }] }
    }
  })
  .titleMode(HdsNavigationTitleMode.MODAL)
  .bindToScrollable([this.scroller])

// 父组件中使用 bindSheet
Button('打开').onClick(() => { this.isShow = true })
  .bindSheet($$this.isShow, this.HdsNavigationBuilder(), {
    detents: [SheetSize.MEDIUM, SheetSize.LARGE],
    showClose: false,
    enableFloatingDragBar: true
  })
```

### 1.6 图标类型设置

| 类型枚举 | 值 | 说明 |
|---|---|---|
| `IconStyleMode.LARGE` | 图片型图标（Logo、头像） | 用于 menu / subIcon |
| `IconStyleMode.NORMAL` | 标准图标 | 默认 |
| `IconStyleMode.SMALL` | 小型关闭图标 | 用于半模态 |
| `TextStyleMode.NORMAL` | 文本按钮 | 用于 menu |
| `TextStyleMode.SINGLE_CHARACTER` | 单字符按钮 | 紧凑布局 |

### 1.7 应用内多窗（导航菜单中）

```typescript
import { Want } from '@kit.AbilityKit'

menu: {
  multiWindowEntryInAPPMenu: {
    want: { bundleName: 'com.example.app', moduleName: 'entry', abilityName: 'FuncAbility' }
  } as Want,
  value: [/* ... */]
}
```

### 1.8 HdsNavDestination（子页面）

```typescript
import { HdsNavDestination } from '@kit.UIDesignKit'

HdsNavDestination() { /* 内容 */ }
  .titleBar({
    content: {
      title: { mainTitle: 'PageOne' },
      backIcon: { label: 'backIcon', componentId: 'backIconId' },
      bottomBuilder: { builder: (): void => this.bottomBuilder(), height: 56, showType: BottomBuilderShowType.DIRECTLY_SHOW }
    }
  })
  .bindToNestedScrollable([{ parent: this.scroller, child: this.listScroller }])
  .onReady((ctx: NavDestinationContext) => {
    let name = ctx.pathInfo.name;
    let stack = ctx.pathStack;
  })
```

### 1.9 路由配置

```json5
// module.json5
"routerMap": "$profile:route_map"
```
```json
// route_map.json
{ "routerMap": [{ "name": "pageOne", "pageSourceFile": "src/main/ets/pages/PageOne.ets", "buildFunction": "PageOneBuilder" }] }
```

### 1.10 NavPathStack 常用操作

| 方法 | 说明 |
|---|---|
| `pushPath({ name })` | 跳转页面 |
| `pushPathByName(name, param)` | 带参数跳转 |
| `popToName(name)` | 回退到指定名称页面 |
| `popToIndex(index)` | 回退到指定索引页面 |
| `moveIndexToTop(index)` | 将指定页面移到栈顶 |
| `clear()` | 清空路由栈 |

---

## 2. HdsTabs 底部页签

**导入**: `import { HdsTabs, HdsTabsController, DividerMode, ExtendBarMode, bleedIconStyle, hdsMaterial } from '@kit.UIDesignKit'`

### 2.1 基础用法

```typescript
HdsTabs({ controller: this.controller }) {
  TabContent() { /* 内容 */ }
    .tabBar({ icon: $r('app.media.icon1'), text: '页签1' })
  TabContent() { /* 内容 */ }
    .tabBar(new BottomTabBarStyle($r('sys.media.ohos_app_icon'), '页签2'))
}
.barOverlap(true)
.barPosition(BarPosition.End)
.vertical(false)
```

> **通用约束**：`barPosition=End`, `barOverlap=true`, `vertical=false`（侧边栏除外）

### 2.2 分割线（三种模式）

```typescript
.divider({
  mode: DividerMode.FOLLOW_SCROLL,  // 跟手 | 常显 | 常隐
  style: { color: Color.Black, strokeWidth: 1, startMargin: 0, endMargin: 0 }
})

// 跟手模式需绑定 scroller
private controller: HdsTabsController = new HdsTabsController();
listScroller: ListScroller = new ListScroller();
aboutToAppear() { this.controller.bindScroller(0, this.listScroller); }
aboutToDisappear() { this.controller.unbindScroller(this.listScroller); }

TabContent() { List({ scroller: this.listScroller }) {} }
```

### 2.3 模糊样式（渐变模糊）

```typescript
.barBackgroundStyle({
  maskColor: Color.Yellow,
  maskHeight: 80
})
```

> 冲突项：`barBackgroundBlurStyle` / `barBackgroundEffect` 会让默认模糊失效；`barBackgroundColor` 仅模糊半径生效。

### 2.4 图标出血样式

```typescript
.tabBar(bleedIconStyle(() => { this.tabBuilder() }))

@Builder tabBuilder() {
  Column() { Image($r('app.media.icon')).width(48).height(48).borderRadius(24) }
}
```

> 图标超出 tabBar 容器最大 **4vp**。

### 2.5 侧边栏半屏居中对齐

```typescript
HdsTabs({ barPosition: BarPosition.End }) {
  TabContent() {}.tabBar(new BottomTabBarStyle($r('sys.media.ohos_app_icon'), 'Tab1'))
}
.vertical(true)  // 必须开启侧边栏
.barMode(ExtendBarMode.HALF_SCREEN_FIXED)
```

### 2.6 悬浮样式 + 迷你栏（6.1.0(23)+）

```typescript
.barFloatingStyle({
  barWidth: { smallWidth: 200, mediumWidth: 300, largeWidth: 400 },
  barBottomMargin: 28,
  adaptToHandedness: true,
  gradientMask: { maskColor: '#66F1F3F5', maskHeight: 92 },
  systemMaterialEffect: {
    materialType: hdsMaterial.MaterialType.IMMERSIVE,
    materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
  },
  miniBar: { miniBarBuilder: () => this.miniBarBuilder() }
})
```

> 仅支持 `BottomTabBarStyle` 和 `CustomBuilder` 两种页签样式。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `barWidth` | `object` | — | `{ smallWidth, mediumWidth, largeWidth }` 三断点宽度 |
| `barBottomMargin` | `number` | — | 悬浮栏距底部距离（vp） |
| `adaptToHandedness` | `boolean` | `false` | 自动适应左右手习惯，系统根据用户握持方式自动调整悬浮栏位置（偏左/偏右），无需手动实现手势检测逻辑 |
| `gradientMask` | `object` | — | `{ maskColor, maskHeight }` 渐变遮罩 |
| `systemMaterialEffect` | `object` | — | 沉浸光感材质，详见 [10. hdsMaterial](#10-hdsmaterial-沉浸光感) |
| `miniBar` | `object` | — | `{ miniBarBuilder }` 迷你栏 builder（6.1.0(23)+） |

---

## 3. HdsSideBar 侧边栏

**导入**: `import { HdsSideBar, HdsSideMenu, HdsSideMenuMainItem, HdsSideMenuSubItem, HdsSideMenuBadgeParam } from '@kit.UIDesignKit'`

### 3.1 基础用法

```typescript
HdsSideBar({
  sideBarPanelBuilder: (): void => { this.sideBarBuilder() },
  contentPanelBuilder: (): void => { this.contentBuilder() },
  isShowSideBar: this.isShowSidebar,
  $isShowSideBar: (isShowSidebar: boolean) => { this.isShowSidebar = !isShowSidebar },
  autoHide: false,
  contentAreaMask: true,
  sideBarContainerType: SideBarContainerType.Embed  // 或 .Overlay
})
```

| 模式 | 说明 |
|------|------|
| `SideBarContainerType.Embed` | 嵌入式（推动内容） |
| `SideBarContainerType.Overlay` | 覆盖式（浮动在内容上） |

### 3.2 HdsSideMenu（菜单样式）

```typescript
import { SymbolGlyphModifier } from '@kit.ArkUI'

HdsSideMenu({
  items: [
    new HdsSideMenuMainItem({
      symbol: new SymbolGlyphModifier($r('sys.symbol.folder')),
      label: '手机'
    }),
    new HdsSideMenuMainItem({
      icon: $r('sys.symbol.person_wave_3'),
      label: '联系人',
      hdsSideMenuSubItem: [new HdsSideMenuSubItem({ label: '短信', badge: { count: 50 } })]
    })
  ],
  selectedIndex: this.selectedIndex,
  $selectedIndex: (idx: number) => { this.selectedIndex = idx }
})
```

---

## 4. HdsSnackBar 即时操作

**导入**: `import { HdsSnackBar, SnackBarIconOptions, SnackBarMessageOptions, SnackBarOperationOptions, SnackBarStyleOptions, SnackBarOperationType } from '@kit.UIDesignKit'`

### 4.1 常驻通知（duration = -1）

```typescript
uiContext: UIContext = this.getUIContext();
hdsSnackBar: HdsSnackBar = new HdsSnackBar(this.uiContext);

this.hdsSnackBar.show(
  { icon: $r('sys.symbol.checkmark_circle') } as SnackBarIconOptions,
  { title: $r('sys.string.xxx'), content: $r('sys.string.yyy') } as SnackBarMessageOptions,
  {
    operationType: SnackBarOperationType.TEXT_WITH_CLOSE,
    content: $r('sys.string.save'),
    textButtonId: 'snackBarTextButton'
  } as SnackBarOperationOptions,
  { nextFocusId: 'button', duration: -1 } as SnackBarStyleOptions
);
```

### 4.2 定时通知（duration > 0，默认5000ms）

```typescript
this.hdsSnackBar.show(icon, message,
  {
    operationType: SnackBarOperationType.TEXT_WITH_ARROW,
    content: $r('sys.string.save'),
    arrowButtonId: 'snackBarArrowButton'
  },
  { nextFocusId: 'button', duration: 2000 }
);
```

| SnackBarOperationType | 说明 |
|---|---|
| `TEXT_WITH_CLOSE` | 文字按钮 + 关闭按钮 |
| `TEXT_WITH_ARROW` | 文字按钮 + 右箭头 |

---

## 5. HdsActionBar 核心操作栏

**导入**: `import { HdsActionBar, ActionBarButton, ActionBarStyle } from '@kit.UIDesignKit'`

### 5.1 有主按钮

```typescript
HdsActionBar({
  startButtons: [new ActionBarButton({ baseIcon: $r('sys.symbol.stopwatch_fill') })],
  endButtons: [new ActionBarButton({ baseIcon: $r('sys.symbol.mic_fill') })],
  primaryButton: new ActionBarButton({
    baseIcon: $r('sys.symbol.plus'),
    altIcon: $r('sys.symbol.play_fill'),
    onClick: () => { this.isExpand = !this.isExpand },
    hoverTips: '开始'
  }),
  actionBarStyle: new ActionBarStyle({ isPrimaryIconChanged: this.isPrimaryIconChanged }),
  isExpand: this.isExpand
})
```

### 5.2 无主按钮

```typescript
HdsActionBar({
  startButtons: [new ActionBarButton({ baseIcon: $r('sys.symbol.stopwatch_fill') })],
  endButtons: [new ActionBarButton({ baseIcon: $r('sys.symbol.mic_fill') })]
})
```

---

## 6. HdsListItem 列表

**导入**: `import { HdsListItem, HdsListItemCard, PrefixImage, SuffixSwitch } from '@kit.UIDesignKit'`

### 6.1 HdsListItem + 横滑操作

```typescript
import { SymbolGlyphModifier, TextModifier } from '@kit.ArkUI'

HdsListItem({
  hdsListItemCard: {
    textItem: {
      primaryText: { text: 'Primary Text', modifier: new TextModifier().fontSize(16) }
    }
  },
  swipeActionOptions: {
    icons: [
      { icon: new SymbolGlyphModifier($r('sys.symbol.share')).fontColor([Color.Red]), backgroundColor: Color.Green, onAction: () => {} },
      { icon: new SymbolGlyphModifier($r('sys.symbol.plus_square_on_square')), backgroundColor: Color.Orange, onAction: () => {} }
    ],
    deleteIconOptions: { backgroundColor: Color.Red, iconColor: Color.Gray, onAction: () => {} },
    fullDeleteOptions: { isFullDelete: true, onFullDeleteAction: () => { /* 删除动画 */ } }
  }
})
```

### 6.2 HdsListItemCard 卡片

```typescript
HdsListItemCard({
  prefixItem: new PrefixImage({ image: $r('app.media.avatar'), onClick: () => {} }),
  textItem: {
    primaryText: { text: '主标题' },
    secondaryText: { text: '副标题' },
    description: { text: '描述' }
  },
  suffixItem: new SuffixSwitch({ isCheck: false, onChange: (checked: boolean) => {} }),
  onClick: () => {}
})
```

---

## 7. MultiWindowEntryInAPP 应用内多窗

**导入**: `import { MultiWindowEntryInAPP } from '@kit.UIDesignKit'` + `import { Want } from '@kit.AbilityKit'`
**设备**: 仅折叠屏展开态、三折叠横屏、平板横屏

```typescript
MultiWindowEntryInAPP({
  want: { bundleName: 'com.example.app', moduleName: 'entry', abilityName: 'FuncAbility' } as Want,
  isShowSubtitle: true,
  multiWindowEntryInAPPStyle: {
    iconOptions: { iconSize: 24, iconColor: $r('sys.color.font_primary'), backgroundColor: $r('sys.color.comp_background_tertiary') },
    subtitleOptions: { modifier: new TextModifier().fontColor(Color.Black) }
  }
})
```

---

## 8. hdsDrawable 图标处理

**导入**: `import { hdsDrawable } from '@kit.UIDesignKit'` + `import { LayeredDrawableDescriptor, DrawableDescriptor } from '@kit.ArkUI'` + `import { image } from '@kit.ImageKit'`

### 8.1 分层图标（推荐）

```typescript
// 单个
hdsDrawable.getHdsLayeredIcon(bundleName, layeredDrawableDescriptor, 48, true): image.PixelMap

// 批量 (parallelNumber 控制并发, 最大10)
hdsDrawable.getHdsLayeredIcons(
  [{ bundleName: 'app1', layeredDrawableDescriptor: desc }],
  { size: 48, hasBorder: true, parallelNumber: 4 }
): Promise<hdsDrawable.ProcessedIcon[]>
```

> 每批最大 **500** 个，最大并发 **10**。

### 8.2 单层图标

```typescript
// 单个
hdsDrawable.getHdsIcon(bundleName, pixelMap, 48, maskPixelMap, true): image.PixelMap

// 批量
hdsDrawable.getHdsIcons(icons, maskPixelMap, options): Promise<hdsDrawable.ProcessedIcon[]>
```

### 8.3 drawable.json 配置（base/media）

```json
{ "layered-image": { "background": "$media:background", "foreground": "$media:foreground" } }
```

---

## 9. symbolRegister 自定义Symbol

**导入**: `import { symbolRegister } from '@kit.UIDesignKit'`
**限制**: 最多注册 **1组** 资源，每组最多 **10个** 自定义图标

```typescript
// 1. 将 TTF + JSON 文件放入 rawfile/
// 2. 在 string.json 中配置 Unicode:
//    { "name": "my_symbol", "value": "0x100016" }
// 3. 注册（必须在 SymbolGlyph 使用前调用）

aboutToAppear(): void {
  symbolRegister.registerSymbol(
    $rawfile("symbol/symbol_register.ttf"),
    $rawfile("symbol/symbol_register.json")
  );
}

build() {
  Column() { SymbolGlyph($r('app.string.my_symbol')) }
}
```

---

## 10. hdsMaterial 沉浸光感

**导入**: `import { hdsMaterial } from '@kit.UIDesignKit'`
**版本**: 6.1.0(23)+ | **设备**: 仅手机、平板
**适用于**: `HdsNavigation` 标题栏 / `HdsTabs` 悬浮页签

### 10.1 系统自适应（推荐）

```typescript
// HdsNavigation 标题栏
.titleBar({
  style: {
    systemMaterialEffect: {
      materialType: hdsMaterial.MaterialType.ADAPTIVE,
      materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
    }
  }
})

// HdsTabs 悬浮页签
.barFloatingStyle({
  systemMaterialEffect: {
    materialType: hdsMaterial.MaterialType.ADAPTIVE,
    materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
  }
})
```

### 10.2 自定义级别

```typescript
let types = hdsMaterial.getSystemMaterialTypes();
let level = types.indexOf(hdsMaterial.MaterialType.IMMERSIVE) >= 0
  ? hdsMaterial.MaterialLevel.EXQUISITE
  : hdsMaterial.MaterialLevel.SMOOTH;
```

| MaterialType | 说明 |
|---|---|
| `ADAPTIVE` | 系统自适应（推荐） |
| `IMMERSIVE` | 沉浸式 |

| MaterialLevel | 说明 |
|---|---|
| `ADAPTIVE` | 系统决策（推荐） |
| `EXQUISITE` | 精致（设备支持 IMMERSIVE 时用） |
| `GENTLE` | 柔和 |
| `SMOOTH` | 流畅（设备不支持 IMMERSIVE 时用，性能优先） |

---

## 11. hdsEffect 视效

**导入**: `import { hdsEffect, HdsVisualComponent, HdsSceneController, HdsSceneType } from '@kit.UIDesignKit'`

### 11.1 点光源效果

```typescript
// 发光源
.visualEffect(new hdsEffect.HdsEffectBuilder()
  .pointLight({ options: { color: Color.White, intensity: 10, height: 150 } })
  .pressShadow(hdsEffect.PressShadowType.BLEND_GRADIENT)
  .buildEffect())

// 被照射组件
.visualEffect(new hdsEffect.HdsEffectBuilder()
  .pointLight({ illuminatedType: hdsEffect.PointLightIlluminatedType.BORDER })
  .buildEffect())
```

| PointLightIlluminatedType | 说明 |
|---|---|
| `NONE` | 不照射 |
| `BORDER` | 边框受光 |
| `CONTENT` | 内容受光 |
| `BORDER_CONTENT` | 边框+内容受光 |
| `DEFAULT_FEATHERING_BORDER` | 羽化边框 |

> 单个组件最多 **12个** 光源同时照射。

### 11.2 按压阴影

```typescript
@State shadowType: hdsEffect.PressShadowType = hdsEffect.PressShadowType.NONE;

Button("按钮")
  .visualEffect(new hdsEffect.HdsEffectBuilder().pressShadow(this.shadowType).buildEffect())
  .onTouch((event: TouchEvent) => {
    if (event.type === TouchType.Down) this.shadowType = hdsEffect.PressShadowType.BLEND_WHITE;
    else if (event.type === TouchType.Up || event.type === TouchType.Cancel) this.shadowType = hdsEffect.PressShadowType.NONE;
  })
```

| PressShadowType | 说明 |
|---|---|
| `NONE` | 无 |
| `BLEND_WHITE` | 白色混合 |
| `BLEND_GRADIENT` | 渐变混合 |

### 11.3 背景流光

```typescript
@State controller: hdsEffect.ShaderEffectController = new hdsEffect.ShaderEffectController();

Stack()
  .visualEffect(new hdsEffect.HdsEffectBuilder()
    .shaderEffect({
      effectType: hdsEffect.EffectType.UV_BACKGROUND_FLOW_LIGHT,  // 或 DUAL_EDGE_FLOW_LIGHT
      animation: { duration: 10000, iterations: -1, autoPlay: true },
      controller: this.controller
    })
    .buildEffect())
```

### 11.4 双边边缘流光

```typescript
.shaderEffect({
  effectType: hdsEffect.EffectType.DUAL_EDGE_FLOW_LIGHT,
  params: {
    firstEdgeFlowLight: { startPos: 0, endPos: 1.0, color: '#1AD0F1' },
    secondEdgeFlowLight: { startPos: 0.5, endPos: 1.5, color: '#FFA4E5' }
  },
  animation: { duration: 4000, iterations: -1, autoPlay: true }
})
```

### 11.5 自带背景的双边流光（HdsVisualComponent）

```typescript
@State sceneCtrl: HdsSceneController = new HdsSceneController()
  .setSceneParams({
    backgroundMaskColors: [Color.Green, Color.Red],
    firstEdgeFlowLight: { startPos: 0, endPos: 0.5, color: Color.Red },
    secondEdgeFlowLight: { startPos: 0, endPos: -0.5, color: Color.Green }
  })

HdsVisualComponent()
  .scene(HdsSceneType.DUAL_EDGE_FLOW_LIGHT_WITH_BACKGROUND_MASK, this.sceneCtrl, () => {
    console.info('animation finished');
  })
```

---

## 约束汇总

| 项目 | 约束 |
|------|------|
| 地域 | 仅中国大陆（不含港澳台） |
| 设备 | 手机、平板、PC/2in1、TV（因组件而异） |
| 模拟器 | 不支持沉浸视效 |
| 沉浸光感 | 仅手机、平板 |
| 应用内多窗 | 仅折叠屏展开态、三折叠横屏、平板横屏 |
| 图标批处理 | 并发最大10，每批最大500 |
| 自定义Symbol | 最多1组，每组最多10个图标 |
| 点光源 | 单组件最多12个光源 |