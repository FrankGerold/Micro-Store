import mongoose from "mongoose";

import { app } from "./app";
import { natsWrapper } from './natsWrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT key env var must be defined!')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URI env var must be defined!')
  }

  try {
    await natsWrapper.connect('ticketing', 'TicketBoiii', 'http://nats-service:4222');

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected to MongoDB!');

  } catch (err) {
    console.error(err);
  };
};


app.listen(2222, () => {
  console.log('Tickets listening on port 2222');
})


start();
