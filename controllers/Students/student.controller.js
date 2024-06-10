const express = require('express');
const bcrypt = require('bcrypt')

// Importing models
const Admin = require('../../models/Staff/admin.model');
const Student = require('../../models/Students/student.model');

// Importing Joi schema for validation
const { studentSchema } = require('../../middlewares/Students/validation');

// Importing custom error classes
const { customError, badRequest, unauthenticated, notFound } = require('../../errors');

const regStudent = async (req, res) => {
    const adminId = req.user.userId;
    try {
        const { error, value } = studentSchema.validate(req.body);
        // Check for validation error
        if (error) {
            return res.status(400).json({ message: 'Validation failed', errors: error.details });
        }

        // Destructure validated fields
        const { name, email, password, Department } = value;

        // Check if Student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            res.status(400).json('Student already exists');
        }

        // Check if Admin exists before registration
        const isAdmin = await Admin.findById(adminId);
        if (!isAdmin) {
            res.status(400).json('Admin not found');
        }

        // Create new Student
        const newStudent = new Student({
            name,
            email,
            password,
            Department,
            createdBy: isAdmin._id
        });

        // Save new Student instance to DB
        await newStudent.save();

        // Push StudentId to the reference field in Admin Document
        isAdmin.students.push(newStudent._id);
        await isAdmin.save();

        res.status(201).json({ msg: `Success! ${isAdmin.name}, you've created a new student account for ${newStudent.name}.`, newStudent });
    } catch (error) {
        console.error(error);
        if (error instanceof customError) {
            res.status(error.statusCode).json({ msg: error.message, errors: error.errors });
        } else {
            res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
        }
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, matricNumber, password } = req.body

        // check if email and Password
        if(!email || !password || !matricNumber) {
            return res.status(400).json({ msg: 'Please provide email, password and matricNumber' })
        }
        const student = await Student.findOne({ email })
        if(!student){
           return res.status(400).json({ msg: 'please provide valid email, password and matricNumber'})
        }
        const isPassValid = await student.comparePassword(password)
        if(!isPassValid){
           return res.status(400).json({msg: 'please provide valid email, password and matricNumber'})
        }
         // create Token for the user 
         const Token = await student.createJWT();
         const result = {
             Student :
             {
                 studentId:student._id,
                 email: student.email,
                 role: student.role,
                 matricNumber: student.matricNumber
             },
             Token
         };
         res.status(200).json({ msg: `Welcome back ${student.name}!`, result});
    } catch (error) {
        console.log(error); 
       res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const getStudent = async (req, res) => {
    let studentId = req.user.userId
    try {
        const student = await Student.findOne({ _id: studentId }) 
        .select('-password -createdAt -updatedAt')
        // check for 
        if(!student){
           res.status(402).json('user does not exist')
        }
        res.status(200).json({ message: 'success', student})
        
        } catch (error) {
            res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
            console.log(error);
        }
}

const getAllStudentByAdmin = async (req, res) => {
    try {
        const admin = req.user.userId;

        // Check if user is authorized to query Student 
        const isAdmin = await Admin.findById(admin);
        if (!isAdmin) {
            return res.status(404).json({ msg: 'Unauthorized request!' });
        }

        // Destructure query object
        const { name, classLevel, Department, isSuspended, isWithdrawn, yearGraduated, dateAdmitted, isGraduated, page, limit, sort } = req.query;

        // Create queryObject
        const query = {};

        // Query name
        if (name) {
            query.name = new RegExp(name, 'i'); // Regular expression "i" means the name search query will be case insensitive
        }

        // Query classLevel
        if (classLevel) {
            query.classLevel = classLevel;
        }

        // Query Department
        if (Department) {
            query.Department = new RegExp(Department, 'i');
        }

        // Query isSuspended
        if (isSuspended) {
            query.isSuspended = isSuspended === 'true' || 'false';
        }

        // Query isWithdrawn
        if (isWithdrawn) {
            query.isWithdrawn = isWithdrawn === 'true' || 'false';
        }

        // Query yearGraduated
        if (yearGraduated) {
            query.yearGraduated = yearGraduated;
        }

        // Query dateAdmitted
        if (dateAdmitted) {
            query.dateAdmitted = { $gte: new Date(dateAdmitted) };
        }

        // Query isGraduated
        if (isGraduated) {
            query.isGraduated = isGraduated === 'true' || 'false';
        }

        // Pagination and sorting
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        let studentQuery = Student.find(query);

        // Perform sorting
        if (sort) {
            const sortList = sort.split(',').join(' ');
            studentQuery = studentQuery.sort(sortList);
        }

        // Perform pagination
        studentQuery = studentQuery.skip(skip).limit(limitNumber);

        // Query DB
        const students = await studentQuery;

        res.status(200).json({ msg: 'success', nbHits: students.length, students });
    } catch (error) {
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};


const getStudentByAdmin = async (req, res) => {
    const { studentId } = req.params;
    const adminId = req.user.userId;

    try {
        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: 'Student does not exist' });
        }
        console.log(studentId);
        console.log(student);
        // Find the admin by ID
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }
        // If both exist, return success with student data
       return res.status(200).json({ msg: 'Success', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};

const adminUpdateStudentInfo = async (req, res) => {
    const { studentId } = req.params;
    const adminID = req.user.userId
    try {
        // \Check if authorized to Update student Data
        const isAdmin = await Admin.findById(adminID) 
        if(!isAdmin){
            return res.status(404).json({ msg: 'Unauthorized access, Admin Not Found'})
        }
        const { name, email } = req.body

        // check if email exists in Students 
        const existingEmail = await Student.findOne({ email })
        if(existingEmail && existingEmail._id !== studentId){
           return res.status(401).json({ msg: 'Email is already in use'})
        }

        // check if student exist 
        const isStudentExist = await Student.findById(studentId)
        if(!isStudentExist){
           return res.status(404).json({ msg: 'Student Not Found'})
        }

        const updatedInfo = await Student.findByIdAndUpdate(
            studentId,
            { $set: {
                name,
                email
            }
            },
                {
                    new: true, runValidators: true
                },
        )
        res.status(200).json({ msg: 'success', updatedInfo})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR'})
    }
}

const studentUpdateStudentProfile = async (req, res) => {
    try {
        // Destructure student id
        const studentId = req.user.userId;
        
        // Destructure name, email, and password from request body
        const { name, email, password } = req.body;

        // Check if email exists
        const emailExist = await Student.findOne({ email });
        if (emailExist && emailExist._id.toString() !== studentId) {
            return res.status(400).json({ msg: 'Email is already in use' });
        }

        // Check if password is provided 
        if (password) {
            // Update password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newPassword = await Student.findByIdAndUpdate(
                studentId,
                { password: hashedPassword },
                { runValidators: true, new: true }
            ).select("-createdAt -updatedAt");
            return res.status(200).json({ msg: 'Password updated successfully', student: newPassword });
        } else {
            // If password is not provided, update name or email
            const updatedStudentInfo = await Student.findByIdAndUpdate(
                studentId,
                { name, email },
                { runValidators: true, new: true }
            ).select("-password -createdAt -updatedAt");
            return res.status(200).json({ msg : 'Profile updated successfully', student: updatedStudentInfo });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
}
module.exports = {
    regStudent,
    loginStudent,
    getStudent,
    getAllStudentByAdmin,
    getStudentByAdmin,
    adminUpdateStudentInfo,
    studentUpdateStudentProfile
};
