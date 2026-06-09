export interface TypewriterTextOptions {
  text: string
  delay?: number
  onTypingComplete?: () => void
  onLineChange?: (lineCount: number) => void
}

export class TypewriterTextController {
  private pendingOptions?: TypewriterTextOptions
  private startHandler?: (options: TypewriterTextOptions) => void
  private stopHandler?: () => void
  private finishHandler?: () => void

  setTextWithTypewriterEffect(text: string, delay: number = 50, onTypingComplete?: () => void,
    onLineChange?: (lineCount: number) => void): void {
    const options: TypewriterTextOptions = {
      text,
      delay,
      onTypingComplete,
      onLineChange
    }
    this.pendingOptions = options
    this.startHandler?.(options)
  }

  stop(): void {
    this.stopHandler?.()
  }

  finishImmediately(): void {
    this.finishHandler?.()
  }

  hasPendingOptions(): boolean {
    return this.pendingOptions !== undefined
  }

  bind(startHandler: (options: TypewriterTextOptions) => void, stopHandler: () => void,
    finishHandler: () => void): void {
    this.startHandler = startHandler
    this.stopHandler = stopHandler
    this.finishHandler = finishHandler
    if (this.pendingOptions) {
      this.startHandler(this.pendingOptions)
    }
  }

  unbind(): void {
    this.startHandler = undefined
    this.stopHandler = undefined
    this.finishHandler = undefined
  }
}

const DEFAULT_DELAY_MS: number = 50

@ComponentV2
export struct TypewriterTextView {
  @Param text: string = ''
  @Param delay: number = DEFAULT_DELAY_MS
  @Param autoStart: boolean = true
  @Param controller?: TypewriterTextController = undefined
  @Param fontSize: number = 16
  @Param fontColor: ResourceColor = '#4F5157'
  @Param fontWeight: number | FontWeight | string = FontWeight.Regular
  @Param fontFamily: ResourceStr = ''
  @Param lineHeight: number = 24
  @Param textAlign: TextAlign = TextAlign.Start
  @Param maxLines: number = 0
  @Param textOverflow: TextOverflow = TextOverflow.Clip
  @Param copyOption: CopyOptions = CopyOptions.None
  @Event onTypingComplete: () => void = () => {}
  @Event onLineChange: (lineCount: number) => void = () => {}

  @Local private displayText: string = ''

  private fullText: string = ''
  private characters: string[] = []
  private index: number = 0
  private timerId: number = -1
  private currentDelay: number = DEFAULT_DELAY_MS
  private prevLineCount: number = 0
  private typingCompleteCallback?: () => void
  private lineChangeCallback?: (lineCount: number) => void

  aboutToAppear(): void {
    this.controller?.bind((options: TypewriterTextOptions) => {
      this.setTextWithTypewriterEffect(options.text, options.delay ?? DEFAULT_DELAY_MS,
        options.onTypingComplete, options.onLineChange)
    }, () => {
      this.stopTypewriter()
    }, () => {
      this.finishImmediately()
    })

    if (this.autoStart && !this.controller?.hasPendingOptions()) {
      this.setTextWithTypewriterEffect(this.text, this.delay, this.onTypingComplete, this.onLineChange)
    }
  }

  aboutToDisappear(): void {
    this.stopTypewriter()
    this.controller?.unbind()
  }

  @Monitor('text', 'delay')
  onTextChange(): void {
    if (this.autoStart) {
      this.setTextWithTypewriterEffect(this.text, this.delay, this.onTypingComplete, this.onLineChange)
    }
  }

  setTextWithTypewriterEffect(text: string, delay: number = DEFAULT_DELAY_MS, onTypingComplete?: () => void,
    onLineChange?: (lineCount: number) => void): void {
    this.stopTypewriter()
    this.fullText = text ?? ''
    this.characters = Array.from(this.fullText)
    this.currentDelay = Math.max(0, delay)
    this.index = 0
    this.prevLineCount = 0
    this.displayText = ''
    this.typingCompleteCallback = onTypingComplete ?? this.onTypingComplete
    this.lineChangeCallback = onLineChange ?? this.onLineChange
    this.scheduleNextCharacter(0)
  }

  private scheduleNextCharacter(delay: number): void {
    this.timerId = setTimeout(() => {
      this.addCharacter()
    }, delay)
  }

  private addCharacter(): void {
    this.displayText = this.characters.slice(0, this.index).join('')
    this.index += 1

    if (this.index <= this.characters.length) {
      this.scheduleNextCharacter(this.currentDelay)
      return
    }

    this.timerId = -1
    this.typingCompleteCallback?.()
  }

  private stopTypewriter(): void {
    if (this.timerId !== -1) {
      clearTimeout(this.timerId)
      this.timerId = -1
    }
  }

  private finishImmediately(): void {
    this.stopTypewriter()
    this.displayText = this.fullText
    this.index = this.characters.length + 1
    this.typingCompleteCallback?.()
  }

  private notifyLineChange(height: number): void {
    const safeLineHeight = this.lineHeight > 0 ? this.lineHeight : this.fontSize
    if (safeLineHeight <= 0 || height <= 0) {
      return
    }
    const lineCount = Math.max(1, Math.round(height / safeLineHeight))
    if (lineCount === this.prevLineCount) {
      return
    }
    this.prevLineCount = lineCount
    this.lineChangeCallback?.(lineCount)
  }

  build() {
    if (this.maxLines > 0) {
      Text(this.displayText)
        .fontSize(this.fontSize)
        .fontColor(this.fontColor)
        .fontWeight(this.fontWeight)
        .fontFamily(this.fontFamily)
        .lineHeight(this.lineHeight)
        .textAlign(this.textAlign)
        .maxLines(this.maxLines)
        .textOverflow({ overflow: this.textOverflow })
        .copyOption(this.copyOption)
        .onAreaChange((_: Area, newValue: Area) => {
          this.notifyLineChange(newValue.height as number)
        })
    } else {
      Text(this.displayText)
        .fontSize(this.fontSize)
        .fontColor(this.fontColor)
        .fontWeight(this.fontWeight)
        .fontFamily(this.fontFamily)
        .lineHeight(this.lineHeight)
        .textAlign(this.textAlign)
        .copyOption(this.copyOption)
        .onAreaChange((_: Area, newValue: Area) => {
          this.notifyLineChange(newValue.height as number)
        })
    }
  }
}
