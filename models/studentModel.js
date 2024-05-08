const { string } = require('joi')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required :true,
        trim: true
    },
    last_name: {
        type: String,
        required :true,
        trim: true
    },
    middle_name: {
        type: String,
        required :true,
        trim: true
    },
    contact_information:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Department:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    PlaceOfOrigin: {
        type: String
    }
})

module.exports = mongoose.model('studentModel', studentSchema)