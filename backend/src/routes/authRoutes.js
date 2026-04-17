const express = require("express");
const router = express.Router();

const User = require("../models/User.js");
const Application = require("../models/Application.js");
const Resume = require("../models/Resume.js");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const auth = require("../middleware/authMiddleware.js");


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       
      sameSite: "None"   ,
      path: "/", 
    });
    

    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    res.status(200).json({ user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/", 
  });

  res.status(200).json({ message: "Logout successful" });
});


module.exports = router;