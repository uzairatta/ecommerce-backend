import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  desc:          { type: String },
  price:         { type: Number },
  originalPrice: { type: Number },
  category:      { type: String },
  badge:         { type: String },
  imageUrl:      { type: String },
});

const Product = mongoose.model("Product", productSchema);
export default Product;