const jwt = require("jsonwebtoken");
// const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");

module.exports.adminLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/admin/login");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_OWNER_KEY);
    let owner = await ownerModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.owner = owner;
    next();
  } catch (err) {
    req.flash("error", "Something Went Wrong.");
    res.redirect("/admin/login");
  }
};
