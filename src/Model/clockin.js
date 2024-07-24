import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js';

const ClockIn = sequelize.define('ClockIn', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  clock_in_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'clockins',
  timestamps: false
});

export default ClockIn;
