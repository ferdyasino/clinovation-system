// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');
const User = require('../users/user.model');

// Middleware: Authenticate user by verifying JWT
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for missing or malformed Authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'No token provided or invalid format', null, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'role'], // Only expose necessary fields
    });

    if (!user) {
      return error(res, 'User not found', null, 401);
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return error(res, 'Invalid token', err, 401);
  }
};

// Middleware: Authorize user based on role(s)
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, 'Forbidden: insufficient role', null, 403);
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
