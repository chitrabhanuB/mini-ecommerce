// generate_hash.js
import bcrypt from "bcryptjs";

const password = "admin123";

const hashPassword = async () => {
  const hash = await bcrypt.hash(password, 10);
  console.log("Generated hash for 'admin123':", hash);
};

hashPassword();
