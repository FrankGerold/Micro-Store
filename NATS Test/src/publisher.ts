import nats from 'node-nats-streaming';
import { randomBytes } from "crypto";

import { TicketCreatedPublisher } from './events/ticketCreatedPublisher'

console.clear();

const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('publisher connected to nats', 'hi!');

  const data = {
    id: '420',
    title: 'Frank Ocean C0ncert',
    price: 10000
  };

  const publisher = new TicketCreatedPublisher(client);

  publisher.publish(data);

});
