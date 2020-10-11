import { Publisher, Subjects, TicketCreatedEvent } from '@microstore/common';

export class TicketCreatedPublisher extends Publisher <TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
};
