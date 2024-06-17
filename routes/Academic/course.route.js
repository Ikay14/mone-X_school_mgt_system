const express = require('express');

const courseRoute = express.Router();

// import middlewares
const isAdmin = require('../../middlewares/Staff/isAdmin');
const isLoggedIn = require('../../middlewares/isloggedIn');

const {
    createCourse
} = require('../../controllers/Academic/course.controller');

courseRoute.post('/create-course', isLoggedIn, isAdmin, createCourse)

module.exports = courseRoute;