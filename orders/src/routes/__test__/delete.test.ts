import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { getAuthCookie } from '../../test/getAuthCookie';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../natsWrapper';

it('throws an error if order doesnt exist', async () => {
  await request(app)
    .patch(`/api/orders/${mongoose.Types.ObjectId()}`)
    .set('Cookie', getAuthCookie())
    .send()
    .expect(404)
});

it('won\'t let user edit an order that doesnt belong to them', async () => {
  // Create a ticket
  const ticket = await Ticket.create({
    title: 'Cool show',
    price: 123
  });

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie',getAuthCookie())
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set('Cookie', getAuthCookie())
    .expect(401)
});

it('marks an order as cancelled', async () => {
  // Create ticket with ticket model.
  const ticket = await Ticket.create({
    title: 'test tix',
    price: 12345
  });

  const user = getAuthCookie();

  // Create order w/ request.
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to cancel order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  // Check that order is cancelled.
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('creates an event after order cancellation', async () => {
  const ticket = await Ticket.create({
    title: 'test tix',
    price: 12345
  });

  const user = getAuthCookie();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  // Here, 2 messages should have been published:
  // one for creation, and then one for cancellation.
  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
});
