// Take an array of green (placed correctly) letters, an array of yellow
// (must place) letters, and an array of available letters, and returns an
// array of all possible permutations

function findPermutations(available, yellows, greens) {
  const puzzleLength = 5
  // BASE CASE: we're full of greens.
  // There's nothing left to do but return the one solution
  let nullCount = 0
  for (i = 0; i < greens.length; i++) { if (greens[i] == null) nullCount++ }
  if (nullCount == 0) {
    return [greens.join("")]
  }

  // CASE: No remaining yellows
  // for the first null place in the greens array, it can hold any of the
  // available letters. Place each, and call findPermutations() on each possibility.
  if (Object.keys(yellows).length == 0) {
    let solutions = []
    let gIdx = 0
    while (greens[gIdx] != null) { gIdx++ }
    for (let aIdx = 0; aIdx < available.length; aIdx++) {
      let tmp = [...greens]
      tmp[gIdx] = available[aIdx]
      solutions = [...solutions, ...findPermutations(available, yellows, tmp)]
    }
    return solutions
  }

  // CASE: Some remaining yellows
  // For each yellow, place it in a remaining slot and call findPermutations() recursively
  else {
    let solutions = []
    let yellowsCopy = { ...yellows }
    let y = Object.keys(yellowsCopy)[0]
    let badYellowLocations = yellowsCopy[y]
    delete yellowsCopy[y]
    for (let gIdx = 0; gIdx < greens.length; gIdx++) {
      if (greens[gIdx] == null && !badYellowLocations.includes(gIdx)) {
        let tmp = [...greens]
        tmp[gIdx] = y
        solutions = [...solutions, ...findPermutations(available, yellowsCopy, tmp)]
        void (0)
      }
    }
    return solutions
  }
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

let notAvailable = "ETYUPSGHLCN".split("")

let available = alphabet.filter(function (el) { return !notAvailable.includes(el); });

let yellows = {"A": [1,2], "M": [0,3]} // each letter points to an array of known "bad" locations
let greens = [null,null,null, null, null]
let solutions = findPermutations(available, yellows, greens)
if (solutions.length < 30000) {
  for (solution of solutions) {
    console.log(solution)
  }
}
console.log(solutions.length + " permutations found")


/*

curl -s https://raw.githubusercontent.com/tabatkins/wordle-list/main/words | grep -v [latevig] | grep ....r | grep o | grep -v ...o.

*/
