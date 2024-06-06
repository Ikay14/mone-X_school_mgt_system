const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
    },
    password: {
      type: String,
      required: true,
    },
    matricNumber: {
      type: String,
      required: true,
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


studentSchema.pre('save', async function(next) {
    // Generate matricNumber if it's not already set
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








//model

module.exports = mongoose.model("Student", studentSchema);
 