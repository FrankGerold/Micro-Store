import express, { Request, Response } from 'express';

import { requireAuth, NotFoundError, NotAuthorizedError } from '@microstore/common';
import { Order, OrderStatus} from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/orderCancelledPublisher';
import { natsWrapper } from '../natsWrapper';


const router = express.Router();

router.patch('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate('ticket');

  if (!order) {
    throw new NotFoundError();
  };
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  };

  order.status = OrderStatus.Cancelled;

  await order.save();

  new OrderCancelledPublisher(natsWrapper.client)
    .publish({
      id: order.id,
      ticket: {
        id: order.ticket.id
      }
    });

  res.status(200).send(order);
});

export { router as deleteOrderRouter };
