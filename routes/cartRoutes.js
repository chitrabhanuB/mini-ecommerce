// routes/cartRoutes.js
import express from "express";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js"; // Make sure you have a Cart model in MongoDB

const router = express.Router();

// --- Display Cart Page ---
router.get("/", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  try {
    // Fetch cart from DB for logged-in user
    let cart = await Cart.findOne({ userId: req.session.user._id });

    // Create new cart if it doesn't exist
    if (!cart) {
      cart = await Cart.create({ userId: req.session.user._id, products: [] });
    }

    res.render("pages/cart", { cart: cart.products, user: req.session.user });
  } catch (err) {
    res.send("Error fetching cart: " + err.message);
  }
});

// --- Add to Cart ---
router.post("/add/:id", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.send("Product not found");

    // Fetch user's cart
    let cart = await Cart.findOne({ userId: req.session.user._id });
    if (!cart) {
      cart = await Cart.create({ userId: req.session.user._id, products: [] });
    }

    // Check if product already in cart
    const existingItem = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1; // increase quantity
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }

    await cart.save();
    res.redirect("/cart");
  } catch (err) {
    res.send("Error adding to cart: " + err.message);
  }
});

// --- Remove from Cart ---
router.post("/remove/:id", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const productId = req.params.id;

  try {
    let cart = await Cart.findOne({ userId: req.session.user._id });
    if (!cart) return res.redirect("/cart");

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.redirect("/cart");
  } catch (err) {
    res.send("Error removing product: " + err.message);
  }
});

// --- Clear Cart ---
router.post("/clear", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  try {
    let cart = await Cart.findOne({ userId: req.session.user._id });
    if (cart) {
      cart.products = [];
      await cart.save();
    }
    res.redirect("/cart");
  } catch (err) {
    res.send("Error clearing cart: " + err.message);
  }
});

export default router;
