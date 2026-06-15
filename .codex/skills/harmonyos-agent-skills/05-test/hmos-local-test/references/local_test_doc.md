# Local Test
https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-local-test
说明

当前不支持测试C/C++方法及系统API。

## 创建Local Test测试用例

1. 在工程目录下打开待测试模块（支持HAP、HAR、HSP模块）下的ets文件，将光标置于代码中任意位置，单击**右键 > Show Context Actions** **> Create Local Test**或快捷键**Alt+Enter****（macOS为Option+Enter） > Create Local Test**创建测试类。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/NDIfFG1qQsO26VXO7cZU_g/zh-cn_image_0000002500910558.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=BACF4BAC36E326094549FA11144E08A078B027F666EA13E76929A65A97101F7E)
2. 在弹出的Create Local Test窗口，输入或选择如下参数。
   * **Testing library**：测试类型，默认为DECC-ArkTSUnit。
   * **ArkTS name**：创建的测试文件名称，测试文件中包含了测试用例。测试文件名称要求在工程目录范围内具有唯一性，仅支持字母、数字、下划线（\_）和点（.）。
   * **Destination package**：测试文件存放的位置，建议存放在待测试模块的test目录下。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/4hrA6do4SKmQNFRwMa5SfQ/zh-cn_image_0000002500910544.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=82B0095EDEB741083EACA2B6EA97B06E88A1A3933DDA9235B6D3BC50FB4A9B3E)
3. DevEco Studio在test目录下自动生成对应的测试类。在测试类中，DevEco Studio会生成对应方法的用例模板，具体测试代码需要开发者根据业务逻辑进行开发，具体请参考[单元测试框架](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/unittest-guidelines)。

   说明

   您也可以手动在test文件夹下创建测试用例，手动创建后，需要在List.test.ets文件中添加创建的用例类。

## 运行Local Test测试用例

### 运行模式

可以采用运行工程目录（test）、测试文件（如Index.test.ets）、测试套件（describe）、测试方法（it）的方式来执行Local Test，各级别测试执行入口如下。

|  |  |
| --- | --- |
|  |  |
| 目录级 | 文件级 |
|  |  |
| 套件级 | 方法级 |

以文件级别为例，在工程目录中，选中文件，单击**右键 > Run'测试文件名称'**，执行测试。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/9WrpG0UHSd-0Ou2Be8kwyg/zh-cn_image_0000002500910550.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=971BB288D40124AC5F0D5B575944A482C25B8995CE0E8F0A478CCB658B94B530)

也可以通过如下方式，执行Local Test：

* 在工具栏主菜单单击**Run > Run'测试名称'**。
* 在DevEco Studio的右上角，选择一项测试任务的配置，然后单击右侧的![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/20/v3/FM57psWgSM-9qfrIkG04ug/zh-cn_image_0000002501070408.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=C70F99CDC0800171D8C78B14288D38199F6E38131C595D0DB9F9504D952F4CAD)按钮，执行Local Test。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/59/v3/t9QDe_VASk6nloewO0QDdg/zh-cn_image_0000002532670461.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=21E61F0B48045532AE31DF05F555609DC82C128CB7AE96FD8C8152CB0808B302)

执行完测试任务后，查看测试结果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/i-XeBJ7HTUCwyFp8fOXZjQ/zh-cn_image_0000002532750423.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=A38C188D91CB4FE1A5D23B1E0F92C5EFBC85E8B19A2215ABEC24723F82A9F436)

### 调试模式

调试模式相比运行模式增加了断点管理功能。在断点命中时，可以选择单步执行、步入步出、进入下个断点等方式进行调试，另外可以使用线程堆栈可视化、变量和表达式可视化功能，快速定位问题。

以文件级别为例，在添加断点之后，在工程目录中，选中文件，单击**右键 > Debug'测试文件名称'**，以调试模式执行测试任务。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bd/v3/DHQXE_kAQBGgE4NbcurGZA/zh-cn_image_0000002532750413.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=0DD26D56D4F53685DDEFB2A98AFDB153901445A2FD21910C17AABFAF13D05A1E)

在断点命中时，下方将出现Debug窗口。开发者可在该窗口中进行断点管理与基础调试能力的可视化操作，在断点命中时可查看当前线程的变量和堆栈信息。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/OvzE-AcjR5egUjUVt_WbHw/zh-cn_image_0000002500910546.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=52DD424366F5701CB202833E88A945C2572491A1FE6964D279D9ADE7EC9EB404)

断点命中时，在代码编辑器窗口单击右键，在弹出的菜单中将出现调试模式特有功能，如计算表达式、添加变量监视等。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/-D-bn03PTs-7QQ9c8a0zbg/zh-cn_image_0000002500910566.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=C7E9B41642848907EC418EB95C6FBD84EFDA86D18A610E849E60A25E2AFE1286)

在跳出所有断点后，测试结束，与运行模式相同，在测试窗口查看测试结果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a6/v3/fu8xb-ulTNKVPFszIhOESQ/zh-cn_image_0000002532750425.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=D708415138BE20F198F655F98CB700B7A5CA4106D98EB66CFCCD95746DEBE0D3)

### 覆盖率统计模式

在LocalTest运行的基础上支持代码覆盖率统计，当前仅支持ArkTS工程。

开发者可以自定义需要参与覆盖率测试的文件，具体配置方法请参考[配置覆盖率过滤文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-ui-test#section13756446154)。

如前所述，覆盖率统计模式也有多级别入口，以文件级别为例，有两种方式启动测试：

* 方式一：在工程目录中，选中文件，单击**右键 > Run '测试文件名称' with Coverage**，以覆盖率统计模式执行测试任务。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/18/v3/PuRsckivRqWhHf68DWu3EA/zh-cn_image_0000002532670485.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=20564FFAB9388B3B7FB2E4087120EA4710A60C764B9BCAE35BDAD92CF186E207)

* 方式二：在DevEco Studio的右上角，选择测试任务，然后单击右侧的![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/TDwvHpgjTIm9DIxUIvaE_Q/zh-cn_image_0000002532750427.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=5ECAF27387643A5B0FDBBC26BE29E176C12560FD97CCDCE82C33454743278BA0)按钮，执行测试。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/UAT0LApHR3Ss7hTSMp6AUA/zh-cn_image_0000002532670475.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=DCAD882E4464D177BA6F9ECDFB4834150AF703AF3A58ACAFEF3D3E7A157C1CB7)

启动测试后，进行编译构建，底部将出现Cover窗口，构建结束后自动拉起Cover窗口，测试任务结束后，窗口中会打印测试报告的路径。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/_sRpxH4-TuqxVJDSTodxJQ/zh-cn_image_0000002532750417.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=0FDC52BE90C8B390B65BC0AEF536D4C9ADAAE9322FEF6B87A75A100B8943F982)

点击链接可打开报告，查看代码覆盖率详情，关于覆盖率的计算方式请参考[查看覆盖率报告](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-ui-test#section10394362109)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e7/v3/Y_LpTS5hT5ODUUJt7yf2dA/zh-cn_image_0000002500910552.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=D1F32955F30EA64EA989084C03AE2208C89B2C5338154CA0F292FC35E34286CA)

在Cover窗口中，单击rerun按钮可以按照之前的设置，重新执行覆盖率用例。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ce/v3/_a0C6-JNQYiOv7lT67tuLQ/zh-cn_image_0000002532750437.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=B0BF12F5A4AF8EF299C076FD32B3F8410F60E44E87198A5910D81E85F713AC4F)

## （可选）自定义测试用例运行任务

默认情况下，测试用例可直接运行。如果需要自定义测试用例运行任务，可通过如下方法进行设置。

1. 在工具栏主菜单单击**Run**>**Edit Configurations**，进入Run/Debug Configurations界面。
2. 在**Run/Debug Configurations**界面，单击**+**按钮，在弹出的下拉菜单中，单击**Local Test**。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/RPEETZCkTLu8_a83bMK52w/zh-cn_image_0000002532670453.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=AB46D580CD293A459BE0A5625BA499F0FD2962D0F663C86BAEB8B2464775064E)
3. 根据实际情况，配置Local Test的运行参数。 然后单击**OK**，完成配置。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/g9sZ7PfpSkuYWB9UOp49lw/zh-cn_image_0000002532750421.png?HW-CC-KV=V1&HW-CC-Date=20260330T065636Z&HW-CC-Expire=86400&HW-CC-Sign=1EAA277CDBD6ED9EF6A39B1332E62F38A6CA19BF0710AFA286ED157E9A045DE7)

## 使用命令行执行Local Test

通过命令行方式执行Local Test，在工程根目录下执行命令：

```
hvigorw test -p module={moduleName} -p coverage={true | false} -p scope={suiteName}#{methodName}
```

* module：执行测试的模块。缺省默认是执行所有模块的用例。
* coverage：是否生成覆盖率报告，缺省默认是true，在<module-path>/.test/default/outputs/test/reports路径下生成两份报告，一份是html格式（index.html），一份是json格式（coverageReport.json），具体参考[查看覆盖率报告](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-ui-test#section10394362109)。
* scope：格式为{suiteName}#{methodName}或{suiteName}，分别表示测试用例级别或测试套件级别的测试，缺省默认是执行当前模块的所有用例。

说明

* 多个module和scope之间用英文逗号隔开。
* 暂不支持在Linux上执行该命令。

测试结果文件：<module-path>/.test/default/intermediates/test/coverage\_data/test\_result.txt