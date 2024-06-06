const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
      required: true,
      },
    //if withdrawn, the teacher will not be able to login
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    //if suspended, the teacher can login but cannot perform any task
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
      // required: true,
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

// Hash password before saving
teacherSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// compare password function
teacherSchema.methods.comparePassword = async function (enteredPassword) {
  const isPasswordMatch = await bcrypt.compare(this.password, enteredPassword)
  return isPasswordMatch
}

// sign teachers payload
teacherSchema.methods.createJWT = async function () {
  return jwt.sign(
    {
      userId: this.id, name: this.name, role: this.role
    },
      process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  )
} 

// generate teach unique ID
teacherSchema.pre('save', function (next) {
    // Generate teacherId if it's not already set
    if (!this.teacherId) {
        this.teacherId = "TEA" +
            Math.floor(100 + Math.random() * 500) +
            Date.now().toString().slice(2, 4) +
            this.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase();
    }
    next();
});


//export model
module.exports = mongoose.model("Teacher", teacherSchema);