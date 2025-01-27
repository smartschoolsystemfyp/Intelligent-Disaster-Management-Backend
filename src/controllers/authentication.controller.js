import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthController {
  // Register a new user
  async register(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    await User.create({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  }

  // Login a user
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Logged In successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }

  logout(req, res) {
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
}

export default new AuthController();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzk3ZDJmOWE2NGU4ODZjOTIyYTVhYjEiLCJpYXQiOjE3MzgwMDM0NjJ9._6N_st0mICaYaNwlIsMJnghfBwWo4FgXaIn8EGnYvZw
