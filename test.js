import cypto from 'crypto'
const secret = cypto.randomBytes(64).toString('hex')
console.log(secret)
