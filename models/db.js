const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { useNewURLParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connected error!'))
db.once('open', function () {
    console.log('Connected to database!');
})

