var express = require('express');
var router = express.Router();
const { getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
/* GET home page. */
router.get('/list', (req, res, next) => {

  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.query.isadmin) {
    //  管理员界面
    console.log('管理员-list');

    if (!req.session.username) {
      console.error('未登录啦');

      res.json(new ErrorModel('管理员-未登录'))
      return
    }
    // 强制查询自己的
    author = req.session.username
  }

  const result = getList(author, keyword)
  result.then(list => {
    res.json(new SuccessModel(list))
  })


});

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const uData = updateBlog(req.query.id, req.session.username, req.body)
  uData.then(val => {
    if (val) {
      res.json(new SuccessModel('更新成功'))
    } else {
      res.json(new ErrorModel({ message: '更新失败' }))
    }
  })
})

router.post('/delete', loginCheck, (req, res, next) => {
  const result = deleteBlog(req.query.id, req.session.username)
  result.then(val => {
    if (val) {
      res.json(new SuccessModel('删除成功'))
    } else {
      res.json(new ErrorModel({ message: '删除失败' }))
    }
  })

})


module.exports = router;
