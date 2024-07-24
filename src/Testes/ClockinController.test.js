import request from 'supertest';
import express from 'express';
import clockInController from '../Controller/clockIn.js';
import clockIn from '../Model/clockin.js';

const app = express();
app.use(express.json());
app.post('/clock-in', clockInController);

jest.mock('../Model/clockin.js');

describe('POST /clock-in', () => {
  it('should create a new clock-in entry', async () => {
    const mockEntry = { employee_id: 12, clock_in_time: new Date().toISOString() };
    clockIn.create = jest.fn().mockResolvedValue(mockEntry);

    const response = await request(app)
      .post('/clock-in')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toEqual(mockEntry);
  });

  it('should handle errors', async () => {
    clockIn.create = jest.fn().mockRejectedValue(new Error('Test error'));

    const response = await request(app)
      .post('/clock-in')
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body.message).toBe('Internal server error');
  });
});
