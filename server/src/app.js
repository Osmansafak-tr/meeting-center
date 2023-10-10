const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const port = process.env.PORT;
const database = require("./database");
const connect = async () => {
  await database.connect();
  await database.seedData();
  console.log(`Backend Server listening on port ${port} .....`);
};
app.listen(port, connect);
