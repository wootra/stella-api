const mongoose = require("mongoose");
const Promise = require("bluebird");

const express = require("express");
const router = express.Router();
const Gallary = require("../models/gallary");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    let newFileName = new Date()
      .toISOString()
      .replace(/[:]/g, "_")
      .replace(/Z/, "")
      .replace(/T/, " ");
    //newFileName = newFileName.replace(/:/g, "");
    newFileName += "@" + file.originalname;
    console.log("newFileName:" + newFileName);
    cb(null, newFileName);
  }
});
const memoryStorage = multer.memoryStorage();
const _limitSize = 1024 * 1024 * 5; //5Mbytes
const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: _limitSize
  }
});
const memory = multer({ storage: memoryStorage, limits: _limitSize });

const _url = process.env.SERVER_URL + "/gallary";
const _uploadUrl = process.env.SERVER_URL + "/uploads";

const isAdmin = checked => (req, res, next) => {
  if (checked) {
    if (req.adminPermission) return next();
    else return res.status(501).json({ message: "envalid entry" });
  } else {
    return next();
  }
};
//for admin
router.get("/count", isAdmin(true), (req, res, next) => {
  Gallary.find({ _id: req.params.id }).then(result => {
    if (result.length > 0) {
      res.status(200).json({
        count: result,
        message: "ok"
      });
    } else {
      res.status(200).json({
        count: 0,
        message: "ok"
      });
    }
  });
});

// POST ../gallary/images
router.post(
  "/images",
  isAdmin(false),
  upload.array("images", 5),
  memory.array("images", 5),
  (req, res, next) => {
    console.log(req);

    res.status(200).json({
      message: "ok"
    });
  }
);

// POST ../gallary/image
router.post(
  "/image",
  isAdmin(false),
  memory.single("image"),
  upload.single("image"),
  (req, res, next) => {
    console.log(req.buffer);

    res.status(200).json({
      message: "ok"
    });
  }
);

// POST ../gallary
router.post(
  "/",
  isAdmin(true),
  memory.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 50 }
  ]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 50 }
  ]),
  (req, res, next) => {
    console.log(req.file);

    res.status(200).json({
      message: "ok"
    });
  }
);

router.get("/:id", (req, res, next) => {
  Gallary.find({ _id: req.params.id })
    .then(res => {})
    .catch(err => {});
});

module.exports = router;
