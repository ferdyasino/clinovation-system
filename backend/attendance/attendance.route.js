const express = require('express');
const router = express.Router();
const controller = require('./attendance.controller');

router.post('/', controller.clock);
router.get('/:userId', controller.getByUser);

module.exports = router;
