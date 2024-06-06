const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  creditHours: {
    type: Number,
    required: [true, 'Credit hours are required'],
    min: [1, 'Credit hours must be at least 1']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', 
    required: [true, 'Instructor is required']
  },
  schedule: {
    days: {
      type: [String], 
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    time: {
      start: { type: String, required: true }, 
      end: { type: String, required: true }    
    }
  },
  studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' 
  }]
}, { timestamps: true });

// Pre-save middleware to generate course code
courseSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }

  const departmentCode = this.department.slice(0, 2).toUpperCase();
  const count = await mongoose.model('Course').countDocuments({ department: this.department });
  const courseNumber = (count + 1).toString()
  this.courseCode = `${departmentCode}${courseNumber}`;

  next();
});



module.exports = mongoose.model('Course', courseSchema)