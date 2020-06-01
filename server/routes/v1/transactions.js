const express = require('express')
const router = express.Router()
const wrapper = require('../../utils/wrapper')
const transactionService = require('../../services/transactionService')

// Get transaction
router.get('/v1/transactions', wrapper(async (req, res) => {
  const resp = await transactionService.findByUserId(req.userId)
  res.send(resp)
}))

module.exports = router
