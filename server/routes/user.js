const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");
const { loginLimiter, registerLimiter } = require("../middlewares/rateLimiter");

router.post("/register", registerLimiter, UserController.register);
router.post("/login", loginLimiter, UserController.login);
router.get("/profile", authentication, UserController.profile);

module.exports = router;
