const express = require('express')
const User = require('../models/User.js')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const router = express.Router()

const registerValidate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(6).max(255).email().required(),
        password: Joi.string().min(6).max(255).required()
    })
    return schema.validate(user)
}

const loginValidate = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}

router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    const { error } = registerValidate(req.body)
    if (error) {
        return res.status(404).json(error.details[0].message)
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user = new User({ ...req.body, password: hash })

    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
})


router.post('/login', (req, res) => {
    const { email, password } = req.body
    const { error } = loginValidate({ email, password })
    if (error) {
        return res.status(404).json(error.details[0].message)
    }
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(400).json('Invalid email or password!')
            }
            const isValid = bcrypt.compareSync(password, user.password)
            if (!isValid) {
                return res.status(400).json('Invalid email or password!')
            }
            res.json(user)
        })
        .catch(() => {
            res.status(400).json('Invalid email or password!')
        })


})


module.exports = router