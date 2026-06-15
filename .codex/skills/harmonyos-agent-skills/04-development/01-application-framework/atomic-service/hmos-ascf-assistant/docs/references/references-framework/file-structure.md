# 文件结构


## 工程文件结构

- AppScope/app.json5：元服务的全局配置信息。

- entry：HarmonyOS工程模块，最终编译成元服务HAP文件。

- entry/src/main/resources/rawfile/：ascf主包编译后的资源会在此目录生成，**请勿占用。** 

- ascf/ascf_src：ascf框架源码目录。

- ascf/ascf_src/ext.json：元服务三方平台配置文件，支持配置ext属性，通过[has.getExtConfig](../references-apis/apis-third-party-platform.md#hasgetextconfig)或[has.getExtConfigSync](../references-apis/apis-third-party-platform.md#hasgetextconfigsync)获取配置信息。

- ascf/ascf_build：ascf源码编译过程目录，会生成元服务的子包和编译文件，**请勿占用。** 

- 其他文件参照元服务工程信息。


## ASCF框架代码结构

ASCF框架代码存储在ascf/ascf_src目录，文件结构分为app和page两层。

```txt
|— app.json
|— app.js
|— app.css
|— components
|  |— cart.json
|  |— cart.hxml
|  |— cart.js
|  |— cart.css
|— pages
|  |— user.json
|  |— user.hxml
|  |— user.js
|  |— user.css
```

- app层用于描述整个应用的配置信息，由三个文件组成，文件必须放在工程的根目录下。  
  | 文件 | 是否必须 | 作用 |
  | -------- | -------- | -------- |
  | app.js | 是 | 定义应用逻辑。 |
  | app.json | 是 | 应用全局配置。 |
  | app.css | 否 | 定义应用全局样式。 |

- page层用于描述各个页面的配置信息，由四类文件组成，这四类文件必须放在同一个目录下。  
  | 文件 | 是否必须 | 作用 |
  | -------- | -------- | -------- |
  | .hxml | 是 | 定义页面结构。 |
  | .js | 是 | 实现页面逻辑。 |
  | .json | 是 | 页面配置。 |
  | .css | 否 | 定义页面样式。 |

- hxml文件类似于HTML，可以通过ASCF框架提供的组件来编写，编写规则基本与HTML规则类似。


## 文件组织


### 文件存储

在元服务内，是按分区来存储文件的，目前支持以下分区：

- Cache：一般用于存储缓存文件，比如通过fetch接口下载的文件会存储在该分区中，该分区中的文件可能因存储空间不够被系统删除。

- Files：一般用于存储比较小的永久文件，该分区中的文件由应用自己管理。

- Temp：表示从外部映射过来的临时文件，出于安全性考虑，临时文件是只读的，并且只能通过调用特定的API获取，比如media.pickVideo方法。另外临时文件的访问是临时的，应用重启后无法访问到临时文件，需要通过特定API重新获取。另外应用资源也作为一个特殊的只读分区进行处理。


### URI

URI用于标识应用资源和文件，组件和接口通过URI来访问应用资源和文件。

| 资源类型 | URI | 是否只读 | 示例 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| 应用资源 | /path | 是 | /Common/header.png | 实际指向的是安装包的RawFile文件路径。 |
| Cache | internal://cache/path/ | 否 | internal://cache/fetch-123456.png | 元服务沙箱内容目录，用户无法访问。 |
| Files | internal://files/path | 否 | internal://files/image/demo.png | 元服务沙箱内容目录，用户无法访问。 |
| Temp | internal://tmp/path | 是 | internal://tmp/xxxxx/demo.png（文件名称） | 由系统动态生成。 |

URI允许的字符可以使用正则表达式 [^\\\s\"'|\*?&lt;&gt;\\\\\\\\]+ 匹配筛选；URI中不能出现".."；URI支持目录结构，目录需要使用斜杠"/"分隔。internal URI表示的是应用私有文件，即在指定internal URI时，无需指定应用标识，同一个internal URI对于不同的应用会指向不同的文件。


### 资源和文件访问规则

应用资源路径分为绝对路径和相对路径，以"/"开头的路径表示绝对路径，比如 /Common/a.png，不以"/"开头的路径是相对路径，比如 a.png 和 ./Common/a.png 等。

应用资源文件分为代码文件和资源文件，代码文件是指 .js，.css，.hxml 等包含代码的文件，其他文件则是资源文件，这类文件一般只当作数据来使用，比如图片、视频等。

1. 在代码文件中，导入其他代码文件时，使用相对路径，比如：./Common/component.hxml。

2. 在代码文件中，引用资源文件（如：图片、视频等）时，一般情况下使用相对路径，比如： ./abc.png。

3. 当代码文件需要被导入时，如果导入文件与被导入文件在同一个目录，被导入文件引用资源文件时可以使用相对路径，但如果不在同一目录，必须使用绝对路径，因为被导入文件编译时会被复制到导入文件中，编译后目录会发生变化。
