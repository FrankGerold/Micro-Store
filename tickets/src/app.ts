import express from 'express';
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from "@microstore/common";

import { newTicketRouter } from './routes/new';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);

app.use(newTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
