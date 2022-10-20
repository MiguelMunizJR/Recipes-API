//* Dependencies
const express = require("express");
const router = require("./users/users.router");
const db = require("./utils/database");

//* Routes
const port = require("./config").port;
const userRouter = require("./users/users.router");

//* Initial Config
const app = express();

app.use(express.json());

db.authenticate()
  .then((res) => console.log("Database Autenticate!"))
  .catch((err) => console.log(err));

db.sync()
  .then((res) => console.log("Database Synced!"))
  .catch((err) => console.log(err));

//! Es importante usar un prefijo como el siguiente:
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
    users: `localhost: ${port}/api/v1/users`,
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
