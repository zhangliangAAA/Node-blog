/**
 * 加密
 */
const crypto = require('crypto')

// 秘钥
const SECRET_KEY = 'Nihao_Wrold!'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}
// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

console.log(genPassword('123'));

module.exports = {
  genPassword
}