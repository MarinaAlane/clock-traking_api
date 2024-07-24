import request from 'supertest';
import express from 'express';

import clockOutController from '../Controller/clockOut.js';
import clockout from '../Model/clockout.js';

const app = express();
app.use(express.json());
app.post('/clock-out', clockOutController);

jest.mock('../Model/clockout.js');

describe('POST /clock-out', () => {
  it('should create a new clock-out entry', async () => {
    const mockEntry = { employee_id: 1, clock_in_time: new Date().toISOString() };
    clockout.create = jest.fn().mockResolvedValue(mockEntry);

    const response = await request(app)
      .post('/clock-out')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toEqual(mockEntry);
  });
});
