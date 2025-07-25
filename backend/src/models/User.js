const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("--- Debugging matchPassword ---");
  console.log("Entered Password:", enteredPassword);
  console.log("Hashed Password in DB (this.password):", this.password); // This should be the long hashed string
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log("Password Match Result:", isMatch);
    console.log("--- End Debugging ---");
    return isMatch;
  } catch (error) {
    console.error("Error during bcrypt.compare:", error);
    return false; // Return false if an error occurs during comparison
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
