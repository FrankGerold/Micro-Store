import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Listener connected to NATS')

  const options = stan.subscriptionOptions()
    .setManualAckMode(true);

  const subscription = stan.subscribe(
    'ticket:created',
    'listener-service-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    console.log('Message Received');

    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()} with data ${data}`);
    };

    msg.ack();
  });

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
});

process.on('SIGINT', () => {stan.close()});
process.on('SIGTERM', () => {stan.close()});
