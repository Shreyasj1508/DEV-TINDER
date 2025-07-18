const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      // This will create a reference to the User model
      // and ensure that the fromUserId is a valid ObjectId
      // from the User collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      // This will create a reference to the User model
      // and ensure that the toUserId is a valid ObjectId
      // from the User collection
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is not a valid status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
//
//
// Indexing for faster search
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
//
//
// Middleware to ensure that the fromUserId and toUserId are not the same
connectionRequestSchema.pre("save", function (next) {
  const connnectionRequest = this;

  // Ensure that the fromUserId and toUserId are not the same
  if (connnectionRequest.fromUserId.equals(connnectionRequest.toUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
