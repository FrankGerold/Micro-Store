import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { RequestValidationError } from "../errors/requestValidationError";
import { BadRequestError } from "../errors/badRequestError";

import { User } from "../models/user";

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email Address is required!'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password has to be at least 8 characters')
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      // console.log('Email already in use');
      // return res.send({})
      throw new BadRequestError('Email is already in use!')
    }

    const user = User.build({ email, password });

    await user.save();

    res.status(201).send(user);

    // console.log('Creating User');
    // throw new DatabaseConnectionError();
    //
    // res.send({});

  });

export { router as signUpRouter };
