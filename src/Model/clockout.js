import { DataTypes } from 'sequelize';
import sequelize from '../Config/db.js';

const ClockOut = sequelize.define('ClockOut', {
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
  tableName: 'clockout',
  timestamps: false
});

export default ClockOut;
