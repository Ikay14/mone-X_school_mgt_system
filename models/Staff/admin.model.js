const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    
    teachers: [
      {
        type: ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

adminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

adminSchema.methods.createJWT = function () {
  return jwt.sign(
         { userId: this._id, name: this.name, role: this.role },
      process.env.JWT_SECRET, 
      {
          expiresIn: process.env.JWT_LIFETIME
      }

  )
}

adminSchema.methods.comparePassword = async function (enteredPassword) {
  const isPasswordMatch = await bcrypt.compare(enteredPassword, this.password)
  return isPasswordMatch
}

//model

module.exports = mongoose.model("Admin", adminSchema);
 