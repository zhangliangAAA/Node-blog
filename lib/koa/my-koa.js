const http = require('http')

// 组合中间件
function compose(middlewarelist) {
  return function(ctx) {
    function dispatch(i) {
      const fn = middlewarelist[i]
      try {
        return Promise.resolve(
          fn(ctx, dispatch.bind(null, i + 1))
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}

class Likekoa {
  constructor() {
    this.middlewarelist = []
  }
  use(fn) {
    this.middlewarelist.push(fn)
    return this
  }

  createContext(req, res) {
    const ctx = {
      req,
      res
    }
    return ctx
  }

  handleRequest(ctx, fn) {
    return fn(ctx)
  }

  callback() {
    const fn = compose(this.middlewarelist)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = Likekoa
