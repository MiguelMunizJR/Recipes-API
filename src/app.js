const express = require("express");
const cors = require("cors");
const db = require("./utils/database");
const initModels = require("./models/initModel");

const port = require("./config").port;
const authRouter = require("./auth/auth.router");
const userRouter = require("./users/users.router");
const categoriesRouter = require("./categories/categories.router");
const recipesRouter = require("./recipes/recipes.router");
const ingredientsRouter = require("./ingredients/ingredients.router");

const app = express();
app.use(express.json());
app.use(cors());

db.authenticate()
  .then(() => console.log("Database Autenticate!"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database Synced!"))
  .catch((err) => console.log(err));

//* Init Models
initModels();

//* Routes:
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/ingredients", ingredientsRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
    users: `localhost: ${port}/api/v1/users`,
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
