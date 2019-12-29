const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')
// 创建对象
const con = mysql.createConnection(MYSQL_CONF)
// 开始连接
con.connect()
// 执行sql
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })
}

//  关闭
// con.end()

module.exports = {
  exec,
  escape: mysql.escape
}