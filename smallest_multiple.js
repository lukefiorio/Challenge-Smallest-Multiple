/**
 * Build a function that finds the smallest positive number that is evenly
 * divisible by all of the numbers starting from 1 up to the value passed into your function.
 *
 * @param  { Number } ceiling This value will serve as your ceiling.
 * @return { Number }         Lowest Positive Number that is evenly divisible by all numbers
 *                            between 1 and `ceiling`
 */
module.exports = function(ceiling) {
  // do work here
  // step1: make array of prime objects up to [ceiling]. Store value & facorization of each prime.

  let primeFactorList = [
    {
      prime: 2,
      exponent: 1
    }
  ];

  for (let index = 3; index <= ceiling; index++) {
    let newPrime = true;

    for (
      let primeFactorListIndex = 0;
      primeFactorListIndex < primeFactorList.length && newPrime;
      primeFactorListIndex++
    ) {
      let currentFactorialObj = primeFactorList[primeFactorListIndex];
      if (index % currentFactorialObj.prime === 0) {
        newPrime = false;
      }
    }

    if (newPrime) {
      const primeFactor = {
        prime: index,
        exponent: 1
      };

      primeFactorList.push(primeFactor);
    }
  }

  // step2: loop 1 to n, counting how many divisions by given prime it takes to reduce non-primes to 1
  for (let curIndex = 1; curIndex <= ceiling; curIndex++) {
    let numberToFactor = curIndex;
    for (
      let curPrimeFactorIndex = 0;
      curPrimeFactorIndex < primeFactorList.length;
      curPrimeFactorIndex++
    ) {
      let curPrimeObj = primeFactorList[curPrimeFactorIndex];
      let exponentCnt = 1;
      while (
        numberToFactor % curPrimeObj.prime === 0 &&
        numberToFactor !== curPrimeObj.prime
      ) {
        if (
          numberToFactor % curPrimeObj.prime === 0 &&
          numberToFactor !== curPrimeObj.prime
        ) {
          numberToFactor /= curPrimeObj.prime;
          exponentCnt++;
        }
      }
      // store exponent value of prime factorization if higher than existing exponent
      if (exponentCnt > primeFactorList[curPrimeFactorIndex].exponent) {
        primeFactorList[curPrimeFactorIndex].exponent = exponentCnt;
      }
    }
  }

  // step3: loop thru array of prime objects, applying 'Product-exponent' (multiply each (prime^exp))
  let lcmResult = 1;
  for (
    let PrimeFactorIndex = 0;
    PrimeFactorIndex < primeFactorList.length;
    PrimeFactorIndex++
  ) {
    lcmResult *=
      primeFactorList[PrimeFactorIndex].prime **
      primeFactorList[PrimeFactorIndex].exponent;
  }

  return lcmResult;
};
