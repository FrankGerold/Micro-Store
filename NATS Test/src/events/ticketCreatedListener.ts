import { Message } from 'node-nats-streaming';
import { Listener } from './listenerClass';

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'Payments-Service';

  onMessage(data: any, msg: Message) {
    console.log('Event data:', data);

    msg.ack();
  };
};
