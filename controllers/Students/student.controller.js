const express = require('express')

// Importing student model
const studentModel = require('../../models/studentModel')

// Importing Joi schema for validation
const { userSchema, auth } = require('../../middlewares/validation')

// Importing error messages
const { customError, badRequest, unauthenticated, notFound } = require('../../errors')
const { validate } = require('../../models/auth')

const regStudent = async (req, res) => {
    try {
        // Validate incoming request using Joi schema
        const {error, value} = userSchema.validate(req.body)

        // Check for validation error
        if (error) {
            return res.status(400).json({ error: validationResult.error.details[0].message })
        }

        // create a full name 
        const fullName = [req.body.first_name, req.body.middle_name, req.body.last_name]
    .filter(Boolean).join(' ')

        // Create a new instance of the student model with validated data
        const newStudent = new studentModel({
            value,
            fullName
        })

        // Save the student
        await newStudent.save()
        const token = newStudent.createJWT()

        // Send success response
        res.status(201).json({ message: `${fullName} your registration is successful!!!`, newStudent })
    } catch (error) {
        console.error('Error registering student:', error)
        res.status(500).json({ error: 'internal server error'})
    }
}

const getStudentProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const student = await studentModel.findOne({ __id: userId })

        if (!student) {
            throw new badRequest('No student record found')
        }
        return res.status(200).json({ student })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const updateStudentProfile = async (req, res) => {
    try {
        const userId = req.params.id
        updateData = req.body

        if(!updateData || Object.keys(updateData).length === 0){
            throw new badRequest('Please PROVIDE update data')
        }

        if(req.user.userId !== userId){
            throw new unauthenticated('you are NOT authorized to update this user')
        }
        const student = await studentModel.findByIdAndUpdate(
            userId,
            req.body,
            { new: true, runValidators: true}
        )
        if(!student){
            throw new notFound(`Student with record  ${userId} not found`)
        }
        return res.status(200).json({ student })
    } catch (error) {
        console.error(error)
        if (error instanceof badRequest || error instanceof unauthenticated || error instanceof notFound) {
            return res.status(error.statusCode).json({ error: error.message })
        } else {
            return res.status(500).json({ error: 'Internal server error' })
     }
    }
}



module.exports = 
{ 
    regStudent,
    getStudentProfile,
    updateStudentProfile

};
