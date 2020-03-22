// REMOVE WHEN DEPLOYING
require("dotenv").config();

// Models
require("./models/User");

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

if (!uri) {
  console.log("Please config your .env file");
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
