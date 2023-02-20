const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
require('colors')
const ProductRoutes = require('./routes/productRoutes.js')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/products', ProductRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`.blue.bold))
