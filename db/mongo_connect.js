const mongoose = require("mongoose");
//var uri =
// "mongodb://stella:" +
// //process.env.MONGO_ATLAS_PW +
// "wjsdn1007" +
// "@cluster0-shard-00-00-smgd8.mongodb.net:27017,cluster0-shard-00-01-smgd8.mongodb.net:27017,cluster0-shard-00-02-smgd8.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
//console.log("password:", process.env.MONGO_ATLAS_PW);
var uri =
  "mongodb+srv://stella:" +
  process.env.MONGO_ATLAS_PW +
  //"wjsdn1007" +
  "@cluster0-smgd8.mongodb.net/test?retryWrites=true";

function dbConnect() {
  mongoose
    .connect(
      uri,
      { useNewUrlParser: true }
      //,{ useMongoClient: true }
      // no longer necessary in mongoose 5.x version.
    )
    .then((ret, err) => {
      if (err) {
        console.log("error when connect to db", err);
      } else {
        console.log("mongo db is connected.");
      }
    });
}
module.exports = dbConnect;
