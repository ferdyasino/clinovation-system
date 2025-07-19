const bcrypt = require('bcryptjs');
const User = require('../users/user.model');

// Create user with hashed password
exports.createUser = async ({ name, email, password }) => {
  return User.create({ name, email, password });
};

// List all users
exports.getAllUsers = async () => {
  return User.findAll({
    attributes: { exclude: ['password'] } // Optional: hide password
  });
};

// Find user by email for login
exports.findByEmail = async (email) => {
  return User.findOne({ where: { email } });
};
