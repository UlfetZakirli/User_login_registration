const express = require('express')
const { getProducts, getProduct, createProduct, updateProduct,deleteProduct } = require('../controllers/product.controller.js')

const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.patch('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router
