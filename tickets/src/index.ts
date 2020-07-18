import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT key env var must be defined!')
  }

  try {
    await mongoose.connect('mongodb://tickets-mongo-service:27017/tickets', {
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
