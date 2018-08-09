const mongoose = require("mongoose");
const Promise = require("bluebird");

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isAdmin } = require("../../auth/headerAuth.js");
const _url = process.env.SERVER_URL + "/user";

//for admin
router.get("/count", isAdmin(true), (req, res, next) => {
  User.find({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: "ok"
    });
  });
});

router.get("/:id", (req, res, next) => {
  User.find({ _id: req.params.id })
    .then(res => {})
    .catch(err => {});
});

module.exports = router;
