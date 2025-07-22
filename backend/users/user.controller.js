const userService = require('./user.service');
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    const userData = user.toJSON();
    delete userData.password;

    return success(res, 'User created', userData);
  } catch (err) {
    return error(res, 'Failed to create user', err);
  }
};

exports.profile = async (req, res) => {
  try {
    return success(res, 'Profile fetched', req.user);
  } catch (err) {
    return error(res, 'Failed to fetch profile', err);
  }
};

exports.list = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return success(res, 'Users fetched', users);
  } catch (err) {
    return error(res, 'Failed to fetch users', err);
  }
};
