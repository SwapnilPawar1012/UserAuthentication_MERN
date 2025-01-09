require("dotenv").config();
const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  let token = req.header("auth-token"); // Extract token from request header

  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token" });
  }

  try {
    // Verify the token
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user data to request object
    next(); // Pass control to the next middleware or route
  } catch (error) {
    console.error("Invalid Session");
    console.error("Error verifying token: ", error.message);
    res.status(401).json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
