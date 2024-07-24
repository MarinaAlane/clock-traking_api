import clockIn from '../Model/clockin.js';

const clockInController = async (_req, res) => {
  try {
    const employeeId = 12

    const newEntry = await clockIn.create({
      employee_id: employeeId,
      clock_in_time: new Date()
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default clockInController;
