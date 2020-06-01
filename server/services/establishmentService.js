const transactionService = require('./transactionService')
const zomato = require('zomato')
const client = zomato.createClient({
  userKey: process.env.ZOMATO
})

async function findByLocation (lat, lon, city, userId) {
  await transactionService.create({ lat, lon, city, userId })
  try {
    const establishments = await getEstablishments(lat, lon, city)
    return establishments
  } catch (e) {
    const error = new Error(`Error findByLocation  ${e}`)
    error.status = 400
    throw error
  }
}

function getEstablishments (lat, lon, city) {
  return new Promise((resolve, reject) => {
    client.getEstablishments({
      city_id: city, // id of the city for which collections are needed
      lat, // latitude
      lon // longitude
    }, function (err, result) {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  findByLocation
}
