const redisClient = require('../utils/redis')

const validateToken = async function (req, res, next) {
  const userId = await redisClient.get(`session_${req.get('Authorization')}`)
  if (userId) {
    req.userId = userId
    return next()
  } else {
    const err = new Error('Usuario no autorizado')
    err.status = 401
    return next(err)
  }
}

module.exports = validateToken
