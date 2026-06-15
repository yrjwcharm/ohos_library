## 21. 内置保留字

为避免出现开发者在自定义组件中定义的方法跟自定义组件框架的方法重名，导致运行时异常，开发者可参考如下表格，凡是在表格中被列出来的，开发者需要将其定义成不同的名字，以防止运行时功能异常。

| isRenderInProgress                        | isInitialRenderDone                        | runReuse_                              | paramsGenerator_                          |
| ----------------------------------------- | ------------------------------------------ | -------------------------------------- | ----------------------------------------- |
| watchedProps                              | recycleManager_                            | hasBeenRecycled_                       | preventRecursiveRecycle_                  |
| delayRecycleNodeRerender                  | delayRecycleNodeRerenderDeep               | defaultConsume_                        | reconnectConsume_                         |
| providedVars_                             | dirtyElementIdsNeedsUpdateSynchronously_   | localStoragebackStore_                 | ownObservedPropertiesStore__              |
| get ownObservedPropertiesStore_           | obtainOwnObservedProperties                | get localStorage_                      | set localStorage_                         |
| get isViewV2()                            | aboutToBeDeleted                           | aboutToBeDeletedInternal               | purgeDeleteElmtId                         |
| purgeVariableDependenciesOnElmtIdOwnFunc  | debugInfoStateVars                         | initAllowComponentFreeze               | setActiveInternal                         |
| onActiveInternal                          | onInactiveInternal                         | purgeVariableDependenciesOnElmtId      | initialRender                             |
| rerender                                  | updateRecycleElmtId                        | updateStateVars                        | initialRenderView                         |
| UpdateElement                             | delayCompleteRerender                      | flushDelayCompleteRerender             | forceRerenderNode                         |
| collectElementsNeedToUpdateSynchronously  | viewPropertyHasChanged                     | uiNodeNeedUpdateV2                     | performDelayedUpdate                      |
| declareWatch                              | addProvidedVar                             | findProvidePU__                        | initializeConsume                         |
| reconnectToConsume                        | disconnectedConsume                        | markElemenDirtyById                    | updateDirtyElements                       |
| observeComponentCreation                  | observeComponentCreation2                  | getOrCreateRecycleManager              | getRecycleManager                         |
| hasRecycleManager                         | initRecycleManager                         | rebuildUpdateFunc                      | observeRecycleComponentCreation           |
| aboutToReuseInternal                      | stopRecursiveRecycle                       | aboutToRecycleInternal                 | recycleSelf                               |
| isRecycled                                | UpdateLazyForEachElements                  | createStorageLink                      | createStorageProp                         |
| createLocalStorageLink                    | createLocalStorageProp                     | debugInfoView                          | debugInfoViewInternal                     |
| debugInfoDirtyDescendantElementIds        | debugInfoDirtyDescendantElementIdsInternal | __mkRepeatAPI                          | reuseOrCreateNewComponent                 |
| dirtDescendantElementIds_                 | monitorIdsDelayedUpdate                    | monitorIdsDelayedUpdateForAddMonitor_  | computedIdsDelayedUpdate                  |
| recyclePoolV2_                            | resetStateVarsOnReuse                      | aboutToReuseInternals                  | aboutToRecycleInternal                    |
| freezeRecycledComponent                   | unfreezeReusedComponent                    | getOrCreateRecyclePool                 | getRecyclePool                            |
| hasRecyclePool                            | cleanupRecycledElmtId                      | get isViewV2                           | purgeDeleteElmtId                         |
| aboutToBeDeletedInternal                  | initialRenderView                          | resetMonitorsOnReuse                   | resetComputed                             |
| resetConsumer                             | observeComponentCreation2                  | initParam                              | updateParam                               |
| resetParam                                | uiNodeNeedUpdateV2                         | updateDirtyElements                    | UpdateElement                             |
| getViewV2ChildById                        | addDelayedMonitorIdsForAddMonitor          | addDelayedComputedIds                  | setActiveInternal                         |
| performDelayedUpdate                      | findProvidePU__                            | get localStorage_()                    | reuseOrCreateNewComponent                 |
| debugInfoDirtDescendantElementIdsInternal | debugInfoStateVars                         | __mkRepeatAPI                          | debugInfoView                             |
| debugInfoViewInternal                     | debugInfoDirtDescendantElementIds          | observeRecycleComponentCreation        | debugInfo__                               |
| recycleSelf                               | finalizeConstruction                       | hasBeenRecycled_                       | paramsGenerator_                          |
| inactiveComponents_                       | get isReusable_()                          | compareNumber                          | currentlyRenderedElmtIdStack_             |
| dirtDescendantElementIds_                 | dirtRetakenElementIds_                     | parent_                                | renderingPaused                           |
| isDeleting_                               | isCompFreezeAllowed_                       | prebuildFuncQueues                     | propertyChangedFuncQueues                 |
| extraInfo_                                | __isBlockRecycleOrReuse__                  | elmtIdsDelayedUpdate_                  | prebuildPhase_                            |
| isPrebuilding_                            | prebuildingElmtId_                         | doRecycle                              | doReuse                                   |
| nativeViewPartialUpdate                   | create                                     | createRecycle                          | markNeedUpdate                            |
| syncInstanceId                            | restoreInstanceId                          | getInstanceId                          | markStatic                                |
| finishUpdateFunc                          | setCardId                                  | getCardId                              | elmtIdExists                              |
| isLazyItemRender                          | isFirstRender                              | findChildByIdForPreview                | resetRecycleCustomNode                    |
| queryNavDestinationInfo                   | queryNavigationInfo                        | queryRouterPageInfo                    | getUIContext                              |
| sendStateInfo                             | getUniqueId                                | setIsV2                                | getDialogController                       |
| allowReusableV2Descendant                 | id__()                                     | updateId                               | scheduleDelayedUpdate                     |
| get elmtIdsDelayedUpdate                  | setParent                                  | getParent                              | removeChild                               |
| aboutToBeDeleted                          | isDeleting                                 | setDeleting                            | setDeleteStatusRecursively                |
| isCompFreezeAllowed                       | setActiveCount                             | getChildViewV2ForElmtId                | purgeVariableDependenciesOnElmtIdOwnFunc  |
| debugInfo__                               | debugInfoRegisteredElmtIds                 | debugInfoElmtIds                       | dumpStateVars                             |
| debugInfoStateVars                        | isViewActive                               | purgeVariableDependenciesOnElmtId      | initialRender                             |
| rerender                                  | get isViewV2                               | updateRecycleElmtId                    | updateStateVars                           |
| UpdateElement                             | dumpReport                                 | forceCompleteRerender                  | __ClearAllRecycle__PUV2ViewBase__Internal |
| forceRerenderNode                         | hasNodeUpdateFunc                          | pauseRendering                         | restoreRendering                          |
| forEachUpdateFunction                     | getNodeById                                | getCurrentlyRenderedElmtId             | debugInfoViewHierarchy                    |
| debugInfoUpdateFuncByElmtId               | debugInfoUpdateFuncByElmtIdInternal        | debugInfoInactiveComponents            | __mkRepeatAPI                             |
| findViewInHierarchy                       | onDumpInfo                                 | printDFXHeader                         | processOnDumpCommands                     |
| traverseChildDoRecycleOrReuse             | processPropertyChangedFuncQueue            | setPrebuildPhase                       | isNeedBuildPrebuildCmd                    |
| prebuildComponent                         | isEnablePrebuildInMultiFrame               | ifElseBranchUpdateFunctionDirtyRetaken | onDumpInspector                           |
| prebuildPhase_                            | activeCount_                               | isView_                                | childrenWeakrefMap_                       |
| builderNodeWeakrefMap_                    | updateFuncByElmtId                         | id_                                    | shareLocalStorage_                        |
| __parentViewBuildNode__                   | __enableBuilderNodeConsume__               | __elmtId2Repeat___                     | arkThemeScopeManager                      |
| ifElseBranchUpdateFunctionDirtyRetaken    | forceCompleteRerender                      | forceRerenderNode                      | purgeDeleteElmtId                         |
| findProvidePU__                           | id__()                                     | debugInfo__()                          | debugInfoElmtId                           |
| getChildById                              | addChild                                   | setParentBuilderNode__                 | addChildBuilderNode                       |
| propagateToChildrenToConnected            | removeChildBuilderNode                     | clearChildBuilderNode                  | propagateToChildrenToDisconnected         |
| purgeDeletedElmtIds                       | updateStateVarsOfChildByElmtId             | createOrGetNode                        | ifElseBranchUpdateFunction                |
| setArkThemeScopeManager                   | onWillApplyThemeInternally                 | getShareLocalStorage                   | setShareLocalStorage                      |
| propagateToChildren                       | setActiveInternal                          |                                        |                                           |

### 常见错误

| 错误写法 | 正确写法 | 说明 |
|---------|---------|------|
| 自定义组件命名 `Button`、`Text`、`Image` | 使用独特名称如 `MyButton`、`HomeText` | 与系统组件名冲突 |
| 变量命名 `rerender`、`aboutToAppear` | 加后缀如 `rerenderValue`、`aboutToAppearFlag` | 与框架保留字冲突（见上表） |

---
