const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`
  return await exec(sql)
}

const getDetail = async (id) => {
  let sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  // blogData 包含 title content
  const author = xss(blogData.author)
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const createtime = new Date().getTime()

  let sql = `
  insert into blogs(title,content,createtime,author) 
  values('${title}','${content}',${createtime},'${author}');`
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, author, blogData = {}) => {
  // blogData 包含 title content
  const { title, content } = blogData
  let sql = `update blogs set title='${title}', content='${content}' where id=${id} and author='${author}'`
  const updatedData = await exec(sql)
  return updatedData.affectedRows > 0
}

const deleteBlog = async (id, author) => {
  let sql = `delete from blogs where id=${id} and author='${author}'`
  const delData = await exec(sql)
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}