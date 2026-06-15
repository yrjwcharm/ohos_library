import { common } from '@kit.AbilityKit';
import { util } from '@kit.ArkTS';
import { hilog } from '@kit.PerformanceAnalysisKit';
import ThingModel from './ThingModel';

const DOMAIN = 0x0001;
const TAG = 'TodoListModel';

export default class TodoListModel {
  public things: Array<ThingModel> = [];

  constructor(things: Array<ThingModel>) {
    this.things = things;
  }

  async loadTasks(context: common.UIAbilityContext) {
    try {
      let getJson = await context.resourceManager.getRawFileContent('default_tasks.json');
      let textDecoderOptions: util.TextDecoderOptions = { ignoreBOM: true };
      let textDecoder = util.TextDecoder.create('utf-8', textDecoderOptions);
      let result = textDecoder.decodeToString(getJson, { stream: false });
      this.things = JSON.parse(result);
    } catch (error) {
      hilog.error(DOMAIN, TAG, 'Failed to load tasks. Cause: %{public}s', JSON.stringify(error.message));
    }
  }
}
