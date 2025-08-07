const Message = require('../src/Models/Message');
const User = require('../src/Models/user');

const handleChatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join chat room
    socket.on('joinChat', ({ userId, targetUserId, firstName }) => {
      const chatRoom = [userId, targetUserId].sort().join('-');
      socket.join(chatRoom);
      socket.userId = userId;
      socket.chatRoom = chatRoom;
      
      console.log(`${firstName} joined chat room: ${chatRoom}`);
    });

    // Handle video call signaling
    socket.on('video-signal', ({ roomId, signal }) => {
      console.log(`Video signal received for room ${roomId}`);
      socket.to(roomId).emit('video-signal', { signal });
    });

    // Handle sending messages
    socket.on('sendMessage', async ({ userId, targetUserId, text, firstName, lastName }) => {
      try {
        if (!text?.trim()) return;

        const chatRoom = [userId, targetUserId].sort().join('-');

        // Save message to database
        const newMessage = new Message({
          senderId: userId,
          receiverId: targetUserId,
          text: text.trim(),
          chatRoom
        });

        await newMessage.save();

        // Emit to both users in the chat room with frontend-compatible keys
        io.to(chatRoom).emit('messageReceived', {
          messageId: newMessage._id,
          senderId: userId,
          senderName: `${firstName || ''} ${lastName || ''}`.trim(),
          text: text.trim(),
          createdAt: newMessage.createdAt
        });

        console.log(`Message sent in room ${chatRoom}: ${text.substring(0, 50)}...`);
      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('messageError', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing', ({ targetUserId, isTyping }) => {
      const chatRoom = [socket.userId, targetUserId].sort().join('-');
      socket.to(chatRoom).emit('userTyping', {
        userId: socket.userId,
        isTyping
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = handleChatSocket;