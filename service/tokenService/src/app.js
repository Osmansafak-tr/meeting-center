// Third party imports
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
// My imports
const port = process.env.PORT;
const database = require("./database");

app.use(bodyParser.json());

const connect = async () => {
  await database.connect();
  console.log(`Token Service listening on ${port} ......`);
};
app.listen(port, connect);
