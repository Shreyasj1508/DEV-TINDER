const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
 require("dotenv").config();
await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connectDB;
