import nats from 'node-nats-streaming';

console.clear();

const client = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('publisher connected to nats', 'hi!');

  const data = JSON.stringify({
    id: '420',
    title: 'fake show',
    price: 1000
  });

  client.publish('ticket:created', data, () => {
    console.log('event published!')
  })

});
