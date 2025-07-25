const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      index: true, // Indexing for faster search
      maxLength: 40,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 40,
      trim: true, // Trim whitespace from both ends of the string
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
      trim: true,
      select: false, // Do not return password in queries by default
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 120,
      validate(value) {
        if (value < 18 || value > 120) {
          throw new Error("Age must be between 18 and 120");
        }
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "Male", "Female", "Other"],
      validate: {
        validator: function (value) {
          return ["male", "female", "other", "Male", "Female", "Other"].includes(value);
        },
        message: `{VALUE} is not a valid gender`,
      },
    },
    photo: {
      type: String,
      default: "https://via.placeholder.com/300x300/007bff/ffffff?text=User",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid!");
        }
      },
    },
    about: {
      type: String,
      default: "Hello, I am using DEV-TINDER!",
    },
    skills: {
      type: [String],
      validate: {
        validator: function(array) {
          return array.length <= 20; // Limit skills to 20
        },
        message: "Too many skills! Maximum 20 allowed."
      }
    },
    
    // Enhanced Profile Information
    photoURL: {
      type: String,
      default: null,
      validate: {
        validator: function(value) {
          return !value || validator.isURL(value);
        },
        message: "Photo URL is not valid!"
      }
    },
    
    // Professional Information
    location: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    occupation: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    company: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    education: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    
    // Personal Information
    interests: [{
      type: String,
      trim: true,
      maxLength: 50,
    }],
    
    // Social Links
    github: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/(www\.)?github\.com\//.test(v);
        },
        message: 'Please enter a valid GitHub URL'
      }
    },
    linkedin: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/(www\.)?linkedin\.com\//.test(v);
        },
        message: 'Please enter a valid LinkedIn URL'
      }
    },
    portfolio: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\//.test(v);
        },
        message: 'Please enter a valid portfolio URL'
      }
    },
    
    // Status Information
    isOnline: {
      type: Boolean,
      default: false
    },
    lastSeen: {
      type: Date,
      default: Date.now
    },
    
    // Preferences (for future features)
    preferences: {
      ageRange: {
        min: { type: Number, default: 18 },
        max: { type: Number, default: 35 }
      },
      location: {
        type: String,
        default: null
      },
      interests: [{
        type: String
      }]
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Enhanced indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.index({ location: 1 });
userSchema.index({ skills: 1 });
userSchema.index({ age: 1, gender: 1 });

// Method to generate JWT token for the user
userSchema.methods.getJWT = async function () {
  const user = this; // 'this' refers to the instance of the user model

  const token = await jwt.sign({ _id: user._id }, "secretkey", {
    expiresIn: "1d",
  });
  return token; // Return the generated JWT token
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this; // 'this' refers to the instance of the user model
  const hashedPassword = user.password; // Get the hashed password from the user instance
  const isMatch = await bcrypt.compare(passwordInputByUser, hashedPassword); // Compare the provided password with the hashed password in the database
  return isMatch; // Return true if passwords match, false otherwise
};

// Remove sensitive information when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
