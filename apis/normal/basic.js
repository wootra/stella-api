const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// schedule/news
router.get("/", function(req, res) {
  res.status(200).json({
    Output: "Hello World!-get"
  });
});

router.post("/", function(req, res) {
  res.status(200).json({
    Output: "Hello World!-post"
  });
});

router.patch("/", function(req, res) {
  res.status(200).json({
    Output: "Hello World!-patch"
  });
});

router.delete("/", function(req, res) {
  res.status(200).json({
    Output: "Hello World!-delete"
  });
});

router.put("/", function(req, res) {
  res.status(200).json({
    Output: "Hello World!-put"
  });
});

module.exports = router;
