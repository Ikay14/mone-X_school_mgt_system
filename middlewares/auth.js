const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')


const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to routes
    req.user = { userId: payload.userId, name: payload.name, role: payload.role }
    if (req.user) {
      next();
    } else {
      throw new UnauthenticatedError('Authentication failed');
    }
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL_SERVER_ERROR" })
  }
}

module.exports = auth 