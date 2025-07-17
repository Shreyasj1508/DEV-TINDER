const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, email, password, age } = req.body;

  if (!firstName || !email || !password || !age) {
    throw new Error("All fields are required.");
  }

  if (firstName && (firstName.length < 4 || firstName.length > 50)) {
    throw new Error("First name must be between 4 and 50 characters.");
  }

  if (lastName && (lastName.length < 4 || lastName.length > 50)) {
    throw new Error("Last name must be between 4 and 50 characters.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  }
  if (password.length < 6 || password.length > 1024) {
    throw new Error("Password must be between 6 and 1024 characters.");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password.");
  }
  if (age < 18 || age > 120) {
    throw new Error("Age must be between 18 and 120.");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "photo",
    "gender",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditFields.includes(fields)
  );
  if (!isEditAllowed) new Error("Invalid fields for profile edit.");
  return isEditAllowed;
};

const validatePasswordStrength = (password) => {
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password.");

  }
  return true;
};
module.exports = {
  validateSignup,
  validateEditProfileData,
  validatePasswordStrength,
};
