const express = require("express");
const app = express();
// Other Imports
const bodyParser = require("body-parser");
require("dotenv").config();
// My Imports
const port = process.env.PORT;
const database = require("./database");
const { auth, errorHandler } = require("./middleware");
const router = require("./router");

app.use(bodyParser.json());

app.use("*", auth.apiAuth);
app.get("/", router);

app.use(errorHandler);

const startApp = async () => {
  await database.connect();
  console.log(`Listening on Port ${port} .....`);
};
app.listen(port, startApp());
