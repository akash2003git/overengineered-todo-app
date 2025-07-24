const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");
const { z } = require("zod");

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const user = new User({ username, email, password });
    await user.save();

    const accessToken = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      message: "User registered successfully",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Zod validation error: ", err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    if (err.code === 11000) {
      console.error("Duplicate fields error", err);
      return res
        .status(409)
        .json({ message: "Duplicate fields entered", error: err });
    }
    console.error("Sever error during registration:", err);
    res.status(500).json({
      message: "Server error during registration",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      const accessToken = generateToken(user._id);
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken,
        message: "User logged-in successfully",
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Zod validation error: ", err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    console.error("Server error during log-in:", err);
    res
      .status(500)
      .json({ message: "Server error during log-in", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
