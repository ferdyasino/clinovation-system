const User = require('./user.model');

exports.createUser = async (name) => {
  return User.create({ name });
};

exports.getAllUsers = async () => {
  return User.findAll();
};
