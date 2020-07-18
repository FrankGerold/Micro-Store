import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../app'

export const getAuthCookie = () => {
  const email = '123@123.com'
  const password = '123123123'

  // const response = await request(app)
  //   .post('/api/users/signup')
  //   .send({ email, password })
  //   .expect(201);
  //
  // const cookie = response.get('Set-Cookie')

  // build a JWT Payload { id, email }
  const payload = {
    id: '420frank420',
    email
  };

  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object { jwt: my_jwt }
  const session = { jwt: token };

  // Turn session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it in base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return string version of encoded cookie
  return `express:sess=${base64}`
}
