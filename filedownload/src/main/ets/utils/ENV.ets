import { bundleManager } from "@kit.AbilityKit";

export  class ENV {
   static __DEV__ :boolean= bundleManager.getBundleInfoForSelfSync(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION).appInfo.debug;
}