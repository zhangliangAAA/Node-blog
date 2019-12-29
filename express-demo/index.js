const express = require('express')
// const express = require('../lib/my-express')
const app = express()

app.use((req, res, next) => {
  console.log('请求开始。。。', req.method, req.url);
  next()
})
app.use((req, res, next) => {
  // 假设处理 cookie
  req.cookie = {
    userId: '110'
  }
  console.log('获取cookie。。。', req.cookie);
  next()
})
app.use((req, res, next) => {
  // 假设处理 post data
  setTimeout(() => {
    req.body = {
      k: '123',
      name: 'lisa'
    }
    console.log('获取postData。。。', req.body);
    next()
  }, 1000);
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由');
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 路由');
  next()
})
app.post('/api', (req, res, next) => {
  console.log('post /api 路由');
  next()
})

app.get('/api/getcookie', (req, res, next) => {
  console.log('get /api/getcookie 路由');
  res.json({
    errorno: 0,
    data: req.cookie
  })
})
app.post('/api/getpost', (req, res, next) => {
  console.log('post /api/getpost 路由');
  res.json({
    errorno: 0,
    data: req.body
  })
})

app.get('/api/dowload', (req, res, next) => {
  res.download('./work.xlsx', 'abc.xlsx', (err) => {
    if (err) {
      console.log('====================================');
      console.log('下载失败');
      console.log('====================================');
    }
  })
})

app.use((req, res, next) => {
  console.log('404');
  res.json({
    errorno: -1,
    msg: '404 Not fount'
  })
})

console.log('初始化完成', app)

app.listen(3300, () => console.log('Example app listening on port 3300!'))