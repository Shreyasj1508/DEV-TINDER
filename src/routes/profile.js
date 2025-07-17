const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const userAuth = require("../Middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const { validatePasswordStrength } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // The user is attached to the request object by the authentication    middleware

    res.send(user); // Send the user data as a response
  } catch (error) {
    res.status(400).send("ERROR! " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request .");
    }
    const loggedInUser = req.user; // The user is attached to the request object by the authentication middleware
    //console.log(loggedInUser);

    // data from user = req.body
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save(); // Save the updated user data to the database

    //  console.log(loggedInUser);

    res.json({
      message: `${loggedInUser.firstName}, Your profile updated successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR! " + error.message);
  }
});

//      forget password API
profileRouter.patch("/profile/forgetPassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    if (!oldPassword || !newPassword) {
      throw new Error("Old and new passwords are required.");
    }

    // Validate new password strength
    validatePasswordStrength(newPassword);

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect!");
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send("Password updated successfully!");
  } catch (error) {
    res.status(400).send("ERROR! " + error.message);
  }
});

module.exports = profileRouter;
