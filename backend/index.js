const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const initializeDBConnection = require("./db/db.connection");
const loginRouter = require("./routers/login.router");
const postRouter = require("./routers/posts.router");
const userRouter = require("./routers/user.router");

initializeDBConnection();

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started");
});

app.use(cors());
app.use(bodyParser.json());

app.use("/login", loginRouter);
app.use("/posts", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(400).json({ success: true, message: "Welcome to Soul Ideas" });
});

app.use("*", function (req, res) {
  res.status(400).json("Page Not Found");
});
