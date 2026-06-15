let inc = (x: number): number => {
  return x + 1
}

let bound = inc.bind(undefined, 1)
console.log(bound())
