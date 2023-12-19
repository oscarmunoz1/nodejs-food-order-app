import { AdminRoute, VandorRoute } from "./routes";

import bodyParser from "body-parser";
import config from "config";
import connect from "./utils";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

mongoose
  .connect(config.get("dbUri"))
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
