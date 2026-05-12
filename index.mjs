import UserRoute from "./Routes/user.js";
import { connectDB } from "./Utils/mongodb.js";
import cors from "cors";
import express from "express";
import { signJWT, verifyJWT } from "./Utils/jwt.js";
import Product from "./model/Product.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/user", UserRoute);

// JWT Test 
const jwtToken = signJWT({
    userId: "12234",
    userType: "admin",
});
console.log(jwtToken);

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// GET single product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// POST - seed products
app.post("/products/seed", async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany([
      { name: "RTX 5070 Ti", desc: "Next-gen GPU with 16GB VRAM & DLSS 4.0", price: 150000, originalPrice: 200000, category: "Graphics Card", badge: "Hot", imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80" },
      { name: "Samsung S25 Ultra", desc: "Flagship phone with 200MP camera", price: 280000, originalPrice: 320000, category: "Phone", badge: "New", imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80" },
      { name: "ROG Gaming Laptop", desc: "Intel i9, 32GB RAM, RTX 4080", price: 450000, originalPrice: 500000, category: "Laptop", badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80" },
      { name: "Mechanical Keyboard", desc: "Cherry MX Red switches, RGB backlit", price: 12000, originalPrice: 15000, category: "Accessory", badge: "", imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80" },
      { name: "Custom Gaming PC", desc: "i9-13900K, RTX 4090, 64GB DDR5", price: 900000, originalPrice: 1000000, category: "PC", badge: "Hot", imageUrl: "https://images.unsplash.com/photo-1593640408182-31c228816256?w=500&q=80" },
      { name: "Gaming Headset", desc: "7.1 Surround Sound, noise-cancelling mic", price: 18000, originalPrice: 22000, category: "Accessory", badge: "", imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80" },
    ]);
    res.json({ message: "✅ 6 products seeded!" });
  } catch (error) {
    res.status(500).json({ message: "Seed error", error });
  }
});

app.listen(5050, () => {
    console.log("Server is running on port 5050");
});