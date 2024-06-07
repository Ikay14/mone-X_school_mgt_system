const Teacher = require('../../models/Staff/teacher.model');

const isTeacher = async (req, res, next) => {
    try {
        const id = req.user.userId;
        const teacher = await Teacher.findById(id);
        if (teacher.role === 'teacher') {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied, teachers only' });
        }
    } catch (error) {
        console.error('Error in isTeacher middleware:', error);
        return res.status(500).json( error.message[0] );
    }
};

module.exports = isTeacher;
