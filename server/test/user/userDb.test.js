
const mongoose = require('mongoose')
const UserModel = require('../../models/User')
const userData = { name: 'TekLoon', email: 'rrr@rrr.com', password: 'Facebook' }

describe('User Model Test', () => {
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
    const validUser = new UserModel(userData)
    const savedUser = await validUser.save()
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined()
    expect(savedUser.name).toBe(userData.name)
    expect(savedUser.email).toBe(userData.email)
    expect(savedUser.password).toBe(userData.password)
  })

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new UserModel({ name: 'TekLoon', email: 'b@b.com', password: '12345', nickname: 'Handsome TekLoon' })
    const savedUserWithInvalidField = await userWithInvalidField.save()
    expect(savedUserWithInvalidField._id).toBeDefined()
    expect(savedUserWithInvalidField.nickkname).toBeUndefined()
  })

  // Test Validation is working!!!
  // It should us told us the errors in on gender field.
  it('create user without required field should failed', async () => {
    const userWithoutRequiredField = new UserModel({ name: 'TekLoon' })
    await expect(userWithoutRequiredField.save()).rejects.toBeInstanceOf(mongoose.Error.ValidationError)
  })
})
