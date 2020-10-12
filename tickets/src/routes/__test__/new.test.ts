import request from 'supertest';

import { app } from '../../app';
import { getAuthCookie } from '../../test/getAuthCookie';
import { Ticket } from '../../models/ticket';


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
  await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send({
      title: '',
      price: 100
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send({
      price: 100
    })
    .expect(400);
});

it('returns an error if an invalid price is detected', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send({
      title: 'Valid Test Title',
      price: -5
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send({
      title: 'Valid Test Title'
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'test title';
  const price = 100;

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send({
      title,
      price
    })
    .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    expect(tickets[0].price).toEqual(price)
    expect(tickets[0].title).toEqual(title)
});
