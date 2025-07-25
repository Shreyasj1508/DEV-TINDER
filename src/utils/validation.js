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
    "photoURL",
    "gender",
    "about",
    "skills",
    "location",
    "occupation",
    "company",
    "education",
    "interests",
    "github",
    "linkedin",
    "portfolio",
  ];

  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditFields.includes(fields)
  );
  if (!isEditAllowed) throw new Error("Invalid fields for profile edit.");
  return isEditAllowed;
};

// Validate profile update data
const validateProfileUpdateData = (data) => {
  const errors = [];

  // Validate firstName
  if (data.firstName && (data.firstName.length < 2 || data.firstName.length > 50)) {
    errors.push("First name must be between 2 and 50 characters.");
  }

  // Validate lastName
  if (data.lastName && (data.lastName.length < 2 || data.lastName.length > 50)) {
    errors.push("Last name must be between 2 and 50 characters.");
  }

  // Validate age
  if (data.age && (data.age < 18 || data.age > 120)) {
    errors.push("Age must be between 18 and 120.");
  }

  // Validate gender
  if (data.gender && !["male", "female", "other", "Male", "Female", "Other"].includes(data.gender)) {
    errors.push("Gender must be male, female, or other.");
  }

  // Validate about
  if (data.about && data.about.length > 500) {
    errors.push("About section must be less than 500 characters.");
  }

  // Validate skills array
  if (data.skills && Array.isArray(data.skills)) {
    if (data.skills.length > 20) {
      errors.push("Maximum 20 skills allowed.");
    }
    data.skills.forEach(skill => {
      if (typeof skill !== 'string' || skill.trim().length === 0) {
        errors.push("All skills must be non-empty strings.");
      }
    });
  }

  // Validate location
  if (data.location && data.location.length > 100) {
    errors.push("Location must be less than 100 characters.");
  }

  // Validate occupation
  if (data.occupation && data.occupation.length > 100) {
    errors.push("Occupation must be less than 100 characters.");
  }

  // Validate company
  if (data.company && data.company.length > 100) {
    errors.push("Company must be less than 100 characters.");
  }

  // Validate education
  if (data.education && data.education.length > 200) {
    errors.push("Education must be less than 200 characters.");
  }

  // Validate interests array
  if (data.interests && Array.isArray(data.interests)) {
    data.interests.forEach(interest => {
      if (typeof interest !== 'string' || interest.trim().length === 0) {
        errors.push("All interests must be non-empty strings.");
      }
    });
  }

  // Validate URLs
  const urlFields = ['photo', 'photoURL', 'portfolio'];
  urlFields.forEach(field => {
    if (data[field] && !validator.isURL(data[field])) {
      errors.push(`${field} must be a valid URL.`);
    }
  });

  // Validate GitHub URL
  if (data.github && !data.github.match(/^https?:\/\/(www\.)?github\.com\/.+/)) {
    errors.push("GitHub URL must be a valid GitHub profile URL.");
  }

  // Validate LinkedIn URL
  if (data.linkedin && !data.linkedin.match(/^https?:\/\/(www\.)?linkedin\.com\/.+/)) {
    errors.push("LinkedIn URL must be a valid LinkedIn profile URL.");
  }

  return errors;
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
  validateProfileUpdateData,
};
