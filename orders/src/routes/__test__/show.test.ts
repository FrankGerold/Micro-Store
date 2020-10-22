import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { getAuthCookie } from '../../test/getAuthCookie';

it('fetches the order', async () => {
  // Create a ticket
  const ticket = await Ticket.create({
    title: 'Cool show',
    price: 123
  });

  const user = getAuthCookie();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
})

it('returns an error ifa user tries to fetch another user\'s order', async () => {
  // Create a ticket
  const ticket = await Ticket.create({
    title: 'Cool show',
    price: 123
  });

  const user = getAuthCookie();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', getAuthCookie())
    .send()
    .expect(401);
})
