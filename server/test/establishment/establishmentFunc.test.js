
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')
let server
const User = require('../../models/User')
const redisClient = require('../../utils/redis')

describe('User Authenticated Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.URLDBTEST)
    await new Promise((resolve, reject) => {
      server = app.listen(process.env.PORT, () => {
        console.log('Port: ', process.env.PORT)
        resolve()
      })
    })
  })

  afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
    }
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await server.close()
    await redisClient.disconnect()
  })

  it('should try to do login and get establishments', async () => {
    await User.insertMany(user)
    const res = await request(app)
      .post('/aut/signin')
      .send({ email: 'user1@mail.com', password: '12345' })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')

    const trans = await request(app)
      .get('/v1/establishments')
      .set('Authorization', res.body.token)
    expect(trans.statusCode).toEqual(200)
  })
})

const user = {
  email: 'user1@mail.com',
  password: '$2b$10$.pBvPIN4jTIsMsMGDuQuU.l9XQbH4r4RPqGBJmhOytlx2Dp9ogzMO',
  name: 'user1'
}
