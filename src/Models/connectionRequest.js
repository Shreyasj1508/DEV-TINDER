const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
