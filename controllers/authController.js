const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const ownerModel = require("../models/owner-model");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "You already have an account, please login");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return err.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("User Created Successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (!user) {
    req.flash("error", "Email or Password Incorrect");
    return res.redirect("/");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        // res.send("You Can Login");
        res.redirect("/shop");
      } else {
        return res.status(401).send("Email or Password Incorrect");
      }
    });
  }
};

// module.exports.adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await ownerModel.findOne({ email });

//     if (!admin) {
//       req.flash("error", "Invalid admin Credentials");
//       return res.redirect("/admin/login");
//     }

//     bcrypt.compare(password, admin.password, (err, result) => {
//       if (result) {
//         const token = generateToken(admin);
//         res.cookie("token", token);
//         req.flash("success", "Welcome Admin 🤞");
//         return res.redirect("/owners/admin");
//       } else {
//         req.flash("Error", "Invalid Admin Credentials");
//         res.redirect("/admin/login");
//       }
//     });
//   } catch (err) {
//     res.send(err.message);
//   }
// };

//my admin login controller
module.exports.adminLogin = async (req, res) => {
  let { email, password } = req.body;
  let admin = await ownerModel.findOne({ email: email });

  if (!admin) {
    req.flash("error", "Email or Password Incorrect");
    return res.redirect("/owners/admin");
  } else {
    bcrypt.compare(password, admin.password, (err, result) => {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        // res.send("You Can Login");
        res.redirect("/admin/login");
      } else {
        return res.status(401).send("Enter Valid Admin Credentials");
      }
    });
  }
};

module.exports.adminLogout = (req, res) => {
  res.clearCookie("token"); // Clear the JWT cookie
  req.flash("success", "Admin logged out successfully.");
  res.redirect("/admin/login"); // Redirect to admin login page
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/shop");
};
