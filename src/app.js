//const express = require("express");
//const app = express();
// app.use("/test", (req, res) => {
//   res.send("Hello World!");
// });

// ROUTE HANDLERS
// app.use("/shreyas", (req, res) => {
//   res.send("Hello World from shreyas!");
// });

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Hello World from user!");
// });

// app.get("/user/:userID/:name/:password", (req, res) => {
//   console.log(req.params);
//   res.send("Hello World from user!");
// });

//ROUTE HANDLERS ->EMPTY
// INFINTE REQUEST WILL GO ON
//app.use("/user", (req, res) => {
// res.send("Hello Hello from User!");
//});
//
//

// app.use(
//   "/user",
//   (req, res) => {
//     console.log("handling the route user 1");
//    // res.send("This is the first respone from the route!");
//   },
//   (req, res) => {
//     console.log("handling the route user 2");
//     res.send("This is the second response from user route!");
//   }
// );

// app.listen(7777, () => {
//   console.log("Server is successfully listening on port 7777...");
// });
//
// OUTPUT -> ONLY SEND REQUEST TO THE FIRST HANDLER
//
//

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//     // res.send("This is the first respone from the route!");
//     next(); // Call next to pass control to the next middleware
//   },
//   (req, res) => {
//     console.log("handling the route user 2");
//     res.send("This is the second response from user route!");
//   }
// );

// app.listen(7777, () => {
//   console.log("Server is successfully listening on port 7777...");
// });
//
// OUTPUT -> SEND REQUEST TO THE SECOND HANDLER
// The first handler calls next(), allowing the second handler to execute.
//
//
//
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//      res.send("This is the first respone from the route!");
//     next(); // Call next to pass control to the next middleware
//   },
//   (req, res) => {
//     console.log("handling the route user 2");
//     res.send("This is the second response from user route!");
//   }
// );

// app.listen(7777, () => {
//   console.log("Server is successfully listening on port 7777...");
// });

// OUTPUT -> SEND REQUEST TO THE FIRST HANDLER
// The first handler sends a response, so the second handler is never reached.
// If you want both handlers to execute, you should not send a response in the first handler.
// If you want to send a response from both handlers, you can modify the logic accordingly.
// In this case, the second handler will not execute because the first handler sends a response.
// If you want to see the second handler in action, you can comment out the response in the first handler.
// This demonstrates how middleware functions can be chained together in Express.js.
//
//
//
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//     next(); // Call next to pass control to the next middleware
//      res.send("This is the first respone from the route 2!");

//   },
//   (req, res) => {
//     console.log("handling the route user 2");
//     res.send("This is the 2 response from user route 2!");
//   }
// );
// OUTPUT -> This is the second response from user route 2 with error
// SEND REQUEST TO THE FIRST HANDLER
// SECOND HANDLER WILL EXECUTE
//
//
//
//
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//     next(); // Call next to pass control to the next middleware
//   },
//   (req, res, next) => {
//     console.log("handling the route user 2");
//     res.send("This is the 2 response from user route 2!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 3");
//     res.send("This is the 3 response from user route 3!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 4");
//     res.send("This is the 4 response from user route 4!");
//   }
// );
// OUTPUT -> This is the second response from user route 2 with error
// SEND REQUEST TO THE FIRST HANDLER
// SECOND HANDLER WILL EXECUTE
// THIRD HANDLER WILL NOT EXECUTE
// FOURTH HANDLER WILL NOT EXECUTE
// The third and fourth handlers will not execute because the second handler sends a response.

//
//

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//     next(); // Call next to pass control to the next middleware
//   },
//   (req, res, next) => {
//     console.log("handling the route user 2");
//     next(); // Call next to pass control to the next middleware
//     // res.send("This is the 2 response from user route 2!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 3");
//     res.send("This is the 3 response from user route 3!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 4");
//     res.send("This is the 4 response from user route 4!");
//   }
// );
// OUTPUT -> This is the second response from user route 3
// SEND REQUEST TO THE FIRST HANDLER
// SECOND HANDLER WILL EXECUTE
// THIRD HANDLER WILL EXECUTE
// FOURTH HANDLER WILL NOT EXECUTE
// The fourth handler will not execute because the third handler sends a response.
// If you want to see the fourth handler in action, you can comment out the response in the third handler.

//
//

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//     next(); // Call next to pass control to the next middleware
//   },
//   (req, res, next) => {
//     console.log("handling the route user 2");
//     next(); // Call next to pass control to the next middleware
//     //res.send("This is the 2 response from user route 2!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 3");
//     next(); // Call next to pass control to the next middleware

//     //res.send("This is the 3 response from user route 3!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 4");
//   next(); // Call next to pass control to the next middleware
//    // res.send("This is the 4 response from user route 4!");
//   }
// );
// OUTPUT -> This is the second response from user route 4
// SEND REQUEST TO THE FIRST HANDLER
// SECOND HANDLER WILL EXECUTE
// THIRD HANDLER WILL EXECUTE
// FOURTH HANDLER WILL EXECUTE
// All handlers will execute, and the last handler will send the response.

//
//
//

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//     next(); // Call next to pass control to the next middleware
//   },
//   (req, res, next) => {
//     console.log("handling the route user 2");
//     next(); // Call next to pass control to the next middleware
//     //res.send("This is the second response from user route 2!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 3");
//     next(); // Call next to pass control to the next middleware

//     //res.send("This is the 3 response from user route 3!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 4");
//   next(); // Call next to pass control to the next middleware
//    // res.send("This is the 4 response from user route 4!");
//   },
//    (req, res, next) => {
//     console.log("handling the route user 5");
//     res.send("This is the 5 response from user route 5!");
//     next(); // Call next to pass control to the next middleware
//   }
// );
// OUTPUT -> This is the 5 response from user route 5
// SEND REQUEST TO THE FIRST HANDLER
// SECOND HANDLER WILL EXECUTE
// THIRD HANDLER WILL EXECUTE
// FOURTH HANDLER WILL EXECUTE
// FIFTH HANDLER WILL EXECUTE

//
//

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user 1");
//     next(); // Call next to pass control to the next middleware
//   },
//   (req, res, next) => {
//     console.log("handling the route user 2");
//     next(); // Call next to pass control to the next middleware
//     //res.send("This is the second response from user route 2!");
//   },
//   [
//   (req, res, next) => {
//     console.log("handling the route user 3");
//     next(); // Call next to pass control to the next middleware

//     //res.send("This is the 3 response from user route 3!");
//   },
//   (req, res, next) => {
//     console.log("handling the route user 4");
//   next(); // Call next to pass control to the next middleware
//    // res.send("This is the 4 response from user route 4!");
//   }],
//    (req, res, next) => {
//     console.log("handling the route user 5");
//     res.send("This is the 5 response from user route 5!");
//     next(); // Call next to pass control to the next middleware
//   }
// );
// OUTPUT -> This is the 5 response from user route 5
// SEND REQUEST TO THE FIRST HANDLER
// We can use an array of middleware functions to handle the route.

//
//
//

// app.get("/user", (req, res, next) => {
//   console.log("Handling the route user 2");
//   res.send("This is the second response from user route 2!");
// });
// app.get("/user", (req, res, next) => {
//   console.log("Handling the route user 1");
//   next(); // Call next to pass control to the next middleware
// });

//
//
//
//  MIDDLWARE FUNCTIONS

// app.use("/admin", (req, res, next) => {
//   const token = "xyz";
//   const isAdministered = token === "xyz";
//   if (!isAdministered) {
//     res.status(401).send("Unauthorized Request !!");
//   } else {
//     next(); // Call next to pass control to the next middleware
//   }
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data sent successfully!");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("All data deleted successfully!");
// });
//////////////////////////////////////////////////////////////////////////////////////////////////
//                                  EP - S2 - E6;

// const express = require("express");
// const connectDB = require("./config/database.js"); // Import the database connection
// const app = express();
// const User = require("./Models/user.js"); // Import the User model

// app.post("/signup", async (req, res) => {
//   const user = new User({
//     firstName: "Sachin",
//     lastName: "Tendulkar",
//     email: "sachin@gmail.com",
//     password: "23344554refefdfd",
//     age: 52,
//   });
//   try {
//     await user.save();
//     res.send("User added successfully!");
//   } catch (error) {
//     //  console.error("Error adding user:", error);
//     res.status(500).send("Error saving the user" + err.message);
//   }
// });

// connectDB()
//   .then(() => {
//     console.log("Database connected successfully!");

//     app.listen(7777, () => {
//       console.log("Server is successfully listening on port 7777...");
//     });
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err);
//   });
/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                 S-2  E-7

// const express = require("express");
// const connectDB = require("./config/database.js"); // Import the database connection
// const app = express();
// const User = require("./Models/user.js"); // Import the User model
// app.use(express.json()); // Middleware to parse JSON request bodies

// app.post("/signup", async (req, res) => {
//   const user = new User(req.body);
//   //  console.log("Received user data:", req.body);
//   //  Log the received data
//   try {
//     await user.save();
//     res.send("User added successfully!");
//   } catch (error) {
//     //  console.error("Error adding user:", error);
//     res.status(500).send("Error saving the user");
//   }
// });

// connectDB()
//   .then(() => {
//     console.log("Database connected successfully!");

//     app.listen(7777, () => {
//       console.log("Server is successfully listening on port 7777...");
//     });
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err);
//   });
//
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////                              S-2 E-7

const express = require("express");
const connectDB = require("./config/database.js"); // Import the database connection
const app = express();
const User = require("./Models/user.js"); // Import the User model
app.use(express.json()); // Middleware to parse JSON request bodies

//          POST API - /signup - add a new user to the database

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  //  console.log("Received user data:", req.body);
  try {
    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    //  console.error("Error adding user:", error);
    res.status(400).send("Error saving the user" + error.message);
  }
});

//     Get user by email

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

//    Get one user by email (many users can have the same email)

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

//           Feed API - GET /feed - get all the users from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users from the database
    res.send(users); // Send the list of users as a response
  } catch (error) {
    res.status(500).send("Error fetching users from the database");
  }
});

//                 Get user by ID

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

//    Delete user by ID

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

//   update by find by id and update

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
    if(updateData.skills.length > 10) {
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

//Find one ( by emailId ) and update

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

connectDB()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
