#!/usr/bin/env node
/**
 * Quick test script to verify database connection
 * Run with: node TEST_DB_CONNECTION.js
 */

require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("🔍 Testing Database Connection...\n");

// Check environment variables
console.log("Environment Variables:");
console.log("- NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("- DATABASE_URL:", process.env.DATABASE_URL ? "✅ Set" : "❌ Not set");
console.log("- ADMIN_UNIQUE_CODE:", process.env.ADMIN_UNIQUE_CODE ? "✅ Set" : "❌ Not set");
console.log("- JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not set");
console.log();

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set!");
  console.log("\n💡 Make sure you've added DATABASE_URL in cPanel Environment Variables");
  process.exit(1);
}

// Try to connect
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  pool: {
    max: 2,
    min: 0,
    acquire: 10000,
    idle: 5000,
  },
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection successful!");
    console.log("🎉 Your server is ready to use");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Database connection failed!");
    console.error("\nError:", err.message);
    console.error("\n💡 Possible causes:");
    console.error("   1. DATABASE_URL is incorrect");
    console.error("   2. Database server is down");
    console.error("   3. Network/firewall blocking connection");
    console.error("   4. SSL configuration issue");
    process.exit(1);
  });
