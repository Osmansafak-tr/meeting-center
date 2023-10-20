const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
// My imports
const port = process.env.PORT;
const database = require("./database");
const { errorHandler } = require("./common/middleware");

app.use(bodyParser.json());

const routers = require("./router");
app.use("/account", routers.AccountRouter);

app.use(errorHandler);

const connect = async () => {
  await database.connect();
  await database.seedData();
  console.log(`Backend Server listening on port ${port} .....`);
};
app.listen(port, connect);
