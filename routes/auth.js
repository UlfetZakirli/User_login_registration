const express = require('express')
const User = require('../models/User.js')
const Joi = require('joi')

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
        password: Joi.string().require()
    })
    return schema.validate(user)
}

router.post('/register', (req, res) => {
    const { name, email, password } = req.body
    const user = new User(req.body)

    const { error } = registerValidate(req.body)
    if (error) {
        return res.status(404).json(error.details[0].message)
    }
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

})


module.exports = router