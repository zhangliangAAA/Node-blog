const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
  username = escape(username)
  password = genPassword(password)
  password = escape(password)
  const sql = `select username, realname from users where username=${username} and password=${password}`

  const loginData = await exec(sql)
  return (loginData[0] || {})
}

module.exports = {
  login
}

async function as() {
  const awData = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'zlh' })
    }, 1000);
  })
  return awData
}
