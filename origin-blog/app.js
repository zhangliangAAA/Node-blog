const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  const resData = {
    name: '德玛西亚',
    site: 'demaxiya',
    env: process.env.NODE_ENV
  }
  console.log('node-env', process.env.NODE_ENV)
  res.end(
    JSON.stringify(resData)
  )
}
module.exports = serverHandle