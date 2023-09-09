const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.email = decodedToken.email;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
