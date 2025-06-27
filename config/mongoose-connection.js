// const mongoose = require("mongoose");
// const dbgr = require("debug")("development:mongoose");
// const config = require("config");

// mongoose
//   .connect(`${config.get("MONGO_URI")}/scatch`)
//   .then(function () {
//     dbgr("connected");
//   })
//   .catch(function (err) {
//     dbgr(err);
//   });

// module.exports = mongoose.connection;

//for render deployment
const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
require("dotenv").config(); // Load variables from .env

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment variables");
  process.exit(1);
}

mongoose
  .connect(`${MONGO_URI}/scatch`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    dbgr("✅ MongoDB connected");
  })
  .catch(function (err) {
    dbgr("❌ MongoDB error: " + err.message);
  });

module.exports = mongoose.connection;
