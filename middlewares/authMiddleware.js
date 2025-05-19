// backend/middlewares/authMiddleware.js
const isAuthenticated = (req, res, next) => {
    if (req.user) return next(); //Checks if req.user exists (set by Passport after login).
    res.status(401).json({ message: "Not authenticated" });
  };
  
  module.exports = isAuthenticated;
  