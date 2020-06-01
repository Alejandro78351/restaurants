const Transaction = require('../models/Transaction')

async function create (transaction) {
  return Transaction.insertMany(transaction)
}
async function findByUserId (userId) {
  return Transaction.find({ userId })
}
module.exports = {
  create,
  findByUserId
}
