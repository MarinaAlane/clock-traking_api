import request from 'supertest';
import express from 'express';
import getClockOutData from '../Controller/clockOutData.js';
import clockOut from '../Model/clockout.js';
import { format } from 'date-fns';

jest.mock('../Model/clockout.js');

const app = express();
app.use(express.json());
app.get('/:employee_id/finish', getClockOutData);

describe('GET /:employee_id/finish', () => {
  const mockClockOuts = [
    { id: 1, employee_id: 1, clock_in_time: new Date('2024-07-24T08:00:00Z') },
    { id: 2, employee_id: 1, clock_in_time: new Date('2024-07-23T08:10:00Z') }
  ];

  beforeEach(() => {
    clockOut.findAll.mockResolvedValue(mockClockOuts);
  });

  it('should return formatted clockouts entries', async () => {
    const response = await request(app)
      .get('/employee_id/finish')
      .expect(200);

    const expectedResponse = mockClockOuts.map((entry) => ({
      ...entry,
      date: format(new Date(entry.clock_in_time), 'dd/MM/yyyy'),
      time: format(new Date(item.clock_in_time), 'HH:mm:ss')
    }));

    expect(response.body).toEqual(expectedResponse);
  });

  it('should handle errors', async () => {
    clockOut.findAll.mockRejectedValue(new Error('Test error'));

    const response = await request(app)
      .get('/employee_id/finish')
      .expect(500);

    expect(response.body.error).toBe('Test error');
  });
});
