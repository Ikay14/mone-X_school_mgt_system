const express = require('express')
const router = express.Router()

const { login,
        register
} = require('../controllers/auth')


router.route('/register').post(register)
router.post('/login', login)

module.exports = router