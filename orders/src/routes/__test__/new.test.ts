import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { getAuthCookie } from '../../test/getAuthCookie';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../natsWrapper';




it('has a route handler listening to /api/orders for post requests', async () => {
  const response = await request(app)
    .post('/api/orders')
    .send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
  const response = await request(app)
    .post('/api/orders')
    .send({})
    .expect(401);
});

it('doesn\'t throw a 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid ticket ID is detected', async () => {
  await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({
      ticketId: 'Bad Test Ticket',
    })
    .expect(400);
});

it('doesn\'t throw a 400 error when a valid ID is provided', async () => {
  const fakeId = mongoose.Types.ObjectId();

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({
      ticketId: fakeId,
    })

  expect(response.status).not.toEqual(400);
});

it('returns an error if the ticket does not exist', async () => {
  const fakeId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({
      ticketId: fakeId
    })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = await Ticket.create({
    title: 'Test concert',
    price: 420
  });

  const order = await Order.create({
    ticket,
    userId: 'Fake User',
    status: OrderStatus.Created,
    expiresAt: new Date()
  });

  await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticket = await Ticket.create({
    title: 'Test concert',
    price: 420
  });

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({ ticketId: ticket.id })
    .expect(201);
});



it('persists order to DB correctly', async () => {
  const ticket = await Ticket.create({
    title: 'Test concert',
    price: 420
  });

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({ ticketId: ticket.id })
    .expect(201);

  const newId = response.body.id;
  const checkDb = await Order.findById(newId);

  expect(checkDb).toBeTruthy();
  
  // My custom model toJson ID property returns a serialized
  // object instead of a string, which isnt comparable
  // with toEqual. Had to grab the original _id instead.
  expect(checkDb!.ticket).toEqual(ticket._id);
});

it.todo('Creates an event after order creation')
