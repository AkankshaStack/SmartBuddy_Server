const jwt = require("jsonwebtoken");
const router = require("../routes/customer.routes");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
