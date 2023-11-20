const express = require("express");
const app = express();
// Other Imports
const bodyParser = require("body-parser");
require("dotenv").config();
// My Imports
const port = process.env.PORT;
const database = require("./database");
const { apiAuth } = require("./middlewares/auth");

app.use(bodyParser.json());
app.use(apiAuth);

app.get("/", (req, res) => {
  return res.status(200).json("Main Page");
});

const startApp = async () => {
  await database.connect();
  console.log(`Listening on Port ${port} .....`);
};
app.listen(port, startApp());
