const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../users/user.model');

const Attendance = sequelize.define('Attendance', {
  // type: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Attendances',
  timestamps: false,
  defaultScope: {
    attributes: { exclude: [] }
  },
  scopes: {
    withUser: {
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'role']
      }]
    }
  }
});

// Relationships
User.hasMany(Attendance, {
  foreignKey: 'userId',
  as: 'attendances'
});
Attendance.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = Attendance;
