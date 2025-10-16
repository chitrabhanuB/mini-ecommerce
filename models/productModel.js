// models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

export default mongoose.model("Product", productSchema);
