const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserSetting = require("../models/userSitting");

// Helper function: Use exact hardcoded secret to guarantee matching signature
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "lingorise_secret_key_2026", {
    expiresIn: "7d",
  });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, timezone } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, email, password).",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: cleanEmail,
      password_hash,
      timezone: timezone || "UTC",
    });

    if (UserSetting) {
      await UserSetting.create({
        user_id: newUser.id,
        preferred_language: "en",
        theme: "light",
        notifications_enabled: true,
      });
    }

    const token = generateToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        timezone: newUser.timezone,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
      error: error.message,
    });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      where: { email: cleanEmail },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        timezone: user.timezone,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
      error: error.message,
    });
  }
};

// @desc    Get current authenticated user profile
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching profile.",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
