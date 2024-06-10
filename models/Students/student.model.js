const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    matricNumber: {
      type: String,
    },
    role: {
      type: String,
      default: "student",
    },
    dateAdmitted: {
      type: Date,
      default: Date.now,
    },
    examResults: [
      {
        type: ObjectId,
        ref: "ExamResult",
      },
    ],
    Department: {
      type: String,
      required: true,
    },
    isGraduated: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    yearGraduated: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

studentSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

studentSchema.methods.createJWT = function(){
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      matricNumber: this.matricNumber,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

studentSchema.pre('save', async function(next) {
    if (!this.matricNumber) {
        let matricNumberGenerated = false;
        while (!matricNumberGenerated) {
            const currentYear = new Date().getFullYear().toString();
            const newMatricNumber = currentYear + "/" + 
                Math.floor(1000 + Math.random() * 9000); 
            
            // Check if the generated matricNumber already exists in the database
            const existingStudent = await this.constructor.findOne({ matricNumber: newMatricNumber });
            if (!existingStudent) {
                this.matricNumber = newMatricNumber;
                matricNumberGenerated = true;
            }
        }
    }
    next();
});

// Export model
module.exports = mongoose.model("Student", studentSchema);
