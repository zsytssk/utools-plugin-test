// preload.js 中使用 nodejs
const { readFileSync } = require('fs');

window.readConfig = function () {
    const data = readFileSync('./plugin.json');
    return data;
};

// index.html 后加载的内容可以使用 window.readConfig() 方法，但不能使用 Node.js 特性
console.log(window.readConfig()); // 正常执行
console.log(readFileSync('./plugin.json')); // 报错
