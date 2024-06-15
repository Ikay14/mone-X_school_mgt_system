const express = require('express');

// import validator 
const { validateAcademicYear } = require('../../middlewares/Academic/academic.validator');

// import models
const AcademicYear = require('../../models/Academics/academicYear.model');
const Admin = require('../../models/Staff/admin.model');




const createAcademicYear = async (req, res) => {
    const isAdmin = req.user.userId
    try {
        const { value, error} = validateAcademicYear.validate(req.body);
        // check if wrong data was entered 
        if(error){
            return res.status(400).json({ message: 'Validation failed', errors: error.details });
        }
        
        const { name, fromYear, toYear, createdBy } = value
        // check student exist
        const existingAcademicYear = await AcademicYear.findOne({ name });
        if(existingAcademicYear){
            return res.status(400).json({ msg: 'Oops Academic Year exists already'});
        }
        // create new academic year
        const newAcademicYear = new AcademicYear(
            {
                name,
                fromYear,
                toYear,
                createdBy: isAdmin
            }
        );
        // save new academic year
        await newAcademicYear.save();

        // attribute the created academic year to the admin that created it
        const admin = await Admin.findById(isAdmin); 
        admin.academicYear.push(newAcademicYear._id);
        await isAdmin.save();

        // display success 
        res.status(200).json({ msg: `success!, ${newAcademicYear} Academic Year created`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' })
    }
};

const getAcademicYear = async (req, res)=>{
    try {
        const academic = await AcademicYear.find({});
        
        // Check if there are any academic years found
        if (academicYears.length === 0) {
            return res.status(404).json({ msg: 'No academic years found' });
        }

        return res.status(200).json({ msg: 'success', academic});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' })
    }
};

const updateAcademicYear = async (req ,res) => {
    let academicId = req.user.userId;
    try {
        const { name, fromYear, toYear} = req.body;

        // check if year exist already
        const acadName = await AcademicYear.findOne({ name });
        if(acadName){
            return res.status(400).json({ msg: `Oops ${acadName} exist already!`})
        }

        // update academictYearInfo
        const newDetails =  await AcademicYear.findByIdAndUpdate(
            academicId,
            {name, fromYear, toYear},
            {runValidators:true, new: true}
        )
        return res.status(200).json({ msg: 'success', newDetails})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};

module.exports = 
{
    createAcademicYear,
    getAcademicYear,
    updateAcademicYear
};