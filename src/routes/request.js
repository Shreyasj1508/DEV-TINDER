const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middleware/auth");
const connectionRequest = require("../Models/connectionRequest");
const User = require("../Models/user");
const mongoose = require("mongoose");

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const ConnectionRequest = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!ConnectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      ConnectionRequest.status = status;

      const data = await ConnectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      console.log('[DEBUG] /request/send called:', { fromUserId, toUserId, status });

      // user has only two options to send a request -> interested or ignored
      const allowedStatuses = ["interested", "ignored"];
      if (!allowedStatuses.includes(status)) {
        console.log('[DEBUG] Invalid status:', status);
        return res
          .status(400)
          .json({ message: "Invalid status type" + status });
      }

      // Validate self connection ,  Can do the same from the schema level
      if (fromUserId.toString() === toUserId.toString()) {
        console.log('[DEBUG] Attempted to send request to self');
        return res.status(400).json({
          message: "You cannot send a connection request to yourself",
        });
      }

      //   Validate toUserId BEFORE calling any DB operation
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        console.log('[DEBUG] Invalid toUserId format:', toUserId);
        return res.status(400).json({ message: "Invalid User ID format" });
      }

      // Check if the toUserId exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        console.log('[DEBUG] toUser not found:', toUserId);
        return res.status(404).json({ message: "User not found !" });
      }

      //  if there is an existing connectionRequest
      const existingConnectionRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
        status: { $in: ["interested", "ignored"] }
      });
      if (existingConnectionRequest) {
        console.log('[DEBUG] Pending connection request already exists:', existingConnectionRequest);
        return res.status(400).json({
          message: "Connection request already exists and is still pending",
        });
      }

      ////////////////////////////////////////////////////////////////////////////////////////

      const newRequest = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await newRequest.save();
      console.log('[DEBUG] Created connectionRequest:', {
        _id: data._id,
        fromUserId: data.fromUserId,
        toUserId: data.toUserId,
        status: data.status,
      });

      // --- SOCKET.IO: Notify recipient in real time ---
      const io = req.app.get("io");
      const onlineUsers = req.app.get("onlineUsers");
      const recipientSocketId = onlineUsers[toUserId.toString()];
      console.log('[SOCKET DEBUG] onlineUsers:', onlineUsers);
      if (recipientSocketId) {
        console.log('[SOCKET DEBUG] Emitting new_request to', toUserId, 'at socket', recipientSocketId);
        io.to(recipientSocketId).emit("new_request");
      } else {
        console.log('[SOCKET DEBUG] Recipient', toUserId, 'is not online, cannot emit new_request');
      }

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + (toUser ? toUser.firstName : "Unknown"),
        data: data,
      });
    } catch (error) {
      console.error('[ERROR] /request/send:', error);
      return res.status(400).send("ERROR! " + error.message);
    }
  }
);

module.exports = requestRouter;
