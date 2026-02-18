import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name Is Required"],
      trim: true,
      minLength: 3,
      maxLength: 30,
    },

    email: {
      type: String,
      required: [true, "Email Is Required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill in a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
      minLength: 8,
    },
  },
  { timestamps: true },
);
