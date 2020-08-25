import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { 
	validateRequest,
	NotFoundError,
	requireAuth,
	NotAuthorizedError
 } from '@microstore/common';
 import { Ticket } from '../models/ticket';

 const router = express.Router();

 