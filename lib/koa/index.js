const Koa = require('./my-koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  console.log('第1层洋葱 开始')
  await next();
  const rt = ctx['X-Response-Time'];
  console.log('第1层洋葱 结束')
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('第2层洋葱 开始')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx['X-Response-Time'] = `${ms}ms`;
  console.log('第2层洋葱 结束')
});

// response

app.use(async ctx => {
  console.log('第3层洋葱 开始&结束')
  ctx.res.end('Hello World');
});

app.listen(3000);