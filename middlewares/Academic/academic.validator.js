const Joi = require('joi');

const validateAcademicYear = Joi.object({
    name: Joi.string().required(),
    fromYear: Joi.string().regex(/^\d{4}$/).required(),
    toYear: Joi.string().regex(/^\d{4}$/).required(),
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
    duration: Joi.string().default('2 hours').required()
});

const validateDepartment = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.string().default('4 Years').required(),
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    teachers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectId strings
    students: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectId strings
    course: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Array of ObjectId strings
});

const validateExam = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    course: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    department: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    passMark: Joi.number().default(50).required(),
    totalMark: Joi.number().default(100).required(),
    duration: Joi.string().default('30 minutes').required(),
    examDate: Joi.date().default(() => new Date()).required(),
    examTime: Joi.string().required(),
    examType: Joi.string().default('Quiz').required(),
    examStatus: Joi.string().valid('pending', 'live').default('pending').required(),
    questions: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectId strings
    level: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    semester: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    academicYear: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // Validate ObjectId as a string
});

const validateLevel = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    students: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(), // Array of ObjectId strings
    subjects: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(), // Array of ObjectId strings
    teachers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional() // Array of ObjectId strings
});

const validateQuestion = Joi.object({
    question: Joi.string().required(),
    optionA: Joi.string().required(),
    optionB: Joi.string().required(),
    optionC: Joi.string().required(),
    optionD: Joi.string().required(),
    correctAnswer: Joi.string().required(),
    isCorrect: Joi.boolean().default(false),
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // Validate ObjectId as a string
});

const validateExamResult = Joi.object({
    student: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    exam: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    grade: Joi.number().required(),
    score: Joi.number().required(),
    passMark: Joi.number().default(50).required(),
    answeredQuestions: Joi.array().items(Joi.object()).required(),
    status: Joi.string().valid('failed', 'passed').default('failed').required(),
    remarks: Joi.string().valid('Excellent', 'Good', 'Poor').default('Poor').required(),
    teacher: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    course: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    level: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    semester: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    academicYear: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    isPublished: Joi.boolean().default(false)
});

const validateSemester = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.string().default('4 months').required(),
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // Validate ObjectId as a string
});

module.exports = {
    validateAcademicYear,
    validateCourse,
    validateDepartment,
    validateExam,
    validateLevel,
    validateQuestion,
    validateExamResult,
    validateSemester
};
