const express = require("express");
const bcrypt = require("bcrypt");
const Owner = require("../models/owner-model"); // adjust if your path is different

const router = express.Router();

router.get("/create", async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL;

    const existing = await Owner.findOne({ email });
    if (existing) {
      return res.send("Admin already exists.");
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = new Owner({
      fullName: "Admin",
      email,
      password: hashedPassword,
      gstin: "ABCD1234EF", // or leave blank
      isAdmin: true,
    });

    await admin.save();
    res.send("Admin created successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await ownerModel.findOne({ email });

  if (!admin) {
    req.flash("error", "Admin not found");
    return res.redirect("/admin/login");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    req.flash("error", "Incorrect password");
    return res.redirect("/admin/login");
  }

  req.session.adminLoggedIn = true;
  req.session.admin = admin;
  res.redirect("/owners/admin"); // Dashboard or whatever page
});

module.exports = router;
