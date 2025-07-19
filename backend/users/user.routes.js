const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Public routes
router.post('/login', controller.login);
router.post('/', controller.create); // Signup

// Admin-only route: list all users
router.get('/', authenticate, authorize(['admin']), controller.list);

// Authenticated user's own profile
router.get('/profile', authenticate, controller.profile);

module.exports = router;
