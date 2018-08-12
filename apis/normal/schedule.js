const mongoose = require("mongoose");
const Promise = require("bluebird");

const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule");

const _url = process.env.SERVER_URL + "/schedule";
let _idx = 0;
// schedule/news
router.get("/news/count", (req, res, next) => {
  Schedule.estimatedDocumentCount() //.find({}, "_id")
    //.count()
    .then((ret, err) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({
          count: ret
        });
      }
    });
});

// schedule/news/{id}
router.get("/news/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("id:", id);
  Schedule.findById(id, ["content"])
    .then((ret, err) => {
      res.status(200).json({
        content: ret.content
      });
    })
    .catch(err => {
      let error = new Error(err);
      error.status = 501;
      next(error);
    });
});

// schedule/news/{id}
router.patch("/news/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("id:", id);
  Schedule.update(
    { _id: id },
    {
      $set: {
        title: req.body.title,
        content: req.content,
        date: req.date ? new Date(req.date) : new Date(Date.now()),
        modified: new Date(Date.now()),
        important: req.body.important != undefined ? req.body.important : false
      }
    }
  )
    .then((ret, err) => {
      res.status(200).json({ message: "OK" });
    })
    .catch(err => {
      let error = new Error(err);
      error.status = 501;
      next(error);
    });
});
router.get("/news", (req, res, next) => {
  let limit = req.query.limit;
  let start = req.query.start;

  let list;
  if (limit) {
    if (!start) {
      start = 0;
    }
    start = Number(start);
    limit = Number(limit);
    //console.log("start:", start);

    let schema = Schedule.find({}, ["title", "date", "_id", "idx"]);
    let query = schema.toConstructor();

    Promise.join(
      Schedule.estimatedDocumentCount().exec(),
      query()
        .sort({ date: -1 })
        .skip(start)
        .limit(limit),
      (count, ret, err) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({
            count: count,
            start: 0,
            list: ret.map(item => {
              return {
                title: item.title,
                date: item.date,
                link: {
                  type: "GET",
                  url: _url + "/news/" + item._id
                }
              };
            })
          });
        }
      }
    ).catch(err => {
      let error = new Error(err);
      err.status = 501;
      next(error);
    });
  } else {
    let schema = Schedule.find({}, ["title", "date", "_id"]);
    let query = schema.toConstructor();

    Promise.join(
      schema.estimatedDocumentCount().exec(),
      query()
        .sort({ date: -1 })
        .limit(5),
      (count, ret, err) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({
            count: count,
            start: 0,
            list: ret.map(item => {
              return {
                title: item.title,
                date: item.date,
                link: {
                  type: "GET",
                  url: _url + "/news/" + item._id
                }
              };
            })
          });
        }
      }
    ).catch(err => {
      let error = new Error(err);
      err.status = 501;
      next(error);
    });
  }
});

router.post("/news", (req, res, next) => {
  const schedule = new Schedule({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    date: req.body.date ? new Date(req.body.date) : new Date(Date.now()),
    content: req.body.content,
    writer: req.body.writer,
    modified: new Date(Date.now()),
    important: req.body.important != undefined ? req.body.important : false,
    index: ++_idx
  });
  schedule
    .save()
    .then((ret, err) => {
      if (err) {
        err.status = 501;
        next(err);
      } else {
        res.status(201).json({
          message: ret
        });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(501).json({
        message: e
      });
    });
});

router.get("/", (req, res, next) => {
  let error = new Error("Wrong access point");
  error.status = 400;
  next(error);
});

module.exports = router;
