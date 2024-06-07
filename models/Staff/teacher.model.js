const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate unique Id for teachers using mongoose-sequence
const AutoIncrement = require('mongoose-sequence')(mongoose);

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    teacherId: {
      type: String,
    },
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "teacher",
    },
    subject: {
      type: ObjectId,
      ref: "Subject",
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"], 
      default: "pending",
    }, 
    program: {
      type: String,
    },
    examsCreated: [
      {
        type: ObjectId,
        ref: "Exam",
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Integrate mongoose-sequence for auto-increment
teacherSchema.plugin(AutoIncrement, { inc_field: 'teacherIdSequence' });

// Hash password before saving
teacherSchema.pre('save', async function (next){
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password function
teacherSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// Sign teachers payload
teacherSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
      role: this.role,
      teacherId: this.teacherId
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
}

// Generate unique teacher ID
teacherSchema.pre('save', function (next) {
  // Generate teacherId if it's not already set
   if (!this.teacherId) {
   const uniqueSuffix = Date.now().toString().slice(-4); // Last 4 digits of the current timestamp
   const nameInitials = this.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
 
  this.teacherId = "TEA" + 
   Math.floor(100 + Math.random() * 500) + 
   uniqueSuffix +
   nameInitials;
  
   console.log('Generated teacherId:', this.teacherId);
   }
   next();
  });

module.exports = mongoose.model("Teacher", teacherSchema);
