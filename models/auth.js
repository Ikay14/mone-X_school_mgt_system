const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true
    },
    password: {
        type:String,
        required: true,
        minLength: 6,
        maxLength: 15
    }
})
authSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

authSchema.methods.CreateJWT = async function () {
    return jwt.sign(
        {
            userId: this._id, name: this.name
        },
        process.env.JWT_SECRET, 
        {
            expiresIn: JWT_LIFETIME
        }

    )
}

authSchema.methods.comparePassword = async function (enteredPassword) {
    const isPasswordMatch = await bcrypt.compare(enteredPassword, this.password)
    return isPasswordMatch
}

module.exports = mongoose.model('auth', authSchema ) 