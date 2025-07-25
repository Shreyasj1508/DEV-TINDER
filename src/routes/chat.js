const express = require('express');
const router = express.Router();
const { getRecentChats, getChatMessages, sendMessage } = require('../controllers/chatController');
const { userAuth } = require('../Middleware/auth'); // Fixed auth import

// Get recent chats
router.get('/recent', userAuth, getRecentChats);

// Get messages with a specific user
router.get('/:userId', userAuth, getChatMessages);

// Send a message
router.post('/send', userAuth, sendMessage);

module.exports = router;
