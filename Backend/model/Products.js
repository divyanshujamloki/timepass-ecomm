const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  img: String,
  title: String,
  text: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
