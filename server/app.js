const express = require("express");
const cors = require("cors");
const app = express();
const reviewRoutes = require("./routes/review");
const serviceRoutes = require("./routes/serviceForm");
const bannerRoutes = require("./routes/banner");
const userRoutes = require("./routes/user"); // ✅ tambahkan
const queueRoutes = require("./routes/queue");
const failedRoutes = require("./routes/failed");
const partnerRoutes = require("./routes/partner");
const configServices = require("./routes/configServices");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("🚗 Biro Jasa API Ready!"));
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes); // ✅ register & login admin
app.use("/reviews", reviewRoutes);
app.use("/service", serviceRoutes);
app.use("/banners", bannerRoutes);
app.use("/admin/queue", queueRoutes);
app.use("/admin/failed", failedRoutes);
app.use("/partners", partnerRoutes);
app.use("/config", configServices);

module.exports = app;
