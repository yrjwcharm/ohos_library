# 自定义tabBar


自定义tabBar可以让开发者更灵活地设置tabBar样式，以满足更多个性化的场景。


在自定义tabBar模式下：


- 开发者需要提供一个自定义组件进行自定义tabBar的渲染和交互。

- 与tabBar样式相关的接口，在自定义tabBar开启后，[has.hideTabBar](../references/references-apis/apis-tab-bar.md#hashidetabbar) 、[has.showTabBar](../references/references-apis/apis-tab-bar.md#hasshowtabbar)仍可使用，用于使能自定义tabBar；其他接口将失效，如[has.setTabBarBadge](../references/references-apis/apis-tab-bar.md#hassettabbarbadge)等。

- 每个页面的自定义tabBar组件实例是不同的，可通过[getTabBar](../references/references-framework/logical-layer-page.md#gettabbar)接口获取当前页面自定义tabBar组件实例。


## 使用流程

1. 配置信息。  

   在app.json现有tabBar配置基础上新增[custom](../references/references-framework/appjson-global-config.md)字段。

   app.json示例：

   ```json
   {
     "pages": [
       "page/index1/index",
       "page/index2/index"
     ],
     "tabBar": {
       "custom": true,
       "list": [
         {
           "pagePath": "page/index1/index",
           "text": "custom_tab1"
         },
         {
           "pagePath": "page/index2/index",
           "text": "custom_tab2"
         }
       ]
     }
   }
   ```

2. 添加自定义tabBar文件。 
 
   在代码根目录下添加tabBar入口文件，且自定义tabBar文件夹需命名为custom-tab-bar。

   目录结构示例：

   ```js
   ├── custom-tab-bar
   │   ├── index.css
   │   ├── index.hxml
   │   ├── index.js
   │   └── index.json
   ├── components
   │   └── ...
   ├── pages
   │   └── ...
   ├── app.css
   ├── app.js
   ├── app.json
   ├── ascf.config.json
   └── ...
   ```

3. 编写tabBar代码。  

   使用自定义组件的方式编写自定义tabBar代码，该自定义组件完全接管tabBar的渲染。另外，新增[getTabBar](../references/references-framework/logical-layer-page.md#gettabbar)接口，可获取当前页面下的自定义tabBar组件实例。

   示例：

   custom-tab-bar/index.hxml

   ```html
   <view class="tab-bar">
     <view
       has:for="{{list}}"
       has:key="index"
       class="tab-item {{selected === index ? 'selected-tab' : ''}}"
       bindtap="switchTab"
       data-path="{{item.pagePath}}">
       <view>{{ item.text }}</view>
     </view>
   </view>
   ```

   custom-tab-bar/index.js：

   ```js
   Component({
     data: {
       selected: 0,  // 当前选中索引
       list: [
         {
           "pagePath": '/page/index1/index',
           "text": 'custom_tab1'
         },
         {
           "pagePath": '/page/index2/index',
           "text": 'custom_tab2'
         }
       ]
     },
     methods: {
       switchTab(e) {
         const path = e.currentTarget.dataset.path;
         has.switchTab({
           url: path
         });
       }
     }
   });
   ```

   custom-tab-bar/index.css：

   ```css
   .tab-bar {
     position: fixed;
     bottom: 0;
     width: 100%;
     height: 150rpx;
     display: flex;
     background: #FFFFFF;
     box-shadow: 0 -2rpx 6rpx rgba(0, 0, 0, 0.06);
   }
   .tab-item {
     flex: 1;
     text-align: center;
     padding: 10rpx 0;
   }
   .selected-tab {
     color: #FF4500;
   }
   ```

   pages/index2/index.js：

   页面切换时，开发者需要手动更新相应的自定义tabBar的状态。例如切换自定义tabBar时，改变选中态和文本颜色。

   ```js
   Page({
     onShow() {
       if (typeof this.getTabBar === 'function' && this.getTabBar()) {
         this.getTabBar().setData({ selected: 1 });
       }
     }
   });
   ```
