const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
require("./config/passport");
const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// ✅ Use express-session instead of cookie-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB connection and start server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log("Backend running on port 5000"));
});
