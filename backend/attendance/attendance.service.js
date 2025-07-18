const Attendance = require('./attendance.model');
const User = require('../users/user.model');

exports.createAttendance = async (userId, type) => {
  return Attendance.create({ UserId: userId, type });
};

exports.getUserAttendance = async (userId) => {
  return Attendance.findAll({ where: { UserId: userId }, order: [['timestamp', 'DESC']] });
};