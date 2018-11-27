/**
 * 缓存代理开销大的计算结果
 */

//  一个求乘积的函数
var mult = function () {
  console.log('开始计算乘级');
  var a = 1;

  Array.prototype.map.call(arguments, (item) => {
    a *= item;
  })
  console.log(`乘积为${a}`);
  return a;
}

// mult(2, 3, 4); // 开始计算乘级; 乘积为24

var createProxyFn = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    return cache[args] || (cache[args] = fn.apply(fn, arguments));
  }
}

var multProxy = createProxyFn(mult);

var m = multProxy(2, 3, 4); // 开始计算乘级; 乘积为24
console.log(`结果为${m}`); // 结果为24

// 第二次调用，参数相同，不再调用mult函数
m = multProxy(2, 3, 4); // 
console.log(`结果为${m}`); // 结果为24