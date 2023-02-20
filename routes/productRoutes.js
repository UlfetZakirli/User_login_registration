const express = require('express')
require('../models/db.js')
const Product = require('../models/Product.js')

const router = express.Router()

router.get('/', (req, res) => {
    res.json('it works')
})


module.exports = router