const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const redisClient = require('../utils/redis')

async function signUp (email, password, name) {
  const user = await User.findOne({ email })
  if (user) {
    const err = new Error('Ya existe el usuario')
    err.status = 400
    throw err
  } else {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.insertMany({
      email,
      password: hash,
      name
    })
    return 'Usuario creado con exito'
  }
}

async function signin (email, password) {
  const user = await User.findOne({ email })
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = crypto.randomBytes(64).toString('hex')
    await redisClient.set(`session_${token}`, user.id)
    await redisClient.expire(`session_${token}`, 60 * 60 * 24)
    return token
  } else {
    const err = new Error('Usuario o contraseña incorrecta')
    err.status = 400
    throw err
  }
}

async function signOut (token) {
  await redisClient.del(`session_${token}`)
  return 'Cierre de sesion exitoso'
}

module.exports = {
  signin,
  signUp,
  signOut
}
