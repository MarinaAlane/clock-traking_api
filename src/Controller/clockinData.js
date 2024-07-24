import { format } from 'date-fns';

import clockIn from '../Model/clockin.js';

const getClockInData = async (_req, res) => {
    try {
    const employee_id = 1
    const clockIns = await clockIn.findAll({
      where: { employee_id },
      order: [['clock_in_time', 'DESC']],
      limit: 7
    });

    const formattedClockIns = clockIns.map(item => ({
      ...item.toJSON(),
      date: format(new Date(item.clock_in_time), 'dd/MM/yyyy'),
      time: format(new Date(item.clock_in_time), 'HH:mm:ss')
    }));

    res.status(200).json(formattedClockIns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getClockInData;
