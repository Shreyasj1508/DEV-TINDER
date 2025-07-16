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
///////////////////////////////////////////////////////////////////////////////////////////////////////                              S-2 E-7 and E-8

const express = require("express");
const connectDB = require("./config/database.js"); // Import the database connection
const app = express();
const User = require("./Models/user.js"); // Import the User model
app.use(express.json()); // Middleware to parse JSON request bodies
const { validateSignup } = require("./utils/validation");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Middleware to parse cookies
const jwt = require("jsonwebtoken"); // Import JWT for token generation and validation
const UserAuth = require("./Middleware/auth"); // Import the authentication middleware
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const userAuth = require("./Middleware/auth");
//
//
//          POST API - /signup - add a new user to the database
//
app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignup(req);

    // encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Creating a new instance of the User model with the request body
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    //  console.error("Error adding user:", error);
    res.status(400).send("ERROR:" + error.message);
  }
});
//
//
//
//
//           Login API
//
app.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request
  try {
    // Find the user by email & Include the password field in the query result
    const user = await User.findOne({ email }).select("+password");

    console.log("User found:", user);
    if (!user) {
      return res.status(404).send("Invalid credentials!");
    }

    // Compare the provided password (write by client) with the stored hashed password (actual passwords )
    // user.password is the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Create a JWT token
      const token = await jwt.sign({ _id: user._id }, "secretkey", {
        expiresIn: "1d",
      });
      //   console.log("Generated JWT token:", token);

      // Add the token to cookeies and sent response back to the client
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token expires in 1 day
      });
      // console.log("Login successful for user:", user.email);

      res.send("Login successful!"); // If login is successful
    } else {
      res.status(401).send("Invalid credentials!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Something went wrong during login!");
  }
});
//
//
//
//
//
//
//
//
//         Profile API
//
app.get("/profile", UserAuth, async (req, res) => {
  try {
    const user = req.user; // The user is attached to the request object by the authentication middleware

    res.send(user); // Send the user data as a response
  } catch (error) {
    res.status(400).send("ERROR! " + error.message);
  }
});
//
//
//
//
//
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user; // The user is attached to the request object by the authentication middleware

  console.log("Sending connection request...");
  res.send(user.firstName + " Elon sent connection request!");
});

//
//
//
//
//
//
//
//
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
//
//
//
//
//
//////////////////////////////////////////////////////////////////////////////////////////////////
