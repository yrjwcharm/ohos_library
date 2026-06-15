# linter-cli

Standalone ArkTS linter CLI extracted from `arkts-cli`.

This tool runs ArkTS checker diagnostics only. It does not transform sources, generate `.abc` files, or run `ark_js_vm`.

## Setup

`runtime/compiler/node_modules` is intentionally not tracked in this package. Install the package root dependencies first, then install the OpenHarmony-custom TypeScript runtime:

```bash
cd linter-cli
npm install
npm run install-runtime-deps
```

By default, `npm run install-runtime-deps` performs a shallow clone from `https://gitcode.com/openharmony/third_party_typescript.git` and installs the packaged runtime files into `linter-cli/node_modules/typescript`.

If you want to use a local source checkout explicitly, pass it as an argument:

```bash
npm run install-runtime-deps -- --source-dir /abs/path/to/third_party_typescript
npm run install-runtime-deps -- --branch master
```

Example:

```bash
node ./bin/linter-cli.js \
  --input /abs/path/file.ets
```

With an SDK path:

```bash
node ./bin/linter-cli.js \
  --input /abs/path/project/entry/src/main/ets/pages/Index.ets \
  --sdk-path /abs/path/sdk/default/openharmony/ets
```

With a custom cache directory:

```bash
node ./bin/linter-cli.js \
  --input /abs/path/file.ets \
  --cache-dir /abs/path/cache
```

Project context:

- The input remains a single `.ets` file.
- By default, the CLI infers the module root from the path segment before `src/main/ets`.
- The CLI uses the real source file in place. It does not copy `entry/src/main/ets` into a temporary workspace.
- Use `--module-root`, `--project-root`, or `--module-json` only when inference is not enough.

SDK context:

- `--sdk-path` may point to an OpenHarmony ETS SDK root such as `.../openharmony/ets`.
- `--sdk-path` may also point to a parent SDK directory such as `.../sdk/default`; the CLI will look for known `openharmony/ets` and `hms/ets` children.
- Windows drive paths such as `D:\DevEco Studio\sdk\default\openharmony\ets` are accepted on native Windows and are translated to `/mnt/d/...` when running under WSL/Linux.
- WSL mount paths such as `/mnt/d/DevEco Studio/sdk/default` are also accepted on native Windows and are translated back to `D:\...`.

Cache directory:

- `--cache-dir` is still used for checker cache and small generated helper files.
- It is no longer used as a copied source workspace.

Output:

- `Lint Check: OK` when checker diagnostics pass
- ArkTS checker diagnostics on stdout/stderr when linter or tsc errors are found

Runtime layout:

- `runtime/compiler`: minimized ArkTS checker runtime and dependencies

Platform:

- The CLI is intended to run on Linux/WSL and native 64-bit Windows Node.js.
- In Node.js and npm, native Windows reports `process.platform` as `win32` even on 64-bit Windows; `process.arch` reports the CPU architecture such as `x64`.

Notes:

- `linter-cli` only looks up the compiler runtime through package-relative paths.
- The package does not include `es2abc`, `ark_js_vm`, or packaging scripts from `arkts-cli`.
- Current input is a single `.ets` file path.

Verification example on WSL/Linux:

```bash
node ./bin/linter-cli.js \
  --input /mnt/d/DevEcoStudioProjects/snakeGame/entry/src/main/ets/pages/Index.ets \
  --sdk-path "/mnt/d/DevEco Studio/sdk/default" \
  --cache-dir /tmp/linter-cli-cache \
  --package-manager-type ohpm
```

Verification example on native Windows PowerShell:

```powershell
node .\bin\linter-cli.js `
  --input "D:\DevEcoStudioProjects\snakeGame\entry\src\main\ets\pages\Index.ets" `
  --sdk-path "D:\DevEco Studio\sdk\default" `
  --cache-dir "$env:TEMP\linter-cli-cache" `
  --package-manager-type ohpm
```
