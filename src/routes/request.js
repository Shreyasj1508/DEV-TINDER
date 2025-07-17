const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../Middleware/auth");
const connectionRequest = require("../Models/connectionRequest");
const User = require("../Models/user");
const mongoose = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // user has only two options to send a request -> interested or ignored
      const allowedStatuses = ["interested", "ignored"];
      if (!allowedStatuses.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type" + status });
      }

      // Validate self connection ,  Can do the same from the schema level
      // if (fromUserId.toString() === toUserId.toString()) {
      //   return res.status(400).json({
      //     message: "You cannot send a connection request to yourself",
      //   });
      // }

      //   Validate toUserId BEFORE calling any DB operation
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
      }

      // Check if the fromUserId exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found !" });
      }

      //  if there is an existing connectionRequest
      const existingConnectionRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already exists from this user",
        });
      }

      ////////////////////////////////////////////////////////////////////////////////////////

      const newRequest = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await newRequest.save();
      //   console.log("Connection request sent successfully!");

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data: data,
      });
    } catch (error) {
      return res.status(400).send("ERROR! " + error.message);
    }
  }
);

module.exports = requestRouter;

