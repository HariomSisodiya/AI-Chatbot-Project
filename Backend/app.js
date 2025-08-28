import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AIRouter from "./Router/ai.router.js";
import cors from "cors";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.Mongo_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async() => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/ai", AIRouter);
    app.listen(process.env.PORT, () => {
      console.log("Server Started");
    });
  })
  .catch((error) => {
    console.log("ERROR DB is not connected");
  });
