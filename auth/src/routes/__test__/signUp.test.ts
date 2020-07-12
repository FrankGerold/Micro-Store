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


it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '123123.com',
      password: '123123123'
    })
    .expect(400);

});


it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: 'pass'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: '123@123.com' })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({ password: '123123123'})
    .expect(400);
});


it('doesn\'t allow duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(400);
});


it('sets a cookie after a successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(201);
    console.log('Node Env:', process.env.NODE_ENV)
  expect(response.get('Set-Cookie')).toBeDefined();
});
