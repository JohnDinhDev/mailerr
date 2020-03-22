const express = require("express");
const app = express();
const connectDB = require("./db");
const passport = require("passport");
const cookieSession = require("cookie-session");

// Middlewares
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB
connectDB();

// Passport Config
require("./services/passport");

// Environment Variables
const PORT = process.env.PORT;

app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
