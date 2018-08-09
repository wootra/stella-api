// global modules
const bcrypt = require("bcrypt");

//admin API modules
const __adminKey = bcrypt.hashSync("" + Math.random(), 10);
const __guestKey = bcrypt.hashSync("" + Math.random(), 10);

function getAdminKey() {
  return process.env.DEV_ADMIN_KEY ? process.env.DEV_ADMIN_KEY : __adminKey;
}
function getGuestKey() {
  return process.env.DEV_GUEST_KEY ? process.env.DEV_GUEST_KEY : __guestKey;
}

const isAdmin = checked => (req, res, next) => {
  if (checked) {
    if (req.adminPermission) {
      console.log("admin!");
      return next();
    } else {
      let error = new Error("invalid entry!");
      error.status = 501;
      return next(error);
    }
  } else {
    console.log("normal!");
    return next();
  }
};

const isGuest = checked => (req, res, next) => {
  if (checked) {
    if (req.guestPermission) {
      console.log("guest!");
      return next();
    } else {
      let error = new Error("invalid entry!");
      error.status = 501;
      return next(error);
    }
  } else {
    console.log("normal!");
    return next();
  }
};

module.exports = { getAdminKey, getGuestKey, isAdmin, isGuest };
