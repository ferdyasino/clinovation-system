const userService = require('./user.service');
const { success, error } = require('../utils/response');
const { signToken } = require('../utils/jwt');

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
  return success(res, 'Profile fetched', req.user);
};


exports.list = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return success(res, 'Users fetched', users);
  } catch (err) {
    return error(res, 'Failed to fetch users', err);
  }
};

// ✅ Login controller with JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);

    if (!user || !(await user.validatePassword(password))) {
      return error(res, 'Invalid email or password', null, 401);
    }

    // ✅ Only include necessary plain properties in the token
    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = signToken(tokenPayload);
    const userData = user.toJSON();
    delete userData.password;
    return success(res, 'Login successful', { token, userData });
  } catch (err) {
    return error(res, 'Login failed', err.message || err);
  }
};
