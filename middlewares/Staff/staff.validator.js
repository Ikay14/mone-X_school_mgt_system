const Joi = require('joi')


const adminSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().valid('admin').default('admin'),
    teachers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), 
    students: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), 
    createdAt: Joi.date().optional(), 
    updatedAt: Joi.date().optional()  
})

const teacherSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    dateEmployed: Joi.date().default(Date.now),
    teacherId: Joi.string().required(),
    isWithdrawn: Joi.boolean().default(false),
    isSuspended: Joi.boolean().default(false),
    role: Joi.string().default('teacher'),
    subject: Joi.string().optional().allow('').allow(null), 
    applicationStatus: Joi.string().valid('pending', 'approved', 'rejected').default('pending'),
    program: Joi.string().allow(''), 
    examsCreated: Joi.array().items(Joi.string()), 
    createdBy: Joi.string().required(),
})

module.exports =
{
    adminSchema,
    teacherSchema
}