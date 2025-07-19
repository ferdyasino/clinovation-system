// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');
const User = require('../users/user.model');

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return error(res, 'No token provided', null, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'role'] // Include necessary user fields
    });
    if (!user) {
      return error(res, 'User not found', null, 401);
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return error(res, 'Invalid token', err, 401);
  }
};

exports.authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, 'Forbidden: insufficient role', null, 403);
    }
    next();
  };
};
