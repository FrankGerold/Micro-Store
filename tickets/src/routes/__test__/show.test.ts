import request from 'supertest';

import { app } from '../../app';
import { Ticket } from "../../models/ticket";

it('returns a 404 if the ticket is not found', async () => {
  await request(app)
    .get('/api/tickets/1234567890')
    .send()
    .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  let title = 'New ticket';
  let price = 150;
  let userId = '12345'

  const ticket = await Ticket.build({ title, price, userId }).save()

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticket._id}`)
    .send()
    .expect(200);
});
