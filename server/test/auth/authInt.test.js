const dbHandler = require('../dbHandler')
const autService = require('../../services/autService')
const User = require('../../models/User')
const redisClient = require('../../utils/redis')

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect())

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase())

/**
 * Close database and disconnect redis
 *
 */
afterAll(async () => {
  await dbHandler.closeDatabase()
  await redisClient.disconnect()
})

/**
 *
 * Integration test
 */

describe('auth ', () => {
  it('Sign in succes', async () => {
    await User.insertMany(user)
    const data = await autService.signin('user1@mail.com', '12345')
    expect(data).toBeDefined()
  })

  it('Sign up success', async () => {
    const data = await autService.signUp('user4@mail.com', 'fdffds', 'user4')
    expect(data).toMatch('Usuario creado con exito')
  })

  it('Sign up error', () => {
    return expect(autService.signUp('user3@mail.com', '6re789')).rejects.toThrow('User validation failed: name: El nombre es necesario')
  })

  it('Sign in wrong credentials and fail', async () => {
    await User.insertMany(user)
    await expect(autService.signin('user1@mail.com', 'gefjhebhj')).rejects.toThrow('Usuario o contraseña incorrecta')
    await expect(autService.signin('usercre@mail.com', '12345')).rejects.toThrow('Usuario o contraseña incorrecta')
  })
})

const user = {
  email: 'user1@mail.com',
  // hash 12345
  password: '$2b$10$.pBvPIN4jTIsMsMGDuQuU.l9XQbH4r4RPqGBJmhOytlx2Dp9ogzMO',
  name: 'user1'
}
