# Mone-X school_management_system

# Overview

The Monex-X school_management_system (SMS) is a comprehensive solution designed to streamline the management of academic institutions. It includes features for handling Admin Student and Teacher profiles, courses, exams, results, and more. The system is built using Node.js, Express.js, and MongoDB, providing a robust and scalable backend.

# Table of Contents
Installation
Configuration
Usage
API Endpoints
Database Models
Validation
Contributing
License
Installation

# Clone the repository:
bash
git clone https://github.com/Ikay14/mone-X_school_mgt_system.git

# Navigate to the project directory:
bash
cd mone-X_school_mgt_system

# Install dependencies:
bash
npm install

# Set up environment variables:
Create a .env file in the root directory and add the following variables:

# makefile
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=your_jwt_lifetime 
PORT=your_port_number

# Start the server:
bash
npm start

# Configuration
Ensure you have MongoDB installed and running. Update the MONGO_URI in the .env file with your MongoDB connection string.

# Usage
Once the server is running, you can interact with the API using tools like Postman or by integrating it with your frontend application. The following sections outline the available API endpoints and their usage.

# API Endpoints

# Authentication
Register Admin
POST /api/admin/register

Login
POST /api/admin/login

Admin Profile
GET /api/admin/profile

Update Admin Profile
PATCH /api/admin/update-profile

# Students
Create Student
POST /api/student/admin/register-student

Login Student
POST /api/student/login-student

Get Student Profile
GET /api/student/profile

Get All Students (Admin)
GET /api/student/admin/view-students

Get Student By Admin
GET /api/student/:studentId/admin

Admin Update Student Info
PATCH /api/student/:studentId/update-student/admin

Update Student Profile
PATCH /api/student/update-profile

Student Write Exam
PATCH /api/student/write-exam

# Teachers
Create Teacher
POST /api/teacher/create-teacher

Login Teacher
POST /api/teacher/login-teacher

Get Teacher Profile
GET /api/teacher/profile

Get All Teachers
GET /api/teacher/view-teachers

Update Teacher Profile
PATCH /api/teacher/update-profile

Update Teacher Profile
PUT /api/teacher/update-profile

# Database Models
## Academic Model
AcademicYear
Course
Department
Exam
Level
Question
Result
Semester

## Staff Model
Admin
Teacher

## Student Model
Student

## Example Schema

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  classLevel: String,
  examResults: [{ type: ObjectId, ref: 'Result' }],
}, { timestamps: true });


# Validation
Validation is handled using Joi. Example validation schema for creating a new student:

## require the package
const Joi = require('joi');

const validateStudent = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    classLevel: Joi.string().required(),
  });
 

# Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

# Fork the repository
Create your feature branch (git checkout -b feature/branch-name)
Commit your changes (git commit -am 'Add some feature')
Push to the branch (git push origin feature/branch-name)
Create a new Pull Request

# License
This project is licensed under the MIT License. See the LICENSE file for details.



