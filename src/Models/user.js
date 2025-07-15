const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
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
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
      trim: true,
      select: false, // Exclude password from query results by default
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Password cannot contain the word 'password'");
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
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      },
    },
    photo: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdummy-profile&psig=AOvVaw1iNN7EGm6TkJL6Rl3fE8NM&ust=1752658271908000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjh24DHvo4DFQAAAAAdAAAAABAE",
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

module.exports = mongoose.model("User", userSchema);
