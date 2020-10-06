import { Message } from 'node-nats-streaming';

import { Listener } from './listenerClass';
import { TicketCreatedEvent } from './ticketCreatedEvent'
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener <TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'Payments-Service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data:', data);

    msg.ack();
  };
};
