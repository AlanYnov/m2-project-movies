const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

// User schema
const userSchema = new Schema({
  uid: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  login: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["ROLE_USER", "ROLE_ADMIN"],
      message: "{VALUE} is not a valid role, please choose between ROLE_USER or ROLE_ADMIN",
    },
    required: [true, "Please specify user role"],
  },
  status: {
    type: String,
    enum: {
      values: ["open", "closed"],
      message: "{VALUE} is not a valid role, please choose between open or closed",
    },
    default: "open",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
