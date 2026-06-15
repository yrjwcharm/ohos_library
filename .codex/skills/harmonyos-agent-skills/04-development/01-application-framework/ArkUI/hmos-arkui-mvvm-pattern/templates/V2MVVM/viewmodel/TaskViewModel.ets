import TaskModel from '../model/TaskModel';

@ObservedV2
export default class TaskViewModel {
  @Trace public taskName: string = 'Todo';
  @Trace public isFinish: boolean = false;

  updateTask(task: TaskModel) {
    this.taskName = task.taskName;
    this.isFinish = task.isFinish;
  }

  updateIsFinish(): void {
    this.isFinish = !this.isFinish;
  }
}
