@ComponentV2
export default struct TitleView {
  @Param tasksUnfinished: number = 0;

  build() {
    Column() {
      Text('To do')
        .fontSize(40)
        .margin(10)
      Text(`Not Completed: ${this.tasksUnfinished}`)
        .margin({ left: 10, bottom: 10 })
    }
  }
}
