@Sendable
class Box {
  value: number

  constructor(value: number) {
    this.value = value
  }
}

let box: Box = new Box(1)
console.log(box.value)
