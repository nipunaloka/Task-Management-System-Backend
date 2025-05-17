// backend/middlewares/authMiddleware.js
const isAuthenticated = (req, res, next) => {
    if (req.user) return next();
    res.status(401).json({ message: "Not authenticated" });
  };
  
  module.exports = isAuthenticated;
  