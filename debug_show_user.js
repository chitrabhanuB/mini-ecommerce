// debug_test_compare.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: "admin@example.com" }).lean();
  if (!user) {
    console.log("No admin user found");
    await mongoose.disconnect();
    return;
  }

  console.log("Stored hash:", user.password);

  // 👇 change this to the password you are typing in your login page
  const plain = "admin123";

  const match = await bcrypt.compare(plain, user.password);
  console.log(`Comparing plain "${plain}" with stored hash => match:`, match);

  await mongoose.disconnect();
}
run().catch(err => {
  console.error(err);
  process.exit(1);
});
