const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')
// 获取 cookie 过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(user => {
      if (user.username) {
        // 操作cookie
        // res.setHeader('Set-Cookie', `username=${user.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        req.session.username = user.username
        req.session.realname = user.realname
        console.log('这里----给redis赋值', req.session);
        set(req.sessionId, req.session)
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // if (method === 'POST' && req.path === '/api/user/login') {
  //   const { username, password } = req.body
  //   const result = login(username, password)
  //   return result.then(user => {
  //     if (user.username) {
  //       return new SuccessModel()
  //     }
  //     return new ErrorModel('登录失败')
  //   })
  // }

  if (method === 'GET' && req.path === '/api/user/login-test') {
    console.log('--login-test--', req.session);
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({ session: req.session }))
    } else {
      return Promise.resolve(new ErrorModel('未登陆'))
    }
  }


}

module.exports = handleUserRouter
