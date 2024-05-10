const express = require('express')
const user = require('../models/auth')
const { StatusCodes } = require('http-status-codes')

const UnauthenticatedError = require('../errors/unauthenticated')
const badRequestError = require('../errors/badRequest')

const sendWelcomeEmail = require('../utils/signUpMsg')

const register = async (req, res) => {
   try {
    const User = await user.create({ ...req.body })
    const token = User.createJWT()
    res.status(StatusCodes.CREATED).json({ User: {name: User.name, id: User._id }, token})

    // send welcome email
    const userEmail = req.body.email
    await sendWelcomeEmail(userEmail)
   } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Internal Server Error' })
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
    const User = await user.findOne({ email })
    if (!User) {
        throw new UnauthenticatedError('Please Provide valid email address')
    }
    // check for Password
    const isMatch = await User.comparePassword(password)
    if (!isMatch) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    // authorize user
    const token = User.createJWT()
    res.status(StatusCodes.OK).json({User: {name: User.id + ` your're welcome back` }, token})
   } catch (error) {
        console.log(error);
   }
}

module.exports= {
    register,
    login
}