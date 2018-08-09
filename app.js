// modules for server
const express = require("express");
// modules for debugging
const morgan = require("morgan");
// modules for parsing
const bodyParser = require("body-parser");
const dbConnect = require("./db/mongo_connect");

//mongoose connect
dbConnect();

//register apis here..

const auth = require("./auth");

const app = express();

//auth.checkHeaders(app);

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use("/", basic); //basic Apis.
require("./apis").registerApis(app);

//when user access to the invalid api
app.use((req, res, next) => {
  const error = new Error("Not found in API or method");
  error.status = 404;
  next(error); //send next use method...
});

//when any of exception is occured in api functions.
//maybe occured when you access to the database,
// and it occurs some exception...
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  //console.log(req);
  res.json({
    error: {
      request: req.originalUrl,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
      message: error.message
    }
  });
});

module.exports = app;
