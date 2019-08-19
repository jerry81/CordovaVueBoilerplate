function getNextPermutation(input) {
  const returned = Array.from(input);
  for (let i = input.length-1; i >= 0; i--) {
    // keep comparing right item with a potential pivot
    for (let pivot = i - 1; pivot >= 0; pivot--) {
      let cur = input[pivot];
      for (let curRight = i; curRight > pivot; curRight--) {
        let right = input[curRight];
        if (right > cur) {
          returned[curRight] = cur;
          returned[pivot] = right;
          // reverse remainder
          let prefix = returned.slice(0, pivot+1);
          let remainder = returned.slice(pivot+1, returned.length);
         // console.log('remainder', remainder);
          remainder = remainder.reverse();
         // console.log('remainder a', remainder);
          return prefix.concat(remainder);
        }
      }
      // if a normal order is found
      // swap the items and reverse the remainder
    }
  }
}

export function runPE24 () {
      // console.log('manuallyPermute is ', this.manuallyPermuteFourItems([0,1,2,3]));
      let inp = [0,1,2,3,4,5,6,7,8,9];
      for (let i = 0; i < 999999; i++ ) {
        inp = getNextPermutation(inp)
     // console.log('computePermutations ', this.computePermutations([0,1,2]))
      }
          console.log('iterate end', inp);
    }

