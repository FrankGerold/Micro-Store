import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { Ticket } from "../../models/ticket";

it('returns a 404 if the ticket is not found', async () => {
  // Make a fake ID for the test
  // TODO: convert into external helper funciont
  const generatedId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/tickets/${generatedId}`)
    .send()
    .expect(404);
    
});

it('returns the ticket if the ticket is found', async () => {
  let title = 'New ticket';
  let price = 150;
  let userId = '12345'

  
  const ticket = await Ticket.build({ title, price, userId }).save();

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticket._id}`)
    .send()
    .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});
