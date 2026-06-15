import ThingModel from '../model/ThingModel';

@Observed
export default class ThingViewModel {
  @Track public thingName: string = 'Todo';
  @Track public isFinish: boolean = false;
  public context: Context = AppStorage.get('context')!;

  updateTask(thing: ThingModel) {
    this.thingName = thing.thingName;
    this.isFinish = thing.isFinish;
  }

  updateIsFinish(): void {
    this.isFinish = !this.isFinish;
  }

  addSuffixes(): void {
    this.thingName += 'la';
  }
}
