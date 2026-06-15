# 预加载


开发者可以通过配置预加载，由系统自动下载和安装可能需要的分包模块，从而提升进入后续模块的速度。


对于配置了预加载的分包模块，当点击进入该模块并完成页面加载后，将触发关联模块的预加载。


注意


preloads列表配置的moduleName对应的ModuleType（模块类型）不能为entry。


预加载在相应分包模块module.json5配置文件中“atomicService”标签下的preloads字段配置。以entry模块的module.json5为例：


```json
{  
  "module": {
    "name": "entry",
    "type": "entry",
    "installationFree": true,
    "pages": "$profile:main_pages",
    "atomicService": {
      "preloads": [
        {
          "moduleName": "library"
        }
      ]
    },
    ...
  }
}
```


在entry模块的页面加载结束后，系统会自动执行预加载，去下载和安装模块名为library的模块。
