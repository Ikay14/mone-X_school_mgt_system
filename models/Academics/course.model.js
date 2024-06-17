const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const courseSchema = new mongoose.Schema(
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
      teacher: {
        type: ObjectId,
        ref: "Teacher",
      },
      courseCode : {
        type: String
      },
      semester: {
        type: ObjectId,
        ref: "Semester",
        required: true,
      },
      createdBy: {
        type: ObjectId,
        ref: "Admin",
        required: true,
      },
      duration: {
        type: String,
        required: true,
        default: '2 hours',
      },
    },
    { timestamps: true }
  );

  courseSchema.pre('save', async function (next) {
    this.courseCode = (
        this.courseCode
        .split(' ')
        .map((name) => {
            name[0]
        })
        .join('')
        .toUpperCase() +
        Math.floor(10 + Math.random() * 90) +
        Math.floor(10 + Math.random() * 90)
    )
    console.log('Generated courseCode:', this.courseCode)
    next();
});

//   model
  
  module.exports = mongoose.model('Course', courseSchema);
  
