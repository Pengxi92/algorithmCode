/**
 * 冒泡排序
 */

var arr1 = [9, 8, 7, 6, 5, 4, 3, 2, 1];

function sort(arr) {
  for (var j = arr.length - 1; j > 0; j--) {
    for (var i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        var tmp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = tmp;
      }
    }
  }
  return arr;
}

console.log(sort(arr1));