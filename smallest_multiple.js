/**
 * Build a function that finds the smallest positive number that is evenly
 * divisible by all of the numbers starting from 1 up to the value passed into your function.
 *
 * @param  { Number } ceiling This value will serve as your ceiling.
 * @return { Number }         Lowest Positive Number that is evenly divisible by all numbers
 *                            between 1 and `ceiling`
 */
module.exports = function (ceiling) {
  // do work here


  return 0;
};

function getLCM3(n) {
  // step1: get array of primes (<=n) & make corresponding array to start holding "max" exponent values associated with each prime
  let isPrime = [2];
  let expArr = [1];
  for (let i = 3; i <= n; i++) {
    let newPrime = 1;
    for (let j = 0; (j < isPrime.length) && (newPrime === 1); j++) {
      if (i % isPrime[j] === 0) newPrime = 0;
    }
    if (newPrime === 1) {
    isPrime.push(i);
    expArr.push(1);
    }
  }

  // step2: loop 1 to n, counting how many divisions of given factor it takes to reduce non-primes to 1
  // store that info in the expArr we started above
  let arrDiv = [];
  for (let k = 1; k <= n; k++) {
    arrDiv.push(k);
    for (let m = 0; m < isPrime.length; m++) {
      let expCnt = 0;
      while ((arrDiv[k - 1] % isPrime[m] === 0) && (k !== isPrime[m])) {
        if ((k % isPrime[m] === 0) && (k !== isPrime[m])) {
           arrDiv[k - 1] /= isPrime[m];
           expCnt ++;
        }
      }
      if (expCnt > expArr[m]) expArr[m] = expCnt;
    }
  }

  // step3: loop thru each prime number, applying exponent & then multiplying to subsequent (prime^exp)
  let lcmResult = 1;
  for (let j=0; j<isPrime.length; j++) {
    lcmResult *= isPrime[j] ** expArr[j];
  }

  return lcmResult;
}

console.log(getLCM3(20));