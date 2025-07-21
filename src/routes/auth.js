const express = require("express");
const authRouter = express.Router();
const { validateSignup } = require("../utils/validation");
const User = require("../Models/user.js");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignup(req);

    // encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Creating a new instance of the User model with the request body
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    //  console.error("Error adding user:", error);
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    console.log("User found:", user);

    if (!user) throw new Error("Invalid credentials!");

    const isMatch = await user.validatePassword(password);

    if (!isMatch) throw new Error("Invalid credentials!");

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "null", {
    expires: new Date(Date.now()), // Set the cookie to expire immediately
  });
  res.send("Logout successful!");
});

module.exports = authRouter;
