const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");
require("dotenv").config(); // Only needed locally

let MONGO_URI;

try {
  MONGO_URI = config.get("MONGO_URI");
} catch (err) {
  // If config not found (e.g., in Render), use env variable
  MONGO_URI = process.env.MONGO_URI;
}

mongoose
  .connect(`${MONGO_URI}/scatch`)
  .then(function () {
    dbgr("connected");
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
