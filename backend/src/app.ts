import express from "express";
import formidableMiddleware from "express-formidable";
import bodyParser from "body-parser";

import v1 from "./routes/v1/index";
import cors from "cors";

// bootstrap
const app = express();


// middleware
app.use(formidableMiddleware());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*'
}));




// apply the routes to our application
app.use("/api", v1);

export default app;