const express = require('express')
const app = express()

// configuration of the .env file 
require('dotenv').config()

// DB connection
const connectDB = require('./db/connect')

// json middleware
app.use(express.json())

// importing of middlewares 
const notFound = require('./middlewares/General/notFound')
const errorHandlerMiddleware = require('./middlewares/General/error-handler')


// importing student route
const studentRoute = require('./routes/Student/student.route')

// importing admin route
const adminRoute = require('./routes/Staff/admin.route')

// importing Teachers route
const teacherRoute = require('./routes/Staff/teacher.route')

// importing Academic-year route
const academicRoute = require('./routes/Academic/academicYear.route')

// importing Course route
const courseRoute = require('./routes/Academic/course.route')

//  routes
app.use('/api/v1/admin', adminRoute) 
app.use('/api/v1/teacher', teacherRoute)
app.use('/api/v1/student', studentRoute)
app.use('/api/v1/academic', academicRoute)    
app.use('/api/v1/course', courseRoute)    


// using the middlewares
app.use(errorHandlerMiddleware)
app.use(notFound)

const Port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(Port, () => {
            console.log(`app is listening on port ${Port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()