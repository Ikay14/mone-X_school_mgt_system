const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;


const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    course: {
      type: ObjectId,
      ref: 'Course',
      required: true,
    },
    department: {
      type: ObjectId,
      ref: 'Department',
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    totalMark: {
      type: Number,
      required: true,
      default: 100,
    },
    duration: {
      type: String,
      required: true,
      default: "30 minutes",
    },
    examDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    examTime: {
      type: String,
      required: true,
    },
    examType: {
      type: String,
      required: true,
      default: "Quiz",
    },
    examStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "live"],
    },
    questions: [
      {
        type: ObjectId,
        ref: "Question",
      },
    ],
    level: {
      type: ObjectId,
      ref: "Level",
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "Teacher",
      required: true,
    },
    semester: {
      type: ObjectId,
      ref: 'Semester',
      required: true,
    },
    academicYear: {
      type: ObjectId,
      ref: 'AcademicYear',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', examSchema);

