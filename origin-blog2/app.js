const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { access } = require('./src/utils/log')
const { get, set } = require('./src/db/redis')
// // session
// const SESSION_DATA = {}

// 解析postData
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
}

// 获取 cookie 过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const serverHandle = (req, res) => {
  // 记录日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  console.log('node-env', process.env.NODE_ENV)

  const url = req.url
  req.path = url.split('?')[0]
  // 解析入参query
  req.query = queryString.parse(url.split('?')[1])

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(element => {
    if (!element) {
      return
    }
    const arr = element.split('=')
    req.cookie[arr[0].trim()] = arr[1].trim()
  });

  // 解析 session
  // let needSetCookie = false
  // let userId = req.cookie.userId
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 使用redis解析 session
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}`
    // 初始化 redis 中的 session 值
    set(userId, {})
  }

  get(userId).then(sessionData => {
    console.log('====================================');
    console.log(needSetCookie, userId, sessionData);
    console.log('====================================');
  })


  // 获取session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化 redis 中的 session 值
      set(req.sessionId, {})
      // 设置 session
      req.session = {}
    } else {
      // 设置 session
      req.session = sessionData
    }
    // 处理postData
    return getPostData(req)
  }).then(postData => {// 解析postData
    req.body = postData
    // 处理blog
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理user
    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(user => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(user))
      })
      return
    }

    // 未命中路由
    res.writeHead(404, { "Content-tyep": "text/plain" })
    res.write("404 Not Found")
    res.end()
  })

}
module.exports = serverHandle