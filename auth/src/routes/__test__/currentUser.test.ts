import request from 'supertest';

import { app } from '../../app';
import { getAuthCookie } from '../../test/getAuthCookie'

it('responds with details about current user', async () => {
  const cookie = await getAuthCookie()

  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .set('Cookie', cookie)
    .expect(200)

  expect(response.body.currentUser.email).toEqual('123@123.com')
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(response.body.currentUser).toEqual(null);
});
