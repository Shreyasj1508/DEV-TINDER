const express = require('express');
const profileRouter = express.Router();
const userAuth = require("../Middleware/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // The user is attached to the request object by the authentication    middleware

    res.send(user); // Send the user data as a response
  } catch (error) {
    res.status(400).send("ERROR! " + error.message);
  }
});

module.exports = profileRouter;