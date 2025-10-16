import bcrypt from "bcryptjs";

async function generateHash() {
  const password = "admin123"; // <-- put your desired password here
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hash);
}

generateHash();
