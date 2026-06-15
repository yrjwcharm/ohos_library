import { common } from '@kit.AbilityKit';
import TodoListViewModel from '../viewmodel/TodoListViewModel';
import { TodoComponent } from '../view/TodoComponent';
import { AllChooseComponent } from '../view/AllChooseComponent';
import { TodoListComponent } from '../view/TodoListComponent';

@Entry
@Component
struct TodoList {
  @State todoListViewModel: TodoListViewModel = new TodoListViewModel();
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;

  async aboutToAppear() {
    await this.todoListViewModel.loadTasks(this.context);
  }

  build() {
    Column() {
      Row({ space: 40 }) {
        TodoComponent()
        AllChooseComponent({ todoListViewModel: this.todoListViewModel })
      }

      Column() {
        TodoListComponent({ thingViewModelArray: this.todoListViewModel.things })
      }
    }
    .height('100%')
    .width('100%')
    .margin({ top: 5, bottom: 5 })
    .backgroundColor('#90f1f3f5')
  }
}
