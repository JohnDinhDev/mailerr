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

module.exports = router;
