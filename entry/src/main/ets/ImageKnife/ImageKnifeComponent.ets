import common from '@ohos.app.ability.common';
import { emitter } from '@kit.BasicServicesKit';
import { taskpool } from '@kit.ArkTS';
import {
  IEngineKey,
  ImageKnife,
  ImageKnifeData,
  ImageKnifeOption,
  ImageKnifeRequest,
  ImageKnifeRequestSource,
  LogUtil
} from '@ohos/imageknife';
import { DefaultEngineKey } from '@ohos/imageknife/src/main/ets/key/DefaultEngineKey';

enum ImageKnifeRequestState {
  PROGRESS,
  COMPLETE,
  ERROR,
  DESTROY
}

@Component
export struct ImageKnifeComponent {
  @Watch('watchImageKnifeOption') @ObjectLink imageKnifeOption: ImageKnifeOption;
  @State pixelMap: PixelMap | string | Resource | ImageContent | undefined = ImageContent.EMPTY
  @State syncLoad: boolean = false
  // @State adaptiveWidth: Length = '100%'
  @State adaptiveHeight: Length | undefined = '100%'
  @State objectFit: ImageFit = ImageFit.Contain
  @Watch('watchImageKnifeOption') @State currentHeight: number = 0
  private componentId: number = 0
  private request: ImageKnifeRequest | undefined
  private lastWidth: number = 0
  private lastHeight: number = 0
  private currentWidth: number = 0
  private isImageFitAutoResize: boolean = false
  private componentVersion: number = 0
  private currentContext: common.UIAbilityContext | undefined = undefined

  aboutToAppear(): void {
    this.objectFit =
      this.imageKnifeOption.placeholderObjectFit ?? (this.imageKnifeOption.objectFit ?? ImageFit.Contain)
    this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : this.adaptiveHeight
    this.componentId = this.getUniqueId()
    if (this.syncLoad) { //针对部分消息列表最新消息的图片闪动问题，建议使用同步方式在aboutToAppear时加载图片
      let engineKey: IEngineKey = new DefaultEngineKey();
      let memoryCacheSrc: ImageKnifeData | undefined = ImageKnife.getInstance()
        .loadFromMemoryCache(engineKey.generateMemoryKey(this.imageKnifeOption.loadSrc, ImageKnifeRequestSource.SRC,
          this.imageKnifeOption))
      if (memoryCacheSrc !== undefined) {
        LogUtil.log('aboutToAppear success load loadSrc from memory cache for loadSrc = ' +
        this.imageKnifeOption.loadSrc)
        this.pixelMap = memoryCacheSrc.source;
      } else {
        LogUtil.log('aboutToAppear fail load loadSrc from memory cache for loadSrc = ' + this.imageKnifeOption.loadSrc)
        if (this.imageKnifeOption.placeholderSrc !== undefined) {
          let memoryCachePlace: ImageKnifeData | undefined = ImageKnife.getInstance()
            .loadFromMemoryCache(engineKey.generateMemoryKey(this.imageKnifeOption.placeholderSrc!,
              ImageKnifeRequestSource.PLACE_HOLDER, this.imageKnifeOption))
          if (memoryCachePlace !== undefined) {
            LogUtil.log('aboutToAppear success load placeholderSrc from memory cache for placeholderSrc = ' +
            this.imageKnifeOption.placeholderSrc)
            this.pixelMap = memoryCachePlace.source;
          } else {
            LogUtil.log('aboutToAppear fail load placeholderSrc from memory cache for placeholderSrc = ' +
            this.imageKnifeOption.placeholderSrc)
          }
        }
      }
    }
  }

  aboutToDisappear(): void {
    this.emitterDestroy()
    this.clearLastRequest()
  }

  aboutToRecycle() {
    this.pixelMap = ImageContent.EMPTY
    this.emitterDestroy()
    this.clearLastRequest()
  }

  emitterDestroy() {
    if (typeof this.request?.imageKnifeOption.loadSrc === 'string' && !this.request?.drawMainSuccess) {
      emitter.emit(this.request.imageKnifeOption.loadSrc + this.componentId)
    }
  }

  build() {
    Image(this.pixelMap)
      .colorFilter(this.imageKnifeOption.drawingColorFilter)
      .objectFit(this.objectFit)// .width(this.adaptiveWidth)
      .height(this.adaptiveHeight)
      .border(this.imageKnifeOption.border)
      .syncLoad(this.syncLoad)
      .draggable(false)
      .onComplete(this.imageKnifeOption.onComplete)
      .onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
        this.currentWidth = newValue.width as number
        this.currentHeight = newValue.height as number
        this.lastWidth = oldValue.width as number
        this.lastHeight = oldValue.height as number
        if (this.currentWidth <= 0 || (this.objectFit !== ImageFit.Auto && this.currentHeight <= 0)) {
          // 存在宽或者高为0,此次重回无意义,无需进行request请求
        } else {
          // 前提：宽高值均有效,值>0. 条件1：当前宽高与上一次宽高不同  条件2:当前是第一次绘制
          if (this.currentHeight != this.lastHeight || this.currentWidth != this.lastWidth) {
            LogUtil.log('onSizeChange execute request:width=' + this.currentWidth + ' height= ' + this.currentHeight +
              ' loadSrc = ' + this.imageKnifeOption.loadSrc +
              ' placeholderSrc = ' + this.imageKnifeOption.placeholderSrc +
              ' errorholderSrc = ' + this.imageKnifeOption.errorholderSrc +
              ' componentId = ' + this.componentId)

            if (this.objectFit === ImageFit.Auto && this.isImageFitAutoResize) {
              this.isImageFitAutoResize = false
            } else {
              ImageKnife.getInstance().execute(this.getRequest(
                this.currentWidth, this.currentHeight, this.componentId))
            }
          }
        }
      })
  }

  watchImageKnifeOption() {
    this.clearLastRequest()
    this.componentVersion++
    this.isImageFitAutoResize = false
    this.objectFit = this.imageKnifeOption.objectFit === undefined ? ImageFit.Contain : this.imageKnifeOption.objectFit
    LogUtil.log('watchImageKnifeOption execute request:width=' + this.currentWidth + ' height= ' + this.currentHeight +
      ' loadSrc = ' + this.imageKnifeOption.loadSrc +
      ' placeholderSrc = ' + this.imageKnifeOption.placeholderSrc +
      ' errorholderSrc = ' + this.imageKnifeOption.errorholderSrc +
      ' componentId = ' + this.componentId)
    if (this.currentHeight > 0) {
      ImageKnife.getInstance().execute(this.getRequest(
        this.currentWidth, this.currentHeight, this.componentId))
    }
  }

  getCurrentContext(): common.UIAbilityContext {
    if (this.currentContext == undefined) {
      this.currentContext = getContext(this) as common.UIAbilityContext
    }
    return this.currentContext
  }

  getRequest(width: number, height: number, componentId: number): ImageKnifeRequest {
    this.request = new ImageKnifeRequest(
      this.imageKnifeOption,
      this.imageKnifeOption.context !== undefined ? this.imageKnifeOption.context : this.getCurrentContext(),
      width,
      height,
      this.componentVersion,
      {
        showPixelMap: (version: number, pixelMap: PixelMap | string | Resource, requestSource: ImageKnifeRequestSource,
          size?: Size) => {
          if (version !== this.componentVersion) {
            return //针对reuse场景，不显示历史图片
          }
          this.pixelMap = pixelMap
          LogUtil.info('image load showPixelMap:' + this.request?.componentId + ',srcType:' + requestSource +
            ',version:' + this.request?.componentVersion +
            ',size:' + JSON.stringify(size))
          if ((this.imageKnifeOption.objectFit === ImageFit.Auto ||
            this.imageKnifeOption.placeholderObjectFit === ImageFit.Auto ||
            this.imageKnifeOption.errorholderObjectFit === ImageFit.Auto) && this.isImageFitAutoResize == false) {
            this.isImageFitAutoResize = true
          }

          if (requestSource == ImageKnifeRequestSource.SRC) {
            this.objectFit =
              this.imageKnifeOption.objectFit ?? ImageFit.Contain
            this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : '100%'
          } else if (requestSource == ImageKnifeRequestSource.PLACE_HOLDER) {
            this.objectFit =
              this.imageKnifeOption.placeholderObjectFit ?? (this.imageKnifeOption.objectFit ?? ImageFit.Contain)
            this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : '100%'
          } else {
            this.objectFit =
              this.imageKnifeOption.errorholderObjectFit ?? (this.imageKnifeOption.objectFit ?? ImageFit.Contain)
            this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : '100%'
          }
        }
      },
      componentId
    )
    return this.request
  }

  /**
   * 对已DESTROY的组件不再发起请求
   */
  private clearLastRequest() {
    if (this.request !== undefined) {
      this.request.requestState = ImageKnifeRequestState.DESTROY
      if (this.request.taskRequest !== undefined && !this.request.taskRequest.isDone()) {
        taskpool.cancel(this.request.taskRequest)
      }
      this.request.destroy()
      this.request = undefined
    }
  }
}

