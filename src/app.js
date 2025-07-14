const express = require("express");
const app = express();

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

app.use(
  "/user",
  (req, res, next) => {
    console.log("handling the route user 1");
    next(); // Call next to pass control to the next middleware
  },
  (req, res, next) => {
    console.log("handling the route user 2");
    next(); // Call next to pass control to the next middleware
    //res.send("This is the second response from user route 2!");
  },
  (req, res, next) => {
    console.log("handling the route user 3");
    next(); // Call next to pass control to the next middleware
    
    //res.send("This is the 3 response from user route 3!");
  },
  (req, res, next) => {
    console.log("handling the route user 4");
  next(); // Call next to pass control to the next middleware
   // res.send("This is the 4 response from user route 4!");
  },
   (req, res, next) => {
    console.log("handling the route user 5");
    res.send("This is the 5 response from user route 5!");
    next(); // Call next to pass control to the next middleware
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
