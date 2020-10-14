import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@microstore/common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Must provide MongoDB Ticket ID!')
], validateRequest, async (req: Request, res: Response) => {
  const { ticketId } = req.body;

  // Find the ticket in the DB
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  };

  // Make sure ticket isnt already reserved
  // Query thru all orders, find one with ticket just found, and status is NOT cancelled.
  const existingOrder = await Order.findOne({
    ticket: ticket,
    status: {
      $in: [
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
        OrderStatus.Created
      ]
    }
  });

  if (existingOrder) {
    throw new BadRequestError('Ticket already reserved!');
  };

  // Calculate order expiration


  // Build order, save to DB


  // Publish event

  res.send({});
});

export { router as newOrderRouter };
