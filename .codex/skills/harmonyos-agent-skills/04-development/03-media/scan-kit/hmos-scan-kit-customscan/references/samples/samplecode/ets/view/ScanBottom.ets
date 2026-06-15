/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ScanLayout } from '../viewModel/ScanLayout';
import { LengthMetrics } from '@kit.ArkUI';
import { BreakpointType } from '../model/BreakpointType';
import { ScanService } from '../viewModel/ScanService';
import { CommonConstants } from '../constants/CommonConstants';
import { BreakpointConstants } from '../constants/BreakpointConstants';
import Logger from '../utils/Logger';

const TAG: string = 'ScanBottom';
const breakpointType: BreakpointType<Resource> =
  new BreakpointType($r('app.float.container_horizontal_padding_sm'), $r('app.float.container_horizontal_padding_md'),
    $r('app.float.container_horizontal_padding_lg'));

@Extend(Column)
function componentColumnContainer(currentBreakpoint: string) {
  .width('100%')
  .height('100%')
  .alignItems(HorizontalAlign.Center)
  .justifyContent(FlexAlign.End)
  .padding({
    left: breakpointType.getValue(currentBreakpoint),
    right: breakpointType.getValue(currentBreakpoint),
    bottom: 120
  })
}

@Extend(Row)
function componentRowContainer(currentBreakpoint: string) {
  .width('100%')
  .height('100%')
  .justifyContent(FlexAlign.End)
  .alignItems(VerticalAlign.Center)
  .padding({
    left: breakpointType.getValue(currentBreakpoint),
    right: 120
  })
}

@Extend(SymbolGlyph)
function lightIcon() {
  .fontColor([$r('sys.color.font_on_primary')])
  .fontWeight(FontWeight.Regular)
  .fontSize('24vp')
}

@Extend(Text)
function lightText() {
  .fontColor($r('sys.color.icon_on_primary'))
  .textAlign(TextAlign.Center)
  .fontFamily('HarmonyHeiTi')
  .height(16)
  .lineHeight(16)
}

@Extend(Column)
function iconContainerMaskLayer() {
  .width(48)
  .height(48)
  .borderRadius(48)
  .clip(true)
}

@Extend(Column)
function iconContainer() {
  .width(48)
  .height(48)
  .borderRadius(48)
  .clip(true)
  .alignItems(HorizontalAlign.Center)
  .justifyContent(FlexAlign.Center)
  .backgroundColor($r('sys.color.ohos_id_color_button_normal_transparent'))
}

@Extend(SymbolGlyph)
function icon() {
  .fontColor([$r('sys.color.font_on_primary')])
  .fontWeight(FontWeight.Regular)
  .fontSize('24vp')
}

@Extend(Text)
function iconText() {
  .fontColor($r('sys.color.font_on_primary'))
  .textAlign(TextAlign.Center)
  .fontFamily('HarmonyHeiTi')
  .maxLines(2)
  .textOverflow({ overflow: TextOverflow.Ellipsis })
}

const BREAKPOINT_SM: string = BreakpointConstants.BREAKPOINT_SM;
const BREAKPOINT_MD: string = BreakpointConstants.BREAKPOINT_MD;
const BREAKPOINT_LG: string = BreakpointConstants.BREAKPOINT_LG;
const BREAKPOINT_XL: string = BreakpointConstants.BREAKPOINT_XL;

@ComponentV2
export struct FlashLight {
  @Local scanService: ScanService = ScanService.getInstance();
  @Require @Param isLargeScreen: boolean

  build() {
    Column() {
      SymbolGlyph(this.scanService.isFlashlight ? $r('sys.symbol.flashlight_on') : $r('sys.symbol.flashlight_off'))
        .lightIcon()
        .margin({ bottom: 6 })
        .stateStyles({
          pressed: {
            .opacity(0.4)
          },
          normal: {
            .opacity(1)
          }
        })
      Text(this.scanService.isFlashlight ? $r('app.string.Scan_light_to_off') : $r('app.string.Scan_light_to_on'))
        .lightText()
        .fontSize($r('sys.float.Body_S'))
        .maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_SYMBOL_TEXT)
    }
    .height(CommonConstants.FLASH_HEIGHT)
    .padding({
      top: 3,
      bottom: 3
    })
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.scanService.changeFlashlight();
    })
  }
}

@ComponentV2
export struct ScanBottom {
  @Local scanService: ScanService = ScanService.getInstance();
  @Local scanLayout: ScanLayout = ScanLayout.getInstance();

  aboutToAppear(): void {
    Logger.info(TAG, 'aboutToAppear');
  }

  @Builder
  SMBuilder() {
    Column() {
      // Flash light.
      FlashLight({
        isLargeScreen: false
      })
        .visibility((this.scanService.isFlashlight || this.scanService.isSensorLight)
          && this.scanLayout.isFlashShow ? Visibility.Visible : Visibility.Hidden)
    }
    .componentColumnContainer(this.scanLayout.widthBreakpoint)
  }

  @Builder
  NotSMBuilder() {
    Row() {
      FlashLight({
        isLargeScreen: true
      })
        .visibility((this.scanService.isFlashlight || this.scanService.isSensorLight)
          && this.scanLayout.isFlashShow ? Visibility.Visible : Visibility.Hidden)
    }
    .componentRowContainer(this.scanLayout.widthBreakpoint)
  }

  build() {
    if (this.scanLayout.widthBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
      this.SMBuilder()
    } else {
      this.NotSMBuilder()
    }
  }
}
