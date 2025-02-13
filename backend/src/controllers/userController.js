import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const userController = {
  async register(req, res) {
    try {
      const { username, email, name, password, role } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({
          error: "All fields are required...!",
        });
      }

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(400).json({
          error: "User with this email already exists...!",
        });
      }

      const existingUsername = await User.findOne({ username });

      if (existingUsername) {
        return res.status(400).json({
          error: "User with this username already exists...!",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashedPassword,
        name,
        role,
        username,
      });

      await user.save();

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          username: user.username,
          name: user.name,
        },
        JWT_SECRET,
        { expiresIn: "2d" }
      );

      res.status(200).json({
        message: "User registered successfully...!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while registering user...!",
        error: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required...!",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          error: "User with this email does not exist...!",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({
          error: "Invalid password...!",
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          username: user.username,
          name: user.name,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while logging in...!",
        error: error.message,
      });
    }
  },

  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.params.id).populate(
        "name email username",
        "reviews"
      );

      if (!user) {
        return res.status(404).json({
          error: "User with this id not found...!",
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error while retreiving user profile...!",
        error: error.message,
      });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const { name, email, username, password } = req.body;

      const existingUser = await User.findById(req.params.id);

      if (!existingUser) {
        return res.status(404).json({
          error: "User with this id not found...!",
        });
      }

      if (email && email !== existingUser.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({
            error: "Email already in use...!",
          });
        }
      }

      if (username && username !== existingUser.username) {
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
          return res.status(400).json({
            error: "Username already in use...!",
          });
        }
      }

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (username) updateData.username = username;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password");

      res.json({
        message: "User profile updated successfully!",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating user profile...!",
        error: error.message,
      });
    }
  },
};
