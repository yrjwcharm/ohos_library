# 导入小程序资源


开发者可以通过导入小程序的资源，来构建元服务。


1. 在DevEco Studio顶部菜单栏中选择“**Tools**&gt; **ASCF Devtools** &gt; **ASCF Converter**”。

   ![zh-cn_image_0000002530046013](figures/zh-cn_image_0000002530046013.png)

2. 选择元服务源码目录和输出目录。

   > **注意**
   > 
   > 在转换之前，请确保ascf目录为空，避免覆盖已有的代码。

   ![ASCF_Converter_Advance_Config_img-w200xh200](figures/ASCF_Converter_Advance_Config_img.png)

3. 配置高级设置。

   可以通过填写对应参数控制转换器行为。当前支持以下参数：

   - --logging=[level]
   
      用于控制日志最低打印级别，level可取值为["debug" | "info" | "warn" | "error"]，默认级别为"info"。

   - --notaddtodo
   
      用于控制在转换后的源码中，不支持的接口处不添加注释。建议在压缩后的源码中添加此参数以防止不必要的注释干扰。

4. 适配元服务。

   转换完成后，部分元服务的业务实现方式可能与原小程序存在差异。请参考[开发指南](../guides/ascf-development-guide.md)，对相关功能和要求进行适配调整。
