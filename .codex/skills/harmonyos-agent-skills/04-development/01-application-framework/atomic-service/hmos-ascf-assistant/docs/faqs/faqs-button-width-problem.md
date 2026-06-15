# button组件width和实际不一致问题

button存在max-width默认样式，值为448px，若button组件宽度需要超过448px，可设置max-width为none或把值设足够大覆盖默认样式。

**示例：**

```hxml
<!-- hxml -->
<button class="myButton">按钮</button>
```

```CSS
/* css样式 */
.myButton {
  width: 100%;
  max-width: none; /* 移除最大宽度限制 */
}
```