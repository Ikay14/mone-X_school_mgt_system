const express = require('express')

// Import models
const Teacher = require('../../models/Staff/teacher.model')
const Admin = require('../../models/Staff/admin.model')

// Import Error Handlers 
const { customError, bad, badRequest, notFound } = require('../../errors')

// Import Validator
const { teacherSchema } = require('../../middlewares/Staff')

const createTeacher = async (req, res) => {
    let adminID = req.user.userId
    try {
        // Validate incoming data
         const validationResult = teacherSchema.validate(req.body);
         if (validationResult.error) {

        // Log the error details for debugging
         console.log(validationResult.error);  
            throw new badRequest({ message: 'Validation failed', errors: validationResult.error.details })
    } 

        // Destructure validated fields
         const { name, email, password } = validationResult.value;

        //  check if teacher already exist
         const existingTeacher = await Teacher.findOne({ email })
         if (existingTeacher){
           throw new badRequest({ msg: 'Teacher already exists' })
         }  

         //  check if Admin exist
         const isAdmin = await Admin.findById(adminID)
            if(!isAdmin){
                throw new notFound({ msg: 'Admin not found' })
            }
         
        // create new Teacher
            const newTeacher = new Teacher({
                name,
                email,
                password,
                createdBy: isAdmin._id
            })
            
        // push teacherId to the reference field in Admin Document
            isAdmin.teachers.push(createTeacher._id)
            await isAdmin.save()

        res.status(201).json({ msg: 'success', newTeacher})
    }   catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' })
    }
}

module.exports = {
    createTeacher
}

