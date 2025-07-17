const express = require('express');
const requestRouter = express.Router();
const userAuth = require("../Middleware/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user; // The user is attached to the request object by the authentication middleware

  console.log("Sending connection request...");
  res.send(user.firstName + " Elon sent connection request!");
});

module.exports = requestRouter;