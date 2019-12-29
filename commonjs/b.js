const { add, mul } = require('./a')
const _ = require('lodash')

let sum = add(10, 20)
let m = mul(2, 6)
console.log(sum, m);

const arr = _.concat([1, 2], 3)
console.log('arr...', arr)

const env = process.env;

console.log('-----+++++', env)
