const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '..', '..', 'logs', 'access.log')
// 创建 read stream
const readStream = fs.createReadStream(fileName)

// 创建readline
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let sum = 0

//逐行读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return
  }
  // 记录总行
  sum++

  const arr = lineData.split('--')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++
  }
})

// 监听完毕
rl.on('close', () => {
  console.log('====================================');
  console.log('Chrome占比', chromeNum / sum);
  console.log('====================================');
})


