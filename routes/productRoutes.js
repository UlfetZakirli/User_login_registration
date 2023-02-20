const express = require('express')
require('../models/db.js')
const Product = require('../models/Product.js')



const router = express.Router()

router.get('/', (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            res.json(err)
        })
})


router.get('/:id', (req, res) => {
    const { id } = req.params
    Product.findById(id)
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
})


router.post('/', (req, res) => {
    const { name, price, description } = req.body
    const product = new Product(req.body)
    product.save()
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
})


router.patch('/:id', (req, res) => {
    const { id } = req.params
    Product.findByIdAndUpdate(id, req.body)
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Product.findByIdAndDelete(id)
        .then(() => {
            res.json('The product deleted successfully!')
        })
        .catch((err) => {
            res.json(err)
        })
})



module.exports = router