
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li> <!-- for project euler #22 -->
        <input type="file" id="files" name="files[]" @change="handleFileChange($event.target.files)"/>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { runPE26 } from './euler/pe26';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleFileChange2(ev) {
      console.log('ev is ');
    },
    // project euler 22
    handleFileChange(file) {
      const f = file[0];
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = function(theFile) {
        const res = theFile.currentTarget.result;
        console.log('res is ', res);
        let asAr = res.split('\",\"');
        asAr[0] = asAr[0].replace('\"','');
        asAr[asAr.length-1] = asAr[asAr.length-1].replace('\"', '');
        console.log('asAr ', asAr);
        asAr.sort((a,b) => {
          if (a === b) return 0
          if (a < b) return -1
          return 1
        })
        let sum = 0;
        for (let i = 0; i < asAr.length; i++) {
          const str = asAr[i];
          let charValue = 0;
          for (let j = 0; j < str.length; j++) {
            charValue += (str.charCodeAt(j) - 64);
          }
          charValue *= (i+1);
          sum+=charValue;
        }
        console.log('sum is ', sum);
        // A is 65 - 64 ===1
        console.log('charCode of ABC is ', 'ABC'.charCodeAt(0), 'ABC'.charCodeAt(1), 'ABC'.charCodeAt(2))
        console.log('asAr is ', asAr);
      };
      console.log('about to read file ', file);
      // Read in the image file as a data URL.
      reader.readAsText(f);
    },
    isPrime (input) {
      let trial = Math.round(input**.5);
      if (trial % 2 === 0) trial += 1;
      if (input === 15) {
        console.log('trial is ', trial);
      }
      if (input % 2 === 0) return false;
      while (trial > 1) {
        if (input%trial === 0) {
          return false
        }
        trial-=2;
      }
      return true
    },
    triangularNumbersFactor () {
    const limit = 20000;
    let curTriangle = 0;
    let triangles = [];
    for (let i = 1; i < limit; i++) {
    curTriangle += i;
    triangles.push({
    value: curTriangle,
    factors: new Set()
    });
    // get divisors
    let upperLim = Math.ceil(curTriangle/2);
    for (let j = 1; j < upperLim; j++) {
    if (curTriangle%j === 0) {
    upperLim = curTriangle/j;
    triangles[i-1].factors.add(curTriangle/j);
    triangles[i-1].factors.add(j);
    }
    }
    if (triangles[i-1].factors.size >= 500) {
    console.log('triangle is ', triangles[i-1]);
    return
    }
    }
    },
    numberWords () {
    const singles = ['one', 'two', 'three', 'four', 'five','six', 'seven','eight','nine','ten', 'eleven', 'twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const hundred = 'hundred'
    const andword = 'and'
    const thousand = 'thousand'
    let total = 0;
    for (let i = 1; i <= 1000; i++) {
    if (i >= 1 && i <= 19) {
    console.log('singles[i-1], ', singles[i-1])
    total+=singles[i-1].length;
    }
    if (i >= 20 && i <1000) {
    let hundreds = Math.floor(i/100);
    let prefix = hundreds ? singles[hundreds-1] : '';
    if (prefix) {
    console.log('prefix, hundred', prefix, hundred)
    total+= (prefix.length + hundred.length);
    }
    let j = i - (hundreds*100);
    let digit = j%10;
    if (j !== 0) {
    console.log('and')
    if (hundreds) total+=andword.length;
    if (j >= 20) {
    let suffix = digit ? singles[(digit-1)] : '';
    let cur = tens[Math.floor(j/10)-2] + suffix;
    console.log('cur ', cur);
    total+=cur.length;
    }
    else {
    console.log('singles[j-1]',singles[j-1])
    total+=singles[j-1].length;
    }
    }
    }
    if (i === 1000) {
    console.log('onethousand')
    total+='onethousand'.length;
    }
    }
    console.log('total is ', total)
    },
    paliRecursive (input) {
      if (input.length <= 1) return true;
      if (input[0] !== input[input.length-1]) return false;
      let nextInput = input.slice(1,input.length-1);
      return this.paliRecursive(nextInput);
    },
    isPalindrome (input) {
      let asString = input + '';
      let asArray = asString.split('');
      return this.paliRecursive(asArray);
    },
    buildPrimeList(upperLimit) {
      let primes = [2,3];
      console.log('testing')
      let candidate = 5;
        while (candidate < upperLimit){
        if (this.isPrime(candidate)) {
          primes.push(candidate);
        }
        candidate+=2;
      }
      console.log('primes is ', primes);
      const res = primes.reduce((previousValue, currentValue) => { return previousValue += currentValue }, 0)
      console.log('res is ', res);
    },
    getLargest() {
      const input = '7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450';
      const inputAr = input.split('');
      const adj = 13;
      let max = 0;
      for (let i=0; i<inputAr.length-13; i++) {
        let prod = inputAr[i];
        for (let j = i+1; j<i+13;j++) {
          if (inputAr[j] === 0) {
            i = j+1;
            break;
          }
          prod *= inputAr[j];
        }
        if (prod > max) {
          max = prod;
        }
      }
      return max;
    },
    testPythagoreanTriple(largestC, target) {
      // for c = 99...3
      // for b = 98...2
      // for a = 97...1
      for (let c = largestC; c>2; c--) {
        for (let b = c - 1; b >1; b--) {
          const cSq = c ** 2;
          const bSq = b ** 2;
          const aSq = cSq - bSq;
          const a = aSq ** .5;
          if (Number.isInteger(a) && (a < b) && (a+b+c === 1000)) {
                      console.log('a is ', a);
                      console.log('b and c', b, c);
                      console.log('a + b + c is ', a+b+c);
                      console.log('prod is ', a*b*c);
          }
        }
      }
    },
    testGrid () {
          const inStr = `08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48`
     const splitByNewline = inStr.split('\n');
       const arCpy = splitByNewline.slice();
       const splitBySpace = arCpy.map(item=>item.split(' '));
       const converted = splitBySpace.map(item=>item.map(item2=>+item2));
       // check all rows
       let max = {val: 0, x: 0, y: 0, dir:'horiz'};
       for (let i = 0; i<20; i++) {
         for (let j = 0; j<17; j++) {
           let prod = converted[i][j] * converted[i][j+1] * converted[i][j+2] * converted[i][j+3];
           if (prod > 50000000) {
             console.log('prod greater')
           }
           if (prod > max.val) {
             max.val = prod
             max.x=j;
             max.y=i;
             max.dir="horiz"
           }
         }
       }
       // check all cols
       for (let k = 0; k < 20; k++) {
         for (let kk = 0; kk < 17; kk++) {
           let prod2 = converted[kk][k] * converted[kk+1][k] * converted[kk+2][k] * converted[kk+3][k];
                    if (prod2 > 50000000) {
             console.log('prod2 greater')
           }
           if (prod2 > max.val) {
              max.val = prod2
             max.x=k;
             max.y=kk;
             max.dir="vert"
           }
         }
       }
       // main diagonal
       for (let l = 0; l < 17; l++) {
           for (let ll = 0; ll < 17; ll++) {
             let prod3 = converted[l][ll] * converted[l+1][ll+1] * converted[l+2][ll+2] * converted[l+3][ll+3]
             let prod4 = converted[l][19-ll] * converted[l+1][19-ll-1] * converted[l+2][19-ll-2] * converted[l+3][19-ll-3]
                      if (prod3 > 50000000) {
             console.log('prod3 greater')
           }
                    if (prod4 > 50000000) {
             console.log('prod4 greater')
           }
                     console.log('l ll ', l, ll)
                     if (prod3 > max.val) {
                       max.val = prod3
             max.x=ll;
             max.y=l;
             max.dir="fordiag"
                     }
                     if (prod4 > max.val) {
                                  max.val = prod4
             max.x=19-ll;
             max.y=l;
             max.dir="bdiag"
                     };
/*                      console.log('prod 3 is ', prod3)
                     console.log('prod 4 is ', prod4)
                     console.log('point is ', l, 19-ll);
                     console.log('endpoint is ', l+3, 19-ll-3); */
                     }
       }
       console.log('max is ', max);
    },
    collatz () {
      let max = 0;
      let maxIndex = 0;
      let i = 10000;
      while (i < 1000000) {
              let ar = []
        let n = i;
      while (n > 1) {
        if ((n % 2) === 0) {
          n *= .5
        } else {
          n = (3*n) + 1
        }
        ar.push(n);
      }
      if (ar.length > max) {
        max = ar.length;
        maxIndex = i;
      }
      i++;
      }
      console.log('max is ', max);
      console.log('maxIndex is ', maxIndex);
    },
    lattice () {
      let output = [];
      for (let i = 2; i<=21; i++) {
        output[i] = [];
        output[2][i] = i;
        output[i][2] = i;
      }
      for (let j = 3; j <= 21; j++) {
      for (let ii = j; ii<=21; ii++) {
        output[j][ii] = output[j-1][ii] + output[j][ii-1];
        output[ii][j] = output[j][ii];
      }
      }
      console.log('output is ', output);
    },
    addUp () {
      const powerOf2 = ` 10 715 086 071 862 673 209 484 250 490 600 018 105 614 048 117 055 336 074 437 503 883 703 510 511 249 361 224 931 983 788 156 958 581 275 946 729 175 531 468 251 871 452 856 923 140 435 984 577 574 698 574 803 934 567 774 824 230 985 421 074 605 062 371 141 877 954 182 153 046 474 983 581 941 267 398 767 559 165 543 946 077 062 914 571 196 477 686 542 167 660 429 831 652 624 386 837 205 668 069 376`
      const nospaces = powerOf2.split(' ').join('').split('');
      let sum = 0;
      for (let item of nospaces) {
        sum += +item;
      }
      console.log('sum is ', sum);
    },
    treeTraversal () {
      const leaves = `75
95 64
17 47 82
18 35 87 10
20 04 82 47 65
19 01 23 75 03 34
88 02 77 73 07 63 67
99 65 04 28 06 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23`
  const splitToLevels = leaves.split('\n');
  const splitFurther = splitToLevels.map(item => (item.split(' ')).map(item2 => +item2));
  let sums = []
  for (let i = 0; i < splitFurther.length; i++) {
    const row = splitFurther[i];
    sums[i]=[];
    if (i === 0) {
      sums[0][0] = row[0];
      continue;
    }
    for (let j = 0; j < row.length; j++) {
      const item = row[j];
      if (j === 0) {
        sums[i][0] = item + sums[i-1][0];
        continue;
      }
      if (j === (row.length - 1)) {
        sums[i][row.length-1] = item+sums[i-1][row.length-2];
        continue;
      }
      const parent1 = sums[i-1][j-1];
      const parent2 = sums[i-1][j]
      console.log('parent1 is and parent 2 is ', parent1, parent2);
      console.log('calculating sumsi, j', i, j);
      sums[i][j] = item + Math.max(parent1, parent2);
    }
  }
  console.log('sums is ', sums);
    },
    calendarCounting() {
      const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let curYear = 1901;
      let curMonth = 1;
      let curDay = 1;
      let dayOfWeek = 2;
      let sundayCount = 0;
      while (curYear < 2001) {
        // month loop
        while (curMonth <= 12) {
          // day loop
          let maxDays = days[(curMonth-1)];
          let isLeapYear = curYear % 4 === 0 && (curYear % 100 !== 0 || curYear % 400 === 0);
          if (curMonth === 2 && isLeapYear) {
            maxDays++;
          }
          if (dayOfWeek === 7) {
            sundayCount++;
            console.log('sunday occured on ', curYear, curMonth, curDay);
          }
          while (curDay <= maxDays) {
            curDay++;
            dayOfWeek = dayOfWeek === 7 ? 1 : dayOfWeek+1;
          }
          curDay = 1;
          curMonth++;
        }
        curMonth = 1;
        curYear++;
      }
      console.log(`currently at date ${curYear} ${curMonth} ${curDay} ${dayOfWeek} ${sundayCount}`);
    },
    factoralHelper(mplier, mcand) {
      // mplier is number array
      // mcand is number
        let expandedArray = [];
        for (let i = 0; i<mcand; i++) {
          expandedArray[i] = mplier;
        }
        console.log('expandedArray is ', expandedArray);
        let arrayOfSums = [];
         for (let ii = 0; ii < mplier.length; ii++) {
          let sum =0;
          for (let j = 0; j < mcand; j++) {
            let item = expandedArray[j][ii];
            sum+=item;
          }
          arrayOfSums[ii] = sum;
        }
         let sumArray = [];
        let carry = 0;
        for (let jj = mplier.length-1; jj>=0; jj--) {
          let sum = arrayOfSums[jj] + carry;
          let asString = sum.toString();
          let digit = +asString.charAt(asString.length-1);
          carry = +asString.slice(0,asString.length-1);
          sumArray.push(digit);
        }
        let carryAsString = carry.toString();
        console.log('carryAsString', carryAsString);
        let carryAr = carryAsString.split('').map(item => +item);
        const reversed = sumArray.reverse()
        console.log('carryAr is ', carryAr)
        const returned = carryAr ? [...carryAr, ...reversed] : reversed;
        return returned
    },
    factoralSum() {
      const starting = 100;
      let product = [1,0,0];
      let sum = 0;
      for (let i = (starting-1); i > 0; i--) {
        product = this.factoralHelper(product, i);
        console.log('product is ', product);
      }
      for (let addend of product) {
        sum+=addend;
      }
      console.log('product is ', product)
      console.log('sum is ', sum);
    },
    /**
     * project euler #21
     * returns array of divisors of n
     * e.g. getDivisors of 220 is [1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110]
     */
    getDivisors (n) {
      let returned = new Set();
      if (n === 1) return returned;
      returned.add(1);
      let max = n;
      for (let i = 2; i <= max; i++) {
        if (n % i === 0) {
          let dividend = n/i;
          if (dividend >= n || i >= n) continue;
          max = dividend;
          returned.add(max);
          returned.add(i);
        }
      }
      if (n === 3) {
        console.log('n===3, divisors', returned);
      }
      return returned;
    },
    getAmicables(upperLim) {
      let returned = new Set();
      for (let i = 0; i <= upperLim; i++) {
        if (returned.has(i)) continue;
        let divs = this.getDivisors(i);
        let sum = 0;
        divs.forEach((cur) => {
          sum+=cur;
        })
        if (i === sum) continue;
        let sum2 = 0;
        let divs2 = this.getDivisors(sum);
        divs2.forEach((cur) => {
          sum2+=cur;
        });
                if (i ===3) {
                  console.log('i==3=>', sum, sum2)
                }
        if (i === sum2) {
          returned.add(sum);
          returned.add(i);
        }
      }
      return returned;
    },
    sumSet(inputSet) {
      let sum = 0;
      for (let i of inputSet) {
        sum+=i;
      }
      return sum;
    },
    getAbundantNumberSet() {
      const upperLim = 28111;
      let abundants = new Set();
      for (let i = 1; i < upperLim; i++) {
        const sum = this.sumSet(this.getDivisors(i));
        if (sum > i) abundants.add(i);
      }
      return abundants;
    },
    getSetOfAbundantSums() {
      const abu = this.getAbundantNumberSet();
      const upperLim = 28123;
      const sums = new Set();
      for (let i of abu) {
        for (let j of abu) {
          if (i+j > upperLim) continue;
          sums.add(i+j);
        }
      }
      return sums;
    },
    getSetOfNonAbundantSums() {
      let abuSums = this.getSetOfAbundantSums();
      const upperLim = 28123;
      const non = new Set();
      for (let i = 1; i <= upperLim; i++) {
        if (!abuSums.has(i)) non.add(i);
      }
      return non;
    },
    shiftToFront(input, index) {
      return [input[index]].concat(input.slice(0,index)).concat(input.slice(index+1, input.length));
    },
  },
  mounted () {
    runPE26();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
