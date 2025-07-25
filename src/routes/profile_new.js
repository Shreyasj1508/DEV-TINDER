const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../Middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const { validatePasswordStrength } = require("../utils/validation");
const { getProfile, updateProfile, getUserById, updateOnlineStatus } = require("../controllers/profileController");

// Get current user profile using controller
profileRouter.get("/profile/view", userAuth, getProfile);

// Update profile using controller
profileRouter.post("/profile/edit", userAuth, updateProfile);
profileRouter.patch("/profile/edit", userAuth, updateProfile);

// Get user by ID using controller
profileRouter.get("/profile/user/:userId", userAuth, getUserById);

// Update online status
profileRouter.post("/profile/status", userAuth, updateOnlineStatus);

// Legacy route for password change
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

    res.json({
      success: true,
      message: "Password updated successfully!"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR! " + error.message
    });
  }
});

module.exports = profileRouter;
