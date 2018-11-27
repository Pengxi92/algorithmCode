/**
 * 堆的实现
 */

function Heap() {
  this.table = new Array();
}

Heap.prototype.replaceTable = function(newIndex, oldIndex) {
  var temp = this.table[newIndex];
  this.table[newIndex] = this.table[oldIndex];
  this.table[oldIndex] = temp;
}

// 插入节点-实现最大堆（上滤）
Heap.prototype.insertMax = function(value) {
  // 1.将节点插入数组的最末尾，维持完全二叉树的特性
  var len = this.table.push(value);
  // 2.获取该节点的父级节点：父节点的下标为n，左子节点下标为2n+1，右子节点下标为2n+2
  var currentIndex = len - 1;
  while (currentIndex > 0) {
    var parentIndex = Math.ceil(currentIndex / 2) - 1;
    // 3.若父节点比当前节点小，则2节点交换;并重复该动作，直到父结点不再大于自己或者是位置已近到了数组第一个位置
    if (this.table[parentIndex] >= value) {
      break;
    }
    this.replaceTable(parentIndex, currentIndex);
    currentIndex = parentIndex;
  } 
}

// 删除节点-最大堆
Heap.prototype.delMax = function(index) {
  const len = this.table.length;
  if (index > len - 1 || len === 0) {
    throw new Error('节点数量超出');
  }
  // 1.将最后一个节点和待删除节点替换
  this.replaceTable(index, len - 1);
  // 2.判断替换后的当前元素与子节点的大小，若比子节点小，则和较大的子节点替换；依次执行该操作，直到当前比子节点都大
  var currentIndex = index;
  while (true) {
    var leftIndex = index * 2 + 1;
    var rightIndex = index * 2 + 2;
    var current = this.table[currentIndex];
    var left = this.table[leftIndex];
    var right = this.table[rightIndex];
    if (left > current && right > current) {
      var replaceIndex = left > right ? leftIndex : rightIndex;
      this.replaceTable(currentIndex, replaceIndex);
      currentIndex = replaceIndex;
    } else if (left > current) {
      this.replaceTable(currentIndex, leftIndex);
      currentIndex = leftIndex;
    } else if (right > current) {
      this.replaceTable(currentIndex, rightIndex);
      currentIndex = rightIndex;
    } else {
      break;
    }
  }
  // 3.删除最后一个节点
  return this.table.pop();
}

// 插入节点-实现最小堆（上滤）
Heap.prototype.insertMin = function(value) {
  // 1.将节点插入数组的最末尾，维持完全二叉树的特性
  var len = this.table.push(value);
  // 2.获取该节点的父级节点：父节点的下标为n，左子节点下标为2n+1，右子节点下标为2n+2
  var currentIndex = len - 1;
  while (currentIndex > 0) {
    var parentIndex = Math.ceil(currentIndex / 2) - 1;
    // 3.若父节点比当前节点大，则2节点交换;并重复该动作，直到父结点不再大于自己或者是位置已近到了数组第一个位置
    if (this.table[parentIndex] <= value) {
      break;
    }
    this.replaceTable(parentIndex, currentIndex);
    currentIndex = parentIndex;
  } 
}

var heap = new Heap();
heap.insertMax(10);
heap.insertMax(15);
heap.insertMax(12);
heap.insertMax(22);
heap.insertMax(19);

// console.log(heap.table); // [ 22, 19, 12, 10, 15 ]

console.log(heap.delMax(3)); // 10

// console.log(heap.table); // [ 22, 19, 12, 15 ]

var heapmin = new Heap();
heapmin.insertMin(30);
heapmin.insertMin(15);
heapmin.insertMin(32);
heapmin.insertMin(12);
heapmin.insertMin(19);

// console.log(heapmin.table); // [ 12, 15, 32, 30, 19 ]
