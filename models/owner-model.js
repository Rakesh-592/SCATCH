const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullName: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },

  gstin: String,
  picture: String, //for now String but we are goin to add it in db
});

module.exports = mongoose.model("owner", ownerSchema);
