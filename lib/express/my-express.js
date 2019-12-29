const http = require('http')
const slice = Array.prototype.slice

class MyExpress {
  constructor() {
    // 存放中间件列表
    this.routes = {
      all: [], // app.use类型中间件
      get: [], // app.get类型中间件
      post: [] // app.post类型中间件
    }
  }
  // use\get\post 公用的方法
  register(path) {
    const info = {} //当前注册的信息
    if (typeof path === 'string') { //对应app.use\get\post后面是 路由的情况
      info.path = path
      // stack 当前注册的所有中间件的信息
      info.stack = slice.call(arguments, 1) // 除去第一个路由参数，从第2个开始转换成数组，存放在stack中
    } else { // 否则默认为根路由
      info.path = '/'
      // stack 当前注册的所有中间件的信息
      info.stack = slice.call(arguments, 0) //从第1个开始转换成数组，存放在stack中
      console.log('path = /', info.stack);

    }
    return info
  }
  // 实现use
  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }
  // 实现get
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }
  // 实现post
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }
  // 匹配可用的中间件
  match(method, url) {
    let stack = [] //所有匹配到的中间件
    if (url === '/favicon.icon') { //请求小图标，无需处理
      return stack
    }
    // 获取routes 和 它对应的中间件
    let currentRoutes = []
    currentRoutes = currentRoutes.concat(this.routes.all)
    currentRoutes = currentRoutes.concat(this.routes[method])

    currentRoutes.forEach(info => { // info:{path:'/',stack:[fun]}
      if (url.indexOf(info.path) === 0) { // 检测当前url是否包含currentRoutes里面的某个route  eg: /api/user/login  indexof /api
        stack = stack.concat(info.stack)
      }
    })

    return stack

  }
  // 核心 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配到的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next) //将next传递给下一个middleware
      }
    }
    next()
  }
  callback() {
    return (req, res) => {
      console.log('每次走callback')
      // 实现res.json方法
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()
      // 根据method和url匹配出需要使用哪些中间件
      const resultList = this.match(method, url)
      // 执行所有匹配到的中间件
      this.handle(req, res, resultList)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数

module.exports = () => {
  return new MyExpress()
}