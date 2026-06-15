import { AppStorageV2 } from '@kit.ArkUI'

@ObservedV2
export class LoginState {
  @Trace isLoggedIn: boolean = false
  @Trace userName: string = ''
}

@ObservedV2
export class SafeAreaState {
  @Trace topAvoidHeight: number = 0
  @Trace bottomAvoidHeight: number = 0
}
