const mongoose = require("mongoose");
const User = require("./User");


const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  company: String,
  image: String,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User
  },
});

module.exports = mongoose.model("products", ProductSchema);
