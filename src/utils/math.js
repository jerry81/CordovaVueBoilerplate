function getLongestLength (arrays) {
  // find the longest addend
  let max = 0;
  arrays.forEach((s) => {
    if (s.length > max) max = s.length;
  })
  return max;
}

function padWithZeroes (array, targetLen) {
  let ret = Array.from(array);
  while (ret.length < targetLen) {
    ret.unshift(0);
  }
  return ret;
}

/**
 * Function to perform bignumber addition
 *
 * @param {array[strings]} addends - array of strings representing numbers to add
 * @returns a string representing the sum
 */
function longAddition (addends) {
  // split each addend up into individual numbers
  const longest = getLongestLength(addends);
  const splitAr = addends.map(input=>{
    return (input.split('')).map(item2=>{
      return +item2
    });
  });
  // pad the array with zeroes
  const paddedAr = splitAr.map((item) => {
    return padWithZeroes(item, longest);
  })


  let arrayOfSums = [];
  // add up each array of sums
  for (let digit = 0; digit < longest; digit++) {
    let sum = 0;
    for (let addendIndex = 0; addendIndex < addends.length; addendIndex++) {
      let item = paddedAr[addendIndex][digit];
      sum+=item;
    }
    arrayOfSums[digit] = sum;
  }

  // console.log('arrayOfSumjs is ', arrayOfSums)
  let sumArray = [];
  let carry = 0;
  for (let j = (arrayOfSums.length - 1); j>=0; j--) {
    let sum = arrayOfSums[j] + carry;
    let asString = sum.toString();
    let digit = +asString.charAt(asString.length-1);
    carry = +asString.slice(0,asString.length-1);
    sumArray.push(digit);
  }
  sumArray = sumArray.reverse();
  if (carry) return carry.toString().concat(sumArray.join(''));
  return sumArray.join('');
}


export { longAddition }
