/**
 * 求平方根
 */

function sqrtBisection(n, lowpivot = 0, heightpivot = n) {
  if (isNaN(n)) return NaN;
  if (n === 0 || n === 1) return n;
  var pivot = ( lowpivot + heightpivot ) / 2;
  console.log('pivot', pivot);
  
  var pivotPow = Math.pow(pivot, 2);
  if (pivotPow === n || Math.abs(n - pivotPow) <= 0.01) return pivot;
  return n > pivotPow ? sqrtBisection(n, pivot, heightpivot) : sqrtBisection(n, lowpivot, pivot);
}

console.log(sqrtBisection(13));
