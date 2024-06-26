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
        await admin.save();

        // display success 
        res.status(200).json({ 
            msg: 'success!', 
            newAcademicYear,
            academicYear: `${name} Academic Year created`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' })
    }
};

const getAcademicYear = async (req, res)=>{
    try {
        const academic = await AcademicYear.find({});
        
        // Check if there are any academic years found
        if (academic.length === 0) {
            return res.status(404).json({ msg: 'No academic years found' });
        }

        return res.status(200).json({ 
            msg: 'success',
            nbHits: academic.length,
            academic});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' })
    }
};

const updateAcademicYear = async (req ,res) => {
    const academicId  = req.params.id;
    let adminID = req.user.userId;
    console.log(academicId);
    try {
        const { name, fromYear, toYear} = req.body;

        // check if Admin is authorized to make request
        const admin = await Admin.findById(adminID);
        if(!admin){
            return res.status(404).json({ msg: 'Unauthorized access, Admin Not Found'})
        }
        // check if year exist already
        const acadName = await AcademicYear.findOne({ name });
        if(acadName){
            return res.status(400).json({ msg: `Oops ${acadName} exist already!`});
        }

        // update academicYearInfo
        const newDetails =  await AcademicYear.findByIdAndUpdate(
            academicId,
            {name, fromYear, toYear},
            {runValidators:true, new: true}
        ).select("-createdAt -updatedAt");

        return res.status(200).json({ 
            msg: 'success', 
            academicYear: newDetails
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};

const DeleteAcademicYear = async (req,res) => {
    try {
        let academicId = req.params.id;
        let adminID = req.user.userId;

       // check if Admin is authorized to make request
       const admin = await Admin.findById(adminID);
       if(!admin){
           return res.status(404).json({ msg: 'Unauthorized access, Admin Not Found'});
       }

    //    delete Academic Year if found else return Not found
       const del = await AcademicYear.findByIdAndDelete(academicId);
       if(del){
        return res.status(400).json({
            msg: 'Academic Year deleted successfully!'
        })
       } else {
        return res.status(404).json({
            msg: 'Oops academic Year Not found'
        })
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = 
{
    createAcademicYear,
    getAcademicYear,
    updateAcademicYear,
    DeleteAcademicYear
};