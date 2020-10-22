import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { requireAuth, BadRequestError, NotFoundError, NotAuthorizedError } from '@microstore/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const requestOrder = req.params.orderId;
  if (!mongoose.Types.ObjectId.isValid(requestOrder)) {
    throw new BadRequestError('Not a valid order ID.')
  };

  const order = await Order.findById(requestOrder).populate('ticket');

  if (!order) {
    throw new NotFoundError();
  };

  if (order.userId != req.currentUser!.id) {
    throw new NotAuthorizedError();
  };

  res.send(order);
});

export { router as showOrderRouter };
