import express from 'express';
import { json } from "body-parser";

import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signUpRouter } from "./routes/signUp";
import { signOutRouter } from "./routes/signOut";
import { errorHandler } from "./middleware/errorHandler";


const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use(errorHandler);

app.get('/api/users/hello', (req, res) => {
  res.send('Hi there :)')
});


app.listen(1111, () => {
  console.log('Auth listening on port 1111!?');
})
