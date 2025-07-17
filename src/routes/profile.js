const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../Middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

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
    data: loggedInUser
  });

} 

catch (error) {
    res.status(400).send("ERROR! " + error.message);
  }
});



module.exports = profileRouter;
