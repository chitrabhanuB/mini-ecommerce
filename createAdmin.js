import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (adminExists) {
    console.log("Admin already exists");
    mongoose.disconnect();
    return;
  }

  const admin = new User({
    name: "Admin",
    email: "admin@example.com",
    password: "admin123", // plain password
    role: "admin"
  });

  await admin.save(); // pre-save hook will hash it automatically
  console.log("Admin user created successfully!");
  mongoose.disconnect();
}

createAdmin();
