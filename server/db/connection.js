const monk = require('monk')

require('dotenv').config()

const connectionString = process.env.DB_HOST
const db = monk(connectionString)

module.exports = db