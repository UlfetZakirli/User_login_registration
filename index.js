const express = require('express')
require('dotenv').config()
const cors = require('cors')
require('colors')
require('./config/db.js')
const bodyParser = require('body-parser')
const RouterUser = require('./routes/auth.js')
const RouterProduct = require('./routes/products.js')
const VerifyToken = require('./middleware/tokenVerify.js')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/users', RouterUser)
app.use('/api/products', VerifyToken, RouterProduct)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`.blue.bold))