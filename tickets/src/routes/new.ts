import express, { Request, Response } from 'express';

import { requireAuth } from '@microstore/common';
import { getAuthCookie } from '../test/getAuthCookie';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});




export { router as newTicketRouter };
