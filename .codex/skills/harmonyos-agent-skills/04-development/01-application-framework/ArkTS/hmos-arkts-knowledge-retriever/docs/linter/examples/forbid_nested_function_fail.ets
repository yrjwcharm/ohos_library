function outer(): number {
  function inner(): number {
    return 1
  }
  return inner()
}

console.log(outer())
