// backend/config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

//Session Handling
passport.serializeUser((user, done) => done(null, user.id)); //Saves user ID to the session.
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));  //Fetches full user details from DB using ID.

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOneAndUpdate(
      { googleId: profile.id },
      {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      },
      { upsert: true, new: true }
    );
    return done(null, user);
  })
);
