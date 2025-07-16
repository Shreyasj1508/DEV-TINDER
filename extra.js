
//
//
//
//
//
//
//
//
//
//           Get user by email
//
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    console.log("Requested Email:", userEmail);
    const user = await User.find({ email: userEmail }); // Await the asynchronous operation
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong while fetching user data!");
  }
});
//
//
//
//          Get one user by email (many users can have the same email)
//
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    console.log("Requested Email:", userEmail);
    const user = await User.findOne({ email: userEmail }); // Await the asynchronous operation
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong while fetching user data!");
  }
});
//
//
//
//
//         Feed API - GET /feed - get all the users from the database
//
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users from the database
    res.send(users); // Send the list of users as a response
  } catch (error) {
    res.status(500).send("Error fetching users from the database");
  }
});
//
//
//
//
//          Get user by ID
//
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters
  try {
    console.log("Requested User ID:", userId);
    const user = await User.findById(userId); // Await the asynchronous operation to find the user by ID
    if (!user) {
      return res.status(404).send("User not found"); // If user not found, send 404 response
    }
    res.send(user); // Send the user data as a response
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).send("Error fetching user by ID"); // Send 500 response in case of an error
  }
});
//
//
//
//
//
//          Delete user by ID
//
app.delete("/user", async (req, res) => {
  const userId = req.body.id; // Get the user ID from the request parameters
  try {
    console.log("Requested User ID for deletion:", userId);
    const user = await User.findByIdAndDelete(userId); // Await the asynchronous operation to find and delete the user by ID
    if (!user) {
      return res.status(404).send("User not found"); // If user not found, send 404 response
    }
    res.send("User deleted successfully"); // Send success response
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).send("Error deleting user by ID"); // Send 500 response in case of an error
  }
});
//
//
//
//
//
//         Update by find by id and update
//
app.patch("/user/:id", async (req, res) => {
  const userId = req.params?.id; // Get the user ID from the request body
  const updateData = req.body; // Get the data to update from the request body

  try {
    // Define the allowed fields for update
    const allowedUpdates = [
      "firstName",
      "lastName",
      "password",
      "age",
      "skills",
    ];

    const updates = Object.keys(updateData);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    // Check if all updates are valid
    if (!isValidOperation) {
      throw new Error("Invalid updates!"); // If any update is not allowed, throw an error
    }

    // If skills exceed 10 items, send a 400 response
    if (updateData.skills.length > 10) {
      throw new error("Skills cannot exceed 10 items");
    }

    // console.log("Received update data:", updateData);
    // Log the received update data
    console.log("Requested User ID for update:", userId);
    const user = await User.findByIdAndUpdate(userId, updateData, {
      runValidators: true, // Ensure that the update respects the schema validation rules
      new: true,
    }); // Await the asynchronous operation to find and update the user by ID
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user); // Send the updated user data as a response
  } catch (error) {
    console.error("Error updating user by ID:", error.message);
    res.status(400).send("Something went wrong"); // Send 500 response in case of an error
  }
});
//
//
//
//
//
//         Find one ( by emailId ) and update
//
app.put("/user", async (req, res) => {
  const userEmail = req.body.email; // Get the user email from the request body
  const updateData = req.body; // Get the data to update from the request body
  try {
    console.log("Requested User Email for update:", userEmail);
    const user = await User.findOneAndUpdate({ email: userEmail }, updateData, {
      new: true,
    }); // Await the asynchronous operation to find and update the user by email
    if (!user) {
      return res.status(404).send("User not found"); // If user not found, send 404 response
    }
    res.send(user); // Send the updated user data as a response
  } catch (error) {
    console.error("Error updating user by email:", error);
    res.status(500).send("Error updating user by email"); // Send 500 response in case of an error
  }
});
//
//
//
//
//