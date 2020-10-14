import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { requireAuth, validateRequest } from '@microstore/common';

const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Must provide MongoDB Ticket ID!')
], validateRequest, async (req: Request, res: Response) => {
  res.send({});
});

export { router as newOrderRouter };
