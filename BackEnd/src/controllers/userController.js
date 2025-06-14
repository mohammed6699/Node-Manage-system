import dotenv from "dotenv";
dotenv.config();

import User from "../models/userModels.js";
import { ERROR, SUCCESS, FAIL } from "../utils/http-status.js";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

// Get all users with pagination
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .populate("tasks")
      .limit(Number(limit))
      .skip(Number(skip))
      .select("-password");

    res.status(200).json({ status: SUCCESS, data: users });
  } catch (error) {
    res.status(500).json({ status: ERROR, message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("tasks")
      .select("-password");

    if (!user) {
      return res.status(404).json({ status: ERROR, message: "User not found" });
    }

    res.status(200).json({ status: SUCCESS, data: user });
  } catch (error) {
    res.status(500).json({ status: ERROR, message: error.message });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { UserName, FirstName, LastName, email, password } = req.body;

    const existingUser = await User.findOne({ UserName });
    if (existingUser) {
      return res.status(400).json({
        status: FAIL,
        message: "This username already exists",
      });
    }

    const newUser = await User.create({
      UserName,
      FirstName,
      LastName,
      email,
      password,
    });

    res.status(201).json({ status: SUCCESS, data: newUser });
  } catch (error) {
    res.status(500).json({ status: ERROR, message: error.message });
  }
};

// Login user and generate JWT
const loginUser = async (req, res) => {
  try {
    const { UserName, password } = req.body;

    const user = await User.findOne({ UserName });
    if (!user) {
      return res.status(401).json({
        status: ERROR,
        message: "User not found",
      });
    }

    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: ERROR,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id, role: user.role },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    res.status(200).json({ status: SUCCESS, token });
  } catch (error) {
    res.status(500).json({ status: ERROR, message: error.message });
  }
};

// Update user (self only)
const updateUser = async (req, res) => {
  if (req.decodeToken._id !== req.params.id) {
    return res.status(403).json({ status: ERROR, message: "Not allowed" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ status: ERROR, message: "User not found" });
    }

    res.status(200).json({ status: SUCCESS, data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: ERROR, message: error.message });
  }
};

// Delete user (only admin can)
const deleteUser = async (req, res) => {
  if (req.decodeToken._id === req.params.id) {
    return res.status(403).json({ status: ERROR, message: "You can't delete yourself" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ status: ERROR, message: "User not found" });
    }

    res.status(200).json({ status: SUCCESS, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: ERROR, message: error.message });
  }
};

export {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
