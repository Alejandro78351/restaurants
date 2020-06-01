const express = require('express')
const router = express.Router()
const debug = require('debug')('backend:routes:aut')
const wrapper = require('../utils/wrapper')
const autService = require('../services/autService')
const { check, validationResult } = require('express-validator')

// Sign in
router.post('/aut/signin', [
  check('email').isEmail()
], wrapper(async (req, res) => {
  debug('SignIn')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  } else {
    const { email, password } = req.body
    res.send({ token: await autService.signin(email, password) })
  }
}))

// Sign up
router.post('/aut/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  check('name').not().isEmpty()
], wrapper(async (req, res) => {
  debug('SignUp')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  } else {
    const { email, password, name } = req.body
    res.send({ msg: await autService.signUp(email, password, name) })
  }
}))

// Sign out
router.post('/aut/signout', wrapper(async (req, res) => {
  debug('SignOut')
  res.send({ token: await autService.signOut(req.get('Authorization')) })
}))
module.exports = router
