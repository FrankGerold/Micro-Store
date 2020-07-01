import express from 'express';
import { json } from "body-parser";


const app = express();
app.use(json());


app.listen(1111, () => {
  console.log('Auth listening on port 1111!');

})
