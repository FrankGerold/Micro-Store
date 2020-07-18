import request from 'supertest';

import { app } from '../../app';
import { getAuthCookie } from '../../test/getAuthCookie';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

it('doesn\'t throw a 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {

});

it('returns an error if an invalid price is detected', async () => {

});

it('creates a ticket with valid inputs', async () => {

});
