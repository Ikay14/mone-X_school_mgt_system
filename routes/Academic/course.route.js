const express = require('express');

const courseRoute = express.Router();

// import middlewares
const isAdmin = require('../../middlewares/Staff/isAdmin');
const isLoggedIn = require('../../middlewares/isloggedIn');

const {
    createCourse,
    AdminGetCourse,
    getAllCourse,
    updateCourse,
    deleteCourse
} = require('../../controllers/Academic/course.controller');

courseRoute.post('/create-course', isLoggedIn, isAdmin, createCourse)
courseRoute.get('/course/:id', isLoggedIn, isAdmin, AdminGetCourse)
courseRoute.get('/view-courses', isLoggedIn, getAllCourse)
courseRoute.patch('/update-course/:id', isLoggedIn, isAdmin, updateCourse)
courseRoute.delete('/delete-course', isLoggedIn, isAdmin, deleteCourse)

module.exports = courseRoute;