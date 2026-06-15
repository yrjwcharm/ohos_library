import ThingViewModel from './ThingViewModel';
import { common } from '@kit.AbilityKit';
import TodoListModel from '../model/TodoListModel';

@Observed
export class ThingViewModelArray extends Array<ThingViewModel> {
}

@Observed
export default class TodoListViewModel {
  @Track public isChosen: boolean = true;
  @Track public things: ThingViewModelArray = new ThingViewModelArray();

  async loadTasks(context: common.UIAbilityContext) {
    let todoList = new TodoListModel([]);
    await todoList.loadTasks(context);
    for (let thing of todoList.things) {
      let thingViewModel = new ThingViewModel();
      thingViewModel.updateTask(thing);
      this.things.push(thingViewModel);
    }
  }

  chooseAll(): void {
    for (let thing of this.things) {
      thing.isFinish = this.isChosen;
    }
    this.isChosen = !this.isChosen;
  }
}
