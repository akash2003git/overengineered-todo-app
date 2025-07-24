const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MonogoDB Atlas connected successfully");
  } catch (err) {
    console.error("Error connecting to MonogoDB Atlas with Mongoose", err);
    process.exit(1);
  }
}

module.exports = { connectDB };
