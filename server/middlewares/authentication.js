const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthenticated" };

    const token = authorization.split(" ")[1];
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);

    if (!user) throw { name: "Unauthenticated" };
    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or missing token" });
  }
}

module.exports = { authentication };
