const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userAuth = async (req, res, next) => {
  // read the token from the cookies
 try {
  console.log("Cookies:", req.cookies);
  
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Please Login first!");
  }
 
    const decodedMessage = await jwt.verify(token, "secretkey");
    const { _id } = decodedMessage; // Extract the user ID from the decoded token
    

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
