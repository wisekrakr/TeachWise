const config = require("config");
const jwt = require("jsonwebtoken");

// @req       requested  path
// @res       result of the request
// @next      when we are done with this middleware, we move on to the next middleware
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    // Unauthorized status
    return res.status(401).json({ msg: "Not authorized" });
  } else {
    try {
      // Verify token
      const decoded = jwt.verify(token, config.get("jwtSecret"));

      // Add user from payload
      req.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Token not valid" });
    }
  }
}

module.exports = auth;
