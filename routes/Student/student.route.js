const express = require('express')
const studentRoute = express.Router()

const 
{
    regStudent,
    loginStudent,
    getStudent,
    getStudentByAdmin,
    adminUpdateStudentInfo,
    getAllStudentByAdmin,
    studentUpdateStudentProfile
} = require('../../controllers/Students/student.controller')

// importing middleware
const isAdmin = require('../../middlewares/Staff/isAdmin')
const isLoggedIn = require('../../middlewares/isloggedIn')
const isStudent = require('../../middlewares/Students/isStudent')

studentRoute.post('/admin/register-student',isLoggedIn, isAdmin, regStudent)
studentRoute.post('/login-student', loginStudent)
studentRoute.get('/profile', isLoggedIn, isStudent, getStudent)  
studentRoute.get('/admin/view-students', isLoggedIn, isAdmin, getAllStudentByAdmin) 
studentRoute.get('/:studentId/admin', isLoggedIn, isAdmin, getStudentByAdmin)
studentRoute.patch('/:studentId/update-student/admin', isLoggedIn, isAdmin, adminUpdateStudentInfo)
studentRoute.patch('/update-profile', isLoggedIn, isStudent, studentUpdateStudentProfile)




module.exports = studentRoute 