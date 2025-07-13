const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("Hello World!");
});
app.use("/shreyas", (req, res) => {
  res.send("Hello World from shreyas!");
});

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Hello World from user!");
// });

app.get("/user/:userID/:name/:password", (req, res) => {
  console.log(req.params);
  res.send("Hello World from user!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
