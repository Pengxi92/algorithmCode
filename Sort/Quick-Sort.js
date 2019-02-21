/**
 * 快速排序
 * 参考：
 * http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 * http://wiki.jikexueyuan.com/project/easy-learn-algorithm/fast-sort.html
 */

var arr1 = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];

function sort(arr) {
  if (arr.length > 1) {
    var quickNum = arr[0];
    var minArr = [];
    var maxArr = [];
    arr.forEach((val, idx) => {
      if (idx > 0) {
        if (val > quickNum) {
          maxArr.push(val);
        } else {
          minArr.push(val);
        }
      }
    })
    return [].concat(sort(minArr), [quickNum], sort(maxArr))
  }
  return arr;
}

console.log(sort(arr1));