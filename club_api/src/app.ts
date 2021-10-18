import dotenv from 'dotenv';
const result = dotenv.config()

if (result.error) {
  throw result.error
}
console.log(result.parsed);


import express from "express";
import bodyParser from "body-parser";

import v1 from "./routes/v1/index";
import cors from "cors";


// bootstrap
const app = express();


// middleware

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*'
}));




// apply the routes to our application
app.use("/api", v1);

export default app;