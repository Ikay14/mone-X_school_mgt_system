const express = require('express')
const Joi = require('joi')

const birthdaySchema = Joi.object({
    day: Joi.number().integer().min(1).max(31).required(),
    month: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(1900).max(9999).required()
})

const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    middle_name: Joi.string(),
    contact_information: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'other').required(),
    Department: Joi.string().required(),
    address: Joi.string().required(),
    dateOfBirth: birthdaySchema.required(),
    PlaceOfOrigin: Joi.string().required()
}).options({ abortEarly: false })

const courseSchema = Joi.object({
    courseCode: Joi.string()
    .required()
    .trim()
    .uppercase(),
  title: Joi.string()
    .required()
    .trim()
    .error(new Error('Course title is required')), // Custom error message
  description: Joi.string().trim(),
  creditHours: Joi.number()
    .required()
    .min(1)
    .error(new Error('Credit hours must be at least 1')),
  department: Joi.string()
    .required()
    .trim()
    .error(new Error('Department is required')),
  instructor: Joi.string()
    .required()
    .error(new Error('Instructor is required')),
  schedule: Joi.object({
    days: Joi.array().items(Joi.string().valid(...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])).required(),
    time: Joi.object({
      start: Joi.string().required(),
      end: Joi.string().required(),
    }).required(),
  }),
  studentsEnrolled: Joi.array().items(Joi.string()),
})

module.exports = 
{
    userSchema,
    courseSchema
}