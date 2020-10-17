require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Import routes
const bookRoutes = require("./route/bookRoutes");

app.use("/", bookRoutes);

// Connect DB
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const dbURI =
  "mongodb://" +
  USER +
  ":" +
  PASS +
  "@nodejs-course-shard-00-00.oufx0.mongodb.net:27017,nodejs-course-shard-00-01.oufx0.mongodb.net:27017,nodejs-course-shard-00-02.oufx0.mongodb.net:27017/" +
  DB_NAME +
  "?ssl=true&replicaSet=atlas-o5ud8o-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(mongoose.set("useCreateIndex", true))
  .then(() => {
    console.log("Connected to Mongo DB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
