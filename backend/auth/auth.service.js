const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../attendance/index');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');

  const token = generateToken(user);
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};
