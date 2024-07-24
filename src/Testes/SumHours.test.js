import request from 'supertest';
import express from 'express';
import getSumHours from '../Controller/SumHours.js';
import clockIn from '../Model/clockin.js';
import clockOut from '../Model/clockout.js';

jest.mock('../Model/clockin.js');
jest.mock('../Model/clockout.js');

const app = express();
app.use(express.json());
app.get('/:employee_id/total', getSumHours);

describe('GET /:employee_id/total', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return total hours worked per day', async () => {
    const mockClockIns = [
      { clock_in_time: '2024-07-23T08:00:00Z' },
      { clock_in_time: '2024-07-24T08:00:00Z' },
    ];
    const mockClockOuts = [
      { clock_in_time: '2024-07-23T17:00:00Z' },
      { clock_in_time: '2024-07-24T17:00:00Z' },
    ];

    clockIn.findAll.mockResolvedValue(mockClockIns);
    clockOut.findAll.mockResolvedValue(mockClockOuts);

    const response = await request(app).get('/employee_id/total');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { date: '23/07/2024', hours: '9:00' },
      { date: '24/07/2024', hours: '9:00' },
    ]);
  });

  test('should return error if no clock-in records', async () => {
    clockIn.findAll.mockResolvedValue([]);
    clockOut.findAll.mockResolvedValue([]);

    const response = await request(app).get('/employee_id/total');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Dados insuficientes para calcular as horas.' });
  });

  test('should handle errors gracefully', async () => {
    clockIn.findAll.mockRejectedValue(new Error('Database error'));
    clockOut.findAll.mockResolvedValue([]);

    const response = await request(app).get('/employee_id/total');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database error' });
  });
});
