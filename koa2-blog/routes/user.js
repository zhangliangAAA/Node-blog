const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function(ctx, next) {
  const { username, password } = ctx.request.body
  const user = await login(username, password)
  if (user.username) {
    // 操作cookie
    // res.setHeader('Set-Cookie', `username=${user.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
    ctx.session.username = user.username
    ctx.session.realname = user.realname
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登录失败')
});

router.get('/session-test', async function(ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  ctx.body = {
    errorno: 0,
    viewCount: ctx.session.viewCount
  }
})


module.exports = router
