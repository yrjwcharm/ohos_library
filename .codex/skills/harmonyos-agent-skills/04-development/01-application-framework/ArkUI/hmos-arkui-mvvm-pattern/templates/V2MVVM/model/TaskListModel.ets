import { common } from '@kit.AbilityKit';
import { util } from '@kit.ArkTS';
import TaskModel from './TaskModel';
import { hilog } from '@kit.PerformanceAnalysisKit';

const DOMAIN = 0x0000;

export default class TaskListModel {
  public tasks: TaskModel[] = [];

  constructor(tasks: TaskModel[]) {
    this.tasks = tasks;
  }

  async loadTasks(context: common.UIAbilityContext) {
    try {
      let getJson = await context.resourceManager.getRawFileContent('defaultTasks.json');
      let textDecoderOptions: util.TextDecoderOptions = { ignoreBOM: true };
      let textDecoder = util.TextDecoder.create('utf-8', textDecoderOptions);
      let result = textDecoder.decodeToString(getJson);
      this.tasks = JSON.parse(result).map((task: TaskModel) => {
        let newTask = new TaskModel();
        newTask.taskName = task.taskName;
        newTask.isFinish = task.isFinish;
        return newTask;
      });
    } catch (e) {
      hilog.error(DOMAIN, 'TaskListModel', 'Failed to getRawFileContent', JSON.stringify(e) ?? '');
    }
  }
}
