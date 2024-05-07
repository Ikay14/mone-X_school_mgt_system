
const express = require('express')
const app = express()

require('dotenv').config()

const connectDB = require('./db/connect')


const Port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen( Port, () => {
            console.log(`app is listening on port ${Port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()