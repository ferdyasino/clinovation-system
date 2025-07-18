const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const sequelize = require('./config/db');
const User = require('./users/user.model');
const Attendance = require('./attendance/attendance.model');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

// Sync DB once
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ DB sync error:', err));

module.exports = app;
