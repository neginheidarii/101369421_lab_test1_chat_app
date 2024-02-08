const crypto = require("crypto");

// Generate a random secret key
const JWT_SECRET_KEY = crypto.randomBytes(32).toString("hex");

console.log("Generated JWT_SECRET_KEY:", JWT_SECRET_KEY);
