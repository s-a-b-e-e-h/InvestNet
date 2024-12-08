// import dotenv from "dotenv";

const dotenv = require("dotenv");
dotenv.config();

// Initialize environment variables
const config = {
  port: process.env.PORT || 3003,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET, // JWT secret for signing and verifying tokens
  jwtExpiration: process.env.JWT_EXPIRATION || "1h", // JWT expiration time
};

module.exports = config;
// export default config;
