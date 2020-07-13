import request from 'supertest';

import { app } from '../../app';

it('responds with details about current user', async () => {
  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(201)

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .set('Cookie', cookie)
    .expect(200)

  expect(response.body.currentUser.email).toEqual('123@123.com')
})
