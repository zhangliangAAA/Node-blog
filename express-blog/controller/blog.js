const xss = require('xss')
const { exec } = require('../db/mysql.js')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData 包含 title content
  const author = xss(blogData.author)
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const createtime = new Date().getTime()

  let sql = `
  insert into blogs(title,content,createtime,author) 
  values('${title}','${content}',${createtime},'${author}');`

  return exec(sql).then(res => {
    return {
      id: res.insertId
    }
  })
}

const updateBlog = (id, author, blogData = {}) => {
  // blogData 包含 title content
  const { title, content } = blogData
  let sql = `update blogs set title='${title}', content='${content}' where id=${id} and author='${author}'`

  return exec(sql).then(res => {
    return res.affectedRows > 0
  })
}

const deleteBlog = (id, author) => {
  let sql = `delete from blogs where id=${id} and author='${author}'`
  return exec(sql).then(res => {
    return res.affectedRows > 0
  })

}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}