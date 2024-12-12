const jwt = require("jsonwebtoken");

// Memverifikasi JWT token
const verifyUser = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or invalid format" });
  }

  // Mengekstrak token dari Bearer <token>
  const actualToken = token.split(" ")[1];

  try {
    const jwt_payload = jwt.verify(actualToken, process.env.SECRET_KEY);
    req.user = jwt_payload; // Attach the decoded JWT payload to the request object
    next();
  } catch (err) {

    // Error untuk token yang kadarluarsa
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    }
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyUser };
