# 事件捕获

捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段相反。捕获阶段监听事件，可以采用capture-bind、capture-catch关键字，后者将中断捕获阶段和取消冒泡阶段。

- **示例1：**   
  ```html
  <view id="view1" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
    view1
    <view id="view3" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
      view3
    </view>
  </view>
  ```

  **效果：**

  点击view3会先后调用handleTap2、handleTap4、handleTap3、handleTap1。

- **示例2：** （将示例1中第一个capture-bind修改为capture-catch）  

  ```html
  <view id="view1" bind:touchstart="handleTap1" capture-catch:touchstart="handleTap2">
    view1
    <view id="view3" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
      view3
    </view>
  </view>
  ```

  **效果：**

  点击view3只触发handleTap2。
