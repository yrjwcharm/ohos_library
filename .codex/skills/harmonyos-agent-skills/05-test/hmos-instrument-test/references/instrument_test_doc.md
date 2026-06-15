# Instrument Test
https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-instrument-test
## 创建ArkTS测试用例

### 创建默认测试用例

1. 在工程目录下打开待测试模块（支持HAP、HAR、HSP模块）下的ets文件，将光标置于代码中任意位置，单击**右键 > Show Context Actions** **> Create Instrument Test**或快捷键**Alt+Enter** **（macOS为Option+Enter）> Create Instrument Test**创建测试类。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5d/v3/KqqD9_YORJeXx8R-w-WDhg/zh-cn_image_0000002532750253.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=8BFBA0765F85880297A0BB583FD18418ADFFAEA44342DEAEB85E54C2169D7E9B)
2. 在弹出的Create Instrument Test窗口，输入或选择如下参数。
   * **Testing library**：测试类型，默认为DECC-ArkTSUnit，JS语言默认为DECC-JSUnit。
   * **ArkTS name**：创建的测试文件名称，测试文件中包含了测试用例。测试文件名称要求在工程目录范围内具有唯一性，仅支持字母、数字、下划线（\_）和点（.）。
   * **Destination package**：测试文件存放的位置，建议存放在待测试模块的test目录下。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/c4qrvG2_T1S8_V6-HlFWSQ/zh-cn_image_0000002532750239.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=0C0C9757AB72DE690F30F4A89845F7374957B9595EB9A31F39D4C42014D19203)
3. DevEco Studio在ohosTest/ets/test目录下自动生成对应的测试类。在测试类中，DevEco Studio会生成对应方法的用例模板，具体测试代码需要开发者根据业务逻辑进行开发，具体请参考[自动化测试框架使用指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkxtest-guidelines)。

   说明

   * 您也可以手动在ohosTest > ets > test文件夹下创建测试用例，手动创建后，需要在List.test.ets文件中添加创建的用例类。手动创建的工程或历史工程，ohosTest > ets > test文件夹下所有文件的文件名必须以.test.ets结尾，否则将在运行时弹窗提示“Error: Test files must end with '.test.ets'.”请点击**Fix**按钮，DevEco Studio将自动对ohosTest > ets > test目录下的文件名进行修改。
   * 首次在HarmonyOS设备上运行UI测试框架需要使用命令“hdc -n shell param set persist.ace.testmode.enabled 1”使能UiTest测试能力。

### 自定义Ability和Resources

从5.0.3.403版本开始，新创建的工程/模块的ohosTest目录下默认不创建testability、testrunner和resources目录，历史工程仍保留这些目录，如果新工程需要使用ability或resources能力，需要开发者自行创建。

说明

如果需要使用ability能力，需要同时创建testrunner目录及OpenHarmonyTestRunner.ets文件。

**表1** **新旧版本ohosTest目录对比**

|  |  |
| --- | --- |
| **新版本** | **历史版本** |
|  |  |

1. 创建以下目录或文件，文件内容示例可在[运行Instrument Test测试用例](/consumer/cn/doc/harmonyos-guides/ide-instrument-test#section1574003717165)后，在对应模块的build/{productName}/intermediates/src/ohosTest下查看，其中productName是当前生效的product，可以通过点击DevEco Studio右上方![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bb/v3/UcPy67wfRF6guQlybogfMg/zh-cn_image_0000002532750215.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=6528C4B3B707B144F786523C76C08F62EE5F87088128B86426382DA6BAA7CDD3)图标进行查看。
   * testability目录 > TestAbility.ets文件
   * testability目录 > pages目录 > Index.ets文件
   * testrunner目录 > OpenHarmonyTestRunner.ets文件
   * resources目录 > base目录 > element目录 > color.json文件
   * resources目录 > base目录 > element目录 > string.json文件
   * resources目录 > base目录 > profile目录 > test\_pages.json文件
2. 在module.json5文件中补充ability配置字段mainElement、pages、abilities，关于字段的具体说明请参考[module.json5配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)。

   ```
   {
     "module": {
       "name": "entry_test",
       "type": "feature",
       "description": "$string:module_test_desc",
       "mainElement": "TestAbility",                                   // 对应下方abilities中的ability name。
       "deviceTypes": [
         "phone",
         "tablet",
         "2in1"
       ],
       "deliveryWithInstall": true,
       "installationFree": false,
       "pages": "$profile:test_pages",                                 // 对应resources目录 > base目录 > profile目录 > test_pages.json文件。
       "abilities": [                                                  // 添加的ability的配置信息。
         {
           "name": "TestAbility",
           "srcEntry": "./ets/testability/TestAbility.ets",
           "description": "$string:TestAbility_desc",
           "icon": "$media:icon",    // 确保引用的资源都存在
           "label": "$string:TestAbility_label",
           "exported": true,
           "startWindowIcon": "$media:icon",
           "startWindowBackground": "$color:start_window_background"
         }
       ]
     }
   }
   ```

## 运行测试用例

### 运行模式

使用DevEco Studio运行测试用例前，需要将设备与电脑进行连接，将工程编译成带签名信息的HAP，再安装到真机设备或模拟器上运行，具体请参考[使用本地真机运行应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-run-device)或[使用模拟器运行应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-run-emulator)。

可以采用运行工程目录（test）、测试文件（如Ability.test.ets）、测试套件（describe）、测试方法（it）的方式来运行测试用例：

* 在工程目录中，单击**右键 > Run'测试文件名称'**，执行测试。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1/v3/RIikSJkASoCkbvVIv2kMug/zh-cn_image_0000002532750237.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=462B10CEDC2C7450B4AC817DB3C7D7C51815224B8E4BD5B8FCACAA1C840C8812)
* 打开测试文件，单击测试套件左侧按钮。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/df/v3/7GS-VyDaRgmRuX1kdZJa6g/zh-cn_image_0000002501070232.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=FBBE0660B5228B31FB8CE66B01163525911DFA577275B153D9FFB4A0310D1CEE)
* 如果要根据自定义的配置执行Instrument Test，在[创建测试用例运行任务](/consumer/cn/doc/harmonyos-guides/ide-instrument-test#section65264166107)后，通过如下方式的其中之一，执行Instrument Test：
  + 在工具栏主菜单单击**Run > Run'测试名称'**。
  + 在DevEco Studio的右上角，选择测试任务，然后单击右侧的![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/L3Bfy4tsQXaXX1-xt2bCtA/zh-cn_image_0000002532670291.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=F5835E1CCA0C79469460F6500895B604FAAEF5263EEDD7BEB8D1DC0DFDDBF643)按钮，执行Instrument Test。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/15/v3/Jp_llyLyTsalS12IQKyEDg/zh-cn_image_0000002532670289.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=82AFEFF7DB8C74F91AD3215BD8617B3A71C82FD355E82F01DEA64C3694C57055)

执行完测试任务后，查看测试结果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/W_HhArCgQEO9HihwwwU9xA/zh-cn_image_0000002532750225.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=22FC7AB5F3E59AD20A5DADC68D72CA4FAD1F0278895A82FBFC70C3561C8C0C7E)

### 调试模式

调试模式相比运行模式增加了断点管理功能。在断点命中时，可以选择单步执行、步入步出、进入下个断点等方式进行调试，另外可以使用线程堆栈可视化、变量和表达式可视化功能，快速定位问题。

以文件级别为例，在添加断点之后，在工程目录中，选中文件，单击**右键 > Debug'测试文件名称'**，以调试模式执行测试任务。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/Ym6CgqCnTTeikXH96cYB9A/zh-cn_image_0000002501070196.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=67F598C49D5A03CF65B30643E2B6D7A67464EB0C15A7AB4AD53482F404514C52)

在断点命中时，下方将出现Debug窗口。开发者可在该窗口中进行断点管理与基础调试能力的可视化操作，在断点命中时可查看当前线程的变量和堆栈信息。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/AgSKlVNIQr-IGZwRqhHZmQ/zh-cn_image_0000002500910386.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=0C9AC56AD70F558375183AAA406ECBE8D1F7504EDE70937BFEE7DEA14878582E)

断点命中时，在代码编辑器窗口单击右键，在弹出的菜单中将出现调试模式特有功能，如计算表达式、添加变量监视等。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/L4ezMG9qQPaq9j7hFD5ABQ/zh-cn_image_0000002500910348.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=EB61C1C16A48874726D560FC004E5B16B3CCD9B271E47E42E3DE1BF9D7D50CD5)

在跳出所有断点后，测试结束，与运行模式相同，在测试窗口查看测试结果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/uukXGbwASm-8DqJkiqCr1A/zh-cn_image_0000002500910346.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=FF892E4DBC6AC860090FAD94944C225F1DD86583D3557BBC19E9996B7CA32726)

说明

DevEco Studio支持设置调试代码类型，具体请参考[设置调试代码类型](/consumer/cn/doc/harmonyos-guides/ide-instrument-test#section0164586312)。

### 覆盖率统计模式

在Instrument Test运行的基础上支持代码覆盖率统计。

开发者可以自定义需要参与覆盖率测试的文件，具体配置方法请参考[配置覆盖率过滤文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-ui-test#section13756446154)。

可以采用运行工程目录（test）、测试文件（如Ability.test.ets）、测试套件（describe）、测试方法（it）的方式来启动代码覆盖率的统计。

以文件级别为例，有两种方式启动测试：

* 方式一：在工程目录中，选中文件，单击**右键 > Run '测试文件名称' with Coverage**，执行测试。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/Q3u9jUDGQei99SxhxAsQmA/zh-cn_image_0000002501070206.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=626383EB1CD21B91A4575B04D6B06B904C272D5AB046D781AE0D179CBFF72EAE)
* 方式二：在DevEco Studio的右上角，选择测试任务，然后单击右侧的![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/WkxoZS1CRYutgMc8wcq5IA/zh-cn_image_0000002501070202.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=7ACC97E52BB0D595F5AE42690DEB469FC12C86F3485DAFF4EC2EEB4DC10CF0E3)按钮，执行测试。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/dveraYRlQpuNLXGzogguWA/zh-cn_image_0000002501070222.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=87C13B4C4885C8ABF20178F63001DCADC85BB8C7C9C3BA3FFBD05FB83E33C3AC)

启动测试后，进行编译构建，底部将出现Cover窗口，构建结束后自动拉起Cover窗口，测试任务结束后，窗口中会打印测试报告的路径。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3/Ydle4a3FQvatgkohdnrqrw/zh-cn_image_0000002532670305.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=0F804E707CFA86C82611AADCD1698C925F362DD1E50FA73ED5763DB9DC465A35)

点击链接可打开报告，查看ArkTS代码覆盖率详情，关于覆盖率的计算方式请参考[查看覆盖率报告](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-ui-test#section10394362109)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1c/v3/N-w_z1xCQWaR-UYZmAHZ4A/zh-cn_image_0000002532750259.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=3CF4FDEC522F20A7F04082E36929A0DC0E357BC2C3672E0CFC0838E510C6FFC3)

在Cover窗口中，单击rerun按钮可以按照之前的设置，重新执行覆盖率用例。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/WSshyhXQRSaPbr2ZzssC5w/zh-cn_image_0000002532670303.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=561D155A476B1970896D80C8ED3F21F8881EEDBD2776D99D6A45D818782C044B)

## （可选）自定义测试用例运行任务

默认情况下，测试用例可直接运行，如果需要自定义测试用例运行任务，可通过如下方法进行设置。

1. 在工具栏主菜单单击**Run** > **Edit Configurations**进入Run/Debug Configurations界面。
2. 在**Run/Debug Configurations**界面，单击+按钮，在弹出的下拉菜单中，单击Instrument Test。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5/v3/sL8OLE2xQG2m4S7BIk0-kg/zh-cn_image_0000002501070230.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=05F8714E8D51EE78E38F554E7F456284AF51A87889F2E5DD29DA04A87ED183AC)
3. 根据实际情况，配置Instrument Test的运行参数。然后单击**OK**，完成配置。
   * 如果模块依赖共享包，请提前设置HAP安装方式，勾选“**Keep Application Data**”，则表示采用覆盖安装方式，保留应用/元服务缓存数据。
   * 如果工程中HAP/HSP模块直接依赖其他HSP模块（如entry模块依赖HSP模块）或间接依赖其他模块（如entry模块依赖HAR模块，HAR又依赖HSP模块）时，在测试阶段需要同时安装模块包及其所有依赖模块的包到设备中。此时，可以勾选“**Auto Dependencies**”，测试时会自动将所有依赖的模块都安装到设备上。该选项默认勾选。
   * 如果不涉及UI测试，勾选“**Only OhosTest Package**”，则只会推送OhosTest测试包到设备上，不会推送HAP/HSP包，可以缩短推包时间。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f3/v3/TDUs9TQnQXCGKBR1hMEeZA/zh-cn_image_0000002501070218.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=96DCE743DA504D84DBCCF3ECF306ADC28366D208CAC5B2E087CCF0BA2B0CF7F8)

### 使用过滤条件筛选待运行的测试用例

1. 在用例编写时，通过配置it的第二个入参，为每个用例添加过滤参数。此参数用于为测试用例添加标注，不添加则参数默认为0表示未被标注。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/95/v3/LLM-Rvp-QLaxjo4a7LF6FQ/zh-cn_image_0000002501070220.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=E6416CF9EE87DBB5622C2A951BFAC0AF9DE130B1D27CBB24F1839D67E741216B)
2. 打开**Run/Debug Configurations**窗口，点击Test Args![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/kzNnUH6MSHa-A7K4-aBeUQ/zh-cn_image_0000002500910370.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=851E7077D28557DA110F692EA5E9554B6D2AA2DB1B521F0B412A9D0D9ACFEAFA)，打开**Test Args**界面，添加命令行参数。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f1/v3/D4aw0DJRSeGUQQ8NmR2KFA/zh-cn_image_0000002532670295.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=CCB4EF67CB952A401EC7AC43AB88892F2F0574624EE68EA2AF6F7815EF251E11)

   例如将测试参数配置为level=1, size=medium

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/52/v3/fvKqg_lcQnmTz5ZFoQflMg/zh-cn_image_0000002501070216.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=D636A284D0A4A4A64854F747089EC2704ADE842AF027C54FB5CF64981FD69053)

   **表2** 参数规则参考

   展开

   | Key | 含义说明 | Value取值范围 |
   | --- | --- | --- |
   | level | 用例级别 | "0","1","2","3","4", 例如：-s level 1 |
   | size | 用例粒度 | "small","medium","large", 例如：-s size small |
   | testType | 用例测试类型 | "function","performance","power","reliability","security","global","compatibility","user","standard","safety","resilience", 例如：-s testType function |
3. 完成以上配置后，在运行此项配置对应的测试任务时，只运行过滤后的测试用例。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c4/v3/xyee7euYRZ-F0eC005W4eQ/zh-cn_image_0000002501070204.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=B1FE904B9DA9F0BA0EE6BA531E039682CDDCE19F101751BEF8C4988EC585F240)

### 设置调试代码类型

点击**Run > Edit Configurations**，打开**Run/Debug Configurations**窗口，选择Instrument Test，点击**Debugger**页签，设置Debug type。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a6/v3/iIqyzOyzT0Woalju-GVr_g/zh-cn_image_0000002501070198.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=7136ECD1DEB3A5269BD4654722F1B39DF4841BE122F6097E48B24CD5414383BF)

调试类型Debug type默认为Detect Automatically，关于各调试类型的说明如下表所示：

展开

| 调试类型 | 调试代码 |
| --- | --- |
| Detect Automatically | 自动检测。根据工程模块及其依赖的模块涉及的编程语言，自动启动对应的调试器。  如果检测到是Native模块，出现两个调试窗口（PandaDebugger、Native）；如果不是Native模块，只出现PandaDebugger调试窗口。 |
| ArkTS/JS | 只调试ArkTS/JS，只出现PandaDebugger调试窗口。 |
| Native | 单独调试C++，只出现Native调试窗口。 |
| Dual(ArkTS/JS + Native) | 支持ArkTS/JS和C++混合调试，出现两个调试窗口（PandaDebugger、Native）。 |

说明

调试C++代码时，当前模块及所有依赖的HSP模块的[Address Sanitizer配置](/consumer/cn/doc/harmonyos-guides/ide-instrument-test#section8352185341915)要保持一致，若不一致，可能无法进入C++代码的断点处。

### ASan检测

Instrument Test针对C/C++方法提供ASan检测能力，关于ASan的介绍请参考[ASan检测](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-asan)，当前不支持JS语言。

1. 在运行/调试配置窗口，选择对应的Instrument Test，点击**Diagnostics**页签，勾选**Address Sanitizer**选项，勾选后，测试包和源码包均开启ASan能力。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/ZgRxKqY5QPOr8a3PNtDq4Q/zh-cn_image_0000002532670293.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=AB9DB761CF5B094962EEAD31F768A4299CE6B989B983891A41B543C9CF26498F)
2. 如果有引用本地library，需在library模块的build-profile.json5文件中，配置arguments字段值为“-DOHOS\_ENABLE\_ASAN=ON”，表示以ASan模式编译so文件。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/QtJqN_M_RuuPGPrhla5Z1w/zh-cn_image_0000002532750249.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=BB58B1F9793574042517F0B5FF578FDA5C0F57B270EA236F42EBB308C89568F8)
3. 运行测试用例。
4. 当程序出现内存错误时，弹出ASan log信息，点击信息中的链接即可跳转至引起内存错误的代码处。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/7f0gTQ1PQ6C9GQ-8AEw9pA/zh-cn_image_0000002532670299.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=BB64F5599695245CBDF756C1C772DA6581375FDD8D9F613A62D4DE419ACD7706)

## 测试C++代码

从DevEco Studio 6.0.0 Beta5版本开始，支持对C++代码进行测试，包括运行/调试C++测试代码、对C++代码进行覆盖率统计。

由于C++的测试so无法直接在设备上运行，需要通过Node-API的方式拉起，即通过ArkTS/JS语言拉起C/C++测试用例。

### 运行C++测试代码

1. 创建cpp测试目录，鼠标右键单击ohosTest目录，选择**New > C/C++ File(Napi)**，在ohosTest下生成cpp测试目录，以entry模块为例，目录结构如下。
   * **src > ohosTest > cpp > types**：用于存放C++的API接口描述文件。
   * **src > ohosTest > cpp > types** **> libentry\_test > index.d.ts**：描述C++ API接口行为，如接口名、入参、返回参数等。
   * **src > ohosTest > cpp > types** **> libentry\_test > oh-package.json5**：配置.so三方包声明文件的入口及包名。
   * **src > ohosTest > cpp > CMakeLists.txt**：CMake配置文件，提供CMake构建脚本。
   * **src > ohosTest > cpp > napi\_init.cpp：**定义C++ API接口的文件**。**

   说明

   DevEco Studio生成的cpp测试目录中不包含C++测试框架，需要开发者自行选择开源测试框架使用。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/Kk5wXZHbSVeraxIGxic1Ew/zh-cn_image_0000002532670307.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=DD8A229545E57F7AC531C5F3A7982D771DCE7D4844C8D5DAC218CA54EEC79418)
2. 通过ArkTS测试用例拉起C++测试，示例如下。

   ```
   // ArkTS测试文件Ability.test.ets
   import entryTest from 'libentry_test.so';
   export default function abilityTest() {
     describe('ActsAbilityTest', () => {
       ...
       it('testNative', 0, () => {
         hilog.info(0x0000, 'testTag', '%{public}s', 'testNative it begin');
         let result = entryTest.runNativeTest();
         hilog.info(0x0000, 'testTag', '%{public}s', result)
         expect(result).assertContain("ended");
       })
     })
   }
   ```
3. 运行testNative测试用例，查看测试结果。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e6/v3/eRi7ke1iSK6vhbsTE5KxHQ/zh-cn_image_0000002500910382.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=A3D86B5583CEEFFEA1F880F58AEE43CE5753270EE93724B85B484858E2B2ADB2)

### 收集代码覆盖率

DevEco Studio默认不收集C++代码覆盖率，需要通过以下方式开启。

1. 在测试目录下的CMakeLists.txt中添加以下代码，开启覆盖率编译插桩能力。

   ```
   // DevEco Studio 6.0.2 Beta1之前版本
   set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fprofile-instr-generate -fcoverage-mapping")
   set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fprofile-instr-generate -fcoverage-mapping")

   // DevEco Studio 6.0.2 Beta1及以上版本，OHOS_TEST_COVERAGE在覆盖率模式下为true，在调试/运行模式下为false
   if(OHOS_TEST_COVERAGE)
     set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fprofile-instr-generate -fcoverage-mapping")
     set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fprofile-instr-generate -fcoverage-mapping")
   endif()
   ```
2. 在napi\_init.cpp文件的RunNativeTest方法中，调用\_\_llvm\_profile\_write\_file方法，将覆盖率数据保存到设备的/data/storage/el2/base路径下的c++\_coverage.profraw文件中，该路径和文件名不可修改，示例代码如下。

   ```
   extern "C" {
       void __llvm_profile_set_filename(char *);
       int __llvm_profile_write_file(void);
   }

   static napi_value RunNativeTest(napi_env env, napi_callback_info info)
   {
       char filename[256];
       snprintf(filename, sizeof(filename), "/data/storage/el2/base/c++_coverage.profraw"); // 覆盖率报告文件路径和文件名，不可修改
       __llvm_profile_set_filename(filename);
       // 开启测试
       ...
       // 结束测试，保存数据
        __llvm_profile_write_file();
       ...
   }
   ```
3. 运行覆盖率测试，选中ArkTS测试文件，单击**右键 >** **Run '测试文件名称' with Coverage**，执行测试。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/Xd5bZEZMRXeYwhfoBplqKQ/zh-cn_image_0000002501070194.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=0479B782234B31C326E251A82EC17EBD3A5CFE56A10252835F721D0B1A5A3ACA)

   启动测试后，进行编译构建，底部将出现Cover窗口，构建结束后自动拉起Cover窗口，测试任务结束后，窗口中会打印测试报告的路径。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/jliSjCVdQ4GGtGSUnf-shw/zh-cn_image_0000002532750217.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=E43E3AC233640C8CFF25FF915A3086674672ECF6215C8D899AE6173D9D03973A)

   点击链接可打开报告，查看C++代码覆盖率详情。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c/v3/EiAb0Q61QY2KwCPNW6JlbA/zh-cn_image_0000002501070208.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=29BC1DD12B96C81182FFB4BBDCA35F441A07EB40D3D3E8620C52C1A0A7D64046)

## 使用命令行执行测试Instrument Test

通过命令行方式执行Instrument Test，在工程根目录下执行命令：

```
hvigorw onDeviceTest -p module={moduleName} -p coverage={true|false} -p scope={suiteName}#{methodName} -p ohos-debug-asan={true|false}
```

* module：执行测试的模块，缺省默认是执行所有模块的用例。
* coverage：是否生成覆盖率报告，缺省默认是true，在<module-path>/.test/default/outputs/ohosTest/reports路径下生成两份报告，一份是html格式（index.html），一份是json格式（coverageReport.json），具体参考[查看覆盖率报告](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-ui-test#section10394362109)。

  如果开启了C++代码覆盖率测试，会生成C++代码的覆盖率报告，路径：<module-path>/.test/default/outputs/ohosTest/cpp\_reports/index.html
* scope：格式为{suiteName}#{methodName}或{suiteName}，分别表示测试用例级别或测试套件级别的测试，缺省默认是执行当前模块的所有用例。
* ohos-debug-asan：是否启用ASan检测，缺省默认是false。从DevEco Studio 5.1.1 Beta1版本开始支持。

  ASan日志路径：<module-path>/.test/default/intermediates/ohosTest/coverage\_data

说明

* 通过命令行执行测试时，不支持配置product，默认为default。
* 多个module和scope之间用逗号隔开。

测试结果文件：<module-path>/.test/default/intermediates/ohosTest/coverage\_data/test\_result.txt