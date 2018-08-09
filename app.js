// modules for server
const express = require("express");
// modules for debugging
const morgan = require("morgan");
// modules for parsing
const bodyParser = require("body-parser");
const dbConnect = require("./db/mongo_connect");
// api modules
const schedule = require("./apis/schedule.js");
const basic = require("./apis/basic.js");

//guest API moudules
const _schedule = require("./guestApis/schedule.js");

//admin API modules
const schedule_admin = require("./apis/schedule_admin.js");

//mongoose connect
dbConnect();

//register apis here..
const apis = {
  schedule
}; //add here
const guestApis = { _schedule }; //add here
const adminApis = { schedule_admin };
const app = express();

//CHECK GUEST KEY
app.use((req, res, next) => {
  if (req.header("key") === "GUEST-KEY") {
    req.url = "/GUEST" + req.url;
    //router react by req.url..
  }
  next();
});

//CHECK ADMIN KEY
app.use((req, res, next) => {
  if (req.header("key") === "ADMIN-KEY") {
    req.url = "/ADMIN" + req.url;
    //router react by req.url..
  }
  next();
});

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

const guestKeys = Object.keys(guestApis);
for (let apiKey of guestKeys) {
  let route = "/GUEST/" + apiKey.replace("_", "");
  console.log(route);
  app.use(route, guestApis[apiKey]);
}
const adminKeys = Object.keys(adminApis);
for (let apiKey of adminKeys) {
  let route = "/ADMIN/" + apiKey.replace("_admin", "");
  console.log(route);
  app.use(route, adminApis[apiKey]);
}

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
