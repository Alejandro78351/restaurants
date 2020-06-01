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

  it('should try to do signup  and success', async () => {
    const res = await request(app)
      .post('/aut/signup')
      .send({ email: 'user2@mail.com', password: '43968', name: 'user2' })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('msg')
  })

  it('should try to do signup  and fail without fields', async () => {
    const res = await request(app)
      .post('/aut/signup')
      .send({ email: 'user3@mail.com', password: '777676' })
    expect(res.statusCode).toEqual(422)
    expect(res.body.error).toEqual([{ location: 'body', msg: 'Invalid value', param: 'name' }])
  })

  it('should try to do signup and user alredy created', async () => {
    await User.insertMany(user)
    const res = await request(app)
      .post('/aut/signup')
      .send({ email: 'user1@mail.com', password: '64333', name: 'User' })
    expect(res.statusCode).toEqual(400)
    expect(res.body.error).toEqual('Ya existe el usuario')
  })

  it('should try to do login with valid credentials and success', async () => {
    await User.insertMany(user)
    const res = await request(app)
      .post('/aut/signin')
      .send({ email: 'user1@mail.com', password: '12345' })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should try to do login with invalid credentials and fail', async () => {
    const res = await request(app)
      .post('/aut/signin')
      .send({ email: 'userfake@mail.com', password: '123457' })
    expect(res.statusCode).toEqual(400)
  })
})

const user = {
  email: 'user1@mail.com',
  password: '$2b$10$.pBvPIN4jTIsMsMGDuQuU.l9XQbH4r4RPqGBJmhOytlx2Dp9ogzMO',
  name: 'user1'
}
