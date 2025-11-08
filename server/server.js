require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;
const { start } = require("./services/queueProcessor");

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  // start background queue processor (default 1s)
  start(Number(process.env.QUEUE_INTERVAL_MS) || 1000);
});
