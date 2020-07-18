import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';

import { BadRequestError, validateRequest } from "@microstore/common";

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
  ], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      // console.log('Email already in use');
      // return res.send({})
      throw new BadRequestError('Email is already in use!')
    }

    const user = User.build({ email, password });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    // Store token on session object
    req.session = {
      jwt: userJwt
    }

    res.status(201).send(user);

    // console.log('Creating User');
    // throw new DatabaseConnectionError();
    //
    // res.send({});

  });

export { router as signUpRouter };
