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

            try {
            const profile = await student.create({ 
                first_name, 
                last_name,
                middle_name,
                contact_information,
                gender,
                Department,
                address,
                dateOfBirth,
                PlaceOfOrigin })
      
            const fullName = [ first_name, middle_name, last_name]
            .filter(Boolean)
            .join(' ')

            res.status(StatusCodes.CREATED)
            .json({ profile: { fullName }, message : 'Your profile is created successfully'})
        } catch (error) {
            console.log(error);
        }
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: 'Internal Server Error' })
          }  

module.exports = {regStudent}