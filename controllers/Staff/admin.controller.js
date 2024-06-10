const express = require('express');

// Import models 
const Admin = require('../../models/Staff/admin.model');

// Import error handlers 
const {  notFound, badRequest } = require('../../errors');


// Import validator
const { adminSchema } = require('../../middlewares/Staff/staff.validator');


const registerAdmin = async (req, res) => {
    try {
        // Validate incoming data
        const validationResult = adminSchema.validate(req.body);
        if (validationResult.error) {
            // Log the error details for debugging
            console.log(validationResult.error);  
            return res.status(400).json({ message: 'Validation failed', errors: validationResult.error.details });
        }

        // Destructure validated fields
        const { name, email, password } = validationResult.value;

        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new instance of the Admin model
        const newAdmin = new Admin({
            name,
            email,
            password,
        });

        // Save admin to DB
        await newAdmin.save();
        // Send response
        res.status(201).json({ message: `${name} you're registered successfully!` });

    } catch (error) {
        console.error('Error registering Admin:', error.message);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        // check for entered details
        if(!email || !password ){
          return  res.status(400).json({ msg: 'Please enter email and password' });

        }
        // check for email
        const user = await Admin.findOne({ email }) 
        if(!user){
           return res.status(400).json({ msg: 'Entered email and password incorrect, try again' });

        }
        // check for password
        const isPassValid = await user.comparePassword(password)
        if(!isPassValid){
            return res.status(400).json({ msg: 'Entered email and password incorrect, try again' });

        }

        const Token = user.createJWT()
        const result = {
            user: {
                adminId  : user._id,
                name : user.name,
                email: user.email,
                role : user.role
            },
            Token
        }
        res.status(200).json({ message: 'Success', result})
    } catch (error) {
        console.error('Error accessing Admin:', error.message);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
}

const getAdmin = async (req, res) => {
    try {
    const id = req.user.userId
    console.log(id);
    const admin = await Admin.findOne({ _id: id })
    .select('-password -createdAt -updatedAt')
    .populate('teachers')
    // .populate('students');
    if(!admin){
        throw new notFound('user does not exist')
    }
    console.log('Populated Admin Object:', admin);

    res.status(200).json({ message: 'success', admin})
    
    } catch (error) {
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
        console.log(error);
    }
}

const getAllAdmin = async (req, res) => {
    try {
        const allAdmin = await Admin.find({})
        .select("-password -createdAt -updatedAt")
        res.status(200).json(allAdmin)
    } catch (error) {
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' }) 
    }
}

const updateAdmin = async (req, res) => {
    let id = req.user.userId;
    try {
        const { name, email, password } = req.body;
        
        // Check if email exists already
        const emailExist = await Admin.findOne({ email });
        if (emailExist) {
            return res.status(401).json({ msg: 'Email is already in use' });
        }

        if (password) {
            // Update password
            const newPassword = await Admin.findByIdAndUpdate(
                id,
                { name, email, password },
                { runValidators: true, new: true }
            ).select("-password -createdAt -updatedAt");

            return res.status(200).json({ msg: 'success', newPassword });
        } else {
            // If no password was provided, update name and email
            const updateAdminInfo = await Admin.findByIdAndUpdate(
                id,
                { name, email },
                { runValidators: true, new: true }
            ).select("-password -createdAt -updatedAt");

            return res.status(201).json({ msg: 'success', updateAdminInfo });
        }
    } catch (error) {
        if (error instanceof customError) { 
            res.status(error.statusCode).json({ msg: error.message, errors: error.errors });
        } else {
            res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });  
        }
    }
}



module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmin,
    getAllAdmin,
    updateAdmin
};
