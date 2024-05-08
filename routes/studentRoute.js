const express = require('express')
const router = express.Router()

const {
    regStudent
} = require('../controllers/student')

router.route('/registration').post(regStudent)

module.exports = router