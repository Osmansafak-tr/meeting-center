const express = require("express");
const app = express();
// Other Imports
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
// My Imports
const port = process.env.PORT;
const database = require("./database");
const { auth, errorHandler } = require("./middleware");
const router = require("./router");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

app.use("*", auth.apiAuth);
app.use("/", router);

app.use(errorHandler);

const startApp = async () => {
  await database.connect();
  console.log(`Listening on Port ${port} .....`);
};
app.listen(port, startApp());
