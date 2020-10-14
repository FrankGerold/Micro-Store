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
  if (!process.env.NATS_URL) {
    throw new Error('NATS URL env var must be defined!')
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS Cluster ID env var must be defined!')
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS Client ID env var must be defined!')
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');

      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );

    console.log('Connected to MongoDB!');

  } catch (err) {
    console.error(err);
  };
};


app.listen(4444, () => {
  console.log('Orders listening on port 4444');
})


start();
