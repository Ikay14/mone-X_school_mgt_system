const express = require('express');

// Import models
const Teacher = require('../../models/Staff/teacher.model');
const Admin = require('../../models/Staff/admin.model');

// Import Error Handlers 
const { customError, bad, badRequest, notFound } = require('../../errors');

// Import Validator
const { teacherSchema } = require('../../middlewares/Staff/staff.validator');

const createTeacher = async (req, res) => {
    let adminID = req.user.userId;
    try {
        // Validate incoming data
        const validationResult = teacherSchema.validate(req.body);
        if (validationResult.error) {
            // Log the error details for debugging
            console.log(validationResult.error);  
            throw new badRequest({ message: 'Validation failed', errors: validationResult.error.details });
        } 

        // Destructure validated fields
        const { name, email, password } = validationResult.value;

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            throw new badRequest({ msg: 'Teacher already exists' });
        }  

        // Check if Admin exists
        const isAdmin = await Admin.findById(adminID);
        if (!isAdmin) {
            throw new notFound({ msg: 'Admin not found' });
        }

        // Create new Teacher
        const newTeacher = new Teacher({
            name,
            email,
            password,
            createdBy: isAdmin._id
        });

        await newTeacher.save();

        // Push teacherId to the reference field in Admin Document
        isAdmin.teachers.push(newTeacher._id);
        await isAdmin.save();

        res.status(201).json({ msg: `Success! ${isAdmin.name}, you've created a new teacher account for ${newTeacher.name}.` });
    } catch (error) {
        console.error(error);
        if (error instanceof customError) { 
            res.status(error.statusCode).json({ msg: error.message, errors: error.errors });
        } else {
            res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });  
        }
    }
};

const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // check if email and password is provided 
        if (!email || !password) {
           return res.status(404).json({ msg:`Please provide email and password`})
            };

        // check email is valid 
        const user = await Teacher.findOne({ email });
        if(!user){
            return res.status(404).json('Please provided valid email and password')
        };

        // check for password;
        const isPassValid = await user.comparePassword(password);
        if(!isPassValid){
            return res.status(404).json('Please provided valid email and password')
        };

        // create Token for the user 
        const Token = await user.createJWT();
        const result = {
            Teacher :
            {
                teacherId: user._id,
                email: user.email,
                role: user.role,
                teacherId: user.teacherId
            },
            Token
        };
        res.status(200).json({ msg: `Welcome back ${user.name}!`, result});
    } catch (error) {
       console.log(error); 
       res.status(500).json({ msg: 'Internal Server Error' });
    };
};

const getTeacher = async (req, res) => {
    // extract user id 
    let userId = req.user.userId
    try {
        // check for user 
        const user = await Teacher.findOne({ _id: userId })
        .select('-password -createdAt -updatedAt')
        // .populate('students')
        if(!user){
            throw new notFound('user not found')
        }
        res.status(200).json({msg: 'success', user})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const getAllTeacher = async (req, res) => {
    let userId = req.user.userId
    try {
        const user = await Teacher.find({})
        .select('-password -createdAt -updatedAt')
        // .populate('students')   
    res.status(200).json({ msg: 'success', nbHits: user.length, user})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const updateTeacher = async (req, res) => {
    let id = req.user.userId;
    try {
        const { name, email, password } = req.body;
        
        // Check if email exists already
        const emailExist = await Teacher.findOne({ email });
        if (emailExist && emailExist.Teacher._id !== id) {
            return res.status(401).json({ msg: 'Email is already in use' });
        }

        if (password) {
            // Update password
            const newPassword = await Teacher.findByIdAndUpdate(
                id,
                { password },
                { runValidators: true, new: true }
            ).select("-password -createdAt -updatedAt");

            return res.status(200).json({ msg: 'success', newPassword });
        } else {
            // If no password was provided, update name and email
            const updateTeacherInfo = await Teacher.findByIdAndUpdate(
                id,
                { name, email },
                { runValidators: true, new: true }
            ).select("-password -createdAt -updatedAt");

            return res.status(201).json({ msg: 'success', updateTeacherInfo });
        }
    } catch (error) {
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
        console.log(error);
    }
}

module.exports =
 {
    createTeacher,
    loginTeacher,
    getTeacher,
    getAllTeacher,
    updateTeacher
}
