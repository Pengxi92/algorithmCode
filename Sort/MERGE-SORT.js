/**
 * 归并排序
 * 参考：https://www.cnblogs.com/chengxiao/p/6194356.html
 */

 var arr1 = [9, 8, 7, 6, 5, 4, 3, 2, 1];

 // 排序方法
 function sort(arr) {
   if (arr.length > 1) {
    var mid = parseInt(arr.length / 2);
    var leftArr = sort(arr.slice(0, mid));
    var rightArr = sort(arr.slice(mid));
    return merge(leftArr, rightArr);
   }
   return arr;
 }

 // 子序列合并
 function merge(leftArr, rightArr) {
   if (leftArr.slice(-1) < rightArr.slice(-1)) {
     var arrTmp = [].concat(leftArr);
     leftArr = [].concat(rightArr);
     rightArr = arrTmp;
   }
   var arr = [].concat(leftArr, rightArr);
   var arrNew = [];
   var leftNum = 0;
   var rightNum = leftArr.length;
   while (leftArr.length > leftNum) {
     var left = arr[leftNum];
     if (arr.length > rightNum) {
      var right = arr[rightNum];
      if (left > right) {
        arrNew.push(right);
        rightNum ++;
      } else {
        arrNew.push(left);
        leftNum ++;
      }
     } else {
      arrNew.push(left);
      leftNum ++;
     }
   }
   return arrNew;
 }


 // merge的另外实现方式
 function merge2(left, right){
  var result = [];

  while (left.length && right.length) {
    if(left[0] <= right[0]){
      //把left的左子树推出一个，然后push进result数组里
       result.push(left.shift());
    }else{
      //把right的右子树推出一个，然后push进result数组里
     result.push(right.shift());
    }
  }
  //经过上面一次循环，只能左子列或右子列一个不为空，或者都为空
  while (left.length){
    result.push(left.shift());
  } 
  while (right.length){
    result.push(right.shift());
  }
  return result;
}

 console.log(sort(arr1));
 