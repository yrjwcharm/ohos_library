import TodoListViewModel from '../viewmodel/TodoListViewModel';

@Component
export struct AllChooseComponent {
  @Link todoListViewModel: TodoListViewModel;

  build() {
    Row() {
      Button('全选', { type: ButtonType.Capsule })
        .onClick(() => {
          this.todoListViewModel.chooseAll();
        })
        .fontSize(30)
        .fontWeight(FontWeight.Bold)
        .backgroundColor('#f7f6cc74')
    }
    .padding({ left: this.todoListViewModel.isChosen ? 15 : 0 })
    .width('100%')
    .margin({ top: 10, bottom: 10 })
  }
}
