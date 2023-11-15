const express = require("express");
const app = express();
// Other Imports
const bodyParser = require("body-parser");
require("dotenv").config();
// My Imports
const port = process.env.PORT;
const database = require("./database");

app.use(bodyParser.json());

const startApp = async () => {
  await database.connect();
  console.log(`Listening on Port ${port} .....`);
};
app.listen(port, startApp());
