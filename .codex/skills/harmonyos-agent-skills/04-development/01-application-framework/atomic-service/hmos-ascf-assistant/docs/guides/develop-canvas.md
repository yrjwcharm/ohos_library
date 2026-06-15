# 画布


canvas组件提供了绘制界面，开发者可以在上面任意绘制。具体步骤如下：


1. 在HXML中添加 canvas 组件。  
   指定 canvas-id ="myCanvas" 唯一标识一个 canvas，用于后续获取 Canvas 对象。

   指定 type 用于定义画布类型，本例子使用 type="2d" 示例。

   ```html
   <!-- 2d 类型的 canvas -->
   <canvas canvas-id="myCanvas" type="2d" style="border: 1px solid; width: 300px; height: 150px;" />
   ```

2. 在js文件中，获取 Canvas 对象渲染上下文。  
   通过 createCanvasContext 选择上一步的 canvas，可以获取到 Canvas 对象上下文。

   后续的画布操作与渲染操作，都需要通过这个对象上下文进行处理。

   ```js
   let canvas = has.createCanvasContext('myCanvas'); // 在HXML中填入的id
   ```

3. 在js文件中，进行绘制。  
   通过渲染上下文上的绘图API，可以在画布上任意绘制。

   ```js
   canvas.fillRect(10, 10, 50, 50);
   canvas.draw();
   ```
