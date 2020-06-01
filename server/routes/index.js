const express = require('express')

const app = express()

app.use(require('./aut'))
app.use(require('./v1/establishments'))
app.use(require('./v1/transactions'))

module.exports = app
