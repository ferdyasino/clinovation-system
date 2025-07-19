const express = require('express');
const router = express.Router();

const userRoutes = require('../users/user.routes');
const attendanceRoutes = require('../attendance/attendance.routes');

router.use('/users', userRoutes);
router.use('/attendances', attendanceRoutes);

module.exports = router;
