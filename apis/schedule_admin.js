const mongoose = require("mongoose");
const Promise = require("bluebird");

const express = require("express");
const router = express.Router();
const Schedule = require("./models/schedule");
const _url = process.env.SERVER_URL + "/schedule";

//admin
router.patch("/news/update", (req, res, next) => {
  // const schedule = new Schedule({
  //   _id: new mongoose.Types.ObjectId(),
  //   title: req.body.title,
  //   date: req.body.date ? new Date(req.body.date) : new Date(Date.now()),
  //   content: req.body.content,
  //   writer: req.body.writer,
  //   modified: new Date(Date.now()),
  //   important: req.body.important != undefined ? req.body.important : false,
  //   index: ++_idx
  // });
  let idx = 0;
  Schedule.updateMany(req.body.cond, {
    modified: new Date(Date.now()),
    ...req.body.newEntries
  })
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

router.post("/news/list", (req, res, next) => {
  Schedule.find(req.body.cond, req.body.records)
    .then((ret, err) => {
      if (err) {
        err.status = 501;
        next(err);
      } else {
        res.status(201).json({
          list: ret
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

router.get("/news/init", (req, res, next) => {
  Schedule.createIndexes(err => {
    if (err) {
      next(err);
    } else {
      res.status(201).json({
        message: "INIT OK"
      });
    }
  });
});

module.exports = router;
