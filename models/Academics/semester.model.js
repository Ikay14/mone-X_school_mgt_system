const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const semesterSchema = new mongoose.Schema(
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
    duration: {
      type: String,
      required: true,
      default: '4 months',
    },
    createdBy: {
      type: ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Semester', semesterSchema);

