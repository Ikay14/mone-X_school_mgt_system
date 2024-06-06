const Admin = require('../../models/Staff/admin.model');

const isAdmin = async (req, res, next) => {
    try {
        const id = req.user.userId;
        const admin = await Admin.findById(id);
        if (admin.role === 'admin') {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied, admin only1' });
        }
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        return res.status(500).json( error.message[0] );
    }
};

module.exports = isAdmin;



