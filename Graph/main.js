/**
 * 图
 */

function Graph(v) {
  this.vertices = v; // 顶点的数量
  this.edges = 0; // 边的数量
  this.adj = []; // 存放边的数组
  for (var i = 0; i < v; i++) {
    this.adj[i] = [];
  }
}

// 设置顶点间的边
Graph.prototype.addEdge = function(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v); // 若去掉这条，就是有向图
  this.edges++;
}

// 显示图中边的信息
Graph.prototype.showGraph = function() {
  this.adj.map((val, index) => {
    console.log(`${index} --> ${val.toString()}`);
  })
}

// 初始化marked
Graph.prototype.initMark = function() {
  this.marked = [];
  this.adj.map((val, index) => {
    this.marked[index] = false;
  })
}

// 深度优先搜索
Graph.prototype.dfs = function(v) {
  this.initMark();
  const find = (value) => {
    if (this.marked[value]) {
      return;
    }
    console.log('搜索到了节点：' + value);
    this.marked[value] = true;
    const list = this.adj[value];
    this.adj[value].map((w) => {
      find(w);
    })
  }
  find(v);
  return this.marked;
}

// 广度优先搜索 - 递归实现
Graph.prototype.bfs = function(v) {
  this.initMark();
  const find = (valueList) => {
    var list = [];
    valueList.map((value) => {
      if (!this.marked[value]) {
        console.log('搜索到了节点：' + value);
        this.marked[value] = true;
        const l = this.adj[value];
        list = [...list, ...l];
      }
    })
    if (list.length > 0) {
      find(list);
    }
  }
  find([v]);
}

// 广度优先搜索 - 非递归实现
Graph.prototype.bfs1 = function(v) {
  this.initMark();
  var list = [v];
  this.edgeTo = [];
  while (list.length > 0) {
    var w = list.shift();
    if (!this.marked[w]) {
      this.marked[w] = true;
      console.log('搜索到了节点：', w);
      list = [...list, ...this.adj[w]];
    }
  }
}

// 广度优先搜索 - 非递归实现
Graph.prototype.bfs2 = function(v) {
  this.initMark();
  var list = [v];
  this.marked[v] = true;
  console.log('搜索到了节点：', v);
  this.edgeTo = [];
  this.edgeTo[v] = null;
  while (list.length > 0) {
    var w = list.shift();
    this.adj[w].map((value) => {
      if (!this.marked[value]) {
        console.log('搜索到了节点：', value);
        this.marked[value] = true;
        this.edgeTo[value] = w;
        list.push(value);
      }
    });
  }
}

// 获取路径
Graph.prototype.pathTo = function(f, e) {
  const path = [e];
  var w = e;
  while (w !== f) {
    w = this.edgeTo[w];
    path.unshift(w);
  }
  return path;
}

var g = new Graph(6);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.addEdge(1,5);
g.addEdge(4,5);
g.showGraph();
console.log('-------------------');
// var mark = g.dfs(2); // [ true, true, true, true, true ]

// g.bfs(2); // 搜索到了节点：2 - 0 - 4 - 1 - 5 - 3
g.bfs2(2); // 搜索到了节点：2 - 0 - 4 - 1 - 5 - 3
console.log(g.edgeTo); // [ 2, 0, null, 1, 2, 4 ]
console.log(g.pathTo(2, 5)); // [ 2, 4, 5 ]



