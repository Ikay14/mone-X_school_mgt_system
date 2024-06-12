const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

//exam result schema
const examResultSchema = new mongoose.Schema(
  {
    student: {
      type: ObjectId,
      ref: "Student",
      required: true,
    },
    exam: {
      type: ObjectId,
      ref: 'Exam',
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    answeredQuestions:[
      {
        type:Object
      }
    ],

    //failed/Passed
    status: {
      type: String,
      required: true,
      enum: ["failed", "passed"],
      default: "failed",
    },

    //Excellent/Good/Poor
    remarks: {
      type: String,
      required: true,
      enum: ["Excellent", "Good", "Poor"],
      default: "Poor",
    
    },
    teacher: {
      type: ObjectId,
      ref: 'Teacher',
      required: true,
    },
    course: {
      type: ObjectId,
      ref: "Course",
    },
    level: {
      type: ObjectId,
      ref: "Level",
    },
    semester: {
      type: ObjectId,
      ref: 'Semester',
      required: true,
    },
    academicYear: {
      type: ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ExamResult', examResultSchema);