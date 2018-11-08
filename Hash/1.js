function Hash() {
  this.table = new Array(137);
}

Hash.prototype.betterHash = function(key) {
  let total = 0;
  for(var i = 0, len = key.length; i < len; i++) {
    total = 37 * total + key.charCodeAt(i);
  }
  return total % this.table.length;
}

Hash.prototype.put = function(key, data) {
  // 加链法
  const pos = this.betterHash(key);
  if (this.table[pos] === undefined) {
    this.table[pos] = new Array();
  }
  this.table[pos][key] = data;
}

Hash.prototype.get = function(key) {
  // 加链法
  const pos = this.betterHash(key);
  return this.table[pos] ? this.table[pos][key] : undefined;
}

Hash.prototype.showDistro = function () {
  for (var i = 0; i < this.table.length; i++) {
    if (this.table[i]) {
      console.log(i + ": ", this.table[i]);
    }
  }
}

var dict = {
  beijing: '中国首都',
  chengdu: '四川省会',
  shanghai: '直辖城市',
  guangzhou: '美食之都',
};

var hTable = new Hash();
Object.keys(dict).map((value) => {
  hTable.put(value, dict[value]);
})
hTable.showDistro();

console.log('beijing是:', hTable.get('beijing'));


