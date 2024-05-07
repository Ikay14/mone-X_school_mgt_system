const express = require('express')
const auth = require('../models/auth')
const { StatusCodes } = require('http-status-codes')
const { unAuthenticatedError, badRequestError } = require('../errors')
const sendWelcomeEmail = require('../utils/signUpMsg')

const register = async (req, res) => {
   try {
    const User = await auth.create({...req.body})
    const token = createJWT()
    res.status(StatusCodes.CREATED).json({ User: {name: User.name, id: User._id }, token})

    // send welcome email
    const userEmail = req.body.email
    await sendWelcomeEmail(userEmail)
   } catch (error) {
        console.log(error);
   } 

}

const login = async (req, res) => {
   try {
    const { email, password } = req.body
    // check if email & Password is provided 
    if (!email || !password) {
        throw new badRequestError('please provide email and password!')
    }
    // check email in DB
    const User = await auth.findOne({ email })
    if (!User) {
        throw new unAuthenticatedError('Please Provide valid email address')
    }
    // check for Password
    const isMatch = await auth.comparePassword(password)
    if (!password) {
        throw new unAuthenticatedError('Invalid credentials')
    }
    // authorize user
    const token = auth.createJWT()
    res.status(StatusCodes.OK).json({User: {name: User.name}, token})
   } catch (error) {
        console.log(error);
   }
}

module.exports= {
    register,
    login
}