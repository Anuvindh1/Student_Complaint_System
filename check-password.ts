import { storage } from "./server/storage";

async function checkPassword() {
  try {
    const password = await storage.getAdminPassword();
    if (password) {
      console.log("Password exists in database");
      console.log("Password length:", password.length);
      console.log("First 3 chars:", password.substring(0, 3));
      console.log("Is it 'admin123'?", password === "admin123");
    } else {
      console.log("No password found in database");
    }
  } catch (error) {
    console.error("Error checking password:", error);
  }
  process.exit(0);
}

checkPassword();
