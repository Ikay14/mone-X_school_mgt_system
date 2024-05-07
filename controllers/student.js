const express = require('express')
const student = require('../models/studentModel')

const { StatusCodes} = require('http-status-codes')

const regStudent = async (req, res) => {
    const { first_name, 
            last_name,
            middle_name,
            contact_information,
            gender,
            Department,
            address,
            dateOfBirth,
            PlaceOfOrigin } = req.body

}

if ()
