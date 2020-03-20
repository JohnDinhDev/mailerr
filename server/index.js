const express = require("express");
const app = express();

// Passport
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Environment Variables
const PORT = process.env.PORT;

const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
};

passport.use(
  new GoogleStrategy(googleCredentials, accessToken => {
    console.log(accessToken);
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
