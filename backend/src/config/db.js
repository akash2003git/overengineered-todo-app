const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("Error: MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Atlas connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas with Mongoose", err);
    process.exit(1);
  }
}

module.exports = { connectDB };
