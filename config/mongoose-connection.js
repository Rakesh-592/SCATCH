//
const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
require("dotenv").config(); // ensure .env is loaded in local dev

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => dbgr("✅ MongoDB connected"))
  .catch((err) => {
    dbgr("❌ MongoDB error: " + err.message);
    process.exit(1);
  });

module.exports = mongoose.connection;
