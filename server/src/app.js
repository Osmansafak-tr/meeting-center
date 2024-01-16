const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
// My imports
const port = process.env.PORT;
const whitelist = process.env.CORS_WHITELIST;
const database = require("./database");
const { errorHandler, handleAuth } = require("./middleware");
const { apiAuth, userAuthenticate } = handleAuth;

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS , Origin : ${origin}`));
      }
    },
  })
);
app.use(bodyParser.json());

const routers = require("./router");
app.use("*", apiAuth, userAuthenticate);
app.use("/", routers.MainRouter);
app.use("/account", routers.AccountRouter);
app.use("/profile", routers.ProfileRouter);

app.use(errorHandler);

const connect = async () => {
  await database.connect();
  await database.seedData();
  console.log(`Backend Server listening on port ${port} .....`);
};
app.listen(port, connect);
