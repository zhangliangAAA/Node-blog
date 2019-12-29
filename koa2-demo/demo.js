const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  console.log('第1层洋葱 开始')
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log('第1层洋葱 结束')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('第2层洋葱 开始')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('第2层洋葱 结束')
});

// response

app.use(async ctx => {
  console.log('第3层洋葱 开始&结束')
  ctx.body = 'Hello World';
});

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});

app.listen(3000);