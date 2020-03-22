const express = require("express");
const router = express.Router();
const passport = require("passport");

/**
 * @route GET api/auth/google
 * @desc Authenticate via google oAuth
 * @access Public
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

/**
 * @route GET api/auth/google/callback
 * @desc Redirect from google authentication
 * @access Public
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/");
  }
);

/**
 * @route GET api/auth/current_user
 * @desc Returns current logged in user
 * @access Public
 */
router.get("/current_user", (req, res) => {
  // TODO return user as json
  res.send(req.user);
});

/**
 * @route GET api/auth/logout
 * @desc Logs out current user
 * @access Public
 */
router.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

module.exports = router;
