const express = require("express");
const app = express();
// Other Imports
const bodyParser = require("body-parser");
require("dotenv").config();
// My Imports
const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on Port ${port} .....`);
});
