class Point {
  x: number = 1
}

let p: Point = new Point()
let ok = "x" in p
console.log(ok)
