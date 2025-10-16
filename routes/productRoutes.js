// routes/productRoutes.js
import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// --- Middleware to check admin ---
function isAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.send("Access denied!");
  }
  next();
}

// --- Display All Products ---
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("pages/products", {
      products,
      user: req.session.user || null, // pass logged-in user to template
    });
  } catch (err) {
    res.send("Error fetching products: " + err.message);
  }
});

// --- Admin Page ---
router.get("/admin", isAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("pages/admin", {
      products,
      user: req.session.user, // admin user
    });
  } catch (err) {
    res.send("Error loading admin page: " + err.message);
  }
});

// --- Add Product ---
router.post("/admin/add", isAdmin, async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    await Product.create({ name, description, price, image });
    res.redirect("/products/admin");
  } catch (err) {
    res.send("Error adding product: " + err.message);
  }
});

// --- Edit Product ---
router.post("/admin/edit/:id", isAdmin, async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      image,
    });
    res.redirect("/products/admin");
  } catch (err) {
    res.send("Error updating product: " + err.message);
  }
});

// --- Delete Product ---
router.post("/admin/delete/:id", isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products/admin");
  } catch (err) {
    res.send("Error deleting product: " + err.message);
  }
});

export default router;
