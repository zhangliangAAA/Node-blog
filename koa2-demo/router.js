const router = require('koa-router')()
const fs = require('fs')

router.get('/list', async (ctx, next) => {
  const dd = await readJson()
  ctx.body = JSON.stringify(dd)
})

function readJson() {
  return new Promise((resolve, reject) => {
    fs.readFile('./list.json', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data))
    })
  })
}

module.exports = router



