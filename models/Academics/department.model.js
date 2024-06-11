const { required } = require('joi');
const mongoose = require('mongoose');
const { courseSchema } = require('../../middlewares/Students/validation');

const { ObjectId } = mongoose.Schema;

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true,
            default: '4 Years'
        },
       
        createdBy: {
            type: ObjectId,
            ref: 'Admin',
            required: true
        },
        teachers: [
            {
                type: ObjectId,
                ref: 'Teacher'
            }
        ],
        students: [
            {
                type: ObjectId,
                ref: 'Student',
                default: []
            }
        ],
        course: [
            {
                type: ObjectId,
                ref: 'Course',
                default: []
            }
        ],
    },
    {
        timestamps: true
    }
);

// model
module.exports = mongoose.model('Department', departmentSchema)