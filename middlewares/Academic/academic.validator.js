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

const validateExam = Joi.object({
              name: Joi.string().required(),
              description: Joi.string().required(),
              course: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
              department: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
              passMark: Joi.number().required().default(50),
              totalMark: Joi.number().required().default(100),
              duration: Joi.string().required().default('30 minutes'),
              examDate: Joi.date().required().default(() => new Date(), 'current date'),
              examTime: Joi.string().required(),
              examType: Joi.string().required().default('Quiz'),
              examStatus: Joi.string().required().valid('pending', 'live').default('pending'),
              questions: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectId strings
              level: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
              createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
              semester: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
              academicYear: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
 });  

const validateLevel = Joi.object({
             name: Joi.string().required(),
             description: Joi.string().optional(),
             createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
             students: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(), // Array of ObjectId strings
             subjects: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(), // Array of ObjectId strings
             teachers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(), // Array of ObjectId strings
});

const validateQuestion = Joi.object({
              question: Joi.string().required(),
              optionA: Joi.string().required(),
              optionB: Joi.string().required(),
              optionC: Joi.string().required(),
              optionD: Joi.string().required(),
              correctAnswer: Joi.string().required(),
              isCorrect: Joi.boolean().default(false),
              createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
});

const validateExamResult = Joi.object({
              student: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
              exam: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
              grade: Joi.number().required(),
              score: Joi.number().required(),
              passMark: Joi.number().required().default(50),
              answeredQuestions: Joi.array().items(Joi.object()).required(),
              status: Joi.string().valid("failed", "passed").required().default("failed"),
              remarks: Joi.string().valid("Excellent", "Good", "Poor").required().default("Poor"),
              teacher: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
              course: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
              level: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
              semester: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
              academicYear: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
              isPublished: Joi.boolean().default(false),
});

const validateSemester  = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      duration: Joi.string().required().default('4 months'),
      createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validate ObjectId as a string
    });
                     

module.exports = 
    { 
        validateAcademicYear,
        validateCourse,
        validateDepartment,
        validateExam,
        validateLevel,
        validateQuestion,
        validateExamResult,
        validateSemester
    }
  