import nats from 'node-nats-streaming';
import { randomBytes } from "crypto";


console.clear();

const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('publisher connected to nats', 'hi!');

  const data = JSON.stringify({
    id: '420',
    title: 'Frank Ocean C0ncert',
    price: 10000
  });

  client.publish('ticket:created', data, () => {
    console.log('event published!')
  })

});
