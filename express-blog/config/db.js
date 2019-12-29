const env = process.env.NODE_ENV

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'myblog'
}

let REDIS_CONF = {
  host: '127.0.0.1',
  port: '6379'
}


if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF = {
    host: '127.0.0.1',
    port: '6379'
  }
}
if (env === 'test') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF = {
    host: '127.0.0.1',
    port: '6379'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}