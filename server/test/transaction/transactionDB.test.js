
const mongoose = require('mongoose')
const TransactionModel = require('../../models/Transaction')
const transactionData = { lat: '543534.543', lon: '543534.534', city: 'NY', userId: '4374365' }

describe('Transaction Model Test', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(process.env.URLDBTEST)
  })
  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('create & save user successfully', async () => {
    const validTr = new TransactionModel(transactionData)
    const savedTr = await validTr.save()
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedTr._id).toBeDefined()
    expect(savedTr.lat).toBe(transactionData.lat)
    expect(savedTr.lon).toBe(transactionData.lon)
    expect(savedTr.city).toBe(transactionData.city)
    expect(savedTr.userId).toBe(transactionData.userId)
  })

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const trWithInvalidField = new TransactionModel({ lat: '543534.543', lon: '55333.534', city: 'Madrid', userId: '283473', nickname: 'Handsome TekLoon' })
    const savedTrWithInvalidField = await trWithInvalidField.save()
    expect(savedTrWithInvalidField._id).toBeDefined()
    expect(savedTrWithInvalidField.nickkname).toBeUndefined()
  })

  // Test Validation is working!!!
  // It should us told us the errors in on gender field.
  it('create user without required field should failed', async () => {
    const trWithoutRequiredField = new TransactionModel({ lat: '543534.543', lon: '543534.534', city: 'Madrid' })
    await expect(trWithoutRequiredField.save()).rejects.toBeInstanceOf(mongoose.Error.ValidationError)
  })
})
