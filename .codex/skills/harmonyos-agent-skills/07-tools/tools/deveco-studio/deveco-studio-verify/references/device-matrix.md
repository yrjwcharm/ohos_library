# HarmonyOS Device Matrix

Complete specifications and verification checklist for all supported device types.

---

## Device Categories

### 1. Phone (`phone`) - Required

**Specifications**:
- Typical resolution: 1080x2400 (portrait)
- Aspect ratio: 20:9
- Density: ~420 dpi

**Verification Focus**:
- [ ] Core layout displays correctly
- [ ] Primary interaction flow works
- [ ] Portrait mode primary, test landscape optionally
- [ ] All UI elements accessible
- [ ] Text readable at default font size
- [ ] Touch targets meet minimum size (44dp)
- [ ] Scroll performance acceptable
- [ ] App launches within acceptable time (<3s)

**Common Issues**:
- Text truncation in narrow spaces
- Bottom navigation hidden by keyboard
- List items too large for small screen

---

### 2. Wide Fold (`widefold`) - Recommended

**Specifications**:
- Unfolded resolution: ~2200x2000
- Folded resolution: ~1000x2000 (per screen)
- Aspect ratio: ~1:1 (unfolded)

**Verification Focus**:
- [ ] Split-view layout displays correctly
- [ ] Multi-window support
- [ ] Fold/unfold transition smooth
- [ ] Content rearranges properly on fold
- [ ] Both screens functional when folded
- [ ] Left/right screen coordination

**Common Issues**:
- Split-view proportions incorrect
- Content jumps during fold/unfold
- One screen inactive when folded

---

### 3. Fold (`fold`) - Recommended

**Specifications**:
- Unfolded resolution: ~2200x1800
- Folded resolution: ~1080x2400
- Aspect ratio changes dynamically

**Verification Focus**:
- [ ] Layout adapts on fold/unfold
- [ ] State preserved during transition
- [ ] No content loss during resize
- [ ] Animation smooth (no jank)
- [ ] Touch areas still accessible when folded

**Common Issues**:
- Content clipped during fold
- Scroll position resets
- Layout breaks during transition

---

### 4. Triple Fold (`triplefold`) - Optional

**Specifications**:
- Unfolded resolution: ~3300x2000 (ultra-wide)
- Multiple fold states
- Extreme aspect ratio changes

**Verification Focus**:
- [ ] Ultra-wide layout works
- [ ] All three fold states functional
- [ ] Content visible in all states
- [ ] Pan/zoom works correctly
- [ ] Multi-column layout stable

**Common Issues**:
- Content stretched on ultra-wide
- Some fold states unusable
- Columns overflow screen

---

### 5. Tablet (`tablet`) - Recommended

**Specifications**:
- Typical resolution: 2560x1600 (landscape)
- Aspect ratio: 16:10
- Large screen, higher density

**Verification Focus**:
- [ ] Landscape mode primary
- [ ] Multi-column layout works
- [ ] Large spacing appropriate
- [ ] Split-view/master-detail patterns
- [ ] Keyboard layout optimized
- [ ] Touch targets scale appropriately

**Common Issues**:
- Too much whitespace
- Single-column on large screen (wasteful)
- Small touch targets relative to screen

---

## Verification Matrix

| Verification Item | Phone | WideFold | Fold | TripleFold | Tablet | Criticality |
|-------------------|-------|----------|------|------------|--------|-------------|
| Basic layout | ✅ | ✅ | ✅ | ✅ | ✅ | Critical |
| Core interactions | ✅ | ✅ | ✅ | ✅ | ✅ | Critical |
| Fold/unfold | - | ✅ | ✅ | ✅ | - | Important |
| Split-view | - | ✅ | - | ✅ | ✅ | Important |
| Safe area | ✅ | ✅ | ✅ | ✅ | ✅ | Important |
| Orientation | ✅ | - | - | - | ✅ | Recommended |
| Multi-column | - | ✅ | - | ✅ | ✅ | Recommended |
| Scroll performance | ✅ | ✅ | ✅ | ✅ | ✅ | Important |

---

## Minimum Testing Requirements

**Level 1: Basic** (Required for all releases)
- ✅ Phone device
- ✅ All critical verification items passed

**Level 2: Standard** (Recommended for major releases)
- ✅ Phone device
- ✅ At least one large-screen device (widefold OR tablet)
- ✅ All critical + important items passed

**Level 3: Comprehensive** (Required for platform changes)
- ✅ Phone device
- ✅ All large-screen devices (widefold, fold, tablet)
- ✅ All verification items passed
- ✅ Triple-fold tested if available

---

## Emulator Configuration

**Recommended emulators** (available in DevEco Studio):

| Device Type | Emulator Name | API Level | Notes |
|--------------|---------------|-----------|-------|
| Phone | "Pura 90" | API 12 | Standard phone |
| Phone | "Pura 70 Pro" | API 12 | Large phone |
| Fold | "HUAWEI Mate X5" | API 12 | Foldable |
| Tablet | "MatePad Pro 13.2" | API 12 | Large tablet |

**Emulator startup**:
```bash
# List available emulators
emulator -list -details

# Start emulator
emulator -hvd "Pura 90" -path ~/Huawei/emulator/deployed -imageRoot ~/Library/Huawei/Sdk
```

---

## Real Device Testing

**When to use real devices**:

1. **Performance validation** - Emulators don't match real device performance
2. **Sensor testing** - GPS, accelerometer, camera
3. **Network testing** - Real network conditions
4. **User experience** - Real touch feel, sound, vibration

**Real device setup**:
1. Enable Developer Mode: Settings → About → Build number (7 taps)
2. Enable USB Debugging: Settings → Developer options → USB debugging
3. Connect via USB or WiFi: `hdc list targets`

---

## Screen Size Adaptation Tips

**Best practices**:

1. Use responsive layouts:
   - `Flex` component for adaptive spacing
   - Percentage-based widths (not fixed pixels)
   - `Grid` for multi-column layouts

2. Safe area handling:
   ```typescript
   import { SafeArea } from '@kit.ArkUI'
   
   SafeArea({
     top: true,
     bottom: true,
     left: false,
     right: false
   })
   ```

3. Fold detection:
   ```typescript
   import { display } from '@kit.ArkUI'
   
   display.getDefaultDisplaySync((err, displayInfo) => {
     // Check width to detect fold state
     if (displayInfo.width > 2000) {
       // Wide mode
     } else {
       // Narrow mode
     }
   })
   ```

---

## Common Resolution Reference

| Device | Resolution (px) | Density (dpi) | Aspect Ratio |
|--------|----------------|---------------|--------------|
| Phone (small) | 720x1280 | 320 | 16:9 |
| Phone (standard) | 1080x2400 | 420 | 20:9 |
| Phone (large) | 1440x3200 | 560 | 20:9 |
| Fold (folded) | 1080x2400 | 420 | 20:9 |
| Fold (unfolded) | 2200x1800 | 420 | ~1:1 |
| Tablet (10") | 2560x1600 | 280 | 16:10 |
| Tablet (13") | 2880x1920 | 280 | 3:2 |

---

## Device-Specific Test Scenarios

### Phone Scenarios
- Launch app from home screen
- Navigate through core flow
- Scroll long list
- Handle keyboard input
- Test notifications
- Back navigation

### Foldable Scenarios
- Open app in folded state
- Unfold during app use
- Fold during app use
- Use split-view features
- Multi-window interaction
- Fold-state persistence

### Tablet Scenarios
- Launch in landscape mode
- Multi-column navigation
- Master-detail patterns
- Large touch targets
- Keyboard shortcuts (if applicable)
- Drag-and-drop features

---

## Automation Scripts

**Automated device selection**:
```bash
# scripts/select-device.sh
#!/bin/bash

# Select smallest available device (phone)
devices=$(hdc list targets)
first_device=$(echo "$devices" | head -1)

echo "Selected device: $first_device"
hdc -t $first_device shell aa start -a EntryAbility -b com.example.app
```

**Automated screenshot capture**:
```bash
# scripts/capture-screens.sh
#!/bin/bash

device=$1
timestamp=$(date +%Y%m%d_%H%M%S)
dir="./screenshots/$timestamp"

mkdir -p $dir

hdc -t $device shell snapshot_display -f /data/local/tmp/screen1.jpeg
hdc -t $device file recv /data/local/tmp/screen1.jpeg $dir/

# Wait and capture again
sleep 2
hdc -t $device shell snapshot_display -f /data/local/tmp/screen2.jpeg
hdc -t $device file recv /data/local/tmp/screen2.jpeg $dir/
```

---

## Verification Report Template

```markdown
# Device Verification Report

## Test Date: YYYY-MM-DD HH:mm
## App: <bundle_name>
## Build: <hap_path>

## Devices Tested

### Device 1: Phone (Pura 90)
- Device ID: <emulator_id>
- Resolution: 1080x2400
- Status: Running

#### Test Results
| ID | Scenario | Expected | Actual | Pass/Fail |
|----|----------|----------|--------|-----------|
| 1 | Launch | App opens | ✅ | ✅ |
| 2 | Scroll | Smooth | ✅ | ✅ |
| 3 | Input | Text visible | ❌ Truncated | ❌ |

### Device 2: Tablet (MatePad Pro)
...

## Summary
- Devices: 2/5 tested
- Scenarios: 20 executed
- Passed: 18/20 (90%)
- Failed: 2
  - Phone: Text truncation in input field
  - Tablet: Excessive whitespace

## Screenshots
- ./screenshots/<timestamp>/device1_screen1.jpeg
- ./screenshots/<timestamp>/device2_screen1.jpeg

## Recommendations
- Fix input field width on phone
- Reduce padding on tablet layout
- Test on real devices before release

## Next Steps
- Retest after fixes
- Add foldable testing
- Collect performance metrics
```

---

## 参考资料

- HarmonyOS 设计指南: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/design