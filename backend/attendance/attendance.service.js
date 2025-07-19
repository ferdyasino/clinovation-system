const Attendance = require('./attendance.model');
const User = require('../users/user.model');

// Create a new attendance record
exports.createAttendance = async (userId, type) => {
  return Attendance.create({
    userId, // ✅ match model field name
    // type,
    timestamp: new Date(), // ensures accurate server-side time
  });
};

// Fetch attendance records for the authenticated user
exports.getUserAttendance = async (userId) => {
  return Attendance.findAll({
    where: { userId }, // ✅ use correct casing
    order: [['timestamp', 'DESC']],
    attributes: ['id', 'timestamp'],
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'name', 'email'] // include basic user info if needed
    }]
  });
};
