const redis = require('redis')
// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.on('error', err => {
  console.log('err', err);
})
// 测试
redisClient.set('myobj', JSON.stringify({ name: 'lisi', uid: 110, age: 28 }), redis.print)
redisClient.get('myobj', (err, val) => {
  if (err) {
    console.log('err-', err);
  }
  console.log('====================================');
  console.log(val);
  console.log('====================================');

  // 退出
  redisClient.quit()
})

