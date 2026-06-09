import { JSONUtil } from '@ohos_lib/json5';
import { JSON } from '@kit.ArkTS';

@Entry
@ComponentV2
export struct Index {
  aboutToAppear(): void {
    let jsonStr ="{\"courseId\": 342607746727688192}"
    JSONUtil.parse(jsonStr)
  }

  build() {

  }
}