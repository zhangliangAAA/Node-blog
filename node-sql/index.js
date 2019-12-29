const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'myblog'
})

// 链接
con.connect()

// 执行sql
// const sql = 'select * from users;'
// const sql = 'update users set realname="lisi2" where username="lisi"'
const sql = "insert into blogs(title,content,createtime,author) values('React-Redux','内容123',1568029958262,'lisi');"

con.query(sql, (err, result) => {
  if (err) {
    console.error(err);
    return
  }
  console.log(result);
})

//  关闭
con.end()