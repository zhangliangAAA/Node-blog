const http = require('http')
const serverHandle = require('../app')
const PORT = 8880

const server = http.createServer(serverHandle)
console.log(`server is runing at localhost://${PORT}`)
server.listen(PORT)