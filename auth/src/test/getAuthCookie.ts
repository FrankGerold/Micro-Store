import request from 'supertest'

import { app } from '../app'

export const getAuthCookie = async () => {
  const email = '123@123.com'
  const password = '123123123'

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie')

  return cookie
}
