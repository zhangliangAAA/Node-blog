var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET home page. */
router.get('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  result.then(user => {
    if (user.username) {
      // 操作cookie
      // res.setHeader('Set-Cookie', `username=${user.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
      req.session.username = user.username
      req.session.realname = user.realname
      console.log('这里----', req.session);
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(new ErrorModel('登录失败'))
  })
});

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json(new SuccessModel('验证登录通过'))
    return
  }
  res.json(new ErrorModel('尚未登录'))

})

router.get('/session', (req, res, next) => {
  const session = req.session
  if (!session.visitNum) {
    session.visitNum = 0
  }
  session.visitNum++
  res.json({
    visitNum: session.visitNum,
    session
  })
})

module.exports = router;
