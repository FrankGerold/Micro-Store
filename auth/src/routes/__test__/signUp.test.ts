import request from 'supertest';

import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(201);
});
