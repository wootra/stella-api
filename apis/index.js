// global modules
const auth = require("../auth/headerAuth.js");
const { setCorsHeader } = require("../auth/CORS.js");

// api modules
const apis = require("./normal/index.js");
//guest API moudules
const guestApis = require("./guest");
//admin API modules

//const adminApis = require("./admin");
function checkHeaders(app) {
  //CHECK GUEST KEY
  app.use((req, res, next) => {
    if (req.header("key") === auth.getGuestKey()) {
      req.url = "/GUEST" + req.url;
      req.guestPermission = true;
      //router react by req.url..
    } else {
      console.log("guestkey:", auth.getGuestKey());
    }
    next();
  });

  //CHECK ADMIN KEY
  app.use((req, res, next) => {
    if (req.header("key") === auth.getAdminKey()) {
      //req.url = "/ADMIN" + req.url;
      req.adminPermission = true;
      //router react by req.url..
    } else {
      console.log("adminkey:", auth.getAdminKey());
    }
    next();
  });
}

function setSpecialRoutes(app) {
  app.use("/GUEST/:more", (req, res, next) => {
    if (req.guestPermission !== true) {
      res.status(501).json({
        message: "invalid entry"
      });
    } else {
      next();
    }
  });

  // app.use("/ADMIN/:more", (req, res, next) => {
  //   if (req.adminPermission !== true) {
  //     res.status(501).json({
  //       message: "invalid entry"
  //     });
  //   } else {
  //     next();
  //   }
  // });
}

function registerApis(app) {
  checkHeaders(app);
  setSpecialRoutes(app);
  setCorsHeader(app);

  const guestKeys = Object.keys(guestApis);
  for (let apiKey of guestKeys) {
    let route = "/GUEST/" + apiKey;
    console.log(route);
    app.use(route, guestApis[apiKey]);
  }
  // const adminKeys = Object.keys(adminApis);
  // for (let apiKey of adminKeys) {
  //   let route = "/ADMIN/" + apiKey;
  //   console.log(route);
  //   app.use(route, adminApis[apiKey]);
  // }

  const keys = Object.keys(apis);
  for (let apiKey of keys) {
    app.use("/" + apiKey, apis[apiKey]);
  }
}

module.exports = { registerApis };
