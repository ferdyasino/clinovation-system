const userService = require('./user.service');
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userService.createUser(name);
    return success(res, 'User created', user);
  } catch (err) {
    return error(res, 'Failed to create user', err);
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
