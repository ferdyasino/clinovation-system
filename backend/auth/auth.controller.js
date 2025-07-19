const AuthService = require('./auth.service');
const { success, error } = require('../utils/response');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    return res.json(success('Login successful', result));
  } catch (err) {
    return res.status(401).json(error(err.message));
  }
};
