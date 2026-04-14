const express = require("express");
const router = express.Router();

const User = require("../models/User.js");
const Application = require("../models/Application.js");
const Resume = require("../models/Resume.js");

const bcrypt = require('bcrypt');

const auth = require("../middleware/authMiddleware.js");


router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true }
    ).select("-password");

    res.status(200).json({ data: user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/", auth, async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findById(req.userId);

    // 🔒 Prevent demo deletion
    if (user.email === "demo@jobtracker.com") {
      return res.status(403).json({
        message: "Demo account cannot be deleted",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
 
    await Application.deleteMany({ user: req.userId });
    await Resume.deleteMany({ user: req.userId });

    await User.findByIdAndDelete(req.userId);

    res.clearCookie("token");

    res.status(200).json({ message: "Account deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;