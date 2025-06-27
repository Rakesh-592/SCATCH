const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const { isAdmin, adminLoggedIn } = require("../middlewares/isAdmin");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  //
  let sortOption = req.query.sortby;
  let products;

  if (sortOption === "newest") {
    products = await productModel.find().sort({ createdAt: -1 });
  } else {
    // Default to "popular" – assuming higher price = more popular
    products = await productModel.find().sort({ price: -1 });
  }

  let success = req.flash("success");
  res.render("shop", { products, success, sortby: sortOption });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  //calculating overall bill
  let bill = 0;
  user.cart.forEach((product) => {
    const price = Number(product.price);
    const discount = Number(product.discount || 0);
    bill += price - discount + 20;
  });

  res.render("cart", { user, bill });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to Cart");
  res.redirect("/shop");
});

router.get("/admin/login", isLoggedIn, adminLoggedIn, (req, res) => {
  // const error = req.flash("error");
  res.render("owner-login", { error, loggedin: false });
  // res.redirect("/owners/admin");
});

module.exports = router;
