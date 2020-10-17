import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@microstore/common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

// Set the time before orders expire.
// 15 minutes here.
const EXPIRATION_WINDOW_SECONDS = 15 * 60;


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
  const reserved = await ticket.isReserved();

  if (reserved) {
    throw new BadRequestError('Ticket already reserved!');
  };


  // Calculate order expiration
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);


  // Build order, save to DB
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  });

  await order.save();


  // Publish event

  res.status(201)
    .send(order);
});

export { router as newOrderRouter };
