// src/app.js

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const environment = require("./config/environment");
const db = require("./config/db");
const carRoutes = require("./routes/carRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Database connection
db();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/cars", carRoutes);
app.use(errorHandler);

app.listen(environment.PORT, () => {
  // Fixed the PORT
  console.log(`A node API is listening on port: ${environment.PORT}`);
});

module.exports = app; // for testing purposes
