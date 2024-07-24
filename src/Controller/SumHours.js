import clockOut from '../Model/clockout.js';
import clockIn from '../Model/clockin.js';
import { format } from 'date-fns';

const getSumHours = async (req, res) => {
  try {
    const { employee_id } = req.params;

    const records = await Promise.all([
      clockIn.findAll({ where: { employee_id }, order: [['clock_in_time', 'ASC']] }),
      clockOut.findAll({ where: { employee_id }, order: [['clock_in_time', 'ASC']] })
    ]);

    const [clockIns, clockOuts] = records;

    if (clockIns.length === 0 || clockOuts.length === 0) {
      return res.status(400).json({ error: 'Dados insuficientes para calcular as horas.' });
    }

    const hoursByDay = {};

    clockIns.forEach((clockInRecord, index) => {
      const date = format(new Date(clockInRecord.clock_in_time), 'dd/MM/yyyy');
      const clockOutTime = clockOuts[index]?.clock_in_time ? new Date(clockOuts[index].clock_in_time) : null;
      const clockInTime = new Date(clockInRecord.clock_in_time);

      if (!hoursByDay[date]) {
        hoursByDay[date] = { totalHours: 0 };
      }

      if (clockOutTime && clockInTime && clockOutTime > clockInTime) {
        const diffInMs = clockOutTime.getTime() - clockInTime.getTime();
        const diffInHours = diffInMs / 1000 / 60 / 60;
        hoursByDay[date].totalHours += diffInHours;
      }
    });

    const hoursWorkedPerDay = Object.entries(hoursByDay).map(([date, { totalHours }]) => ({
      date,
      hours: `${Math.floor(totalHours)}:${Math.floor((totalHours % 1) * 60).toString().padStart(2, '0')}`
    }));

    res.status(200).json(hoursWorkedPerDay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getSumHours;
