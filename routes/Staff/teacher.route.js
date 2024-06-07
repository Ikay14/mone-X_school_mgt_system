const express = require('express')
const teacherRoute = express.Router()

// import controllers
const 
{
    createTeacher,
    loginTeacher,
    getTeacher,
    getAllTeacher,
    updateTeacher
} = require('../../controllers/Staff/teacher.controller')

// import middlewares
const isLoggedIn = require('../../middlewares/isloggedIn')
const isAdmin = require('../../middlewares/Staff/isAdmin')
const isTeacher = require('../../middlewares/Staff/isTeacher')

// Teachers route
teacherRoute.post('/create-teacher',isLoggedIn, isAdmin, createTeacher)
teacherRoute.post('/login-teacher', loginTeacher)
teacherRoute.get('/profile',isLoggedIn, isTeacher, getTeacher)
teacherRoute.get('/view-teachers',isLoggedIn, isTeacher, getAllTeacher) 
teacherRoute.get('/update-profile',isLoggedIn, isTeacher, updateTeacher) 


module.exports = teacherRoute