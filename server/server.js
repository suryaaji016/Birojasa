require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");
const PORT = process.env.PORT || 3000;

// Test database connection on startup
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection established successfully");
    console.log("📊 Environment:", process.env.NODE_ENV || "development");
    console.log("🔗 Database URL:", process.env.DATABASE_URL ? "✅ Set" : "❌ Not set");
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to database:", err.message);
    console.error("💡 Check your DATABASE_URL environment variable");
    process.exit(1);
  });
