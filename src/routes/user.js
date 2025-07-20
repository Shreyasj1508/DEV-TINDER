const express = require("express");
const userRouter = express.Router();
const userAuth = require("../Middleware/auth");
const ConnectionRequest = require("../Models/connectionRequest");
const User = require("../Models/user");

// using this because we don't want to expose sensitive data like email or password
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    //}).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Get all the connections of the loggedIn user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // Transforming the connection requests to get the user data
    // If the loggedIn user is the fromUserId, we return toUserId,
    // otherwise we return fromUserId
    // This is to ensure that we get the user data of the connected user

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//  Feed API
// User should see all the users cards except
// 1. Users who are already connected
// 2. his own card
// 3. ignored users
// 4. already sent requests

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 15;
    limit = limit > 30 ? 30 : limit;
    const skip = (page - 1) * limit;

    // find all conections requests -> send or received
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // Data Structure set to array to use in mongoose query
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, // nin = not in
        { _id: { $ne: loggedInUser._id } }, //  ne =  not equal
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//
// pagination concept
//
// feed?page=1&limit=10  => 1-10  => .skip(0) .limit(10)
// feed?page=2&limit=10  => 11-20  => .skip(10) .limit(10)
// feed?page=3&limit=10  => 21-30  => .skip(20) .limit(10)
// feed?page=4&limit=10  => 31-40  => .skip(30) .limit(10)

module.exports = userRouter;
