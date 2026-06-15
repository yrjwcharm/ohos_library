## 16. 枚举类型速查


> **组件索引**：`布局`、`组件`、`手势`、`动画`、`效果`

### 布局

| 枚举 | 值 | API |
|------|----|----|
| Alignment | TopStart(0), Top(1), TopEnd(2), Start(3), Center(4), End(5), BottomStart(6), Bottom(7), BottomEnd(8) | 7 |
| FlexAlign | Start, Center, End, SpaceBetween, SpaceAround, SpaceEvenly | 7 |
| FlexDirection | Row, RowReverse, Column, ColumnReverse | 7 |
| FlexWrap | NoWrap, Wrap, WrapReverse | 7 |
| ItemAlign | Auto, Start, Center, End, Stretch, Baseline | 7 |
| VerticalAlign | Top, Center, Bottom | 7 |
| HorizontalAlign | Start, Center, End | 7 |
| Axis | Vertical(0), Horizontal(1) | 7 |
| Direction | Ltr(0), Rtl(1), Auto(2) | 7 |
| ScrollDirection | Vertical(0), Horizontal(1), None(2), Free(3) | 7 |
| EdgeEffect | Spring(0), Fade(1), None(2) | 7 |
| BarState | Off(0), Auto(1), On(2) | 7 |

### 组件

| 枚举 | 值 | API |
|------|----|----|
| ButtonType | Normal(0), Capsule(1), Circle(2), ROUNDED_RECTANGLE(8) | 7/15 |
| ImageFit | Contain(0), Cover(1), Auto(2), Fill(3), ScaleDown(4), None(5) | 7 |
| **ImageRenderMode** | **Original, Template** | 7 |
| InputType | Normal(0), Password(1), Email(2), Number(3), PhoneNumber(4), USER_NAME(5), NEW_PASSWORD(6), NUMBER_PASSWORD(7) | 7 |
| SliderStyle | OutSet(0), InSet(1) | 7 |
| ToggleType | Checkbox(0), Switch(1), Button(2) | 7 |
| ProgressType | Linear(0), Ring(1), Eclipse(2), ScaleRing(3), Capsule(4) | 7 |
| **DataPanelType** | **Circle(0), Line(1)** | 7 |
| TextAlign | Start(0), Center(1), End(2), Justify(3) | 7 |
| TextOverflow | None(0), Clip(1), Ellipsis(2), Marquee(3) | 7 |
| FontWeight | Lighter(0), Normal(1), Regular(2), Medium(3), Bold(4), Bolder(5) | 7 |
| FontStyle | Normal(0), Italic(1) | 7 |
| TextDecorationType | None(0), Underline(1), Overline(2), LineThrough(3) | 7 |
| LineCapStyle | Butt(0), Round(1), Square(2) | 7 |
| Visibility | Visible(0), Hidden(1), None(2) | 7 |
| CopyOptions | None(0), InApp(1), LocalDevice(2), CrossDevice(3) | 9 |
| EnterKeyType | Go(0), Search(1), Send(2), Next(3), Done(4) | 7 |
| PanelType | Minibar(0), Foldable(1), Temporary(2) | 7 |
| BarMode | Scrollable(0), Fixed(1) | 7 |
| BarPosition | Start(0), End(1) | 7 |
| NavigationMode | Stack(0), Split(1), Auto(2) | 9 |
| EllipsisMode | HEAD(0), CENTER(1), TAIL(2) | 11 |
| WordBreak | NORMAL(0), BREAK_ALL(1), BREAK_WORD(2) | 11 |

> **枚举名易错提示：**
> - 属性名是 `.renderMode()`，枚举是 `ImageRenderMode`（不是 ImageRenderingMode）
> - DataPanelType 是 `Circle/Line`（不是 Close/Ring）
> - `Sticky.Normal`（不是 StickyStyle.Normal，StickyStyle 枚举不存在）
> - `TextInputStyle` 无 `Normal` 值，不要使用 `.style(TextInputStyle.Normal)`
> - `GradientDirection` 无 `BottomRight`，可用：Top, Bottom, Left, Right, TopLeft, TopRight, BottomLeft

### 手势

| 枚举 | 值 | API |
|------|----|----|
| GestureMode | Sequence, Parallel, Exclusive | 7 |
| PanDirection | All(15), Horizontal(3), Vertical(12), Left(1), Right(2), Up(4), Down(8) | 7 |
| SwipeDirection | All(15), Horizontal(3), Vertical(12) | 7 |
| TouchType | Down(0), Up(1), Move(2), Cancel(3) | 7 |

### 动画

| 枚举 | 值 | API |
|------|----|----|
| AnimationStatus | Initial(0), Running(1), Paused(2), Stopped(3) | 7 |
| PlayMode | Normal(0), Reverse(1), Alternate(2), AlternateReverse(3) | 7 |
| FillMode | None(0), Forwards(1), Backwards(2), Both(3) | 7 |
| Curve | Linear, Ease, EaseIn, EaseOut, EaseInOut, FastOutSlowIn, LinearOutSlowIn, FastOutLinearIn, ExtremeDeceleration, Sharp, Rhythm, Smooth, Friction | 7 |

### 效果

| 枚举 | 值 | API |
|------|----|----|
| BlurStyle | Thin, Regular, Thick, BackgroundThin, BackgroundRegular, BackgroundThick | 9 |
| ImageRepeat | NoRepeat(0), X(1), Y(2), XY(3) | 7 |
| HoverEffect | Auto, Scale, Highlight, None | 8 |
| HitTestMode | Default(0), Block(1), Transparent(2), None(3) | 9 |
| RenderFit | TOP_LEFT, TOP, TOP_RIGHT, LEFT, CENTER, RIGHT, BOTTOM_LEFT, BOTTOM, BOTTOM_RIGHT | 10 |
| BorderStyle | Dotted(0), Dashed(1), Solid(2) | 7 |
| SafeAreaType | SYSTEM, CUTOUT, KEYBOARD | 10 |
| KeyboardAvoidMode | OFFSET, RESIZE, RESIZE_ONLY | 11 |
