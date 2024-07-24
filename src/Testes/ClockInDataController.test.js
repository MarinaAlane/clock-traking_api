import request from 'supertest';
import express from 'express';
import getClockInData from '../Controller/clockinData.js';
import clockIn from '../Model/clockin.js';
import { format } from 'date-fns';

jest.mock('../Model/clockin.js');

const app = express();
app.use(express.json());
app.get('/:employee_id/start', getClockInData);

describe('GET /:employee_id/start', () => {
  const mockClockIns = [
    { id: 1, employee_id: 1, clock_in_time: new Date('2024-07-24T08:00:00Z') },
    { id: 2, employee_id: 1, clock_in_time: new Date('2024-07-23T08:10:00Z') }
  ];

  beforeEach(() => {
    clockIn.findAll.mockResolvedValue(mockClockIns);
  });

  it('should return formatted clock-in entries', async () => {
    const response = await request(app)
      .get('/employee_id/start')
      .expect(200);

    const expectedResponse = mockClockIns.map((entry) => ({
      ...entry,
      date: format(new Date(entry.clock_in_time), 'dd/MM/yyyy'),
      time: format(new Date(item.clock_in_time), 'HH:mm:ss')
    }));

    expect(response.body).toEqual(expectedResponse);
  });

  it('should handle errors', async () => {
    clockIn.findAll.mockRejectedValue(new Error('Test error'));

    const response = await request(app)
      .get('/employee_id/start')
      .expect(500);

    expect(response.body.error).toBe('Test error');
  });
});
