const express = require("express");
const schedule = require("./apis/schedule.js");
const basic = require("./apis/basic.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//register apis here..

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Origin','http://stella-home.s3.us-east-2.aws.amazon.com');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
const apis = { schedule }; //add here

const keys = Object.keys(apis);
for (let apiKey of keys) {
  app.use("/" + apiKey, apis[apiKey]);
}
//app.use("/", basic); //basic Apis.

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
