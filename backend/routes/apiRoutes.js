const express = require('express');
const router = express.Router();

const userRoutes = require('../users/user.routes');
const attendanceRoutes = require('../attendance/attendance.routes');
const authRoutes = require('../auth/auth.routes'); // <-- Add this line

router.use('/users', userRoutes);
router.use('/attendances', attendanceRoutes);
router.use('/auth', authRoutes); // <-- Mount auth routes at /auth

module.exports = router;
