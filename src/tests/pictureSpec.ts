import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the picture api endpoint', async (done) => {
    await request.get('/api/picture/').then((res) => {
      expect(res.status).toBe(400);
      done();
    });
  });
});
