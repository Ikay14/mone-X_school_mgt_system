const express = require('express')
const adminRoute = express.Router()

// import middlewares 
const isAdmin = require('../../middlewares/Staff/isAdmin')
const isLoggedIn = require('../../middlewares/isloggedIn')

const {
    registerAdmin,
    loginAdmin,
    getAdmin,
    getAllAdmin,
    updateAdmin
} = require('../../controllers/Staff/admin.controller')

adminRoute.post('/register', registerAdmin)
adminRoute.post('/login', loginAdmin)
adminRoute.get('/profile',isLoggedIn, isAdmin, getAdmin)
adminRoute.get('/view-admins', isLoggedIn, isAdmin, getAllAdmin)
adminRoute.post('/update-profile', isLoggedIn, isAdmin, updateAdmin)

module.exports = adminRoute