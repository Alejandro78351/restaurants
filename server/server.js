require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
  if (err) throw err
  app.listen(process.env.PORT, () => {
    console.log('Port: ', process.env.PORT)
  })
})
