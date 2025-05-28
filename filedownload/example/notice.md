#### 使用系统组件会出现闪烁问题
```
  Progress({ value: item?.downloadSize ?? 0, total: item.fileSize??0, type: ProgressType.Linear })
               .style({ strokeWidth: 10, enableSmoothEffect: true, })
               .color(Color.Red)
               .layoutWeight(1)
```