const { getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录验证
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('未登录啊！')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
      //  管理员界面
      const isLogin = loginCheck(req)
      if (isLogin) {
        return isLogin
      }
      // 强制查询自己的
      author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(list => {
      return new SuccessModel(list)
    })

  }

  // 获取博详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)

    return result.then(res => {
      return new SuccessModel(res)
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const isLogin = loginCheck(req)
    if (isLogin) {
      return isLogin
    }

    const result = newBlog(req.session.username, req.body)
    return result.then(res => {
      return new SuccessModel(res)
    })

  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    console.log('====================================');
    console.log('update', req.session);
    console.log('====================================');
    const isLogin = loginCheck(req)
    if (isLogin) {
      return isLogin
    }
    const uData = updateBlog(id, req.session.username, req.body)
    return uData.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel({ message: '失败' })
      }
    })


  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const isLogin = loginCheck(req)
    if (isLogin) {
      return isLogin
    }
    const result = deleteBlog(id, req.session.username)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel({ message: '失败' })
      }
    })
  }

}

module.exports = handleBlogRouter