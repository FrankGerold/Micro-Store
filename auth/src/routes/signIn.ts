import express, { Request, Response } from "express";
import { body } from 'express-validator';

import { validateRequest } from "../middleware/validateRequests";

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be vaild!'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Must supply a password!')
], validateRequest, (req: Request, res: Response) => {});

export { router as signInRouter };
