import request from "supertest";
import { app } from '../../app';

it('completes signout request with 200', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)
})


it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  )
});
