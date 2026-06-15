---
name: hmos-memleak-analysis
description: Analyzes HarmonyOS source code (ArkTS, JS, C/C++) to detect memory leaks.Use when (1) Performing static code analysis to catch potential leaks before deployment, (2) Reviewing PRs involving complex UI lifecycles or NAPI implementations,(3) Developing NAPI bridges between ArkTS and C++. Maps code to official specifications and applies heuristics for NAPI reference management and lifecycle synchronization.
license: MIT
metadata:
    author: superliet
    version: 1.1.0
    category: memleak
---

# HarmonyOS Memory Leak Expert

## Analysis Workflow

1. **Language Routing**: Based on file extension:
   - `.ets`, `.ts`, `.js` → use `references/HarmonyOS_App_MemoryLeak_Specifications_arkts_js_api.md`，Before applying any code inspection rules
   - `.cpp`, `.c`, `.h` → use `references/HarmonyOS_App_MemoryLeak_Specifications_c_api.md`
   - The final report must include the analysis of the results of 'scripts/filter_on.py' and the results of the code review

2. **Script**
   - you MUST execute an external Python script `scripts/filter_on.py` and `scripts/filter_risk_func.py` with param `target source code dirpath`. Crucial Note: These candidates are NOT confirmed leaks. They are merely hypotheses or "leads" that require human-like verification.

3. **Core Heuristics**:
   - **Lifecycle Sync**: Use a listener similar to ''. The on() in TS must be deregistered as "aboutToDisappear()"/"onPageHide()" after its lifecycle ends. You can use scripts/filter_on.py to investigate possible on/off code involved
   - **NAPI Boundary**: Check `napi_create_reference` balanced with `napi_delete_reference`. Watch for missing `napi_handle_scope` in loops.
   - **Closure Retention**: Async callbacks capturing `this` cause leaks if component is destroyed before callback executes.
   - **Singleton/AppStorage**: Large objects in `AppStorage` need explicit cleanup strategy.

4. **Reporting Format(md)**: 
Report MUST list all issue file and generate a structured markdown report named memory_leak_analysis_report_<timestamp>.md
   - **FilePath**: (e.g., D:/xx/xxx/xxx.ts)
   - **LineNumber**: (e.g. 245)
   - **IssueType **: Category of the leak (e.g.,"Unreleased NAPI Reference", "Uncleared Timer", "Event Listener Leak", "Closure Retention", "Global Variable Accumulation")
   - **Severity**: [Major | Minor], Refer to the rules of HarmonyOS_Sapp_SemoryLeak_Specifications
   - **CodeSnippet**:  The relevant 5~10 lines of code surrounding the issue for quick context.
   - **SuggestedFix**:  Concrete code snippet or instruction to resolve the issue (e.g., "Add `clearTimeout` in `useEffect` cleanup").
   - **ConfidenceScore**: A score from 1-10 indicating the certainty of the finding (10 = Definite Leak). 
