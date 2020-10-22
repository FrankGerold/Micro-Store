import { Publisher, OrderCancelledEvent, Subjects } from "@microstore/common";

export class OrderCancelledPublisher extends Publisher <OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
};
