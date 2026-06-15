import TaskViewModel from '../viewmodel/TaskViewModel';
import TaskListViewModel from '../viewmodel/TaskListViewModel';

@Builder
export function ActionButton(text: string | Resource, onClick: () => void) {
  Button(text, { buttonStyle: ButtonStyleMode.NORMAL })
    .onClick(onClick)
    .margin({ left: 10, right: 10, top: 5, bottom: 5 })
}

@ComponentV2
export default struct BottomView {
  @Param taskList: TaskListViewModel = new TaskListViewModel();
  @Local newTaskName: string = '';

  build() {
    Column() {
      Row() {
        ActionButton('All Completed', (): void => this.taskList.finishAll(true))
        ActionButton('All Not Completed', (): void => this.taskList.finishAll(false))
      }
      .margin({ top: 10 })

      Row() {
        TextInput({ placeholder: 'Add new tasks', text: this.newTaskName })
          .onChange((value) => this.newTaskName = value)
          .width('70%')
        ActionButton('+', (): void => {
          let newTask = new TaskViewModel();
          newTask.taskName = this.newTaskName;
          this.taskList.addTask(newTask);
          this.newTaskName = '';
        })
      }
    }
  }
}
