const fs = require('fs')
const path = require('path')



// function getFileContent(fileName, cb) {
//   const fullFileName = path.resolve(__dirname, 'file', fileName)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     cb(JSON.parse(data.toString()))
//   })
// }

// getFileContent('a.json', data => {
//   console.log('====================================');
//   console.log(data);
//   console.log('====================================');
//   getFileContent(data.next, bData => {
//     console.log(bData);
//   })
// })


function getFileContent(fileName) {
  const promiser = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'file', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        console.log(err)
        reject()
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promiser
}

/**
 * async await
 * 1、await 后面可以追加 promise 对象，获取 resolve 的值
 * 2、await 必须包括在 async 函数里面
 * 3、async 函数执行返回的也是一个 promise对象
 * 4、try-catch 截获 promise 中的 reject的值
 */

// getFileContent('a.json').then(aData => {
//   console.log('====================================');
//   console.log(aData);
//   console.log('====================================');
//   return getFileContent(aData.next)
// }).then(bData => {
//   console.log('==============BB======================');
//   console.log(bData);
//   console.log('===============BB=====================');
// })

async function readFileData() {
  // 同步写法
  try {
    const aData = await getFileContent('a.json')
    console.log(aData);
    const bData = await getFileContent('b.json')
    console.log(bData);
    const cData = await getFileContent('c.json')
    console.log(cData);
  } catch (err) {
    console.error(err)
  }
}

readFileData()

// async function readA() {
//   const aData = await getFileContent('a.json')
//   return aData
// }

// async function test() {
//   const data = await readA()
//   console.log(data);
// }

// test()



