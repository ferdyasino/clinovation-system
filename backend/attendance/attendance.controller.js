const attendanceService = require('./attendance.service');
const { success, error } = require('../utils/response');

// ✅ Clock-in / Clock-out handler
exports.clock = async (req, res) => {
  console.log('Clock-in/Clock-out request:', req.body);
  try {
    const { type } = req.body;
    const userId = req.body.id; // From JWT token

    const record = await attendanceService.createAttendance(userId, type);
    return success(res, 'Attendance recorded', record);
  } catch (err) {
    return error(res, 'Failed to record attendance', err);
  }
};

// ✅ Get attendance for logged-in user
exports.getByUser = async (req, res) => {
  console.log('userId:', req.body);
  console.log('user:', req.user);
  try {
    const userId = req.user.id; // From JWT token
    const records = await attendanceService.getUserAttendance(userId);
    return success(res, 'Attendance fetched', records);
  } catch (err) {
    return error(res, 'Failed to fetch attendance', err);
  }
};
