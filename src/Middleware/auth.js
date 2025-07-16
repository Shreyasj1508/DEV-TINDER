const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userAuth = async (req, res, next) => {
  // read the token from the cookies

  const {token} = req.cookies;
 if(!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decodedMessage = jwt.verify(token, "secretkey");
    const { _id } = decodedMessage; // Extract the user ID from the decoded token
    // console.log("Decoded message:", decodedMessage);
    // console.log("User ID from token:", _id);
    //   Need cookies-parser middleware to read cookies
    //   console.log("Cookies:", cookies);
    const user = await User.findById(_id); // Find the user by ID from the decoded token
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user; // Attach the user to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).send("ERROR! " + error.message);
  }
};
module.exports = userAuth;
// validate the token
// find the user by ID from the decoded token
