import { TicketUpdatedEvent, Subjects, Publisher } from '@microstore/common';

export class TicketUpdatedPublisher extends Publisher <TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
};
