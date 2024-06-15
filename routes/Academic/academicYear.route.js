const express = require('express');

const academicRoute = express.Router();

// import controllers
const {
    createAcademicYear,
    getAcademicYear,
    updateAcademicYear
} = require('../../controllers/Academic/academic.controller')

// import middlewares
const isLoggedIn = require('../../middlewares/isloggedIn')
const isAdmin = require('../../middlewares/Staff/isAdmin')

academicRoute.post('/create-academicyear', isLoggedIn, isAdmin, createAcademicYear)
academicRoute.get('/academicyear', getAcademicYear)
academicRoute.patch('/update-academicyear', isLoggedIn, isAdmin, updateAcademicYear)

module.exports = academicRoute