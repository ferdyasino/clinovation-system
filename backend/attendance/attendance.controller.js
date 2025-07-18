const attendanceService = require('./attendance.service');
const { success, error } = require('../utils/response');

exports.clock = async (req, res) => {
  try {
    const { userId, type } = req.body;
    const record = await attendanceService.createAttendance(userId, type);
    return success(res, 'Attendance recorded', record);
  } catch (err) {
    return error(res, 'Failed to record attendance', err);
  }
};

exports.getByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await attendanceService.getUserAttendance(userId);
    return success(res, 'Attendance fetched', records);
  } catch (err) {
    return error(res, 'Failed to fetch attendance', err);
  }
};
