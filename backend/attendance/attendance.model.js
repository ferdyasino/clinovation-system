const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../users/user.model');

const Attendance = sequelize.define('Attendance', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Attendance);
Attendance.belongsTo(User);

module.exports = Attendance;
