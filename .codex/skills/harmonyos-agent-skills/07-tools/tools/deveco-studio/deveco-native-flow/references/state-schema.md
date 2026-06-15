# 状态文件与目录结构

## 目录结构

```
.bundle-flow/
├── state.json                      # 全局状态
├── user-profile-edit/              # 需求1 的产出物
│   ├── project-info.json           # Step 1: 项目检测产出
│   ├── setup.json                  # Step 2: 项目初始化产出
│   ├── tech-spec.md                # Step 3: native-analyse 产出（跨端，不分平台）
│   ├── metadata.json               # 计划元数据（native-analyse/native-plan 共用）
│   ├── plan-ios.md                 # Step 4: native-plan 产出（按平台分文件）
│   ├── plan-android.md             # Step 4: native-plan 产出
│   ├── coding-progress-ios.json    # Step 5: native-coding 产出（按平台分文件）
│   ├── coding-progress-android.json
│   ├── changes/                    # 需求变更：增量迭代轮次（场景 A）
│   │   └── round-2/
│   │       ├── change-request.md   # 变更请求 + 影响分析
│   │       ├── delta-spec.md       # 增量技术方案（跨端，不分平台）
│   │       ├── delta-plan-ios.md   # 增量实施计划（按平台分文件）
│   │       ├── delta-plan-android.md
│   │       ├── coding-progress-ios.json
│   │       └── coding-progress-android.json
│   └── snapshots/                  # 需求变更：修改前快照（场景 B）
│       └── before-change-1/
│           ├── tech-spec.md        # 被修改前的备份
│           └── snapshot-meta.json  # 快照时间和变更描述
└── order-display-fix/              # 需求2 的产出物
    └── ...

.bundle-flow-workspace/
├── user-profile-edit/              # 需求1 的代码工作空间
│   ├── feature-module/
│   └── core-module/
└── order-display-fix/              # 需求2 的代码工作空间
    └── ...
```

## state.json 格式

```json
{
  "active": "user-profile-edit",
  "requirements": {
    "user-profile-edit": {
      "description": "在用户资料页添加编辑功能",
      "current_phase": "init",
      "completed_phases": ["detect", "init"],
      "invalidated_phases": [],
      "current_change_round": 1,
      "platforms": ["ios", "android"],
      "created_at": "2026-03-27T10:00:00Z"
    }
  }
}
```

**字段说明**：

| 字段 | 说明 |
|------|------|
| `invalidated_phases` | 因需求变更被标记失效的阶段列表，需重新执行 |
| `current_change_round` | 当前变更轮次，初始为 1，每次增量迭代 +1 |

## 路径约定

所有 command/skill 通过以下方式获取路径：

```python
# 从 state.json 读取当前活跃需求
active_id = state["active"]

# 产出物目录
artifact_dir = f".bundle-flow/{active_id}/"

# 工作空间目录
workspace = f".bundle-flow-workspace/{active_id}/"
```

各步骤的产出文件统一写入 `artifact_dir`，代码仓库统一放在 `workspace`。