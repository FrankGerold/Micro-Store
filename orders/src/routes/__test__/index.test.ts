import request from 'supertest';

import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { getAuthCookie } from '../../test/getAuthCookie';


// Helper function for random ticket generation.
const buildTicket = async () => {
  const ticket = await Ticket.create({
    // Random 5 digit number for a title
    title: `${Math.floor(Math.random() * 1000000)}`,

    // Random 3-figure cost. 
    price: Math.floor(Math.random() * 100000) / 100
  });

  return ticket;
};


it('fetches orders for a particular user', async () => {
  // Create three tickets
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  // Create 2 users
  const user1 = getAuthCookie();
  const user2 = getAuthCookie();

  // Create one order as 1 user
  const { body: order1 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  // Create 2 orders as second user
  const { body: order2 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: order3 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  // Request to get orders for User 2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .expect(200);

  // Make sure no user 1 orders show up.
  expect(response.body.length).toEqual(2);

  expect(response.body[0].id).toEqual(order2.id);
  expect(response.body[1].id).toEqual(order3.id);

  expect(response.body[0].ticket.id).toEqual(ticket2.id)
  expect(response.body[1].ticket.id).toEqual(ticket3.id)

})
