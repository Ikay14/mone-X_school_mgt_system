const mongoose = require('mongoose')

const connectDB = (url, options) => {
    return mongoose.connect(url)
}

module.exports = connectDB