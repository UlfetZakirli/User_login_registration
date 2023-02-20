const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        minlength: 6,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema)