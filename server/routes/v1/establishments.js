const express = require('express')
const wrapper = require('../../utils/wrapper')

const app = express()
const establishmentService = require('../../services/establishmentService')

// Get Establisments
app.get('/v1/establishments', wrapper(async (req, res) => {
  const resp = await establishmentService.findByLocation(req.query.lat, req.query.lon, req.query.city, req.userId)
  res.send(JSON.parse(resp))
}))

module.exports = app
