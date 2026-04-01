import mongoose from "mongoose";
import User from "../models/users.models.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User Already Exists");
      //   Already Exists
      error.statusCode = 409;

      throw error;
    }
    // Hash Passwords
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    // Create User
    const newUser = await User.create(
      [
        {
          email,
          password: hashedPassword,
          name,
        },
      ],
      { session },
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    // Incase of any error, abort transactions.
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error(
        "Please Create An Account Before Proceeding To Login",
      );
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await bycrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      const error = new Error("Incorrect or Invalid Password Entered");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      data: {
        token,
        user: {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res) => {};
