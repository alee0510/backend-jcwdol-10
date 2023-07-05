import cypto from 'crypto'
const secret = cypto.randomBytes(32).toString('hex')
console.log(secret)
