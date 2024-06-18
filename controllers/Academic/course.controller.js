const express = require('express');

// import models
const Course = require('../../models/Academics/course.model');
const Admin = require('../../models/Staff/admin.model');
const Department = require('../../models/Academics/department.model')

// import validator 
const { validateCourse } = require('../../middlewares/Academic/academic.validator');


const createCourse = async (req, res) => {
    let adminID = req.user.userId
    let departmentId = req.params.id
    try {
        // validate client Data
        const { error, value } = validateCourse.validate(req.body)

        // check for error
        if(error){
            return res.status(400).json({ message: 'Validation failed', errors: error.details });
        }

        const isDepartment = await Department.findById(departmentId);
        if (!isDepartment)
          return res.status(402).json({ msg: 'department Not Found' });

        // Destructure validated data from Value Object
        const { name, description, semester, createdBy, duration } = value;

        // check if course exist already 
        const existingCourse = await Course.findOne({ name });
        if(existingCourse){
            return res.status(400).json({ msg: 'Oops Course exists already' })
        }

        // create new Course
        const newCourse = new Course({
            name,
            description,
            semester,
            createdBy: adminID,
            duration
        });

        // save course
        await newCourse.save();

        // check for authorization
        const admin = await Admin.findById(adminID);
        if(!admin){
            return res.status(404).json({ msg: 'Unauthorized access, Not Admin'})
        }

        // attribute Course to admin that created it
        admin.course.push(newCourse._id);
        await admin.save();

        // attribute Course to department
        isDepartment.course.push(newCourse._id);
        await isDepartment.save();

        res.status(200).json({ msg: 'success',
            course: newCourse
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR'});
    }
};

const AdminGetCourse = async (req, res) => {
    try {
        const isAdmin = req.user.userId;
        const courseId = req.params.id;
        
        // Check if the user is an admin
        const admin = await Admin.findById(isAdmin)
        if(!admin){
            return res.status(400).json({
                msg: 'Unauthorized access, Not Admin'
            });
        }
        // Find the course by ID
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({
                msg: 'Oops Course does not exist'
            });
        }    
        // Return the course details
        return res.status(200).json({
            msg: 'Success',
            course 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR'});
    }
};

const getAllCourse = async (req,res) => {
    try {
        const course = await Course.find({});
        return res.status(200).json({
            msg: 'success', course
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR'});
    }
};

const updateCourse = async (req, res) => {
    const { name, description, duration, semester } = req.body
    try {
        const isAdmin = req.user.userId;
        const courseId = req.params.id; 

         // Check if the user is an admin
         const admin = await Admin.findById(isAdmin)
         if(!admin){
             return res.status(400).json({
                 msg: 'Unauthorized access, Not Admin'
             });
         }

         // Find the course by ID
         const course = await Course.findOne({ name })
         if(course){
             return res.status(400).json({
                 msg: 'Oops Course exist'
             });
         } 
         
        //  update course details
        const updatedInfo = Course.findByIdAndUpdate(
        courseId,
         {
            name,
            description,
            duration,
            semester
        },
        { new: true, runValidators: true}
    );

    return res.status(200).json({ msg : 'Course updated successfully', newCourse: updatedInfo }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR'});   
    }
};

const deleteCourse = async (req, res) => {
    try {
        const isAdmin = req.user.userId;
        const courseId = req.params.id; 


         // Check if the user is an admin
         const admin = await Admin.findById(isAdmin)
         if(!admin){
             return res.status(400).json({
                 msg: 'Unauthorized access, Not Admin'
             });
         }
        //  delete course
         const del = await Course.findByIdAndDelete(courseId)
         return res.status(200).json({ msg : 'Course deleted successfully' }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR'});
    }
}
module.exports = {
    createCourse,
    AdminGetCourse,
    getAllCourse,
    updateCourse,
    deleteCourse
}



