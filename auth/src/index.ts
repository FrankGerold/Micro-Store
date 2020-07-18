import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT key env var must be defined!')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URI env var must be defined!')
  }

  try {
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

app.get('/api/users/hello', (req, res) => {
  res.send('Hi there :)')
});


app.listen(1111, () => {
  console.log('Auth listening on port 1111!?');
})

start();
