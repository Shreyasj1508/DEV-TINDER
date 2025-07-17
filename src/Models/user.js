const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      index: true, // Indexing for faster search
      maxLength: 40,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 40,
      trim: true, // Trim whitespace from both ends of the string
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 120,
      validate(value) {
        if (value < 18 || value > 120) {
          throw new Error("Age must be between 18 and 120");
        }
      },
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","other"],
        message: `{VALUE} is not a valid ` 
      },
      //  OR
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender data is not valid!");
      //   }
      // },
    },
    photo: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdummy-profile&psig=AOvVaw1iNN7EGm6TkJL6Rl3fE8NM&ust=1752658271908000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjh24DHvo4DFQAAAAAdAAAAABAE",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid!");
        }
      },
    },
    about: {
      type: String,
      default: "Hello, I am using DEV-TINDER!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);









// Method to generate JWT token for the user
userSchema.methods.getJWT = async function () {
  const user = this; // 'this' refers to the instance of the user model

  const token = await jwt.sign({ _id: user._id },
  "secretkey",
  {
    expiresIn: "1d",
  });
  return token; // Return the generated JWT token
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this; // 'this' refers to the instance of the user model
  const hashedPassword = user.password; // Get the hashed password from the user instance
  const isMatch = await bcrypt.compare(passwordInputByUser , hashedPassword); // Compare the provided password with the hashed password in the database
  return isMatch; // Return true if passwords match, false otherwise
};

module.exports = mongoose.model("User", userSchema);
