const express = require('express');
const router = express.Router();
const Message = require('../Models/Message');
const { userAuth } = require('../Middleware/auth');
const User = require('../Models/user');

// Get chat messages between two users
router.get('/:targetUserId', userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    // Create consistent chat room ID
    const chatRoom = [userId, targetUserId].sort().join('-');

    // Fetch messages with user details
    const messages = await Message.find({ chatRoom })
      .populate('senderId', 'firstName lastName photoURL photo')
      .sort({ createdAt: 1 })
      .limit(100); // Limit to last 100 messages

    // Mark messages as read
    await Message.updateMany(
      { chatRoom, receiverId: userId, isRead: false },
      { isRead: true }
    );

    res.json({
      success: true,
      data: { messages }
    });
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat messages'
    });
  }
});

// Get recent chats for navbar dropdown
router.get('/recent', userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get recent conversations
    const recentMessages = await Message.aggregate([
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
              if: { $eq: ['$senderId', userId] },
              then: '$receiverId',
              else: '$senderId'
            }
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$otherUserId',
          lastMessage: { $first: '$text' },
          lastMessageTime: { $first: '$createdAt' },
          hasUnread: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiverId', userId] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      // Removed $limit to return all recent chats
    ]);

    // Debug: Print aggregation result
    console.log('Recent messages aggregation result:', recentMessages);
    // Populate user details
    const populatedChats = await User.populate(recentMessages, {
      path: '_id',
      select: 'firstName lastName photoURL photo'
    });

    const formattedChats = populatedChats.map(chat => ({
      _id: chat._id._id,
      userId: chat._id._id,
      firstName: chat._id.firstName,
      lastName: chat._id.lastName,
      photo: chat._id.photo || chat._id.photoURL,
      photoURL: chat._id.photo || chat._id.photoURL,
      lastMessage: chat.lastMessage,
      lastMessageTime: chat.lastMessageTime,
      hasUnread: chat.hasUnread > 0,
      unreadCount: chat.hasUnread
    }));

    res.json({
      success: true,
      data: formattedChats
    });
  } catch (error) {
    console.error('Get recent chats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent chats'
    });
  }
});

// Send message (fallback for non-socket)
router.post('/send', userAuth, async (req, res) => {
  try {
    const { targetUserId, text } = req.body;
    const senderId = req.user._id;

    if (!targetUserId || !text?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Target user and message text are required'
      });
    }

    // Create chat room ID
    const chatRoom = [senderId, targetUserId].sort().join('-');

    const newMessage = new Message({
      senderId,
      receiverId: targetUserId,
      text: text.trim(),
      chatRoom
    });

    await newMessage.save();
    await newMessage.populate('senderId', 'firstName lastName photoURL photo');

    res.json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

module.exports = router;