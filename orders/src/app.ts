import express from 'express';
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from "@microstore/common";

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // Allow insecure cookies for development
    signed: false,
    // Workaround to let Jest work with fake cookies
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);

app.use(newOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
