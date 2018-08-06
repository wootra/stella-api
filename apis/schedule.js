const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// schedule/news
let id = 0;
function createData(title, date, content = "auto gen", writer = "admin") {
  id += 1;
  return { id, title, date, content, writer };
}

const data = [
  createData("Stella's surprise show!", new Date("2018-05-31 17:00")),
  createData("Freezing!!", new Date("2018-06-01 17:00")),
  createData("Car seat test", new Date("2018-06-02 17:00")),
  createData("Stella Came out from the hospital", new Date("2018-06-05 17:00")),
  createData("First travel to the clinic!", new Date("2018-06-13 17:00")),
  createData("Jhondas is too scary", new Date("2018-06-16 17:00")),
  createData("Supposed to come out today", new Date("2018-06-25 17:00"))
];

router.get("/news", (req, res, next) => {
  const limit = req.query.limit;
  let list;
  if (limit) list = data.slice(limit);
  else list = data;
  console.log(list);
  res.status(200).json(list);
});

router.post("/news", (req, res, next) => {
  data.push(req.body); //add data
  res.status(200).json({
    message: "success!"
  });
});

router.get("/", (req, res, next) => {
  let error = new Error("Wrong access point");
  error.status = 400;
  next(error);
});

// schedule/news/{id}
router.get("/news/:id", (req, res, next) => {
  const id = req.params.id;

  if (id < 0 || id >= data.length) {
    let error = new Error("id is wrong...");
    error.status = 400;
    next(error);
  } else {
    res.status(200).json([data[req.params.id]]);
  }
});

module.exports = router;
