import request from "supertest";

import { app } from "../../app";



it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: '123123.com',
      password: '123123123'
    })
    .expect(400);

});


it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: '123@123.com',
      password: 'pass'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: '123@123.com' })
    .expect(400);

  return request(app)
    .post('/api/users/signin')
    .send({ password: '123123123'})
    .expect(400);
});


it('returns a 200 on successful sign-in', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: '123@123.com',
      password: '123123123'
    })
    .expect(200)
})

it('sets a cookie after a successful sign in', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'testtesttest'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'testtesttest'
    })
    .expect(200);
    
  expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails when provided email does not exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'testtesttest'
    })
    .expect(400)
});

it('fails when incorrect password is provided', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'testtesttest'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdfasdfasdf'
    })
    .expect(400)
})
