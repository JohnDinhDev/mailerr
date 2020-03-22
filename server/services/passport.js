const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error.message);
    done(error);
  }
});

const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
};

passport.use(
  new GoogleStrategy(
    googleCredentials,
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          // Returns user that is already in database
          return done(null, user);
        } else {
          // Creates new user and returns that user
          user = new User({ googleId: profile.id });
          await user.save();
          return done(null, user);
        }
      } catch (error) {
        console.error(error.message);
        done(error);
      }
    }
  )
);
