const express = require('express');
const cors = require('cors'); // 🔹 Add this
const apiRoutes = require('./routes/apiRoutes');
const sequelize = require('./config/db');
const User = require('./users/user.model');
const Attendance = require('./attendance/attendance.model');

const app = express();

// 🔹 Enable CORS before any routes
app.use(cors({
  origin: 'http://localhost:3001', // or '*' during development
  credentials: true, // optional: needed if using cookies/auth headers
}));

app.use(express.json());
app.use('/', apiRoutes);

// 🔹 Sync DB
sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ DB sync error:', err));

module.exports = app;
