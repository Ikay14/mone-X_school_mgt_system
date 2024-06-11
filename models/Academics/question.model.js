const mongoose = require('mongoose');

const { ObjectId } = mongoose;

//questionSchema
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      index: true,
      text: true,
    },
    optionA: {
      type: String,
      required: true,
    },
    optionB: {
      type: String,
      required: true,
    },
    optionC: {
      type: String,
      required: true,
    },
    optionD: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: ObjectId,
      ref: 'Teacher',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', questionSchema);

