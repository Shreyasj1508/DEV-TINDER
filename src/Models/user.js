const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
    trim: true,
  },
  lastName: {
    type: String,
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
  },
  age: {
    type: Number,
    min: 18,
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
});

module.exports = mongoose.model("User", userSchema);
