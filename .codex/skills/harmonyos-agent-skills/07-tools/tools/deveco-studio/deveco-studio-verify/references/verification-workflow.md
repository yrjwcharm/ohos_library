# Device Verification Workflow

Step-by-step verification workflow for HarmonyOS applications on multiple device types.

---

## Table of Contents

1. [Preparation](#preparation)
2. [Device Selection](#device-selection)
3. [Build Artifact Installation](#build-artifact-installation)
4. [User Story Verification](#user-story-verification)
5. [Screenshot Collection](#screenshot-collection)
6. [Log Validation](#log-validation)
7. [Report Generation](#report-generation)
8. [Failure Handling](#failure-handling)

---

## Preparation

### 1.1 Verify Environment

```bash
# Check hdc is available
hdc --version

# Check emulator tool is available
emulator --version

# Check DevEco SDK path
echo $DEVECO_SDK_HOME  # macOS/Linux
echo $DEVECO_SDK_HOME  # Windows PowerShell
```

### 1.2 Create Verification Directory

```bash
mkdir -p ./verification/{phone,fold,tablet}/{screenshots,logs}
```

---

## Device Selection

### 2.1 List Available Devices

```bash
# List connected devices/emulators
hdc list targets

# Example output:
# 192.168.1.100:5555  (real device)
# emulator-123        (emulator)
```

### 2.2 List Installed Emulators

```bash
# List emulators
emulator -list

# List emulators with details (JSON)
emulator -list -details
```

**Output fields**:
- `name`: Emulator name (e.g., "Pura 90")
- `instancePath`: Instance path directory
- `imageRoot`: SDK path
- `isRunning`: Running status (true/false)

### 2.3 Start Emulator (if needed)

```bash
# Get emulator details
emulator -list -details

# Start emulator
emulator -hvd "<emulator_name>" -path "<instance_parent_dir>" -imageRoot "<sdk_path>"

# Example
emulator -hvd "Pura 90" -path ~/Huawei/emulator/deployed -imageRoot ~/Library/Huawei/Sdk

# Windows example
emulator -hvd "Pura 90" -path C:\Users\<username>\Huawei\emulator\deployed -imageRoot C:\Users\<username>\Library\Huawei\Sdk
```

**Note**: Beta version images cannot be started via command line. Use DevEco Studio GUI instead.

### 2.4 Verify Device Type

```bash
# Get device name (emulator)
hdc -t <device_id> shell param get ohos.qemu.hvd.name

# Get device name (real device)
hdc -t <device_id> shell param get const.product.name

# Get screen resolution
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a
```

Parse output to determine device type (phone/fold/tablet) based on resolution.

---

## Build Artifact Installation

### 3.1 Get Build Artifact Path

```bash
# Typical HAP location
entry/build/default/outputs/default/entry-default-unsigned.hap

# Or signed HAP
entry/build/default/outputs/default/entry-default-signed.hap
```

### 3.2 Install HAP

```bash
# Install with replacement
hdc -t <device_id> install -r <hap_path>

# Example
hdc -t emulator-123 install -r entry/build/default/outputs/default/entry-default-unsigned.hap

# Verify installation
hdc -t <device_id> shell bm dump -a
```

### 3.3 Get Main Ability (if unknown)

```bash
hdc -t <device_id> shell bm dump -n <bundle_name>

# Parse output for:
# "mainAbility": "EntryAbility"
```

---

## User Story Verification

### 4.1 Launch Application

```bash
# Launch app
hdc -t <device_id> shell aa start -a <ability_name> -b <bundle_name>

# Example
hdc -t emulator-123 shell aa start -a EntryAbility -b com.example.myapp
```

### 4.2 Get App Process ID

```bash
hdc -t <device_id> shell aa dump -a

# Parse output:
# AppRunningRecord ID #9
#   process name [com.example.myapp]
#   pid #3820  uid #20020059
```

### 4.3 Get Screen Dimensions

```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a

# Parse for window rectangle: [x y width height]
# Example: [0 0 1080 2400]
# Resolution: 1080x2400
```

### 4.4 Perform UI Operations

For each UserStory step:

#### Click
```bash
# Calculate coordinates from UI tree or screen position
hdc -t <device_id> shell uitest uiInput click <x> <y>

# Example: Click center of button
hdc -t emulator-123 shell uitest uiInput click 540 1200
```

#### Swipe
```bash
# Directional swipe (calculate based on screen size)
hdc -t <device_id> shell uitest uiInput swipe <fromX> <fromY> <toX> <toY> [velocity]

# Example: Swipe up (scroll down)
hdc -t emulator-123 shell uitest uiInput swipe 540 1800 540 600 600

# velocity: 200-40000 px/s, default 600
```

**Swipe calculation**:
```
Screen center: centerX = width/2, centerY = height/2
Distance: min(width, height) * 0.4

Left swipe:   from (centerX + distance/2, centerY) to (centerX - distance/2, centerY)
Right swipe:  from (centerX - distance/2, centerY) to (centerX + distance/2, centerY)
Up swipe:     from (centerX, centerY + distance/2) to (centerX, centerY - distance/2)
Down swipe:   from (centerX, centerY - distance/2) to (centerX, centerY + distance/2)
```

#### Input Text
```bash
# Click input field first to focus
hdc -t <device_id> shell uitest uiInput click <x> <y>

# Input text
hdc -t <device_id> shell uitest uiInput inputText <x> <y> <text>

# Example
hdc -t emulator-123 shell uitest uiInput inputText 540 800 "Hello World"
```

#### Key Event
```bash
hdc -t <device_id> shell uitest uiInput keyEvent <key>

# Common keys:
# Back - Back button
# Home - Home button
# VOLUME_UP, VOLUME_DOWN
# ENTER, DEL

# Example: Press Back
hdc -t emulator-123 shell uitest uiInput keyEvent Back
```

### 4.5 Get UI Tree (for coordinate identification)

```bash
# Enable test mode
hdc -t <device_id> shell param set persist.ace.testmode.enabled 1

# Get highlighted window ID
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a
# Parse for: "Highlighted windows: <window_id>"

# Get UI tree
hdc -t <device_id> shell hidumper -s WindowManagerService -a "-w <window_id> -inspector"

# Parse UI tree for element coordinates
```

---

## Screenshot Collection

### 5.1 Capture Screenshot

```bash
# Capture to device
hdc -t <device_id> shell snapshot_display -f /data/local/tmp/screenshot.jpeg

# Pull to local
hdc -t <device_id> file recv /data/local/tmp/screenshot.jpeg ./verification/<device_type>/screenshots/

# Cleanup device file
hdc -t <device_id> shell rm /data/local/tmp/screenshot.jpeg
```

### 5.2 Multi-Step Screenshot Capture

```bash
#!/bin/bash

device=$1
dir="./verification/screenshots"
timestamp=$(date +%Y%m%d_%H%M%S)

mkdir -p $dir/$timestamp

# Capture step 1
hdc -t $device shell snapshot_display -f /data/local/tmp/step1.jpeg
hdc -t $device file recv /data/local/tmp/step1.jpeg $dir/$timestamp/

# Perform action
hdc -t $device shell uitest uiInput click 540 1200

# Capture step 2
sleep 1  # Wait for UI update
hdc -t $device shell snapshot_display -f /data/local/tmp/step2.jpeg
hdc -t $device file recv /data/local/tmp/step2.jpeg $dir/$timestamp/

# Cleanup
hdc -t $device shell rm /data/local/tmp/*.jpeg
```

---

## Log Validation

### 6.1 Real-time Log Collection

```bash
# Clear buffer
hdc -t <device_id> shell hilog -r

# Collect recent logs (last 200 lines)
hdc -t <device_id> shell hilog -x -n 200

# Collect with app PID filter
hdc -t <device_id> shell hilog -x -n 200 -P <app_pid>

# Collect with log level filter
hdc -t <device_id> shell hilog -x -n 200 -L E  # Error level only

# Log levels: D (Debug), I (Info), W (Warning), E (Error), F (Fatal)
```

### 6.2 Export Log Files (Emulator)

```bash
# List recent log files
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"

# Export log files
hdc -t <device_id> file recv /data/log/hilog/hilog.001.gz ./verification/<device_type>/logs/
hdc -t <device_id> file recv /data/log/hilog/hilog.002.gz ./verification/<device_type>/logs/

# Decompress and search
gunzip -k ./verification/<device_type>/logs/*.gz
grep "keyword" ./verification/<device_type>/logs/*.log
```

### 6.3 Export Log Files (Real Device)

Real device logs require hilogtool for decoding.

```bash
# List log files and dictionary
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"
hdc -t <device_id> shell "ls /data/log/hilog/*.zip"

# Export log files and dictionary
hdc -t <device_id> file recv /data/log/hilog/hilog.001.gz ./logs/
hdc -t <device_id> file recv /data/log/hilog/hilog.002.gz ./logs/
hdc -t <device_id> file recv /data/log/hilog/hilog_dict.001.zip ./logs/

# Parse with hilogtool
hilogtool parse -i ./logs -o ./logs/parsed -d hilog_dict.001.zip

# Search parsed logs
grep "keyword" ./logs/parsed/*.txt
```

### 6.4 Log Validation Checklist

- [ ] No Error/Fatal level logs
- [ ] Key business flow logs present
- [ ] Performance logs reasonable (launch time < 3s, page load < 1s)
- [ ] No unexpected exceptions
- [ ] App lifecycle logs correct (onCreate, onDestroy etc.)

---

## Report Generation

### 7.1 Verification Report Template

```markdown
# Verification Report: <App Name>

## Test Date: YYYY-MM-DD HH:mm:ss
## Build Artifact: <hap_path>

## Devices Tested

### Device 1: <Device Type> (<Device Name>)
**Device ID**: <device_id>
**Resolution**: <width>x<height>

| US ID | Scenario | Steps | Expected | Actual | Status |
|-------|----------|-------|----------|--------|--------|
| US-01 | Launch app | Click icon | App opens in < 3s | ✅ 2.5s | ✅ Pass |
| US-02 | Navigate | Click button | Navigate to page2 | ✅ | ✅ Pass |
| US-03 | Input | Type text | Text displays | ❌ Truncated | ❌ Fail |

**Log Validation**:
- Error logs: 0 ✅
- Fatal logs: 0 ✅
- Key flow logs: Present ✅
- Launch time: 2.5s ✅

**Screenshots**: ./verification/<device_type>/screenshots/*.jpeg

### Device 2: <Device Type>
...

## Summary

- **Devices Tested**: X
- **User Stories**: Y
- **Passed**: M/N (XX%)
- **Failed**: K items

**Failed Items**:
1. US-03 on Phone: Text truncation
   - Expected: Full text visible
   - Actual: Text truncated after 20 chars
   - Severity: Medium
   - Suggestion: Increase input field width

2. Layout on Tablet: Excessive whitespace
   - Expected: Compact layout
   - Actual: 40% whitespace
   - Severity: Low
   - Suggestion: Reduce padding for large screens

## Recommendations

- [ ] Fix text truncation in input fields (US-03)
- [ ] Optimize tablet layout spacing
- [ ] Add foldable device testing
- [ ] Collect performance metrics on real device

## Next Steps

1. Fix failed items
2. Re-test on same devices
3. Expand to additional device types
4. Performance testing on real device
```

### 7.2 Generate Report Script

```bash
#!/bin/bash

# scripts/generate-report.sh

report_date=$(date +%Y-%m-%d_%H:%M:%S)
report_file="./verification/verification-report-$report_date.md"

cat > $report_file << EOF
# Verification Report

## Test Date: $report_date

## Summary

### Devices Tested
$(ls -d ./verification/*/ | xargs -n1 basename)

### Screenshots
$(find ./verification -name "*.jpeg" | wc -l) screenshots captured

### Logs
$(find ./verification -name "*.log" | wc -l) log files collected

## Next Steps
- Review screenshots for UI issues
- Check logs for Error/Fatal messages
- Complete User Story validation table
EOF

echo "Report generated: $report_file"
```

---

## Failure Handling

### 8.1 Scenario Failures

**If UserStory fails**:

1. **Capture evidence**:
   ```bash
   # Screenshot
   hdc -t <device_id> shell snapshot_display -f /data/local/tmp/failure.jpeg
   
   # Logs
   hdc -t <device_id> shell hilog -x -n 500 -P <app_pid> > failure.log
   ```

2. **Document failure**:
   - Expected behavior
   - Actual behavior
   - Screenshots showing failure
   - Error logs
   - Possible root cause

3. **Decision**:
   - **Fix**: Return to coding phase, fix issue, rebuild, retest
   - **Ignore**: Mark as known issue, document workaround
   - **Retry**: Re-run scenario (可能是环境问题)

### 8.2 Device Connection Failures

```bash
# hdc connection lost
hdc kill
hdc start
hdc list targets

# Emulator stopped
emulator -list
emulator -hvd "<name>" -path "<path>" -imageRoot "<sdk>"
```

### 8.3 Build Artifact Failures

```bash
# HAP installation failed
hdc -t <device_id> uninstall <bundle_name>
hdc -t <device_id> install -r <hap_path>

# App won't launch
hdc -t <device_id> shell bm dump -n <bundle_name>
# Verify mainAbility exists
```

---

## Complete Workflow Example

```bash
# Full verification workflow script

#!/bin/bash

APP_BUNDLE="com.example.myapp"
APP_ABILITY="EntryAbility"
HAP_PATH="entry/build/default/outputs/default/entry-default-unsigned.hap"

# Step 1: Select device
echo "=== Device Selection ==="
hdc list targets
read -p "Enter device ID: " DEVICE_ID

# Step 2: Get device info
echo "=== Device Info ==="
hdc -t $DEVICE_ID shell param get ohos.qemu.hvd.name
hdc -t $DEVICE_ID shell hidumper -s WindowManagerService -a -a | grep -E "\[\d+ \d+ \d+ \d+\]"

# Step 3: Install app
echo "=== Installing App ==="
hdc -t $DEVICE_ID install -r $HAP_PATH

# Step 4: Launch app
echo "=== Launching App ==="
hdc -t $DEVICE_ID shell aa start -a $APP_ABILITY -b $APP_BUNDLE

# Step 5: Get PID
echo "=== Getting PID ==="
hdc -t $DEVICE_ID shell aa dump -a | grep "pid #"

# Step 6: Capture screenshot
echo "=== Capturing Screenshot ==="
hdc -t $DEVICE_ID shell snapshot_display -f /data/local/tmp/initial.jpeg
hdc -t $DEVICE_ID file recv /data/local/tmp/initial.jpeg ./verification/screenshots/

# Step 7: Collect logs
echo "=== Collecting Logs ==="
hdc -t $DEVICE_ID shell hilog -r  # Clear buffer
sleep 3  # Wait for app activity
hdc -t $DEVICE_ID shell hilog -x -n 200 > ./verification/logs/initial.log

# Step 8: Generate report
echo "=== Generating Report ==="
timestamp=$(date +%Y%m%d_%H%M%S)
echo "Verification completed at $timestamp. Check ./verification/" > report-$timestamp.txt
```

---

## 参考资料

- HarmonyOS 开发指南: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides