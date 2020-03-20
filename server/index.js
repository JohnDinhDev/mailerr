const express = require("express");
const app = express();

// Environment Variables
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
