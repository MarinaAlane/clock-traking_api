import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('employee_time_clock', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;

