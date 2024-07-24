import clockOut from '../Model/clockout.js';

const clockOutController = async (_req, res) => {
  try {
    const employeeId = 1

    const newEntry = await clockOut.create({
      employee_id: employeeId,
      clock_in_time: new Date()
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default clockOutController;
