const Teacher = require('../../models/Students/student.model');

const isStudent = async (req, res, next) => {
    try {
        const id = req.user.userId;
        const student = await Teacher.findById(id);
        if (student.role === 'student') {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied, student only' });
        }
    } catch (error) {
        console.error('Error in isStudent middleware:', error);
        return res.status(500).json( error.message[0] );
    }
};

module.exports = isStudent;



