const Joi = require('joi')


const validateAcademicYear = Joi.object ({
        name: Joi.string().required(),
        fromYear: Joi.date().required(),
        toYear: Joi.date().required(),
        isCurrent: Joi.boolean().default(false),
        createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
        students: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
        teachers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    });

const validateCourse = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        teacher: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
        courseCode: Joi.string().optional(),
        semester: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
        createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
        duration: Joi.string().required().default('2 hours'),
    });
    
const validateDepartment =  Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            duration: Joi.string().required().default('4 Years'),
            createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
            teachers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectId strings
            students: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectId strings
            course: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Array of ObjectId strings
        });    

    module.exports = 
    { 
        validateAcademicYear,
        validateCourse,
        validateDepartment
    }
  