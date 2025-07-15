const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shreyasjaiswal:IkUCwf7Vj9DheATf@namaste-dev.ab3ld6b.mongodb.net/DEV-TINDER"
  );
};
module.exports = connectDB;


