const express = require('express')
const Joi = require('joi')

const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(), 
  password: Joi.string().required(),
  Department: Joi.string().required(),
  matricNumber: Joi.string(),
  role: Joi.string().default('student'),
  dateAdmitted: Joi.date().default(Date.now),
  examResults: Joi.array().items(Joi.string()), 
  isGraduated: Joi.boolean().default(false),
  isWithdrawn: Joi.boolean().default(false),
  isSuspended: Joi.boolean().default(false),
  createdBy: Joi.string().required(),
  yearGraduated: Joi.string().allow(null, ''), 
});


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
    studentSchema,
    courseSchema
}