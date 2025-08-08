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

// server.js

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const connectDB = require("./config/database.js");
const handleChatSocket = require("../socket/chatSocket.js");

// Initialize express app and http server
const app = express();
const server = http.createServer(app);

// CORS for API routes
app.use(
  cors({
    origin: [
      "https://dev-tinder-ui-ten.vercel.app", // deployed frontend
      "http://localhost:5173",               // local dev
      "http://localhost:3000"                // alt local dev
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Socket.io with CORS
const io = socketIo(server, {
  cors: {
    origin: [
      "https://dev-tinder-ui-ten.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Chat socket handler
handleChatSocket(io);

// Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/chat", chatRouter);

// DB connection and server start
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully!");
    const PORT = process.env.PORT || 7777;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("💬 Socket.io server ready for chat");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

// Optional health check endpoint for Render
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
