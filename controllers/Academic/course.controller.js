const express = require('express');

// import models
const Course = require('../../models/Academics/course.model');
const Admin = require('../../models/Staff/admin.model');

// import validator 
const { validateCourse } = require('../../middlewares/Academic/academic.validator');


const createCourse = async (req, res) => {
    let adminID = req.user.userId
    try {
        // validate client Data
        const { error, value } = validateCourse.validate(req.body)

        // check for error
        if(error){
            return res.status(400).json({ message: 'Validation failed', errors: error.details });
        }

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

        res.status(200).json({ msg: 'success',
            course: newCourse
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR'});
    }
};


module.exports = {
    createCourse
}



