const Product = require('../models/Product.js')


exports.getProducts = (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            return res.json(err)
        })
}

exports.getProduct = (req, res) => {
    const { id } = req.params
    Product.findById(id)
        .then((product) => {
            res.json(product)
        })
        .catch(() => {
            return res.status(404).json('The product was not found with the given id!')
        })
}

exports.createProduct = (req, res) => {
    const product = new Product(req.body)
    product.save()
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            return res.json(err)
        })
}

exports.updateProduct = (req, res) => {
    const { id } = req.params
    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then((product) => {
            return res.json(product)
        })
        .catch(() => {
            return res.json('The product was not found with the given id!')
        })
}

exports.deleteProduct = (req, res) => {
    const { id } = req.params
    Product.findByIdAndDelete(id)
        .then(() => {
            res.json('The Product deleted successfully!')
        })
        .catch((err) => {
            return res.json(err)
        })
}

