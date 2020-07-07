import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { RequestValidationError } from "../errors/requestValidationError";

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email Address is required!'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password has to be at least 8 characters')
  ], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log('Creating User');
    throw new DatabaseConnectionError();

    res.send({});

  });

export { router as signUpRouter };
