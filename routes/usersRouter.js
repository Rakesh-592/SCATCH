const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey it's working");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;
