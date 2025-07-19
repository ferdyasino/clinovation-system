const express = require('express');
const router = express.Router();
const controller = require('./attendance.controller');
const { authenticate } = require('../middleware/auth.middleware');

// ✅ Use middleware to get req.user from JWT
router.post('/', authenticate, controller.clock);
router.get('/', authenticate, controller.getByUser); // Change from :userId to authenticated user

module.exports = router;
