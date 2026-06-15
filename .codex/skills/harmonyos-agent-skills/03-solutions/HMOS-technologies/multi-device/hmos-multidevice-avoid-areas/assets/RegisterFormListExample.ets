interface FormItem {
  id: string;
  label: string;
  placeholder: string;
  inputType?: InputType;
  maxLength?: number;
}

@Entry
@Component
struct Index {
  private formItems: FormItem[] = [
    { id: 'username', label: '用户名', placeholder: '请输入用户名', maxLength: 20 },
    { id: 'phone', label: '手机号', placeholder: '请输入手机号', inputType: InputType.PhoneNumber, maxLength: 11 },
    { id: 'verifyCode', label: '验证码', placeholder: '请输入验证码', inputType: InputType.Number, maxLength: 6 },
    { id: 'email', label: '邮箱', placeholder: '请输入邮箱地址', inputType: InputType.Email },
    { id: 'address', label: '地址', placeholder: '请输入详细地址' },
    { id: 'remark', label: '备注', placeholder: '请输入备注信息（选填）' },
  ];

  build() {
    Column() {
      Text('注册表单')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .width('100%')
        .textAlign(TextAlign.Start)
        .padding({ left: 16, right: 16, top: 16, bottom: 8 })

      Text('请填写以下信息完成注册')
        .fontSize(14)
        .fontColor('#999999')
        .width('100%')
        .textAlign(TextAlign.Start)
        .padding({ left: 16, right: 16, bottom: 16 })

      List({ space: 20 }) {
        ForEach(this.formItems, (item: FormItem) => {
          ListItem() {
            this.FormInput(item);
          }
        }, (item: FormItem) => item.id)

        ListItem() {
          Column() {
            Button('提交注册')
              .width('100%')
              .height(48)
              .fontSize(18)
              .fontColor(Color.White)
              .backgroundColor('#007DFF')
              .borderRadius(24)
              .fontWeight(FontWeight.Medium)

            Button('重置')
              .width('100%')
              .height(48)
              .fontSize(18)
              .fontColor('#666666')
              .backgroundColor(Color.Transparent)
              .borderRadius(24)
              .margin({ top: 8 })
          }
          .width('100%')
          .margin({ top: 8, bottom: 40 })
        }
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16 })
      .scrollBar(BarState.Auto)
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }

  @Builder
  FormInput(item: FormItem) {
    Column() {
      Text(item.label)
        .fontSize(14)
        .fontColor('#333333')
        .fontWeight(FontWeight.Medium)
        .margin({ bottom: 8 })

      if (item.id === 'remark') {
        TextArea({ placeholder: item.placeholder })
          .width('100%')
          .height(100)
          .fontSize(16)
          .borderRadius(8)
          .backgroundColor('#F5F5F5')
          .padding(12)
          .maxLength(item.maxLength ?? 200)
          .id(item.id)
      } else {
        TextInput({ placeholder: item.placeholder })
          .width('100%')
          .height(48)
          .fontSize(16)
          .borderRadius(8)
          .backgroundColor('#F5F5F5')
          .padding({ left: 12, right: 12 })
          .type(item.inputType ?? InputType.Normal)
          .maxLength(item.maxLength ?? 100)
          .id(item.id)
      }
    }
    .alignItems(HorizontalAlign.Start)
    .width('100%')
  }
}
