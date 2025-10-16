// routes/authRoutes.js
import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// --- REGISTER ---
router.get("/register", (req, res) => {
  res.render("pages/register",{ user: req.session.user || null });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists!");

    const user = new User({ name, email, password });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.send("Error registering user: " + err.message);
  }
});

// --- LOGIN ---
router.get("/login", (req, res) => {
  res.render("pages/login",{ user: req.session.user || null });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Invalid password");

    req.session.user = user;
    res.redirect("/products");
  } catch (err) {
    res.send("Error logging in: " + err.message);
  }
});

// --- LOGOUT ---
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default router;
