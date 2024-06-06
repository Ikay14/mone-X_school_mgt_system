const express = require('express')
const app = express()
// configuration of the .env file 
require('dotenv').config()

// DB connection
const connectDB = require('./db/connect')

// json middleware
app.use(express.json())

// importing of middlewares
const authMiddleware = require('./middlewares/auth') 
const notFound = require('./middlewares/General/notFound')
const errorHandlerMiddleware = require('./middlewares/General/error-handler')


// importing student routes
const authRoute = require('./routes/authRoute')
// const studentRoute = require('./routes/Student')

// importing admin routes
const adminRoute = require('./routes/Staff/admin.route')

//  routes
app.use('/api/v1/auth', authRoute)
// app.use('/api/v1/student',authMiddleware, studentRoute)
app.use('/api/v1/auth', adminRoute) 



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