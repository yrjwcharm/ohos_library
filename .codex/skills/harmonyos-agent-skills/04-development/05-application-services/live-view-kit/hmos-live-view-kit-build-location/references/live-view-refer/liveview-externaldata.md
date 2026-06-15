# 实况窗 externalData 参数说明

## 基本概念

`external` 是 `liveViewManager.LiveView` 请求体中 `liveViewData` 层级的扩展参数，用于呈现外屏数据给实况窗服务。

## 参数位置

```typescript
liveViewManager.LiveView = {
  liveViewData: {
    primary: { ... },
    capsule: { ... },
    // externalData 放在这里
    external: { ... }
  }
}
```

## 参数类型

`externalData` 为对象类型，支持以下常见数据类型作为示例：

```typescript
export interface ExternalData {
        /**
         * the title of external screen content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * the content of external screen content of liveView.
         *
         * @type { ?Array<RichText> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        content?: Array<RichText>;
        /**
         * the background type of external screen.
         *
         * @type { ?ExternalType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        type?: ExternalType;
        /**
         * the backgroundColor of external screen content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        backgroundColor?: string;
        /**
         * the backgroundPicture of external screen content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        backgroundPicture?: string | image.PixelMap;
    }
```

## 完整示例

```typescript
//外屏类型定义
export enum ExternalType {
        /**
         * The background type is background color.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        BACKGROUND_COLOR = 0,
        /**
         * The background type is background picture.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        BACKGROUND_PICTURE = 1
    }

private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
  return {
    // todo id字段内容需要替换为业务实际内容，实况窗唯一标识，由开发者生成
    id: 9,
    // todo event字段内容需要替换为业务实际内容，应用场景标识
    event: "WORKOUT",
    // todo sequence字段内容需要替换为业务实际内容，状态序列号
    sequence: LiveViewStatus.WORKOUT_START,
    // todo isMute字段内容需要替换为业务实际内容，是否静音
    isMute: false,
    // todo liveViewData字段内容需要替换为业务实际内容，实况窗数据
    liveViewData: {
      // todo primary字段内容需要替换为业务实际内容，主区域数据
      primary: {
        // ...
      },
      // todo capsule字段内容需要替换为业务实际内容，胶囊区域配置
      capsule: {
        // ...
      },
      // todo externalData字段内容需要替换为业务实际内容，扩展数据
      external: {
        // todo title字段内容需要替换为业务实际内容，外屏标题
        title: "外屏标题",
        // todo content字段内容需要替换为业务实际内容，外屏内容数组（必须为数组类型）
        content: [{text:"填实际业务内容"}],
        // todo type字段内容需要替换为业务实际内容，外屏背景类型
        type: ExternalType.BACKGROUND_COLOR,
        // todo backgroundColor字段内容需要替换为业务实际内容，外屏背景色
        backgroundColor: "#000000",
        // todo backgroundPicture字段内容需要替换为业务实际内容，外屏背景图片
        backgroundPicture: "external.png",
      }
    }
  };
}
```

## 使用场景

- 传递业务自定义数据
- 跨应用数据共享
- 事件追踪和统计
- 用户行为分析

## 注意事项

1. `externalData` 是可选参数
2. 数据类型需符合 ArkTS 类型规范
3. 建议仅传递必要的业务数据，避免过大数据量
4. **【重要】`content` 字段必须为数组类型，不能为字符串**
