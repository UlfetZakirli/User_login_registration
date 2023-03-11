const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const validateRegister = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(355).required()
    })
    return schema.validate(user)
}

const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}


exports.userRegister = (req, res) => {
    const { error } = validateRegister(req.body)
    if (error) {
        return res.status(404).json(error.details[0].message)
    }
    const { name, email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const user = new User({
        name,
        email,
        password: hash
    })
    user.save()
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY)
            res.header('Authorization', token).json({ accessToke: token })
        })
        .catch((err) => {
            return res.json(err)
        })
}

exports.userLogin = (req, res) => {
    const { error } = validateLogin(req.body)
    if (error) {
        return res.status(404).json(error.details[0].message)
    }
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json('Invalid email or password!')
    }

    User.findOne({
        email
    })
        .then((user) => {
            const decoded = bcrypt.compareSync(password, user.password)
            if (!decoded) {
                return res.status(400).json('Invalid email or password!')
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY)
            res.header('Authorization', token).json({ accessToken: token })
        })
        .catch((err) => {
            return res.json(err)
        })
}