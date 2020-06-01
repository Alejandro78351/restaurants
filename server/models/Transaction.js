const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  lat: {
    type: String
  },
  lon: {
    type: String
  },
  city: {
    type: String
  },
  userId: {
    type: String,
    required: [true, 'userId necesario']
  }
})

transactionSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Transaction', transactionSchema)
