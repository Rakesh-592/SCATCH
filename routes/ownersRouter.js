// routes/ownersRouter.js
const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const { adminLogin } = require("../controllers/authController");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    // res.send("Hey it's working");
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(403).send("Admin already exists");
    }

    const { fullName, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
      isAdmin: true,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

router.post("/login", adminLogin);

module.exports = router;
