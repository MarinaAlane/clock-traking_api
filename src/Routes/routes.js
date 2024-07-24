import express from 'express';

import clockInController from '../Controller/clockIn.js';
import getClockInData from '../Controller/clockinData.js';
import getClockOutData from '../Controller/clockOutData.js';
import clockOutController from '../Controller/clockOut.js'
import getSumHours from '../Controller/SumHours.js';

const router = express.Router();

router.post('/clock-in', clockInController);
router.get('/:employee_id/start', getClockInData);
router.post('/clock-out', clockOutController);
router.get('/:employee_id/finish', getClockOutData);
router.get('/:employee_id/total', getSumHours);

export default router;