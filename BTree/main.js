function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

Node.prototype.show = function() {
  return this.data;
}

function BST() {
  this.root = null;
}

BST.prototype.insert = function(data) {
  var node = new Node(data, null, null);
  if (this.root === null) {
    this.root = node;
    return;
  }
  var current = this.root;
  var parent = null;
  while(true) {
    if (current.left === null) {
      current.left = node;
      break;
    }
    if (current.right === null) {
      if (data > current.left.data) {
        current.right = node;
      } else {
        const n = current.left;
        current.right = n;
        current.left = node;
      }

      break;
    }
    current = data < current.data ? current.left : current.right;
  }
}

// 中序遍历：先访问左子节点，再访问父节点，最后访问右子节点
BST.prototype.inOrder = function(node = this.root) {
  const datas = [];
  function order(node) {
    if (node !== null) {
      order(node.left);
      datas.push(node.data);
      order(node.right);
    }
  }
  order(node);
  return datas;
}

// 先序遍历：先访问父节点，再访问左子节点，最后访问右子节点
BST.prototype.preOrder = function(node = this.root) {
  const datas = [];
  function order(node) {
    if (node !== null) {
      datas.push(node.data);
      order(node.left);
      order(node.right);
    }
  }
  order(node);
  return datas;
}

// 后序遍历：先访问左子节点，再访问右子节点，最后访问父节点
BST.prototype.postOrder = function(node = this.root) {
  const datas = [];
  function order(node) {
    if (node !== null) {
      order(node.left);
      order(node.right);
      datas.push(node.data);
    }
  }
  order(node);
  return datas;
}

// 查询最小值
BST.prototype.getMin = function(node = this.root) {
  let current = node;
  if (current === null) {
    return null;
  }
  let min = current.data;
  while(true) {
    min = min < current.data ? min : current.data;
    if (current.left === null) {
      break;
    }
    current = current.left;
  }
  return min;
}

// 查询最大值
BST.prototype.getMax = function(node = this.root) {
  let current = node;
  if (current === null) {
    return null;
  }
  let max = current.data;
  while(true) {
    max = max > current.data ? max : current.data;
    if (current.right === null) {
      break;
    }
    current = current.right;
  }
  return max;
}

// 查询定值
BST.prototype.find = function(data) {
  let current = this.root;
  while(true) {
    if (current === null) {
      break;
    }
    var cData = current.data;
    if (data === cData) {
      break;
    } else if (data < cData || current.right === null) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return current;
}

// 删除节点
BST.prototype.remove = function(data) {
  const removeNode = (data, node = this.root) => {
    if (node === null) {
      return null;
    }
    const nData = node.data;
    if (nData === data) {
      // 当前节点为叶子节点
      if (node.left === null) {
        return null;
      }
      // 当前节点只有左子节点
      if (node.right === null) {
        return node.left;
      }
      // 当前节点有2个子节点：
      // 1.获取右子节点的最小值A
      // 2.替换当前节点为A
      // 3.删除右子节点的A
      let min = this.getMin(node.right);
      node.data = min;
      node.right = removeNode(min, node.right);
    } else if (nData > data) {
      node.left = removeNode(data, node.left);
    }
    node.right = removeNode(data, node.right);
    return node;
  }
  this.root = removeNode(data);
}

var nums = new BST();

nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);

// console.log(nums.inOrder()); // [ 23, 45, 3, 22, 16, 37, 99 ]

// console.log(nums.preOrder()); // [ 23, 16, 3, 22, 45, 37, 99 ]

// console.log(nums.postOrder()); // [ 3, 22, 16, 37, 99, 45, 23 ]

// console.log(nums.getMin()); // 3

// console.log(nums.getMax()); // 99

// console.log(nums.find(99));

// nums.remove(23);
