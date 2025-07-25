const User = require('../Models/user');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Ensure photo URL is valid or provide a default
    if (!user.photo || user.photo.includes('google.com')) {
      user.photo = "https://via.placeholder.com/300x300/007bff/ffffff?text=User";
    }

    res.json({
      success: true,
      data: user,
      message: 'Profile fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    console.log('Updating profile for user:', userId);
    console.log('Updates received:', updates);

    // Validate and sanitize input
    const allowedUpdates = [
      'firstName', 'lastName', 'photo', 'photoURL', 'age', 'gender', 
      'about', 'skills', 'location', 'occupation', 'company', 'education',
      'interests', 'github', 'linkedin', 'portfolio'
    ];

    const filteredUpdates = {};
    
    // Only include allowed fields and non-empty values
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key) && updates[key] !== null && updates[key] !== undefined) {
        // Handle arrays (skills, interests)
        if (Array.isArray(updates[key])) {
          filteredUpdates[key] = updates[key].filter(item => 
            typeof item === 'string' && item.trim().length > 0
          );
        }
        // Handle strings
        else if (typeof updates[key] === 'string') {
          const trimmed = updates[key].trim();
          if (trimmed.length > 0) {
            filteredUpdates[key] = trimmed;
          }
        }
        // Handle numbers
        else if (typeof updates[key] === 'number') {
          filteredUpdates[key] = updates[key];
        }
      }
    });

    console.log('Filtered updates:', filteredUpdates);

    // Validate age if provided
    if (filteredUpdates.age && (filteredUpdates.age < 18 || filteredUpdates.age > 120)) {
      return res.status(400).json({
        success: false,
        message: 'Age must be between 18 and 120'
      });
    }

    // Validate URLs if provided
    const urlFields = ['github', 'linkedin', 'portfolio'];
    for (const field of urlFields) {
      if (filteredUpdates[field] && !isValidUrl(filteredUpdates[field])) {
        return res.status(400).json({
          success: false,
          message: `Please provide a valid ${field} URL`
        });
      }
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('Profile updated successfully:', updatedUser);

    const responseData = {
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    };

    console.log('Sending response:', responseData);

    res.json(responseData);
  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

// Helper function to validate URLs
const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

// Get user by ID (for viewing other profiles)
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password -email');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Ensure photo URL is valid or provide a default
    if (!user.photo || user.photo.includes('google.com')) {
      user.photo = "https://via.placeholder.com/300x300/007bff/ffffff?text=User";
    }

    res.json({
      success: true,
      data: user,
      message: 'User profile fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
};

// Update online status
const updateOnlineStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { isOnline } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        isOnline: isOnline,
        lastSeen: new Date()
      },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      data: { isOnline: updatedUser.isOnline, lastSeen: updatedUser.lastSeen },
      message: 'Online status updated successfully'
    });
  } catch (error) {
    console.error('Error updating online status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update online status'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getUserById,
  updateOnlineStatus
};
