const express = require('express')
const adminRoute = express.Router()

// import middlewares 
const isAdmin = require('../../middlewares/Staff/isAdmin')
const auth = require('../../middlewares/auth')

const {
    registerAdmin,
    loginAdmin,
    getAdmin,
    getAllAdmin,
    updateAdmin
} = require('../../controllers/Staff/admin.controller')

adminRoute.post('/admin/register', registerAdmin)
adminRoute.post('/admin/login', loginAdmin)
adminRoute.get('/admin/profile',auth, isAdmin, getAdmin)
adminRoute.get('/admin/viewAdmins', auth, isAdmin, getAllAdmin)
adminRoute.post('/admin/updateProfile', auth, isAdmin, updateAdmin)

module.exports = adminRoute