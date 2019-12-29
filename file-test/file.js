const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log('err', err);
    return
  }
  // data 是二进制，需要转换成字符串
  console.log('====================================');
  console.log(data.toString());
  console.log('====================================');
})

// 写文件

const content = '程序写入的内容'
const opt = {
  flag: 'a' // 追加
}
fs.writeFile(fileName, content, opt, (err, data) => {
  if (err) {
    console.log('err', err);
    return
  }
})

// 判断文件
fs.exists(fileName, (ex) => {
  console.log('ex', ex);
})


