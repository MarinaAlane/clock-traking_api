import { format } from 'date-fns';

import clockOut from '../Model/clockout.js';

const getClockOutData = async (req, res) => {
    try {
    const { employee_id } = req.params;
    const clockOuts = await clockOut.findAll({
      where: { employee_id },
      order: [['clock_in_time', 'DESC']],
      limit: 7
    });

    const formattedClockOuts = clockOuts.map(item => ({
      ...item.toJSON(),
      date: format(new Date(item.clock_in_time), 'dd/MM/yyyy'),
      time: format(new Date(item.clock_in_time), 'HH:mm:ss')
    }));

    res.status(200).json(formattedClockOuts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getClockOutData;

