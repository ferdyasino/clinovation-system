const AuthService = require('./auth.service');
const { success, error } = require('../utils/response');

exports.login = async (req, res) => {
  try {
    console.log('Login request body:', req.body);

    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    return success(res, 'Login successful', result);
  } catch (err) {
    console.error('Login error:', err.message);
    return error(res, 'Login failed', err.message, 401);
  }
};

exports.register = async (req, res) => {
  try {
    console.log('Register request body:', req.body);

    const { name, email, password } = req.body;
    const result = await AuthService.register(name, email, password);
    return success(res, 'User registered successfully', result, 201);
  } catch (err) {
    console.error('Registration error:', err.message);
    return error(res, 'Registration failed', err.message, 400);
  }
};

exports.profile = async (req, res) => {
  try {
    console.log('Profile request user:', req.user);

    const result = await AuthService.getProfile(req.user.id);
    return success(res, 'Profile fetched successfully', result);
  } catch (err) {
    console.error('Profile fetch error:', err.message);
    return error(res, 'Failed to fetch profile', err.message, 500);
  }
};
