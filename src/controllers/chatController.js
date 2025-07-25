const Message = require("../Models/Message");
const User = require("../Models/user");
const ConnectionRequest = require("../Models/connectionRequest");

// Get recent chats for the logged-in user
const getRecentChats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get unique conversations by finding latest message with each user
    const recentChats = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $addFields: {
          otherUserId: {
            $cond: {
              if: { $eq: ["$senderId", userId] },
              then: "$receiverId",
              else: "$senderId"
            }
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$otherUserId",
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ["$receiverId", userId] },
                    { $eq: ["$isRead", false] }
                  ]
                },
                then: 1,
                else: 0
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          unreadCount: 1,
          "userInfo.firstName": 1,
          "userInfo.lastName": 1,
          "userInfo.photo": 1
        }
      },
      {
        $sort: { "lastMessage.createdAt": -1 }
      }
    ]);

    res.json({
      success: true,
      data: recentChats,
      message: "Recent chats retrieved successfully"
    });
  } catch (error) {
    console.error("Error getting recent chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get recent chats"
    });
  }
};

// Get messages between current user and a specific user
const getChatMessages = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Verify that both users are connected
    const connection = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: currentUserId, toUserId: userId, status: 'accepted' },
        { fromUserId: userId, toUserId: currentUserId, status: 'accepted' }
      ]
    });

    if (!connection) {
      return res.status(403).json({
        success: false,
        message: 'You can only chat with accepted connections'
      });
    }

    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    })
      .populate('senderId', 'firstName lastName photo')
      .populate('receiverId', 'firstName lastName photo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Mark messages as read
    await Message.updateMany(
      {
        senderId: userId,
        receiverId: currentUserId,
        isRead: false
      },
      {
        isRead: true,
        readAt: new Date()
      }
    );

    res.json({
      success: true,
      data: messages.reverse(), // Reverse to show oldest first
      pagination: {
        page,
        limit,
        hasMore: messages.length === limit
      },
      message: "Chat messages retrieved successfully"
    });
  } catch (error) {
    console.error("Error getting chat messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat messages"
    });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, text } = req.body;

    if (!receiverId || !text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID and message text are required"
      });
    }

    // Verify that both users are connected
    const connection = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: senderId, toUserId: receiverId, status: 'accepted' },
        { fromUserId: receiverId, toUserId: senderId, status: 'accepted' }
      ]
    });

    if (!connection) {
      return res.status(403).json({
        success: false,
        message: 'You can only send messages to accepted connections'
      });
    }

    // Create and save the message
    const message = new Message({
      senderId,
      receiverId,
      text: text.trim()
    });

    const savedMessage = await message.save();
    
    // Populate sender and receiver info
    const populatedMessage = await Message.findById(savedMessage._id)
      .populate('senderId', 'firstName lastName photo')
      .populate('receiverId', 'firstName lastName photo');

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: populatedMessage
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};

module.exports = {
  getRecentChats,
  getChatMessages,
  sendMessage
};
