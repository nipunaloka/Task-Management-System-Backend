const router = require("express").Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "/auth/login/failed"
}));

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Authentication failed",
  });
});

router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("http://localhost:5173");
  });
});

module.exports = router;
