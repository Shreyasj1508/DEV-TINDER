const express = require('express');
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
  const { email, password } = req.body; // Extract email and password from the request

    // Find the user by email & Include the password field in the query result
    const user = await User.findOne({ email }).select("+password");

    console.log("User found:", user);
    if (!user) {
    throw new Error("Invalid credentials ! ");
    }

    // Compare the provided password (write by client) with the stored hashed password (actual passwords )
    // user.password is the hashed password stored in the database
    const isMatch = await user.validatePassword(password); // Call the validatePassword method from the User model
   //  if (!isMatch) return res.status(401).send("Invalid credentials!");
    if(isMatch) {
      // Create a JWT token
      const token = await user.getJWT(); // Call the getJWT method from the User model
 
      // Add the token to cookeies and sent response back to the client
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token expires in 1 day
      });
      // console.log("Login successful for user:", user.email);

      res.send("Login successful!"); // If login is successful
    }
    else{
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).send("ERROR: " + error.message);
  }
});






module.exports = authRouter;