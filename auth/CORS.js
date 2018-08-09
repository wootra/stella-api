function setCorsHeader(app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header('Access-Control-Allow-Origin','http://stella-home.s3.us-east-2.aws.amazon.com');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });
}

module.exports = { setCorsHeader };
